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

const RestrauntConfig = () => {
  const [tables, setTables] = useState([]);
  const handleSubmit = (values, { resetForm }) => {
    // add table to tables
    setTables([...tables, values]);
    console.log(values);
    resetForm();
  };
  console.log(tables);
  return (
    <FlexContainer variant="column-start" gap="xl" className={"h-full"}>
      <ActionArea
        heading={"Config"}
        subheading={"Restraunt"}
        title={"Configre Restraunt Settings"}
      />
      <Formik
        initialValues={{
          tableNumber: "",
          seater: "",
        }}
        validationSchema={Yup.object().shape({
          tableNumber: Yup.string().required("Table Number is required"),
          seater: Yup.string().required("Seater is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => {
          return (
            <Form>
              <FlexContainer variant="column-start" gap="md">
                <GridContainer>
                  <Input
                    type="number"
                    name="tableNumber"
                    label="Table Number"
                    placeholder="Enter Table Number"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-800",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.tableNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.tableNumber && errors.tableNumber}
                    color={
                      touched.tableNumber && errors.tableNumber ? "danger" : ""
                    }
                    error={touched.tableNumber && errors.tableNumber}
                    errorMessage={errors.tableNumber}
                  />
                  {/* seater like how many seat does the table have*/}
                  <Select
                    name="seater"
                    label="Select Seat Count"
                    labelPlacement="outside"
                    placeholder="Select Seat Count"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    items={[
                      // 1 seater to 10 seater
                      { key: "1", label: "1 Seater" },
                      { key: "2", label: "2 Seater" },
                      { key: "3", label: "3 Seater" },
                      { key: "4", label: "4 Seater" },
                      { key: "5", label: "5 Seater" },
                      { key: "6", label: "6 Seater" },
                      { key: "7", label: "7 Seater" },
                      { key: "8", label: "8 Seater" },
                      { key: "9", label: "9 Seater" },
                      { key: "10", label: "10 Seater" },
                    ]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    selectedKeys={values.seater ? [values.seater] : []}
                    error={touched.seater && errors.seater}
                    isInvalid={touched.seater && errors.seater}
                    errorMessage={errors.seater}
                    color={touched.seater && errors.seater ? "danger" : ""}
                  >
                    {(item) => (
                      <SelectItem value={item.key}>{item.label}</SelectItem>
                    )}
                  </Select>
                </GridContainer>
                <FlexContainer variant="row-center" gap="md">
                  <NextButton type="submit" colorScheme="primary">
                    Add Table
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          );
        }}
      </Formik>
      {tables.length > 0 && (
        <Table>
          <TableHeader>
            <TableColumn>S No.</TableColumn>
            <TableColumn>Table Number</TableColumn>
            <TableColumn>Seater</TableColumn>
          </TableHeader>
          <TableBody>
            {tables.map((table, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{table.tableNumber}</TableCell>
                <TableCell>{table.seater}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </FlexContainer>
  );
};

export default RestrauntConfig;
