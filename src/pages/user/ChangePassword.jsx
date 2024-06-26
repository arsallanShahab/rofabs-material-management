import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../api/ApiCall";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";

function ChangePassword() {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Old password is required"),
    new_password: Yup.string()
      .required("New password is required")
      .min(8, "Password is too short - should be 8 chars minimum."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "Passwords must match"
    ),
  });

  const handleSubmit = async (values) => {
    const local_data = JSON.parse(localStorage.getItem("_session"));
    try {
      const response = await api(
        `/change-password/${local_data.uniqueId}`,
        {
          currentPassword: values.currentPassword,
          newPassword: values.new_password,
        },
        "post"
      );
      if (response && response.status == 200) {
        toast.success(response.success);
        localStorage.removeItem("_session");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.error);
    }
  };

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"profile"}
        subHeading={"Edit"}
        title={"Change Password"}
      />

      <Formik
        initialValues={{
          currentPassword: "",
          new_password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          values,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
        }) => (
          <Form>
            <GridContainer className="lg:grid-cols-2">
              <FlexContainer variant="column-start" className="p-3 rounded-xl">
                <Input
                  type="password"
                  size="lg"
                  name="currentPassword"
                  label="Old Password"
                  labelPlacement="outside"
                  placeholder="Enter your old password"
                  radius="sm"
                  classNames={{
                    label: "font-medium",
                  }}
                  onChange={(e) => {
                    setFieldValue("currentPassword", e.target.value);
                  }}
                  isInvalid={errors.currentPassword && touched.currentPassword}
                  color={
                    errors.currentPassword &&
                    touched.currentPassword &&
                    "danger"
                  }
                  errorMessage={
                    errors.currentPassword &&
                    touched.currentPassword &&
                    errors.currentPassword
                  }
                />
                <Input
                  type="password"
                  size="lg"
                  name="new_password"
                  label="New Password"
                  labelPlacement="outside"
                  placeholder="Enter your new password"
                  radius="sm"
                  classNames={{
                    label: "font-medium",
                  }}
                  onChange={(e) => {
                    setFieldValue("new_password", e.target.value);
                  }}
                  isInvalid={errors.new_password && touched.new_password}
                  color={
                    errors.new_password && touched.new_password && "danger"
                  }
                  errorMessage={
                    errors.new_password &&
                    touched.new_password &&
                    errors.new_password
                  }
                />

                <Input
                  type="password"
                  size="lg"
                  name="confirmPassword"
                  label="Confirm New Password"
                  labelPlacement="outside"
                  placeholder="Confirm new password"
                  radius="sm"
                  classNames={{
                    label: "font-medium",
                  }}
                  onChange={(e) => {
                    setFieldValue("confirmPassword", e.target.value);
                  }}
                  isInvalid={errors.confirmPassword && touched.confirmPassword}
                  color={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    "danger"
                  }
                  errorMessage={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
                  }
                />
                <FlexContainer variant="row-end" className={"p-5"}>
                  <NextButton
                    name="submit"
                    type="submit"
                    colorScheme="primary"
                    loading={isSubmitting}
                  >
                    Update Password
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </GridContainer>
          </Form>
        )}
      </Formik>
    </FlexContainer>
  );
}

export default ChangePassword;
