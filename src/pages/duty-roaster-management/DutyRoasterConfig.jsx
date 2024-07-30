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
import { Trash } from "lucide-react";
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

const DutyRoasterConfig = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTabClick = (index) => {
    setActiveTab(index);
    setSearchParams({ tab: index });
  };

  const {
    data: responsibilityListData,
    error: responsibilityListError,
    loading: responsibilityListLoading,
    refresh,
    invalidateCache,
    getData: getResponsibilityListData,
  } = useGet({ showToast: false });

  const initialValues = {
    responsibility_name: "",
  };

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(`${API_URL}/dutyroaster/responsibility`, {
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        name: values.responsibility_name,
      });
      toast.success("Responsibility created successfully");
      refresh(API_TAGS.GET_RESPONSIBILITY_LIST);
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  useEffect(() => {
    if (searchParams.has("tab")) {
      setActiveTab(parseInt(searchParams.get("tab")));
    } else {
      //   setActiveTab(1);
      //   setSearchParams({ tab: activeTab });
    }
  }, [searchParams]);

  useEffect(() => {
    getResponsibilityListData(
      `${API_URL}/dutyroaster/responsibilities?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_RESPONSIBILITY_LIST
    );
  }, []);

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Config"}
        subheading={"Duty Roaster"}
        title={"Duty Roaster Config"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Responsibilities List"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Create New Responsibility"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>

      {activeTab === 1 && (
        <FlexContainer variant="column-start">
          <Table aria-label="Responsibilities_List">
            <TableHeader>
              <TableColumn>S No.</TableColumn>
              <TableColumn>Responsibility</TableColumn>
              <TableColumn></TableColumn>
            </TableHeader>
            <TableBody>
              {!responsibilityListLoading &&
                responsibilityListData?.data &&
                responsibilityListData?.data?.map((item, index) => (
                  <TableRow key={item.uniqueId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>
                      <NextButton
                        isIcon
                        colorScheme="error"
                        onClick={async () => {
                          try {
                            const res = await axios.delete(
                              `${API_URL}/dutyroaster/responsibility?propertyId=2a869149-342b-44c8-ad86-8f6465970638&uniqueId=${item.uniqueId}`
                            );
                            toast.success(
                              "Responsibility deleted successfully"
                            );
                            refresh(API_TAGS.GET_RESPONSIBILITY_LIST);
                          } catch (error) {
                            toast.error(
                              error?.response?.data?.error ||
                                "An error occurred"
                            );
                          }
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </NextButton>
                    </TableCell>
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
                      name="responsibility_name"
                      label="Responsibility Name"
                      labelPlacement="outside"
                      placeholder="Enter Responsibility Name"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-900",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                      value={values.responsibility_name}
                    />
                  </GridContainer>
                  <FlexContainer variant="row-start">
                    <NextButton colorScheme="primary" type="submit">
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

export default DutyRoasterConfig;
