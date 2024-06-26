import { Input, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";
import { generateTimeOptions } from "../../lib/utils";

const SHIFT_DATA = [
  {
    id: 1,
    shift_name: "Morning",
    start_time: "09:00",
    end_time: "17:00",
  },
  {
    id: 2,
    shift_name: "Evening",
    start_time: "17:00",
    end_time: "01:00",
  },
  {
    id: 3,
    shift_name: "Night",
    start_time: "01:00",
    end_time: "09:00",
  },
];

const CreateDutyRoaster = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
  });
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const [ShiftInitialValues, setShiftInitialValues] = useState({
    shift_name: null,
    start_time: null,
    end_time: null,
  });

  const [RoasterDetails, setRoasterDetails] = useState(
    SHIFT_DATA.map((shift) => ({
      shift_id: shift.id,
      employees: [],
      additional_responsibility: [],
    }))
  );

  console.log(RoasterDetails);

  const timeOptions = generateTimeOptions();

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Create"}
        subheading={"Duty Roaster"}
        title={"Create Duty Roaster"}
        showButton={false}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Shift Management"
          isActiveTab={activeTab === 1}
          isError={tabsError[1]}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Roaster Management"
          isActiveTab={activeTab === 2}
          isError={tabsError[2]}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 ? (
        <Formik initialValues={ShiftInitialValues}>
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            touched,
            errors,
          }) => (
            <Form>
              <FlexContainer variant="column-start" gap="md">
                <GridContainer>
                  <Input
                    type="text"
                    name="shift_name"
                    label="Shift Name"
                    labelPlacement="outside"
                    placeholder="Enter Shift Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    isInvalid={errors.shift_name && touched.shift_name}
                    color={errors.shift_name && touched.shift_name && "danger"}
                    errorMessage={
                      errors.shift_name &&
                      touched.shift_name &&
                      errors.shift_name
                    }
                  />
                  <Select
                    name="start_time"
                    label="Start Time"
                    labelPlacement="outside"
                    placeholder="Select Start Time"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      trigger: "border shadow-none",
                    }}
                    onChange={handleChange}
                    isInvalid={errors.start_time && touched.start_time}
                    color={errors.start_time && touched.start_time && "danger"}
                    errorMessage={
                      errors.start_time &&
                      touched.start_time &&
                      errors.start_time
                    }
                  >
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    name="end_time"
                    label="End Time"
                    labelPlacement="outside"
                    placeholder="Select End Time"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      trigger: "border shadow-none",
                    }}
                    onChange={(e) => {
                      if (values.start_time) {
                        if (e.target.value < values.start_time) {
                          toast.error(
                            "End time should be greater than start time"
                          );
                          //   setField
                          return;
                        }
                      }
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    isInvalid={errors.end_time && touched.end_time}
                    color={errors.end_time && touched.end_time && "danger"}
                    errorMessage={
                      errors.end_time && touched.end_time && errors.end_time
                    }
                  >
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </Select>
                </GridContainer>
                <FlexContainer variant="row-end" gap="md" className={"p-5"}>
                  <NextButton colorScheme="primary">Create Shift</NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      ) : null}

      {activeTab === 2
        ? SHIFT_DATA.map((shift) => (
            <FlexContainer key={shift.id} variant="column-start" gap="md">
              <h2 className="text-lg font-semibold">
                {shift.shift_name} Shift
              </h2>
              <GridContainer>
                <Select
                  name="employees"
                  label="Employees"
                  labelPlacement="outside"
                  placeholder="Select Employees"
                  radius="sm"
                  items={[
                    { value: "1", label: "Alice" },
                    { value: "2", label: "Bob" },
                    { value: "3", label: "Charlie" },
                  ]}
                  selectionMode={"multiple"}
                  classNames={{
                    label: "font-medium text-zinc-100",
                    inputWrapper: "border shadow-none",
                  }}
                  onChange={(e) => {
                    //add employee to roaster details or update employee in roaster details
                    setRoasterDetails((prev) => {
                      const updatedRoasterDetails = prev.map((roaster) => {
                        if (roaster.shift_id === shift.id) {
                          const employee = e.target.value;
                          const pushEmployee = roaster.employees.push(employee);
                        }
                        return roaster;
                      });
                      return updatedRoasterDetails;
                    });
                  }}
                >
                  {(type) => (
                    <SelectItem key={type.label} value={type.label}>
                      {type.label}
                    </SelectItem>
                  )}
                </Select>
                <Select
                  name="additional_responsibility"
                  label="Additional Responsibility"
                  labelPlacement="outside"
                  placeholder="Select Additional Responsibility"
                  radius="sm"
                  items={[
                    { value: "1", label: "Cleaning" },
                    { value: "2", label: "Cooking" },
                    { value: "3", label: "Serving" },
                  ]}
                  selectionMode={"multiple"}
                  classNames={{
                    label: "font-medium text-zinc-100",
                    inputWrapper: "border shadow-none",
                  }}
                  onChange={(e) => {
                    setRoasterDetails((prev) => {
                      const updatedRoasterDetails = prev.map((roaster) => {
                        if (roaster.shift_id === shift.id) {
                          const additional_responsibility = e.target.value;
                          const pushAdditionalResponsibility =
                            roaster.additional_responsibility.push(
                              additional_responsibility
                            );
                        }
                        return roaster;
                      });
                      return updatedRoasterDetails;
                    });
                  }}
                >
                  {(type) => (
                    <SelectItem key={type.label} value={type.label}>
                      {type.label}
                    </SelectItem>
                  )}
                </Select>
              </GridContainer>
              <FlexContainer variant="row-end" gap="md" className={"p-5"}>
                <NextButton colorScheme="primary">Update</NextButton>
              </FlexContainer>
            </FlexContainer>
          ))
        : null}
    </FlexContainer>
  );
};

export default CreateDutyRoaster;
