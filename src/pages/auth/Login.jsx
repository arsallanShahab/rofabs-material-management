import { Button, Chip, Input, Link } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { api } from "../../api/ApiCall";
import FlexContainer from "../../components/layout/FlexContainer";
import NextButton from "../../components/micro/NextButton";

function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const navigateToDashboard = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  useEffect(() => {
    const local_data = JSON.parse(localStorage.getItem("_session"));
    if (local_data && local_data.token) {
      navigateToDashboard();
    }
  }, [navigateToDashboard]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await api("/login", values, "post");
      toast.success(response.success);
      navigate("/dashboard");
      localStorage.setItem("_session", JSON.stringify(response.data));
    } catch (err) {
      console.log(err);
      toast.error(err.error);
    }
  };

  return (
    <div className="container relative grid  h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          ROFABS FOR OPERATIONS
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Rofabs for Manager is a dashbaord for managers to manage
              their hostels, payinng guests and bookings. &rdquo;
            </p>
            <footer className="text-sm">Rofabs</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <FlexContainer
          variant="column-start"
          gap="2xl"
          className="mx-auto sm:w-[350px]"
        >
          <FlexContainer variant="column-start" gap="xl">
            <FlexContainer variant="column-start" gap="lg">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-muted-foreground text-[14px]">
                Enter your email below to login to your account
              </p>
            </FlexContainer>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, setFieldValue, isSubmitting }) => (
                <Form>
                  <FlexContainer variant="column-start" gap="xl">
                    <Input
                      name="email"
                      label="Email"
                      labelPlacement="outside"
                      placeholder="Enter your email address or phone number"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("email", e.target.value);
                      }}
                      isInvalid={errors.email && touched.email}
                      color={errors.email && touched.email && "danger"}
                      errorMessage={
                        errors.email && touched.email && errors.email
                      }
                    />

                    <Input
                      type={isVisible ? "text" : "password"}
                      name="password"
                      label="Password"
                      labelPlacement="outside"
                      placeholder="Enter your password"
                      radius="sm"
                      classNames={{
                        label: "font-medium text-zinc-100",
                        inputWrapper: "border shadow-none",
                      }}
                      onChange={(e) => {
                        setFieldValue("password", e.target.value);
                      }}
                      endContent={
                        <Chip
                          onClick={() => setIsVisible(!isVisible)}
                          variant="light"
                          classNames={{
                            base: "cursor-pointer -mr-3",
                          }}
                        >
                          {isVisible ? (
                            <EyeOff className="h-4 text-md text-zinc-600 pointer-events-none" />
                          ) : (
                            <Eye className="h-4 text-md text-zinc-600 pointer-events-none" />
                          )}
                        </Chip>
                      }
                      isInvalid={errors.password && touched.password}
                      color={errors.password && touched.password && "danger"}
                      errorMessage={
                        errors.password && touched.password && errors.password
                      }
                    />

                    <NextButton
                      type="submit"
                      loading={isSubmitting}
                      colorScheme="primary"
                    >
                      Login
                    </NextButton>
                  </FlexContainer>
                </Form>
              )}
            </Formik>
          </FlexContainer>
          <FlexContainer variant="column-start" gap="lg">
            <FlexContainer variant="row-between" className="pb-5 border-b">
              <span className="text-xs">Having trouble signing in </span>
              <Link
                onClick={() => navigate("/forgot-password")}
                className="cursor-pointer"
              >
                <span className="text-primary text-sm font-medium">
                  forgot your password?
                </span>
              </Link>
            </FlexContainer>
            <NextButton
              className="border-none shadow-none"
              onClick={() => navigate("/register")}
            >
              Create your account
            </NextButton>
          </FlexContainer>
        </FlexContainer>
      </div>
    </div>
  );
}

export default Login;
