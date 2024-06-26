import { Input, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React from "react";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import GridContainer from "../../components/layout/GridContainer";
import NextButton from "../../components/micro/NextButton";

// Create payment
//          Employee name
//          Payment type ( salary/ advance )
//         If payment type is salary
//           Credits :
//              Basic pay
//               Arrears
//               Bonus
//               Misc
//           Debits :
//              Loans
//               Tax
//                Advances/loans
//                Misc

const CreatePayment = () => {
  const initialValues = {
    employeeName: "",
    paymentType: "",
    credits: {
      basicPay: 0,
      arrears: 0,
      bonus: 0,
      misc: 0,
    },
    debits: {
      loans: 0,
      tax: 0,
      advances: 0,
      misc: 0,
    },
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Payment"}
        title={"Create Payment"}
        showButton={false}
      />
      <Formik initialValues={initialValues}>
        {({
          isSubmitting,
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
        }) => {
          return (
            <Form>
              <FlexContainer variant="column-start">
                <GridContainer gap="lg">
                  <Select
                    name="employeeName"
                    label="Employee Name"
                    labelPlacement="outside"
                    placeholder="Select Employee Name"
                    radius="sm"
                    items={[
                      { value: "1", label: "John Doe" },
                      { value: "2", label: "Alice" },
                    ]}
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.employeeName}
                    isInvalid={errors.employeeName && touched.employeeName}
                    color={
                      errors.employeeName && touched.employeeName && "danger"
                    }
                    errorMessage={
                      errors.employeeName &&
                      touched.employeeName &&
                      errors.employeeName
                    }
                  >
                    {(type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    name="paymentType"
                    label="Payment Type"
                    labelPlacement="outside"
                    placeholder="Select Payment Type"
                    radius="sm"
                    items={[
                      { value: "salary", label: "Salary" },
                      { value: "advance", label: "Advance" },
                    ]}
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={handleChange}
                    value={values.paymentType}
                    isInvalid={errors.paymentType && touched.paymentType}
                    color={
                      errors.paymentType && touched.paymentType && "danger"
                    }
                    errorMessage={
                      errors.paymentType &&
                      touched.paymentType &&
                      errors.paymentType
                    }
                  >
                    {(type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    )}
                  </Select>

                  {values.paymentType === "salary" && (
                    <>
                      <Input
                        name="credits.basicPay"
                        labelPlacement="outside"
                        label="Basic Pay"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Basic Pay"
                        value={values.credits.basicPay}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.credits?.basicPay && touched.credits?.basicPay
                        }
                        color={
                          errors.credits?.basicPay && touched.credits?.basicPay
                            ? "danger"
                            : ""
                        }
                        error={
                          errors.credits?.basicPay && touched.credits?.basicPay
                        }
                        errorMessage={errors.credits?.basicPay}
                      />
                      <Input
                        name="credits.arrears"
                        labelPlacement="outside"
                        label="Arrears"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Arrears"
                        value={values.credits.arrears}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.credits?.arrears && touched.credits?.arrears
                        }
                        color={
                          errors.credits?.arrears && touched.credits?.arrears
                            ? "danger"
                            : ""
                        }
                        error={
                          errors.credits?.arrears && touched.credits?.arrears
                        }
                        errorMessage={errors.credits?.arrears}
                      />
                      <Input
                        name="credits.bonus"
                        labelPlacement="outside"
                        label="Bonus"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Bonus"
                        value={values.credits.bonus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.credits?.bonus && touched.credits?.bonus
                        }
                        color={
                          errors.credits?.bonus && touched.credits?.bonus
                            ? "danger"
                            : ""
                        }
                        error={errors.credits?.bonus && touched.credits?.bonus}
                        errorMessage={errors.credits?.bonus}
                      />
                      <Input
                        name="credits.misc"
                        labelPlacement="outside"
                        label="Misc"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Misc"
                        value={values.credits.misc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.credits?.misc && touched.credits?.misc
                        }
                        color={
                          errors.credits?.misc && touched.credits?.misc
                            ? "danger"
                            : ""
                        }
                        error={errors.credits?.misc && touched.credits?.misc}
                        errorMessage={errors.credits?.misc}
                      />
                    </>
                  )}

                  {values.paymentType === "advance" && (
                    <>
                      <Input
                        name="debits.loans"
                        labelPlacement="outside"
                        label="Loans"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Loans"
                        value={values.debits.loans}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.debits?.loans && touched.debits?.loans
                        }
                        color={
                          errors.debits?.loans && touched.debits?.loans
                            ? "danger"
                            : ""
                        }
                        error={errors.debits?.loans && touched.debits?.loans}
                        errorMessage={errors.debits?.loans}
                      />
                      <Input
                        name="debits.tax"
                        labelPlacement="outside"
                        label="Tax"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Tax"
                        value={values.debits.tax}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.debits?.tax && touched.debits?.tax}
                        color={
                          errors.debits?.tax && touched.debits?.tax
                            ? "danger"
                            : ""
                        }
                        error={errors.debits?.tax && touched.debits?.tax}
                        errorMessage={errors.debits?.tax}
                      />
                      <Input
                        name="debits.advances"
                        labelPlacement="outside"
                        label="Advances/Loans"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Advances/Loans"
                        value={values.debits.advances}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={
                          errors.debits?.advances && touched.debits?.advances
                        }
                        color={
                          errors.debits?.advances && touched.debits?.advances
                            ? "danger"
                            : ""
                        }
                        error={
                          errors.debits?.advances && touched.debits?.advances
                        }
                        errorMessage={errors.debits?.advances}
                      />
                      <Input
                        name="debits.misc"
                        labelPlacement="outside"
                        label="Misc"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        placeholder="Misc"
                        value={values.debits.misc}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.debits?.misc && touched.debits?.misc}
                        color={
                          errors.debits?.misc && touched.debits?.misc
                            ? "danger"
                            : ""
                        }
                        error={errors.debits?.misc && touched.debits?.misc}
                        errorMessage={errors.debits?.misc}
                      />
                    </>
                  )}
                </GridContainer>
                <FlexContainer variant="row-end" gap="md" className={"p-5"}>
                  <NextButton colorScheme="primary">Create Payment</NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          );
        }}
      </Formik>
    </FlexContainer>
  );
};

export default CreatePayment;
