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
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";
import { API_TAGS } from "../../lib/consts/API_TAGS";
import useGet from "../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const HotelConfig = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTabClick = (index) => {
    setActiveTab(index);
    setSearchParams({ tab: index });
  };

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(`${API_URL}/hotelconfig`, {
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        companyName: values.companyName,
        companyPanNumber: values.companyPanNumber,
        corporateOfficeAddress: values.corporateOfficeAddress,
        tinNumber: values.tinNumber,
        fssaiNumber: values.fssaiNumber,
        gstinNumber: values.gstinNumber,
        description: values.description,
        status: true,
      });
      toast.success("Hotel Config created successfully");
      refresh(API_TAGS.GET_HOTEL_CONFIG);
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const { data, error, getData, invalidateCache, loading, refresh } = useGet({
    showToast: false,
  });

  useEffect(() => {
    getData(
      `${API_URL}/hotelconfig?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_HOTEL_CONFIG
    );
  }, []);
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Config"}
        subheading={"Hotel Management"}
        title={"Hotel Config Management"}
      />
      <FlexContainer variant="row-between">
        <FlexContainer variant="row-start" className="overflow-x-auto">
          <Tab
            title="Config List"
            isActiveTab={activeTab === 1}
            onClick={() => handleTabClick(1)}
          />
          <Tab
            title="Create Config"
            isActiveTab={activeTab === 2}
            onClick={() => handleTabClick(2)}
          />
        </FlexContainer>
      </FlexContainer>
      {activeTab === 1 && (
        <Table aria-label="Hotel_Config">
          <TableHeader>
            <TableColumn>S No.</TableColumn>
            <TableColumn>Company Name</TableColumn>
            <TableColumn>Company Pan Number</TableColumn>
            <TableColumn>Corporate Office Address</TableColumn>
            <TableColumn>Tin Number</TableColumn>
            <TableColumn>Fssai Number</TableColumn>
            <TableColumn>Gstin Number</TableColumn>
            <TableColumn>Desc</TableColumn>
          </TableHeader>
          <TableBody>
            {!loading &&
              data?.data &&
              data?.data?.map((item, index) => (
                <TableRow key={item.uniqueId + "a"}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.companyName}</TableCell>
                  <TableCell>{item?.companyPanNumber}</TableCell>
                  <TableCell className="max-w-[200px]">
                    {item?.corporateOfficeAddress}
                  </TableCell>
                  <TableCell>{item?.tinNumber}</TableCell>
                  <TableCell>{item?.fssaiNumber}</TableCell>
                  <TableCell>{item?.gstinNumber}</TableCell>
                  <TableCell>{item?.description}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      {activeTab === 2 && (
        <Formik
          initialValues={{
            companyName: "",
            companyPanNumber: "",
            corporateOfficeAddress: "",
            tinNumber: "",
            fssaiNumber: "",
            gstinNumber: "",
            description: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => {
            return (
              <Form>
                <FlexContainer variant="column-start" gap="lg">
                  <GridContainer>
                    <Input
                      type="text"
                      name="companyName"
                      label="Company Name"
                      labelPlacement="outside"
                      placeholder="Enter Company Name"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    />

                    <Input
                      type="text"
                      name="companyPanNumber"
                      label="Company Pan Number"
                      labelPlacement="outside"
                      placeholder="Enter Company Pan Number"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    />

                    <Input
                      type="text"
                      name="corporateOfficeAddress"
                      label="Corporate Office Address"
                      labelPlacement="outside"
                      placeholder="Enter Corporate Office Address"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    />

                    <Input
                      type="number"
                      name="tinNumber"
                      label="Tin Number"
                      labelPlacement="outside"
                      placeholder="Enter Tin Number"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      name="fssaiNumber"
                      label="Fssai Number"
                      labelPlacement="outside"
                      placeholder="Enter Fssai Number"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      name="gstinNumber"
                      label="Gstin Number"
                      labelPlacement="outside"
                      placeholder="Enter Gstin Number"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    />

                    <Input
                      type="text"
                      name="description"
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Enter Description"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    />
                  </GridContainer>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Upload Logo
                  </h3>
                  <GridContainer>
                    <label className="relative">
                      {" "}
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 border rounded-xl">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="image/*"
                        className="hidden z-10"
                      />
                    </label>
                  </GridContainer>
                  <FlexContainer variant="row-end">
                    <NextButton
                      type="submit"
                      colorScheme="primary"
                      onClick={handleSubmit}
                    >
                      Save
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

export default HotelConfig;
