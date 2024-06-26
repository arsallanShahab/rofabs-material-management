import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import {
  AddLaundryCostManagementValidation,
  AddLaundryInwardValidation,
  AddLaundryOutwardValidation,
} from "../../../lib/validation/material-management/laundry";

//   Inward
// item name [ item name will be dropwon ]
// quantity
// in date
// vendor [ it will a dropdown which will contain all the vendors of laundry category ]
//   outward
// item name [ item name will be dropwon ]
// quantity
// out date
// vendor [ it will a dropdown which will contain all the vendors of laundry category ]
// damages ? true : false
// 	- description in popup
//    cost management
// item name
// per piece cost
// delivery timeline

const AddLaundryManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
    3: false,
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [inward, setInward] = useState({
    itemName: "",
    quantity: "",
    inDate: "",
    vendorName: "",
  });

  const [outward, setOutward] = useState({
    itemName: "",
    quantity: "",
    outDate: "",
    vendorName: "",
    damages: false,
    description: "",
  });

  const [costManagement, setCostManagement] = useState({
    itemName: "",
    perPieceCost: "",
    deliveryTimeline: "",
  });

  const handleSubmitInward = async (
    values,
    {
      setSubmitting,
      resetForm,
      setFieldError,
      setErrors,
      setFieldValue,
      setStatus,
    }
  ) => {
    setSubmitting(true);
    console.log("values", values);
    setSubmitting(false);
  };

  const handleSubmitOutward = async (
    values,
    {
      setSubmitting,
      resetForm,
      setFieldError,
      setErrors,
      setFieldValue,
      setStatus,
    }
  ) => {
    setSubmitting(true);
    console.log("values", values);
    setSubmitting(false);
  };

  const handleSubmitCostManagement = async (
    values,
    {
      setSubmitting,
      resetForm,
      setFieldError,
      setErrors,
      setFieldValue,
      setStatus,
    }
  ) => {
    setSubmitting(true);
    console.log("values", values);
    setSubmitting(false);
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Laundry"}
        subheading={"Add"}
        title={"Laundry Management"}
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
          title="Outward"
          isActiveTab={activeTab === 2}
          isError={tabsError[2]}
          onClick={() => handleTabClick(2)}
        />
        <Tab
          title="Cost Management"
          isActiveTab={activeTab === 3}
          isError={tabsError[3]}
          onClick={() => handleTabClick(3)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <Formik
          initialValues={inward}
          validationSchema={AddLaundryInwardValidation}
          onSubmit={handleSubmitInward}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            // handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer gap="lg">
                  <Input
                    name="itemName"
                    labelPlacement="outside"
                    label="Item Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter item name"
                    value={values.itemName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.itemName && touched.itemName}
                    color={errors.itemName && touched.itemName ? "danger" : ""}
                    error={errors.itemName && touched.itemName}
                    errorMessage={errors.itemName}
                  />
                  <Input
                    name="quantity"
                    labelPlacement="outside"
                    label="Quantity"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.quantity && touched.quantity}
                    color={errors.quantity && touched.quantity ? "danger" : ""}
                    error={errors.quantity && touched.quantity}
                    errorMessage={errors.quantity}
                  />
                  <Input
                    name="inDate"
                    labelPlacement="outside"
                    label="In Date"
                    type="date"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.inDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.inDate && touched.inDate}
                    color={errors.inDate && touched.inDate ? "danger" : ""}
                    error={errors.inDate && touched.inDate}
                    errorMessage={errors.inDate}
                  />
                  <Input
                    name="vendorName"
                    labelPlacement="outside"
                    label="Vendor Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter vendor name"
                    value={values.vendorName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.vendorName && touched.vendorName}
                    color={
                      errors.vendorName && touched.vendorName ? "danger" : ""
                    }
                    error={errors.vendorName && touched.vendorName}
                    errorMessage={errors.vendorName}
                  />
                </GridContainer>
                <FlexContainer variant="row-end" className={"p-5"}>
                  <NextButton
                    isSubmitting={isSubmitting}
                    // onClick={handleSubmit}
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
      {activeTab === 2 && (
        <Formik
          initialValues={outward}
          validationSchema={AddLaundryOutwardValidation}
          onSubmit={handleSubmitOutward}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            // handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer gap="lg">
                  <Select
                    name="itemName"
                    label="Product Name"
                    labelPlacement="outside"
                    placeholder="Select a product"
                    radius="sm"
                    items={[
                      { value: "product1", label: "Product 1" },
                      { value: "product2", label: "Product 2" },
                      { value: "product3", label: "Product 3" },
                    ]}
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("itemname", e.target.value);
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
                    min="1"
                    name="quantity"
                    labelPlacement="outside"
                    label="Quantity"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter quantity"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.quantity && touched.quantity}
                    color={errors.quantity && touched.quantity ? "danger" : ""}
                    error={errors.quantity && touched.quantity}
                    errorMessage={errors.quantity}
                  />
                  <Input
                    name="outDate"
                    labelPlacement="outside"
                    label="Out Date"
                    type="date"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.outDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.outDate && touched.outDate}
                    color={errors.outDate && touched.outDate ? "danger" : ""}
                    error={errors.outDate && touched.outDate}
                    errorMessage={errors.outDate}
                  />
                  <Input
                    name="vendorName"
                    labelPlacement="outside"
                    label="Vendor Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter vendor name"
                    value={values.vendorName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.vendorName && touched.vendorName}
                    color={
                      errors.vendorName && touched.vendorName ? "danger" : ""
                    }
                    error={errors.vendorName && touched.vendorName}
                    errorMessage={errors.vendorName}
                  />
                  {/* <Input
                    name="damages"
                    labelPlacement="outside"
                    label="Damages"
                    type="checkbox"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.damages}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.damages && touched.damages}
                    color={errors.damages && touched.damages ? "danger" : ""}
                    error={errors.damages && touched.damages}
                    errorMessage={errors.damages}
                  /> */}
                  <Checkbox
                    name="damages"
                    label="Damages"
                    value={values.damages}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.damages && touched.damages}
                    color={errors.damages && touched.damages ? "danger" : ""}
                    error={errors.damages && touched.damages}
                    errorMessage={errors.damages}
                  >
                    Damages
                  </Checkbox>

                  {values.damages && (
                    <Input
                      name="description"
                      labelPlacement="outside"
                      label="Description"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-800",
                        inputWrapper: "border shadow-none",
                      }}
                      placeholder="Enter description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={errors.description && touched.description}
                      color={
                        errors.description && touched.description
                          ? "danger"
                          : ""
                      }
                      error={errors.description && touched.description}
                      errorMessage={errors.description}
                    />
                  )}
                </GridContainer>
                <FlexContainer variant="row-end" className={"p-5"}>
                  <NextButton
                    isSubmitting={isSubmitting}
                    // onClick={handleSubmit}
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
      {activeTab === 3 && (
        <Formik
          initialValues={costManagement}
          validationSchema={AddLaundryCostManagementValidation}
          onSubmit={handleSubmitCostManagement}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            // handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer gap="lg">
                  <Select
                    name="itemName"
                    label="Product Name"
                    labelPlacement="outside"
                    placeholder="Select a product"
                    radius="sm"
                    items={[
                      { value: "product1", label: "Product 1" },
                      { value: "product2", label: "Product 2" },
                      { value: "product3", label: "Product 3" },
                    ]}
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("itemname", e.target.value);
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
                    min="1"
                    name="perPieceCost"
                    labelPlacement="outside"
                    label="Per Piece Cost"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter per piece cost"
                    value={values.perPieceCost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.perPieceCost && touched.perPieceCost}
                    color={
                      errors.perPieceCost && touched.perPieceCost
                        ? "danger"
                        : ""
                    }
                    error={errors.perPieceCost && touched.perPieceCost}
                    errorMessage={errors.perPieceCost}
                  />
                  <Input
                    name="deliveryTimeline"
                    labelPlacement="outside"
                    label="Delivery Timeline"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    placeholder="Enter delivery timeline"
                    value={values.deliveryTimeline}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      errors.deliveryTimeline && touched.deliveryTimeline
                    }
                    color={
                      errors.deliveryTimeline && touched.deliveryTimeline
                        ? "danger"
                        : ""
                    }
                    error={errors.deliveryTimeline && touched.deliveryTimeline}
                    errorMessage={errors.deliveryTimeline}
                  />
                </GridContainer>
                <FlexContainer variant="row-end" className={"p-5"}>
                  <NextButton
                    isSubmitting={isSubmitting}
                    // onClick={handleSubmit}
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
export default AddLaundryManagement;
