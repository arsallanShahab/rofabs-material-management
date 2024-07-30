import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { FieldArray, Form, Formik } from "formik";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";
import { API_TAGS } from "../../lib/consts/API_TAGS";
import useGet from "../../lib/hooks/get-api";
import { generateTimeOptions } from "../../lib/utils";

const API_URL = import.meta.env.VITE_SERVER_URL;

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

  const {
    data: shiftsData,
    loading: shiftsLoading,
    error: shiftsError,
    refresh,
    invalidateCache,
    getData: getShiftsData,
  } = useGet({
    showToast: false,
  });
  const {
    data: employeesData,
    loading: employeesLoading,
    error: employeesError,
    getData: getEmployeesData,
  } = useGet({
    showToast: false,
  });

  const {
    data: responsibilityListData,
    error: responsibilityListError,
    loading: responsibilityListLoading,
    getData: getResponsibilityListData,
  } = useGet({ showToast: false });

  console.log(RoasterDetails);

  const timeOptions = generateTimeOptions();

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const res = await axios.post(`${API_URL}/dutyroaster/shift`, {
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        name: values.shift_name,
        startTime: values.start_time,
        endTime: values.end_time,
      });
      toast.success("Shift created successfully");
      refresh(API_TAGS.GET_SHIFTS_LIST);
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  const handleSubmitDutyRoater = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(`${API_URL}/dutyroaster`, {
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        date: values.date,
        shiftUniqueId: values.shift_id,
        responsibilitiesUniqueIds: values.responsibility?.split(",") || [],
        employeesUniqueIds: values.employee_id?.split(",") || [],
        additionalResponsibilities: values.additional_responsibility,
      });
      toast.success("Duty Roaster created successfully");
      refresh(API_TAGS.GET_DUTY_ROASTER_LIST);
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
  };

  useEffect(() => {
    getShiftsData(
      `${API_URL}/dutyroaster/shift?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_SHIFTS_LIST
    );
    getEmployeesData(
      `${API_URL}/employees?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_EMPLOYEE_LIST
    );
    getResponsibilityListData(
      `${API_URL}/dutyroaster/responsibilities?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      API_TAGS.GET_RESPONSIBILITY_LIST
    );
  }, []);

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
        <Formik initialValues={ShiftInitialValues} onSubmit={handleSubmit}>
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
                  <NextButton colorScheme="primary" type="submit">
                    Create Shift
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      ) : null}

      {activeTab === 2 && (
        <Formik
          initialValues={{
            date: null,
            shift_id: "",
            employee_id: "",
            responsibility: "",
            additional_responsibility: "",
            assign_additional_responsibility: false,
          }}
          onSubmit={handleSubmitDutyRoater}
        >
          {({ values, handleChange, handleBlur, setFieldValue }) => (
            <Form>
              <FlexContainer variant="column-start" gap="2xl">
                <GridContainer>
                  <Input
                    type="date"
                    name="date"
                    label="Date"
                    labelPlacement="outside"
                    placeholder="Select Date"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                  />
                </GridContainer>
                <FlexContainer variant="column-start" gap="md">
                  <GridContainer className="lg:grid-cols-4">
                    <Select
                      name={`shift_id`}
                      label="Shifts"
                      labelPlacement="outside"
                      placeholder="Select Shifts"
                      radius="sm"
                      items={shiftsData?.data || []}
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    >
                      {(shift) => (
                        <SelectItem key={shift?.uniqueId}>
                          {shift?.name}
                        </SelectItem>
                      )}
                    </Select>
                    <Select
                      name={`employee_id`}
                      label="Employees"
                      labelPlacement="outside"
                      placeholder="Select Employees"
                      radius="sm"
                      items={employeesData || []}
                      selectionMode={"multiple"}
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    >
                      {(employee) => (
                        <SelectItem key={employee?.uniqueId}>
                          {employee?.name}
                        </SelectItem>
                      )}
                    </Select>
                    <Select
                      name={`responsibility`}
                      label="Responsibility"
                      labelPlacement="outside"
                      placeholder="Select Responsibility"
                      radius="sm"
                      items={responsibilityListData?.data || []}
                      selectionMode={"multiple"}
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={handleChange}
                    >
                      {(res) => (
                        <SelectItem key={res?.uniqueId}>{res?.name}</SelectItem>
                      )}
                    </Select>
                    <Checkbox
                      value={values.assign_additional_responsibility}
                      onValueChange={(val) =>
                        setFieldValue(`assign_additional_responsibility`, val)
                      }
                    >
                      Assign Additional Responsibility
                    </Checkbox>
                    {values.assign_additional_responsibility && (
                      <Input
                        name={`additional_responsibility`}
                        label="Additional Responsibility"
                        labelPlacement="outside"
                        placeholder="Enter Additional Responsibility"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-100",
                          inputWrapper: "border shadow-none",
                        }}
                        onChange={handleChange}
                      />
                    )}
                  </GridContainer>
                </FlexContainer>
                <FlexContainer variant="row-end" gap="md" className={"p-5"}>
                  <NextButton colorScheme="primary" type="submit">
                    Save
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      )}

      {activeTab === 3
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
