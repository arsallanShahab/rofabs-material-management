import { Input } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";
import { useLocation } from "react-router-dom";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";

// Estimate
//     Hall
//     Food ( per plate)
//     No Of PAX
//     Decoration
//      Misc
//      Taxes

// Bill also same as estimate , but put a add charges button
//  It will open option to add some charges

//       Damages
//       Extra charges
//        Reason for extra charges

const CreateEstimate = () => {
  const location = useLocation();
  const id = location.state;
  const initialValues = {
    hall: "",
    food: "",
    pax: "",
    decoration: "",
    misc: "",
    taxes: "",
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Estimate"}
        title={"Estimate Management"}
        showButton={false}
      />
      <Formik initialValues={initialValues}>
        {({ values, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <FlexContainer variant="column-start" gap="md">
              <GridContainer>
                <Input
                  name="hall"
                  labelPlacement="outside"
                  label="Hall"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-800",
                    inputWrapper: "border shadow-none",
                  }}
                  placeholder="Hall"
                  value={values.hall}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.credits?.hall && touched.hall}
                  color={errors.hall && touched.hall ? "danger" : ""}
                  error={errors.hall && touched.hall}
                  errorMessage={errors.hall}
                />

                <Input
                  name="food"
                  labelPlacement="outside"
                  label="Food"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-800",
                    inputWrapper: "border shadow-none",
                  }}
                  placeholder="Food"
                  value={values.food}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.food && touched.food}
                  color={errors.food && touched.food ? "danger" : ""}
                  error={errors.food && touched.food}
                  errorMessage={errors.food}
                />

                <Input
                  name="pax"
                  labelPlacement="outside"
                  label="PAX"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-800",
                    inputWrapper: "border shadow-none",
                  }}
                  placeholder="PAX"
                  value={values.pax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.pax && touched.pax}
                  color={errors.pax && touched.pax ? "danger" : ""}
                  error={errors.pax && touched.pax}
                  errorMessage={errors.pax}
                />

                <Input
                  name="decoration"
                  labelPlacement="outside"
                  label="Decoration"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-800",
                    inputWrapper: "border shadow-none",
                  }}
                  placeholder="Decoration"
                  value={values.decoration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.decoration && touched.decoration}
                  color={
                    errors.decoration && touched.decoration ? "danger" : ""
                  }
                  error={errors.decoration && touched.decoration}
                  errorMessage={errors.decoration}
                />

                <Input
                  name="misc"
                  labelPlacement="outside"
                  label="Misc"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-800",
                    inputWrapper: "border shadow-none",
                  }}
                  placeholder="Misc"
                  value={values.misc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.misc && touched.misc}
                  color={errors.misc && touched.misc ? "danger" : ""}
                  error={errors.misc && touched.misc}
                  errorMessage={errors.misc}
                />

                <Input
                  name="taxes"
                  labelPlacement="outside"
                  label="Taxes"
                  radius="sm"
                  classNames={{
                    label: "font-medium text-zinc-800",
                    inputWrapper: "border shadow-none",
                  }}
                  placeholder="Taxes"
                  value={values.taxes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={errors.taxes && touched.taxes}
                  color={errors.taxes && touched.taxes ? "danger" : ""}
                  error={errors.taxes && touched.taxes}
                  errorMessage={errors.taxes}
                />
              </GridContainer>
              <FlexContainer variant="row-end" gap="md" className={"p-5"}>
                <NextButton colorScheme="badge">Create Estimate</NextButton>
              </FlexContainer>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </FlexContainer>
  );
};

export default CreateEstimate;
