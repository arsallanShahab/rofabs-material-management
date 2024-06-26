import { Input, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import {
  AddHouseKeepingInwardValidation,
  AddHouseKeepingUtilizationValidation,
} from "../../../lib/validation/material-management/house-keeping";

const AddHouseKeepingManagement = () => {
  const [inward, setInward] = useState({
    productName: "",
    quantity: "",
    price: "",
    purchaseDate: "",
    vendorName: "",
    expiryDate: "",
  });

  const [utilization, setUtilization] = useState({
    productName: "",
    quantity: "",
    utilizationDate: "",
    roomNo: "",
  });
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmitInward = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const handleSubmitUtilization = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"House Keeping"}
        subheading={"Add"}
        title={"House Keeping Management"}
        showButton={false}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Inward"
          isActiveTab={activeTab === 1}
          isError={tabsError[1]}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Utilization"
          isActiveTab={activeTab === 2}
          isError={tabsError[2]}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {/* inward product name quantity price purchase date vendor expiryDate
      utilization product name quantity utilization date room no */}
      {activeTab === 1 && (
        <Formik
          initialValues={inward}
          validationSchema={AddHouseKeepingInwardValidation}
          onSubmit={handleSubmitInward}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            // handleSubmit,
            isSubmitting,
          }) => (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer gap="xl">
                  <Input
                    type="text"
                    name="productName"
                    label="Product Name"
                    labelPlacement="outside"
                    placeholder="Product Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.productName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.productName && touched.productName}
                    color={
                      errors.productName && touched.productName ? "danger" : ""
                    }
                    errorMessage={errors.productName}
                  />
                  <Input
                    type="number"
                    name="quantity"
                    label="Quantity"
                    labelPlacement="outside"
                    placeholder="Quantity"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.quantity && touched.quantity}
                    color={errors.quantity && touched.quantity ? "danger" : ""}
                    errorMessage={errors.quantity}
                  />
                  <Input
                    type="number"
                    name="price"
                    label="Price"
                    labelPlacement="outside"
                    placeholder="Price"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.price && touched.price}
                    color={errors.price && touched.price ? "danger" : ""}
                    errorMessage={errors.price}
                  />
                  <Input
                    type="date"
                    name="purchaseDate"
                    label="Purchase Date"
                    labelPlacement="outside"
                    placeholder="Purchase Date"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.purchaseDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.purchaseDate && touched.purchaseDate}
                    color={
                      errors.purchaseDate && touched.purchaseDate
                        ? "danger"
                        : ""
                    }
                    errorMessage={errors.purchaseDate}
                  />
                  <Input
                    type="text"
                    name="vendorName"
                    label="Vendor Name"
                    labelPlacement="outside"
                    placeholder="Vendor Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.vendorName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.vendorName && touched.vendorName}
                    color={
                      errors.vendorName && touched.vendorName ? "danger" : ""
                    }
                    errorMessage={errors.vendorName}
                  />
                  <Input
                    type="date"
                    name="expiryDate"
                    label="Expiry Date"
                    labelPlacement="outside"
                    placeholder="Expiry Date"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.expiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.expiryDate && touched.expiryDate}
                    color={
                      errors.expiryDate && touched.expiryDate ? "danger" : ""
                    }
                    errorMessage={errors.expiryDate}
                  />
                </GridContainer>

                <FlexContainer variant="row-end" className={"p-5"}>
                  <NextButton
                    isSubmitting={isSubmitting}
                    type="submit"
                    colorScheme="primary"
                  >
                    Create
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      )}
      {/* utilization product name quantity utilization date room no */}
      {activeTab === 2 && (
        <Formik
          initialValues={utilization}
          validationSchema={AddHouseKeepingUtilizationValidation}
          onSubmit={handleSubmitUtilization}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer gap="xl">
                  <Select
                    name="productName"
                    label="Product Name"
                    labelPlacement="outside"
                    placeholder="Select a product"
                    radius="sm"
                    items={[
                      { value: "Product 1", label: "Product 1" },
                      { value: "Product 2", label: "Product 2" },
                      { value: "Product 3", label: "Product 3" },
                    ]}
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("productName", e.target.value);
                    }}
                    value={values.productName}
                    isInvalid={errors.productName && touched.productName}
                    color={
                      errors.productName && touched.productName && "danger"
                    }
                    errorMessage={
                      errors.productName &&
                      touched.productName &&
                      errors.productName
                    }
                  >
                    {(vendor) => (
                      <SelectItem key={vendor.value} value={vendor.value}>
                        {vendor.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    type="number"
                    name="quantity"
                    label="Quantity"
                    labelPlacement="outside"
                    placeholder="Quantity"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.quantity && touched.quantity}
                    color={errors.quantity && touched.quantity ? "danger" : ""}
                    errorMessage={errors.quantity}
                  />
                  <Input
                    type="date"
                    name="utilizationDate"
                    label="Utilization Date"
                    labelPlacement="outside"
                    placeholder="Utilization Date"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.utilizationDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      errors.utilizationDate && touched.utilizationDate
                    }
                    color={
                      errors.utilizationDate && touched.utilizationDate
                        ? "danger"
                        : ""
                    }
                    errorMessage={errors.utilizationDate}
                  />
                  <Input
                    type="number"
                    name="roomNo"
                    label="Room No"
                    labelPlacement="outside"
                    placeholder="Room No"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.roomNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.roomNo && touched.roomNo}
                    color={errors.roomNo && touched.roomNo ? "danger" : ""}
                    errorMessage={errors.roomNo}
                  />
                </GridContainer>

                <FlexContainer variant="row-end" className={"p-5"}>
                  <NextButton
                    isSubmitting={isSubmitting}
                    type="submit"
                    colorScheme="primary"
                  >
                    Create
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      )}
    </FlexContainer>
  );
};

export default AddHouseKeepingManagement;
