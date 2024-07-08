import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
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
import { API_TAGS } from "../../../lib/consts/API_TAGS";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const CreatePurchaseOrder = () => {
  const initialValues = {
    incomingDate: "",
    vendorID: "",
    items: [
      {
        productID: "",
        quantity: "",
        price: "",
        unit: "",
        noOfProduct: "",
      },
    ],
  };
  const {
    data: marketPlaceItemsData,
    error: marketPlaceItemsError,
    loading: marketPlaceItemsLoading,
    invalidateCache,
    refresh,
    getData: getMarketPlaceItemsData,
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
    console.log(values);
    if (!values?.items?.length) {
      toast.error("Add at least one item");
    }
    if (!values.vendorID) {
      toast.error("Select a vendor");
    }
    if (!values.incomingDate) {
      toast.error("Select incoming date");
    }

    // return;
    const { items } = values;
    const incomingDate = new Date(values.incomingDate).toISOString();
    const itemsData = items.map((item) => {
      return {
        productId: item.productID,
        quantity: item.quantity,
        unit: item.unit,
        noOfProducts: item.noOfProduct,
        vendorId: values.vendorID,
        incomingDate: incomingDate,
        price: item.price,
        // expiryDate: new Date(item.expiryDate).toISOString(),
      };
    });
    console.log(itemsData);

    try {
      const res = await axios.post(`${API_URL}/purchase`, {
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        items: itemsData,
      });
      toast.success(
        res?.data?.message || "Purchase order created successfully"
      );
      invalidateCache(API_TAGS.GET_PURCHASE_ORDERS);
      //   refreshInventoryData();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
    // API call to add inventory
  };
  useEffect(() => {
    getAllVendorsData(`${API_URL}/getVendors`, "allVendors");
    getMarketPlaceItemsData(
      `${API_URL}/getMarketItems`,
      API_TAGS.GET_MARKETPLACE_ITEMS
    );
  }, []);

  return (
    <FlexContainer variant="column-start">
      <ActionArea
        heading={"Purchase Order"}
        subheading={"Create"}
        title={"Create Purchase Order"}
      />
      <Formik initialValues={initialValues} onSubmit={handleAddInventory}>
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
                      <Autocomplete
                        label="Select Vendor"
                        labelPlacement="outside"
                        // variant="bordered"
                        name={`vendorID`}
                        defaultItems={allVendorsData || []}
                        placeholder="Search a vendor"
                        // className="max-w-xs"
                        // selectedKey={value}
                        // onSelectionChange={setValue}

                        // onChange={(e) => {
                        //   setFieldValue(`vendorID`, e.target.value);
                        // }}
                        onSelectionChange={(val) => {
                          setFieldValue(`vendorID`, val);
                        }}
                      >
                        {(item) => (
                          <AutocompleteItem key={item?.uniqueId}>
                            {item?.vendorName}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                      {/* <Select
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
                      </Select> */}
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
                              <Autocomplete
                                label="Select Product"
                                labelPlacement="outside"
                                // variant="bordered"
                                name={`items[${index}].productID`}
                                defaultItems={marketPlaceItemsData || []}
                                placeholder="Search an animal"
                                // className="max-w-xs"
                                // selectedKey={value}
                                // onSelectionChange={setValue}

                                onChange={(e) => {
                                  setFieldValue(
                                    `items[${index}].productID`,
                                    e.target.value
                                  );
                                }}
                                onSelectionChange={(val) => {
                                  setFieldValue(
                                    `items[${index}].productID`,
                                    val
                                  );
                                }}
                              >
                                {(item) => (
                                  <AutocompleteItem key={item?.uniqueId}>
                                    {item.productName}
                                  </AutocompleteItem>
                                )}
                              </Autocomplete>
                              {/* <Select
                                label="Select Product"
                                labelPlacement="outside"
                                name={`items[${index}].productID`}
                                placeholder="Select Product"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-900",
                                  trigger: "border shadow-none",
                                }}
                                items={marketPlaceItemsData || []}
                                onChange={(e) => {
                                  setFieldValue(
                                    `items[${index}].productID`,
                                    e.target.value
                                  );
                                }}
                              >
                                {(product) => (
                                  <SelectItem key={product?.uniqueId}>
                                    {product?.productName}
                                  </SelectItem>
                                )}
                              </Select> */}
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
                                label="Measurements"
                                labelPlacement="outside"
                                name={`items[${index}].unit`}
                                placeholder="Kg / Gm / mg / ltr / ml / boxes / bottles / can"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-900",
                                  trigger: "border shadow-none",
                                }}
                                showScrollIndicators={true}
                                scrollShadowProps={{ hideScrollBar: false }}
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
                                onChange={(e) => {
                                  setFieldValue(
                                    `items[${index}].unit`,
                                    e.target.value
                                  );
                                }}
                              >
                                {(product) => (
                                  <SelectItem key={product?.name}>
                                    {product?.name}
                                  </SelectItem>
                                )}
                              </Select>
                              <Input
                                name={`items[${index}].noOfProduct`}
                                label="Units"
                                labelPlacement="outside"
                                placeholder="Enter No of units"
                                type="number"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-800",
                                  inputWrapper: "border shadow-none",
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.items[index].noOfProduct}
                              />
                              <Input
                                label="Price per unit"
                                labelPlacement="outside"
                                name={`items[${index}].price`}
                                type="number"
                                placeholder="Enter Price per 1 unit"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-900",
                                  inputWrapper: "border shadow-none",
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.items[index].price}
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
                            productID: "",
                            quantity: "",
                            price: "",
                            unit: "",
                            noOfProduct: "",
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
