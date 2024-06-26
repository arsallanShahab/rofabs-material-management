import {
  faArrowLeft,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";

function Profile() {
  const [selectImg, setSelectedImg] = useState(null);

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("please enter firstname"),
    lname: Yup.string().required("please enter lastname"),
    company_name: Yup.string().required("please enter company name"),
  });

  const handleImageRemove = () => {
    setSelectedImg(null);
  };

  function previewImage(imageInput) {
    const file = imageInput.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setSelectedImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Profile"}
        subheading={"Edit"}
        title={"Profile Settings"}
      />

      <Formik
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          company_name: "",
          profile_img: null,
        }}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
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
            <GridContainer
              className="lg:grid-cols-4 gap-x-0 md:gap-x-6 "
              gap="2xl"
            >
              <GridContainer
                gap="xl"
                className="lg:grid-cols-2 col-span-3 rounded-xl"
                isContainer
              >
                <Input
                  type="text"
                  name="fname"
                  label="First Name"
                  labelPlacement="outside"
                  placeholder="Enter your first name"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-100",
                    inputWrapper: "border shadow-none",
                  }}
                  onChange={(e) => {
                    setFieldValue("fname", e.target.value);
                  }}
                  isInvalid={errors.fname && touched.fname}
                  color={errors.fname && touched.fname && "danger"}
                  errorMessage={errors.fname && touched.fname && errors.fname}
                />
                <Input
                  type="text"
                  name="lname"
                  label="Last Name"
                  labelPlacement="outside"
                  placeholder="Enter your last name"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-100",
                    inputWrapper: "border shadow-none",
                  }}
                  onChange={(e) => {
                    setFieldValue("lname", e.target.value);
                  }}
                  isInvalid={errors.lname && touched.lname}
                  color={errors.lname && touched.lname && "danger"}
                  errorMessage={errors.lname && touched.lname && errors.lname}
                />
                <Input
                  type="text"
                  name="email"
                  label="Email"
                  labelPlacement="outside"
                  placeholder="Enter your email address or phone number"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-100",
                    inputWrapper: "border shadow-none",
                  }}
                  disabled
                />
                <Input
                  type="text"
                  name="company_name"
                  label="Company Name"
                  labelPlacement="outside"
                  placeholder="Enter your company name"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-100",
                    inputWrapper: "border shadow-none",
                  }}
                  disabled
                />
              </GridContainer>
              <GridContainer className="col-span-1 lg:grid-cols-1 md:grid-cols-1">
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    {selectImg ? (
                      <div className="relative w-full h-full">
                        <img
                          src={selectImg}
                          className="w-full h-full rounded-lg z-30"
                        />
                        <NextButton
                          colorScheme="error"
                          isIcon
                          className="absolute -top-3 -right-3 border-none z-50"
                          onClick={handleImageRemove}
                        >
                          <Trash className="w-4 h-4" />
                        </NextButton>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        previewImage(e);
                        setFieldValue("profile_img", e.currentTarget.files[0]);
                      }}
                      className="hidden z-10"
                    />
                  </label>
                </div>
                {/* <div
                  id="image-preview"
                  className="p-6 bg-white border-dashed border-2 border-gray-400 rounded-lg items-center text-center cursor-pointer w-full"
                >
                  <input
                    id="profile_img"
                    type="file"
                    name="profile_img"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      previewImage(e);
                      setFieldValue("profile_img", e.currentTarget.files[0]);
                    }}
                  />

                  <label htmlFor="profile_img" className="cursor-pointer">
                    {selectImg ? (
                      <>
                        <img
                          src={selectImg}
                          className="max-h-48 rounded-lg mx-auto z-10"
                        />
                        <Button
                          className="bg-red-100 mt-3 z-50"
                          onClick={handleImageRemove}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-8 h-8 text-gray-700 mx-auto mb-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                          Upload Profile Image
                        </h5>
                        <p className="font-normal text-sm text-gray-400 md:px-6">
                          Choose photo size should be less than{" "}
                          <b className="text-gray-600">2mb</b>
                        </p>
                        <p className="font-normal text-sm text-gray-400 md:px-6">
                          and should be in{" "}
                          <b className="text-gray-600">JPG, JPEG</b> format.
                        </p>
                        <span
                          id="filename"
                          className="text-gray-500 bg-gray-200 z-50"
                        ></span>
                      </>
                    )}
                  </label>
                </div> */}
              </GridContainer>
            </GridContainer>
            <FlexContainer variant="row-end" className="items-center p-5 mt-5">
              <NextButton
                disabled={isSubmitting}
                loading={isSubmitting}
                colorScheme="primary"
              >
                Update Profile
              </NextButton>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </FlexContainer>
  );
}

export default Profile;
