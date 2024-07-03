import { Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import dayjs from "dayjs";
import { FieldArray, Form, Formik } from "formik";
import { Trash } from "lucide-react";
import React, { Fragment, useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreatePurchaseOrder = () => {
  const initialValues = {
    incomingDate: "",
    vendorID: "",
    vendorName: "",
    items: [
      {
        productID: "",
        productName: "",
        quantity: "",
        incomingDate: null,
        expiryDate: null,
      },
    ],
  };
  const {
    data: itemsData,
    error: itemsError,
    loading: itemsLoading,
    invalidateCache: invalidateItemsCache,
    refresh: refreshItemsData,
    getData: getItemsData,
  } = useGet({ showToast: false });
  const {
    data: allVendorsData,
    error: allVendorsError,
    loading: allVendorsLoading,
    invalidateCache: invalidateAllVendorsCache,
    refresh: refreshAllVendorsData,
    getData: getAllVendorsData,
  } = useGet({ showToast: false });

  const handleAddInventory = async (values) => {
    const { items } = values;
    const itemsData = items.map((item) => {
      return {
        vendorId: item.vendorID,
        productId: item.productID,
        quantity: item.quantity,
        incomingDate: new Date(item.incomingDate).toISOString(),
        expiryDate: new Date(item.expiryDate).toISOString(),
      };
    });
    console.log(itemsData);

    try {
      const res = await axios.post(`${API_URL}/createInventory`, {
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        items: itemsData,
      });
      toast.success(res?.data?.message || "Inventory added successfully");
      //   invalidateInventoryCache("inventory");
      //   refreshInventoryData();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
    // API call to add inventory
  };
  useEffect(() => {
    getAllVendorsData(`${API_URL}/getVendors`, "allVendors");
    getItemsData(`${API_URL}/getItems`, "items");
  }, []);

  return (
    <FlexContainer variant="column-start">
      <ActionArea
        heading={"Purchase Order"}
        subheading={"Create"}
        title={"Create Purchase Order"}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddInventory}
        // validationSchema={Yup.object().shape({
        //   vendorID: Yup.string().required("Vendor is required"),
        //   items: Yup.array().of(
        //     Yup.object().shape({
        //       productID: Yup.string().required("Product is required"),
        //       quantity: Yup.number().required("Quantity is required").min(1),
        //     })
        //   ),
        // })}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form>
            <FlexContainer variant="column-start" gap="lg">
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <FlexContainer variant="column-start" gap="lg">
                    <GridContainer>
                      <Input
                        name={`incomingDate`}
                        labelPlacement="outside"
                        label="Incoming Date"
                        type="date"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        value={values.incomingDate}
                        onChange={(date) => {
                          setFieldValue(`incomingDate`, date.target.value);
                        }}
                        onBlur={handleBlur}
                      />
                      <Select
                        label="Select Vendor"
                        labelPlacement="outside"
                        name={`vendorID`}
                        placeholder="Select Vendor"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-900",
                          trigger: "border shadow-none",
                        }}
                        items={allVendorsData || []}
                        selectedKeys={values.vendorID ? [values.vendorID] : []}
                        onChange={(e) => {
                          setFieldValue(`vendorID`, e.target.value);
                        }}
                      >
                        {(vendor) => (
                          <SelectItem key={vendor?.uniqueId}>
                            {vendor?.vendorName}
                          </SelectItem>
                        )}
                      </Select>
                    </GridContainer>
                    {values?.items?.length > 0 &&
                      values.items.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            <p className="font-medium text-rose-600">
                              Item {index + 1}
                            </p>

                            <GridContainer
                              gap="lg"
                              key={index}
                              className="md:grid-cols-4 lg:grid-cols-6"
                            >
                              <Select
                                label="Select Product"
                                labelPlacement="outside"
                                name={`items[${index}].productID`}
                                placeholder="Select Product"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-900",
                                  trigger: "border shadow-none",
                                }}
                                items={itemsData || []}
                                // selectedKeys={
                                //   values.items[index].productID
                                //     ? [values.items[index].productID]
                                //     : []
                                // }
                                onChange={(e) => {
                                  setFieldValue(
                                    `items[${index}].productID`,
                                    e.target.value
                                  );
                                }}
                                isInvalid={
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].productID
                                }
                                color={
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].productID
                                }
                                error={
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].productID
                                }
                                errorMessage={
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].productID
                                }
                              >
                                {(product) => (
                                  <SelectItem key={product?.uniqueId}>
                                    {product?.productName}
                                  </SelectItem>
                                )}
                              </Select>
                              <Input
                                label="Quantity"
                                labelPlacement="outside"
                                name={`items[${index}].quantity`}
                                type="number"
                                placeholder="Enter Product Quantity"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-900",
                                  inputWrapper: "border shadow-none",
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.items[index].quantity}
                              />
                              <Select
                                label="Select Unit"
                                labelPlacement="outside"
                                // name={`items[${index}].productID`}
                                placeholder="Select Product Unit"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-900",
                                  trigger: "border shadow-none",
                                }}
                                items={[
                                  { uniqueId: "1", name: "Kg" },
                                  { uniqueId: "2", name: "Gm" },
                                  { uniqueId: "3", name: "mg" },
                                  { uniqueId: "4", name: "ltr" },
                                  { uniqueId: "5", name: "ml" },
                                  { uniqueId: "6", name: "boxes" },
                                  { uniqueId: "7", name: "bottles" },
                                  { uniqueId: "8", name: "can" },
                                ]}
                                selectionMode="single"
                              >
                                {(product) => (
                                  <SelectItem key={product?.uniqueId}>
                                    {product?.name}
                                  </SelectItem>
                                )}
                              </Select>
                              <Input
                                label="No's"
                                labelPlacement="outside"
                                placeholder="Enter No's"
                                type="number"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-800",
                                  inputWrapper: "border shadow-none",
                                }}
                                onBlur={handleBlur}
                              />
                              <Input
                                name={`items[${index}].expiryDate`}
                                labelPlacement="outside"
                                label="Expiry Date"
                                type="date"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-800",
                                  inputWrapper: "border shadow-none",
                                }}
                                value={values.items[index].expiryDate}
                                onChange={(date) => {
                                  setFieldValue(
                                    `items[${index}].expiryDate`,
                                    date.target.value
                                  );
                                }}
                                onBlur={handleBlur}
                                isInvalid={
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].expiryDate
                                }
                                color={
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].expiryDate
                                }
                                error={
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].expiryDate
                                }
                                errorMessage={
                                  errors.items &&
                                  errors.items[index] &&
                                  errors.items[index].expiryDate
                                }
                              />
                              <FlexContainer className={"items-center"}>
                                <NextButton
                                  onClick={() => arrayHelpers.remove(index)}
                                  colorScheme="error"
                                  type="button"
                                  isIcon
                                >
                                  <Trash className="w-4 h-4" /> Delete
                                </NextButton>
                              </FlexContainer>
                            </GridContainer>
                          </Fragment>
                        );
                      })}
                    <FlexContainer variant="row-end">
                      <NextButton
                        type="button"
                        colorScheme="badge"
                        onClick={() =>
                          arrayHelpers.push({
                            vendorID: "",
                            vendorName: "",
                            productID: "",
                            productName: "",
                            quantity: "",
                            incomingDate: null,
                            expiryDate: null,
                          })
                        }
                      >
                        Add Item
                      </NextButton>
                    </FlexContainer>
                  </FlexContainer>
                )}
              />

              <FlexContainer variant="row-end" className={"p-5"}>
                <NextButton type="submit" colorScheme="primary">
                  Save
                </NextButton>
              </FlexContainer>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </FlexContainer>
  );
};

export default CreatePurchaseOrder;
