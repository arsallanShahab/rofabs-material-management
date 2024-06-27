import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";

const ElectronicManagement = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Electronics"}
        title={"Electronics Management"}
        showButton={false}
        buttonHref={"add"}
        buttonText={"Create"}
      />
      <FlexContainer variant="row-between">
        <FlexContainer variant="row-start" className="overflow-x-auto">
          <Tab
            title="Utilization List"
            isActiveTab={activeTab === 1}
            onClick={() => handleTabClick(1)}
          />
          <Tab
            title="Create Utilization"
            isActiveTab={activeTab === 2}
            onClick={() => handleTabClick(2)}
          />
        </FlexContainer>
        <NextButton colorScheme="flat" className="text-blue-500 underline">
          View Consumption Report
        </NextButton>
      </FlexContainer>
      {/* purchase order product name quantity price vendor purchase date */}
      {activeTab === 1 && (
        <Table
          aria-label="Purchase Order"
          striped
          hover
          responsive
          className="mt-4"
        >
          <TableHeader>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Vendor</TableColumn>
            <TableColumn>Purchase Date</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Samsung S23 Ultra</TableCell>
              <TableCell>10</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>Samsung</TableCell>
              <TableCell>2021-08-01</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {/* room number product name quantity date of installation miscellaneous
      damages ? popup - desc, date, amount recovered */}
      {activeTab === 2 && (
        <Formik
          initialValues={{
            roomNo: "",
            productName: "",
            quantity: "",
            dateOfInstallation: "",
            miscellaneous: "",
            isDamaged: false,
            damageDescription: "",
            damageAmount: "",
          }}
          validationSchema={Yup.object().shape({
            roomNo: Yup.string().required("Room number is required"),
            productName: Yup.string().required("Product name is required"),
            quantity: Yup.string().required("Quantity is required"),
            dateOfInstallation: Yup.string().required(
              "Date of installation is required"
            ),
            miscellaneous: Yup.string().required("Miscellaneous is required"),
          })}
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
                    name="isDamaged"
                    label="Damages"
                    labelPlacement="right"
                    checked={values.isDamaged}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    Damages
                  </Checkbox>
                  {values.isDamaged && (
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
                    Create Utilization
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

export default ElectronicManagement;
