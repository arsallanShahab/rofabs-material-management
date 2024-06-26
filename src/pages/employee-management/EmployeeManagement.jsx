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
import { File, Trash } from "lucide-react";
import React, { useState } from "react";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";
import { addEmployeeSchema } from "../../lib/validation/employee/add";

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
    email: "",
    phone: "",
    address: "",
    designation: "",
    doj: "",
    documents: "",
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
        buttonHref={"/employee/add"}
        buttonText={"Create Employee"}
        showExtraButton={true}
        extraButtonText={"Create Designation"}
        extraButtonHref={"/employee/designation/add"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Employee List"
          isActiveTab={activeTab === 1}
          isError={tabsError[1]}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Designation List"
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
    </FlexContainer>
  );
};

export default EmployeeManagement;
