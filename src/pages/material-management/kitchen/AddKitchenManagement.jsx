import { Input, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import {
  AddKitchenManagementInwardValidation,
  AddKitchenManagementOutwardValidation,
} from "../../../lib/validation/material-management/kitchen";

const UTILIZATION_TYPE = [
  "kitchen-utilization",
  "banquet",
  "room-sale",
  "outwards-supply",
];

const AddKitchenManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [utilizationType, setUtilizationType] = useState("");
  const [initialValuesInward, setInitialValuesInward] = useState({
    productName: "",
    quantity: "",
    price: "",
    purchaseDate: "",
    vendorName: "",
    expiryDate: "",
  });

  const [initialValuesOutward, setInitialValuesOutward] = useState({
    productName: "",
    quantity: "",
    utilizationDate: "",
    authorizedBy: "",
    utilizationType: "",
  });

  const handleSubmitInward = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const handleSubmitOutward = async (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Kitchen"}
        subheading={"Add"}
        title={"Kitchen Management"}
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
      </FlexContainer>
      {activeTab === 1 && (
        <Formik
          initialValues={initialValuesInward}
          validationSchema={AddKitchenManagementInwardValidation}
        >
          {({
            isSubmitting,
            values,
            touched,
            errors,
            setFieldValue,
            handleSubmit,
          }) => {
            return (
              <Form onSubmit={handleSubmitInward}>
                <FlexContainer variant="column-start">
                  <GridContainer gap="lg">
                    <Input
                      type="text"
                      name="productName"
                      label="Product Name"
                      labelPlacement="outside"
                      placeholder="Enter product name"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-800",
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
                    />
                    <Input
                      type="number"
                      name="quantity"
                      label="Quantity"
                      labelPlacement="outside"
                      placeholder="Enter quantity"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("quantity", e.target.value);
                      }}
                      value={values.quantity}
                      isInvalid={errors.quantity && touched.quantity}
                      color={errors.quantity && touched.quantity && "danger"}
                      errorMessage={
                        errors.quantity && touched.quantity && errors.quantity
                      }
                    />
                    <Input
                      type="number"
                      name="price"
                      label="Price"
                      labelPlacement="outside"
                      placeholder="Enter price"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("price", e.target.value);
                      }}
                      value={values.price}
                      isInvalid={errors.price && touched.price}
                      color={errors.price && touched.price && "danger"}
                      errorMessage={
                        errors.price && touched.price && errors.price
                      }
                    />
                    <Input
                      type="date"
                      name="purchaseDate"
                      label="Purchase Date"
                      labelPlacement="outside"
                      placeholder="Enter purchase date"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("purchaseDate", e.target.value);
                      }}
                      value={values.purchaseDate}
                      isInvalid={errors.purchaseDate && touched.purchaseDate}
                      color={
                        errors.purchaseDate && touched.purchaseDate && "danger"
                      }
                      errorMessage={
                        errors.purchaseDate &&
                        touched.purchaseDate &&
                        errors.purchaseDate
                      }
                    />
                    <Select
                      name="vendorName"
                      label="Vendor Name"
                      labelPlacement="outside"
                      placeholder="Select vendor name"
                      radius="sm"
                      items={[
                        { value: "vendor1", label: "Vendor 1" },
                        { value: "vendor2", label: "Vendor 2" },
                        { value: "vendor3", label: "Vendor 3" },
                      ]}
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("vendorName", e.target.value);
                      }}
                      value={values.vendorName}
                      isInvalid={errors.vendorName && touched.vendorName}
                      color={
                        errors.vendorName && touched.vendorName && "danger"
                      }
                      errorMessage={
                        errors.vendorName &&
                        touched.vendorName &&
                        errors.vendorName
                      }
                    >
                      {(vendor) => (
                        <SelectItem key={vendor.value} value={vendor.value}>
                          {vendor.label}
                        </SelectItem>
                      )}
                    </Select>

                    <Input
                      type="date"
                      name="expiryDate"
                      label="Expiry Date"
                      labelPlacement="outside"
                      placeholder="Enter expiry date"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("expiryDate", e.target.value);
                      }}
                      value={values.expiryDate}
                      isInvalid={errors.expiryDate && touched.expiryDate}
                      color={
                        errors.expiryDate && touched.expiryDate && "danger"
                      }
                      errorMessage={
                        errors.expiryDate &&
                        touched.expiryDate &&
                        errors.expiryDate
                      }
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
            );
          }}
        </Formik>
      )}

      {activeTab === 2 && (
        <Formik
          initialValues={initialValuesOutward}
          validationSchema={AddKitchenManagementOutwardValidation}
          onSubmit={handleSubmitOutward}
        >
          {({
            isSubmitting,
            values,
            touched,
            errors,
            setFieldValue,
            handleSubmit,
          }) => {
            return (
              <Form>
                <FlexContainer variant="column-start">
                  <GridContainer gap="lg">
                    <Select
                      name="productName"
                      label="Product Name"
                      labelPlacement="outside"
                      placeholder="Select a product"
                      radius="sm"
                      items={[
                        { value: "paneer", label: "Paneer" },
                        { value: "ghee", label: "Ghee" },
                        { value: "milk", label: "Milk" },
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
                      placeholder="Enter quantity"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("quantity", e.target.value);
                      }}
                      value={values.quantity}
                      isInvalid={errors.quantity && touched.quantity}
                      color={errors.quantity && touched.quantity && "danger"}
                      errorMessage={
                        errors.quantity && touched.quantity && errors.quantity
                      }
                    />
                    <Input
                      type="date"
                      name="utilizationDate"
                      label="Utilization Date"
                      labelPlacement="outside"
                      placeholder="Enter utilization date"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("utilizationDate", e.target.value);
                      }}
                      value={values.utilizationDate}
                      isInvalid={
                        errors.utilizationDate && touched.utilizationDate
                      }
                      color={
                        errors.utilizationDate &&
                        touched.utilizationDate &&
                        "danger"
                      }
                      errorMessage={
                        errors.utilizationDate &&
                        touched.utilizationDate &&
                        errors.utilizationDate
                      }
                    />
                    <Input
                      type="text"
                      name="authorizedBy"
                      label="Authorized By"
                      labelPlacement="outside"
                      placeholder="Enter authorized by"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("authorizedBy", e.target.value);
                      }}
                      value={values.authorizedBy}
                      isInvalid={errors.authorizedBy && touched.authorizedBy}
                      color={
                        errors.authorizedBy && touched.authorizedBy && "danger"
                      }
                      errorMessage={
                        errors.authorizedBy &&
                        touched.authorizedBy &&
                        errors.authorizedBy
                      }
                    />
                    <Select
                      name="utilizationType"
                      label="Utilization Type"
                      labelPlacement="outside"
                      placeholder="Select utilization type"
                      radius="sm"
                      items={[
                        {
                          key: "kitchen-utilization",
                          label: "kitchen utilization",
                        },
                        { key: "room-sale", label: "room sale" },
                        { key: "banquet", label: "banquet" },
                        { key: "outwards-supply", label: "outwards supply" },
                      ]}
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("utilizationType", e.target.value);
                        setUtilizationType(e.target.value);
                      }}
                      value={values.utilizationType}
                      isInvalid={
                        errors.utilizationType && touched.utilizationType
                      }
                      color={
                        errors.utilizationType &&
                        touched.utilizationType &&
                        "danger"
                      }
                      errorMessage={
                        errors.utilizationType &&
                        touched.utilizationType &&
                        errors.utilizationType
                      }
                    >
                      {(vendor) => (
                        <SelectItem key={vendor.key} value={vendor.key}>
                          {vendor.label}
                        </SelectItem>
                      )}
                    </Select>
                    {UTILIZATION_TYPE[1] === values.utilizationType && (
                      <>
                        <Input
                          type="text"
                          name="eventId"
                          label="Event ID"
                          labelPlacement="outside"
                          placeholder="Enter event id"
                          radius="sm"
                          classNames={{
                            label: "font-medium text-zinc-100",
                            inputWrapper: "border shadow-none",
                          }}
                          onChange={(e) => {
                            setFieldValue("eventId", e.target.value);
                          }}
                          value={values.eventId}
                          isInvalid={errors.eventId && touched.eventId}
                          color={errors.eventId && touched.eventId && "danger"}
                          errorMessage={
                            errors.eventId && touched.eventId && errors.eventId
                          }
                        />
                        <Input
                          type="date"
                          name="eventDate"
                          label="Event Date"
                          labelPlacement="outside"
                          placeholder="Enter event date"
                          radius="sm"
                          classNames={{
                            label: "font-medium text-zinc-100",
                            inputWrapper: "border shadow-none",
                          }}
                          onChange={(e) => {
                            setFieldValue("eventDate", e.target.value);
                          }}
                          value={values.eventDate}
                          isInvalid={errors.eventDate && touched.eventDate}
                          color={
                            errors.eventDate && touched.eventDate && "danger"
                          }
                          errorMessage={
                            errors.eventDate &&
                            touched.eventDate &&
                            errors.eventDate
                          }
                        />
                      </>
                    )}
                    {UTILIZATION_TYPE[2] === values.utilizationType && (
                      <Input
                        type="text"
                        name="roomNumber"
                        label="Room Number"
                        labelPlacement="outside"
                        placeholder="Enter room number"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-100",
                          inputWrapper: "border shadow-none",
                        }}
                        onChange={(e) => {
                          setFieldValue("roomNumber", e.target.value);
                        }}
                        value={values.roomNumber}
                        isInvalid={errors.roomNumber && touched.roomNumber}
                        color={
                          errors.roomNumber && touched.roomNumber && "danger"
                        }
                        errorMessage={
                          errors.roomNumber &&
                          touched.roomNumber &&
                          errors.roomNumber
                        }
                      />
                    )}
                    {UTILIZATION_TYPE[3] === values.utilizationType && (
                      <Select
                        name="saleType"
                        label="Sale Type"
                        labelPlacement="outside"
                        placeholder="Select sale type"
                        radius="sm"
                        items={[
                          {
                            key: "zomato",
                            label: "Zomato",
                          },
                          { key: "swiggy", label: "Swiggy" },
                          { key: "counter-sale", label: "Counter Sale" },
                        ]}
                        classNames={{
                          label: "font-medium text-zinc-100",
                          inputWrapper: "border shadow-none",
                        }}
                        onChange={(e) => {
                          setFieldValue("saleType", e.target.value);
                          setUtilizationType(e.target.value);
                        }}
                        value={values.saleType}
                        isInvalid={errors.saleType && touched.saleType}
                        color={errors.saleType && touched.saleType && "danger"}
                        errorMessage={
                          errors.saleType && touched.saleType && errors.saleType
                        }
                      >
                        {(vendor) => (
                          <SelectItem key={vendor.key} value={vendor.key}>
                            {vendor.label}
                          </SelectItem>
                        )}
                      </Select>
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
            );
          }}
        </Formik>
      )}
    </FlexContainer>
  );
};

export default AddKitchenManagement;
