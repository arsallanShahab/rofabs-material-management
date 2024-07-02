import {
  Checkbox,
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
import { File, Trash } from "lucide-react";
import React, { useState } from "react";
import * as Yup from "yup";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";

const EMPLOYEE_DATA = [
  {
    id: 1,
    name: "John Doe",
    doj: "01-01-2021",
    designation: "Manager",
    phone: "1234567890",
    address: "123, ABC Street, XYZ City",
    documents: "Aadhar, PAN",
  },
  {
    id: 2,
    name: "Alice",
    doj: "01-01-2021",
    designation: "Staff",
    phone: "1234567890",
    address: "123, ABC Street, XYZ City",
    documents: "Aadhar, PAN",
  },
];

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
  });

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const [initialValues, setInitialValues] = useState({
    name: "",
    phone: "",
    address: "",
    dateOfJoining: "",
    avatar: "",
    documents: "",
    designation: "",
    department: "",
    gender: "",
  });
  const [selectImg, setSelectImg] = useState(null);

  const previewImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setSelectImg(null);
    document.getElementById("dropzone-file").value = "";
  };

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Employee"}
        title={"Employee Management"}
        showButton={true}
        buttonHref={"/employee/designation"}
        buttonText={"Manage Designation"}
        // showExtraButton={true}
        // extraButtonText={"Create Designation"}
        // extraButtonHref={"/employee/designation/add"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Employee List"
          isActiveTab={activeTab === 1}
          isError={tabsError[1]}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Create Employee"
          isActiveTab={activeTab === 2}
          isError={tabsError[2]}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <FlexContainer variant="column-start">
          <h3 className="text-lg font-semibold">Employee List</h3>
          <Table aria-label="Inward List">
            <TableHeader>
              <TableColumn>EMP ID</TableColumn>
              <TableColumn>Employee Name</TableColumn>
              <TableColumn>Date of Joining</TableColumn>
              <TableColumn>Desgination</TableColumn>
              <TableColumn>Phone Number</TableColumn>
              <TableColumn>Address</TableColumn>
              <TableColumn>Documents</TableColumn>
            </TableHeader>
            <TableBody>
              {EMPLOYEE_DATA.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.doj}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>
                    <NextButton isIcon colorScheme="badge">
                      <File className="w-4 h-4" />
                    </NextButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FlexContainer>
      )}
      {activeTab === 2 && (
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            phone: Yup.string().required("Phone is required"),
            address: Yup.string().required("Address is required"),
            designation: Yup.string().required("Designation is required"),
            dateOfJoining: Yup.string().required("DOJ is required"),
            department: Yup.string().required("Department is required"),
            gender: Yup.string().required("Gender is required"),
            // avatar: Yup.string().required("Avatar is required
            // documents: Yup.string().required("Documents is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <FlexContainer variant="column-start" gap="md">
                <GridContainer>
                  <Input
                    name="name"
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Enter employee name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.name}
                    color={errors.name && touched.name ? "danger" : "default"}
                    error={errors.name && touched.name}
                    errorMessage={errors.name}
                  />
                  <Input
                    name="phone"
                    label="Phone"
                    placeholder="Enter employee phone"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.phone}
                    color={errors.phone && touched.phone ? "danger" : "default"}
                    error={errors.phone && touched.phone}
                    errorMessage={errors.phone}
                  />
                  <Input
                    name="address"
                    label="Address"
                    placeholder="Enter employee address"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.address}
                    color={
                      errors.address && touched.address ? "danger" : "default"
                    }
                    error={errors.address && touched.address}
                    errorMessage={errors.address}
                  />
                  <Input
                    name="designation"
                    label="Designation"
                    placeholder="Enter employee designation"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.designation}
                    color={
                      errors.designation && touched.designation
                        ? "danger"
                        : "default"
                    }
                    error={errors.designation && touched.designation}
                    errorMessage={errors.designation}
                  />
                  <Input
                    type="date"
                    name="dateOfJoining"
                    label="Date of Joining"
                    placeholder="Enter date of joining"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.dateOfJoining}
                    color={
                      errors.dateOfJoining && touched.dateOfJoining
                        ? "danger"
                        : "default"
                    }
                    error={errors.dateOfJoining && touched.dateOfJoining}
                    errorMessage={errors.dateOfJoining}
                  />

                  {/* <Input
                    type="file"
                    name="avatar"
                    label="Avatar"
                    placeholder="Upload employee avatar"
                    onChange={previewImage}
                    error={errors.avatar && touched.avatar}
                    errorMessage={errors.avatar}
                  />
                  {selectImg && (
                    <FlexContainer variant="row-start" gap="sm">
                      <img
                        src={selectImg}
                        alt="avatar"
                        className="w-16 h-16 rounded-full"
                      />
                      <NextButton
                        isIcon
                        colorScheme="badge"
                        onClick={handleImageRemove}
                      >
                        <Trash className="w-4 h-4" />
                      </NextButton>
                    </FlexContainer>
                  )} */}

                  {/* <Input
                    name="documents"
                    label="Documents"
                    placeholder="Enter documents"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.documents}
                    color={
                      errors.documents && touched.documents
                        ? "danger"
                        : "default"
                    }
                    error={errors.documents && touched.documents}
                    errorMessage={errors.documents}
                  /> */}

                  <Input
                    name="department"
                    label="Department"
                    placeholder="Enter employee department"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.department}
                    color={
                      errors.department && touched.department
                        ? "danger"
                        : "default"
                    }
                    error={errors.department && touched.department}
                    errorMessage={errors.department}
                  />
                  <Select
                    name="gender"
                    label="Gender"
                    placeholder="Select employee gender"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    items={[
                      {
                        key: "male",
                        label: "Male",
                      },
                      {
                        key: "female",
                        label: "Female",
                      },
                    ]}
                    onChange={(e) => {
                      setFieldValue("gender", e.target.value);
                    }}
                    selectedKeys={values?.gender ? [values.gender] : ""}
                    error={errors.gender && touched.gender}
                    errorMessage={errors.gender}
                  >
                    {(gender) => (
                      <SelectItem key={gender.key}>{gender.label}</SelectItem>
                    )}
                  </Select>
                </GridContainer>
                <FlexContainer variant="row-end">
                  <NextButton type="submit" colorScheme="primary">
                    Create Employee
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

export default EmployeeManagement;
