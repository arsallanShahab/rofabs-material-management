import {
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

const HouseKeepingManagement = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [initialValues, setInitialValues] = useState({
    productName: "",
    quantity: "",
    utilizationDate: "",
    roomNo: "",
  });
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"House Keeping"}
        title={"House Keeping Management"}
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

      {activeTab === 1 && (
        <FlexContainer variant="column-start">
          <Table aria-label="Utilization List">
            <TableHeader>
              <TableColumn>Product Name</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>Utilization Date</TableColumn>
              <TableColumn>Room No</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Product 1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2021-09-01</TableCell>
                <TableCell>101</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </FlexContainer>
      )}
      {/* utilization product name quantity utilization date room no */}
      {activeTab === 2 && (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            productName: Yup.string().required("Product Name is required"),
            quantity: Yup.number().required("Quantity is required"),
            utilizationDate: Yup.date().required(
              "Utilization Date is required"
            ),
            roomNo: Yup.number().required("Room No is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
          }}
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

export default HouseKeepingManagement;
