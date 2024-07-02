import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";

const TaxConfig = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const initialValues = {
    taxName: "",
    cgst: "",
    sgst: "",
    igst: "",
  };

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Manage"}
        subheading={"Taxes"}
        title={"Tax Configuration"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Taxes List"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Create Tax"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <FlexContainer variant="column-start">
          <Table aria-label="Taxes List">
            <TableHeader>
              <TableColumn>Tax Name</TableColumn>
              <TableColumn>CGST</TableColumn>
              <TableColumn>SGST</TableColumn>
              <TableColumn>IGST</TableColumn>
            </TableHeader>
            <TableBody>
              {/* {!taxesLoading &&
                taxesData?.map((tax) => (
                  <TableRow key={tax?.uniqueId}>
                    <TableCell>{tax?.taxName}</TableCell>
                    <TableCell>{tax?.cgst}</TableCell>
                    <TableCell>{tax?.sgst}</TableCell>
                    <TableCell>{tax?.igst}</TableCell>
                  </TableRow>
                ))} */}
              <TableRow>
                <TableCell>CGST</TableCell>
                <TableCell>9%</TableCell>
                <TableCell>9%</TableCell>
                <TableCell>18%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </FlexContainer>
      )}
      {activeTab === 2 && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <Form>
                <FlexContainer variant="column-start" gap="md">
                  <GridContainer className="lg:grid-cols-4">
                    <Input
                      name="taxName"
                      label="Tax Name"
                      labelPlacement="outside"
                      placeholder="Quantity"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-800",
                        inputWrapper: "border shadow-none",
                      }}
                      value={values.taxName}
                      onChange={handleChange}
                    />

                    <Input
                      type="number"
                      name="cgst"
                      label="CGST"
                      labelPlacement="outside"
                      placeholder="CGST"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-800",
                        inputWrapper: "border shadow-none",
                      }}
                      value={values.cgst}
                      onChange={handleChange}
                    />

                    <Input
                      type="number"
                      name="igst"
                      label="IGST"
                      labelPlacement="outside"
                      placeholder="IGST"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-800",
                        inputWrapper: "border shadow-none",
                      }}
                      value={values.igst}
                      onChange={handleChange}
                    />

                    <Input
                      type="number"
                      name="sgst"
                      label="SGST"
                      labelPlacement="outside"
                      placeholder="SGST"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-800",
                        inputWrapper: "border shadow-none",
                      }}
                      value={values.sgst}
                      onChange={handleChange}
                    />
                  </GridContainer>
                  <FlexContainer variant="row-end">
                    <NextButton colorScheme="primary" type="submit">
                      Create Tax
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

export default TaxConfig;
