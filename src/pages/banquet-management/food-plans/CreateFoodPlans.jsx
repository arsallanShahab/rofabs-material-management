import { Input, Textarea } from "@nextui-org/react";
import { FieldArray, Form, Formik } from "formik";
import React from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";

const CreateFoodPlans = () => {
  const initialValues = {
    planName: "",
    planMenu: "",
    planPrice: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {};
  return (
    <FlexContainer variant="column-start">
      <ActionArea
        heading={"Food Plans"}
        subheading={"Create"}
        title={"Manage Food Plans"}
      />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur, touched, errors }) => {
          return (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer className="lg:grid-cols-4">
                  <Input
                    name="planName"
                    label="Plan Name"
                    labelPlacement="outside"
                    placeholder="Enter Plan Name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.planName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <Input
                    name="planPrice"
                    label="Plan Price (per pax)"
                    labelPlacement="outside"
                    placeholder="Enter Plan Price"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.planPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </GridContainer>
                <GridContainer className="lg:grid-cols-2">
                  <Textarea
                    name="planMenu"
                    label="Plan Menu"
                    labelPlacement="outside"
                    placeholder="Enter Plan Description"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.planMenu}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </GridContainer>
                <FlexContainer variant="row-start" gap="sm" className={"py-5"}>
                  <NextButton colorScheme="primary" type="submit">
                    Create Plan
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          );
        }}
      </Formik>
    </FlexContainer>
  );
};

export default CreateFoodPlans;
