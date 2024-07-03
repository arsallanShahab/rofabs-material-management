import { Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
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

const AddItems = () => {
  const initialValuesPrice = {
    items: [
      {
        vendorID: "",
        vendorName: "",
        productID: "",
        productName: "",
        price: "",
      },
    ],
  };

  const {
    data: allVendorsData,
    error: allVendorsError,
    loading: allVendorsLoading,
    invalidateCache: invalidateAllVendorsCache,
    refresh: refreshAllVendorsData,
    getData: getAllVendorsData,
  } = useGet({ showToast: false });

  const {
    data: itemsData,
    error: itemsError,
    loading: itemsLoading,
    invalidateCache: invalidateItemsCache,
    refresh: refreshItemsData,
    getData: getItemsData,
  } = useGet({ showToast: false });

  const handleUpdatePrice = async (values, { resetForm }) => {
    const price = values.items.map((item) => {
      return {
        vendorUniqueId: item.vendorID,
        itemUniqueId: item.productID,
        price: parseInt(item.price),
      };
    });
    console.log(price);
    try {
      const res = await axios.post(`${API_URL}/createPriceList`, {
        items: price,
      });
      const { data } = res;
      console.log(data, "updated price");
      toast.success("Price updated successfully");
      // invalidateItemsCache("priceList");
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
    // resetForm();
  };

  useEffect(() => {
    getAllVendorsData(`${API_URL}/getVendors`, "allVendors");
    getItemsData(`${API_URL}/getItems`, "items");
  }, []);
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Vendors"}
        subheading={"Items"}
        title={"Add Items to Vendors"}
      />
      <FlexContainer variant="column-start" gap="xl">
        <Formik
          initialValues={initialValuesPrice}
          validationSchema={Yup.object().shape({
            items: Yup.array().of(
              Yup.object().shape({
                vendorID: Yup.string().required("Vendor ID is required"),
                productID: Yup.string().required("Product ID is required"),
                price: Yup.string().required("Price is required"),
              })
            ),
          })}
          onSubmit={handleUpdatePrice}
        >
          {({
            isSubmitting,
            values,
            touched,
            errors,
            setFieldValue,
            handleBlur,
            resetForm,
          }) => {
            return (
              <Form>
                <FlexContainer variant="column-start">
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <Fragment>
                        {values?.items?.length > 0 &&
                          values.items.map((item, index) => (
                            <Fragment key={index}>
                              {/* <h3 className="text-xl font-semibold text-indigo-600">
                                Item {index + 1}
                              </h3> */}
                              <GridContainer
                                gap="lg"
                                key={index}
                                className="lg:grid-cols-5"
                              >
                                <Select
                                  label="Select Vendor"
                                  labelPlacement="outside"
                                  name={`items.${index}.vendorID`}
                                  placeholder="Select Vendor"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    trigger: "border shadow-none",
                                  }}
                                  items={allVendorsData || []}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `items.${index}.vendorID`,
                                      e.target.value
                                    );
                                  }}
                                  isInvalid={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].vendorID
                                  }
                                  color={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].vendorID &&
                                    "danger"
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].vendorID
                                  }
                                >
                                  {(vendor) => (
                                    <SelectItem key={vendor?.uniqueId}>
                                      {vendor.vendorName}
                                    </SelectItem>
                                  )}
                                </Select>
                                <Select
                                  label="Select Product"
                                  labelPlacement="outside"
                                  name={`items.${index}.productID`}
                                  placeholder="Select Product"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    trigger: "border shadow-none",
                                  }}
                                  items={itemsData || []}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `items.${index}.productID`,
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
                                    errors.items[index].productID &&
                                    "danger"
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].productID
                                  }
                                >
                                  {(product) => (
                                    <SelectItem key={product?.uniqueId}>
                                      {product?.productName} - (
                                      {product?.weight || 0}{" "}
                                      {product?.measurementUnit})
                                    </SelectItem>
                                  )}
                                </Select>
                                <Input
                                  type="number"
                                  name={`items.${index}.price`}
                                  label="Price"
                                  labelPlacement="outside"
                                  placeholder="Enter Price"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `items.${index}.price`,
                                      e.target.value
                                    );
                                  }}
                                  isInvalid={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].price
                                  }
                                  color={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].price &&
                                    "danger"
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].price
                                  }
                                />
                                <FlexContainer
                                  variant="row-start"
                                  className={"items-center"}
                                  gap="lg"
                                >
                                  <NextButton
                                    colorScheme="error"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      arrayHelpers.remove(index);
                                    }}
                                    isIcon
                                  >
                                    <Trash className="w-4 h-4" />
                                  </NextButton>
                                </FlexContainer>
                              </GridContainer>
                            </Fragment>
                          ))}
                        <FlexContainer
                          variant="row-end"
                          className="items-center p-5"
                        >
                          <NextButton
                            colorScheme="badge"
                            onClick={(e) => {
                              e.preventDefault();
                              arrayHelpers.push({
                                vendorID: "",
                                vendorName: "",
                                productID: "",
                                productName: "",
                                price: "",
                              });
                            }}
                          >
                            Add Price
                          </NextButton>
                        </FlexContainer>
                      </Fragment>
                    )}
                  />
                  <FlexContainer variant="row-end" className="items-center p-5">
                    <NextButton type="submit" colorScheme="primary">
                      Save Price Setting
                    </NextButton>
                  </FlexContainer>
                </FlexContainer>
              </Form>
            );
          }}
        </Formik>
      </FlexContainer>
    </FlexContainer>
  );
};

export default AddItems;
