import { Button, Input, Link } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../api/ApiCall";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await api(
        "/reset-password",
        { token, password: values.password },
        "post"
      );
      if (response && response.status == 200) {
        toast.success(response.data.success);
      }
    } catch (err) {
      toast.error(err.error);
      navigate("/login");
    }
  };

  return (
    <div className="container relative grid  h-screen max-h-[900px]  flex-col items-center justify-center lg:max-w-none lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset your password
            </h1>
            <p className="text-muted-foreground text-[14px]">
              Confirm your email and we&apos;ll send you a link to reset your
              password.
            </p>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                <Form>
                  <div className="mt-5 grid gap-3">
                    <Input
                      type="password"
                      size="lg"
                      name="password"
                      label="Password"
                      labelPlacement="outside"
                      placeholder="Enter your password"
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                      }}
                      isInvalid={errors.password && touched.password}
                      color={errors.password && touched.password && "danger"}
                      errorMessage={
                        errors.password && touched.password && errors.password
                      }
                    />

                    <Input
                      type="password"
                      size="lg"
                      name="confirmPassword"
                      label="Confirm Password"
                      labelPlacement="outside"
                      placeholder="Enter your password"
                      onChange={(e) => {
                        setFieldValue("confirmPassword", e.target.value);
                      }}
                      isInvalid={
                        errors.confirmPassword && touched.confirmPassword
                      }
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

                    <Button
                      type="submit"
                      color="primary"
                      className="mt-3 font-[400] text-lg"
                      isLoading={isSubmitting}
                      spinner={
                        <svg
                          className="animate-spin h-5 w-5 text-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          />
                        </svg>
                      }
                    >
                      {!isSubmitting ? "Send Link" : null}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <hr></hr>
          <Button
            href="/login"
            as={Link}
            color="primary"
            variant="light"
            className="font-[400] text-sm"
          >
            Back to sign in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
