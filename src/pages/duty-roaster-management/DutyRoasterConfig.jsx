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
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";

const DutyRoasterConfig = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTabClick = (index) => {
    setActiveTab(index);
    setSearchParams({ tab: index });
  };

  const initialValues = {
    responsibility_name: "",
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (searchParams.has("tab")) {
      setActiveTab(parseInt(searchParams.get("tab")));
    } else {
      //   setActiveTab(1);
      //   setSearchParams({ tab: activeTab });
    }
  }, [searchParams]);

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
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Cooking</TableCell>
              </TableRow>
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
