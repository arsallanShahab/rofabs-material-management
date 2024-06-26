import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import {
  AddElectronicsPurchaseOrderValidation,
  AddElectronicsUtilizationValidation,
} from "../../../lib/validation/material-management/electronics";

const AddElectronicsManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Electronics"}
        subheading={"Add"}
        title={"Manage Electronics"}
        showButton={false}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Purchase Order"
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
      {/* purchase order product name quantity price vendor purchase date */}
      {activeTab === 1 && (
        <Formik
          initialValues={{
            productName: "",
            quantity: "",
            price: "",
            vendorName: "",
            purchaseDate: "",
          }}
          validationSchema={AddElectronicsPurchaseOrderValidation}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
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

      {/* room number product name quantity date of installation miscellaneous damages ? popup - desc, date, amount recovered */}

      {activeTab === 2 && (
        <Formik
          initialValues={{
            roomNo: "",
            productName: "",
            quantity: "",
            dateOfInstallation: "",
            miscellaneous: "",
            damages: false,
            damageDescription: "",
            damageAmount: "",
          }}
          validationSchema={AddElectronicsUtilizationValidation}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer gap="xl">
                  <Input
                    type="number"
                    name="roomNo"
                    label="Room Number"
                    labelPlacement="outside"
                    placeholder="Room Number"
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
                  <Select
                    name="productName"
                    label="Product Name"
                    labelPlacement="outside"
                    placeholder="Select a product"
                    radius="sm"
                    items={[
                      { label: "Product 1", value: "product1" },
                      { label: "Product 2", value: "product2" },
                      { label: "Product 3", value: "product3" },
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
                    name="dateOfInstallation"
                    label="Date of Installation"
                    labelPlacement="outside"
                    placeholder="Date of Installation"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.dateOfInstallation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      errors.dateOfInstallation && touched.dateOfInstallation
                    }
                    color={
                      errors.dateOfInstallation && touched.dateOfInstallation
                        ? "danger"
                        : ""
                    }
                    errorMessage={errors.dateOfInstallation}
                  />
                  <Input
                    type="text"
                    name="miscellaneous"
                    label="Miscellaneous"
                    labelPlacement="outside"
                    placeholder="Miscellaneous"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.miscellaneous}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={errors.miscellaneous && touched.miscellaneous}
                    color={
                      errors.miscellaneous && touched.miscellaneous
                        ? "danger"
                        : ""
                    }
                    errorMessage={errors.miscellaneous}
                  />
                  <Checkbox
                    name="damages"
                    label="Damages"
                    labelPlacement="right"
                    checked={values.damages}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    Damages
                  </Checkbox>
                  {values.damages && (
                    <>
                      <Input
                        type="text"
                        name="damageDescription"
                        label="Damage Description"
                        labelPlacement="outside"
                        placeholder="Damage Description"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        value={values.damageDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.damageDescription && touched.damageDescription
                        }
                        color={
                          errors.damageDescription && touched.damageDescription
                            ? "danger"
                            : ""
                        }
                        errorMessage={errors.damageDescription}
                      />
                      <Input
                        type="number"
                        name="damageAmount"
                        label="Damage Amount"
                        labelPlacement="outside"
                        placeholder="Damage Amount"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        value={values.damageAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.damageAmount && touched.damageAmount}
                        color={
                          errors.damageAmount && touched.damageAmount
                            ? "danger"
                            : ""
                        }
                        errorMessage={errors.damageAmount}
                      />
                    </>
                  )}
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

export default AddElectronicsManagement;
