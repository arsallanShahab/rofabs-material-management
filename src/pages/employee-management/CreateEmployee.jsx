import { Input, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";
import { addEmployeeSchema } from "../../lib/validation/employee/add";

const CreateEmployee = () => {
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
        title={"Create Employee"}
      />
    </FlexContainer>
  );
};

export default CreateEmployee;
