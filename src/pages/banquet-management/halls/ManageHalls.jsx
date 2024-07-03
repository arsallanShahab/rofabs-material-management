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
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";

const ManageHalls = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  //    hall name , seating capacity , type of banquet - ac/non ac/garden , facilites provided - ( list of features - washroom , power backup , camp fire, chairs, tabels , dining tables, diace) , suitable for ( marriage , biorthday , get to gether , corporate parties)
  const initialValues = {
    hallName: "",
    seatingCapacity: "",
    typeOfBanquet: "",
    facilitiesProvided: "",
    suitableFor: "",
    rentPerDay: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
  };
  return (
    <FlexContainer variant="column-start" gap="xl" className={"h-full"}>
      <ActionArea
        heading={"Manage"}
        subheading={"Halls"}
        title={"Manage Halls"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Hall List"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Create Hall"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <Table aria-label="Halls-List">
          <TableHeader>
            <TableColumn>Hall Name</TableColumn>
            <TableColumn>Seating Capacity</TableColumn>
            <TableColumn>Type of Banquet</TableColumn>
            <TableColumn>Facilities Provided</TableColumn>
            <TableColumn>Suitable For</TableColumn>
            <TableColumn>Rent Per Day</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ABC Hall</TableCell>
              <TableCell>100</TableCell>
              <TableCell>AC</TableCell>
              <TableCell className="max-w-xs">
                Washroom, Power Backup, Camp Fire, Chairs, Tables, Dining
                Tables, Dias
              </TableCell>
              <TableCell className="max-w-xs">
                Marriage, Birthday, Get Together, Corporate Parties
              </TableCell>
              <TableCell>10000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {activeTab === 2 && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({
            values,
            handleChange,
            setFieldValue,
            handleBlur,
            touched,
            errors,
          }) => (
            <Form>
              <FlexContainer variant="column-start" gap="lg">
                <GridContainer>
                  <Input
                    name="hallName"
                    label="Hall Name"
                    labelPlacement="outside"
                    placeholder="Enter Hall Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.hallName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Input
                    name="seatingCapacity"
                    label="Seating Capacity"
                    labelPlacement="outside"
                    placeholder="Enter Seating Capacity"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.seatingCapacity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Select
                    name="typeOfBanquet"
                    label="Type of Banquet"
                    labelPlacement="outside"
                    placeholder="Select Type of Banquet"
                    radius="sm"
                    items={[
                      { uniqueId: 1, name: "AC" },
                      { uniqueId: 2, name: "Non-AC" },
                      { uniqueId: 3, name: "Garden" },
                    ]}
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("typeOfBanquet", e.target.value);
                    }}
                    isInvalid={errors.typeOfBanquet && touched.typeOfBanquet}
                    color={
                      errors.typeOfBanquet && touched.typeOfBanquet && "danger"
                    }
                    errorMessage={errors.typeOfBanquet}
                  >
                    {(product) => (
                      <SelectItem key={product?.uniqueId}>
                        {product?.name}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    name="facilitiesProvided"
                    label="Facilities Provided"
                    labelPlacement="outside"
                    placeholder="Select Facilities Provided"
                    radius="sm"
                    items={[
                      { uniqueId: 1, name: "Washroom" },
                      { uniqueId: 2, name: "Power Backup" },
                      { uniqueId: 3, name: "Camp Fire" },
                      { uniqueId: 4, name: "Chairs" },
                      { uniqueId: 5, name: "Tables" },
                      { uniqueId: 6, name: "Dining Tables" },
                      { uniqueId: 7, name: "Dias" },
                    ]}
                    selectionMode="multiple"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("facilitiesProvided", e.target.value);
                    }}
                    isInvalid={
                      errors.facilitiesProvided && touched.facilitiesProvided
                    }
                    color={
                      errors.facilitiesProvided &&
                      touched.facilitiesProvided &&
                      "danger"
                    }
                    errorMessage={errors.facilitiesProvided}
                  >
                    {(product) => (
                      <SelectItem key={product?.uniqueId}>
                        {product?.name}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    name="suitableFor"
                    label="Suitable For"
                    labelPlacement="outside"
                    placeholder="Select Suitable For"
                    radius="sm"
                    items={[
                      { uniqueId: 1, name: "Marriage" },
                      { uniqueId: 2, name: "Birthday" },
                      { uniqueId: 3, name: "Get Together" },
                      { uniqueId: 4, name: "Corporate Parties" },
                    ]}
                    selectionMode="multiple"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("suitableFor", e.target.value);
                    }}
                    isInvalid={errors.suitableFor && touched.suitableFor}
                    color={
                      errors.suitableFor && touched.suitableFor && "danger"
                    }
                    errorMessage={errors.suitableFor}
                  >
                    {(product) => (
                      <SelectItem key={product?.uniqueId}>
                        {product?.name}
                      </SelectItem>
                    )}
                  </Select>
                  <Input
                    name="rentPerDay"
                    label="Rent Per Day"
                    labelPlacement="outside"
                    placeholder="Enter Rent Per Day"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.rentPerDay}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </GridContainer>
                <FlexContainer variant="row-end" gap="lg" className={"p-5"}>
                  <NextButton type="submit" colorScheme="primary">
                    Create Hall
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

export default ManageHalls;
