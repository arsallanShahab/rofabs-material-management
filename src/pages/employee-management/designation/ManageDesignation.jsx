import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const ManageDesignation = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const initialValues = {
    designation_name: "",
  };

  const {
    data: designationData,
    error: designationError,
    loading: designationLoading,
    invalidateCache: invalidateDesignationData,
    refresh: refreshDesignationData,
    getData: getDesignationData,
  } = useGet({ showToast: false });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${API_URL}/createDesignation`, {
        name: values.designation_name,
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        status: true,
      });
      toast.success(res?.data?.message || "Designation created successfully");
      invalidateDesignationData("designationData");
      refreshDesignationData();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };

  useEffect(() => {
    getDesignationData(
      `${API_URL}/getDesignations?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      "designationData"
    );
  }, []);
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Manage"}
        subheading={"Designation"}
        title={"Manage Employee Designation"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Designation List"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Create Designation"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <FlexContainer variant="column-start">
          <Table aria-label="Inward List">
            <TableHeader>
              <TableColumn>S No.</TableColumn>
              <TableColumn>Designation Name</TableColumn>
            </TableHeader>
            <TableBody>
              {!designationLoading &&
                designationData?.length &&
                designationData?.map((designation, index) => (
                  <TableRow key={designation?.uniqueId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{designation?.name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </FlexContainer>
      )}
      {activeTab == 2 && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange, errors, touched, handleSubmit }) => {
            return (
              <Form>
                <FlexContainer variant="column-start" gap="xl">
                  <GridContainer>
                    <Input
                      name="designation_name"
                      label="Designation Name"
                      labelPlacement="outside"
                      placeholder="Enter Designation Name"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-900",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                      value={values.designation_name}
                      color={
                        errors.designation_name && touched.designation_name
                          ? "danger"
                          : "default"
                      }
                      error={
                        errors.designation_name && touched.designation_name
                      }
                      errorMessage={errors.designation_name}
                    />
                  </GridContainer>
                  <FlexContainer variant="row-start">
                    <NextButton colorScheme="primary" type="submit">
                      Create Designation
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

export default ManageDesignation;
