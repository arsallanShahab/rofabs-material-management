import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import { MAIN_CATEGORES } from "../../../lib/consts/categories";

const API_URL = import.meta.env.VITE_SERVER_URL;

const AddSubCategories = () => {
  const handleAddSubCategory = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const res = await axios.post(`${API_URL}/createSubCategories`, {
        name: values.category,
        mainCategoryId: values.mainCategory,
      });
      const { data } = await res.data;
      //   invalidateSubCategoriesCache("subCategories");
      //   refreshSubCategories();
      console.log(data);
      toast.success("Sub Category added successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  return (
    <FlexContainer variant="column-start">
      <ActionArea
        heading={"Sub Categories"}
        subheading={"Material Management"}
        title={"Add Sub Categories"}
      />

      <Formik
        initialValues={{
          category: "",
          mainCategory: "",
          status: "",
        }}
        validationSchema={Yup.object().shape({
          category: Yup.string().required("Category Name is required"),
          mainCategory: Yup.string().required("Main Category is required"),
        })}
        onSubmit={handleAddSubCategory}
      >
        {({
          values,
          handleChange,
          handleBlur,
          touched,
          errors,
          setFieldValue,
        }) => {
          return (
            <Form>
              <FlexContainer variant="column-start" gap="xl">
                <GridContainer className="items-center">
                  <Select
                    label="Main Category"
                    labelPlacement="outside"
                    name="mainCategory"
                    placeholder="Select Main Category"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    items={Object.keys(MAIN_CATEGORES).map((key) => ({
                      uniqueId: key,
                      name: MAIN_CATEGORES[key],
                    }))}
                    onChange={(e) => {
                      setFieldValue("mainCategory", e.target.value);
                    }}
                    selectedKeys={
                      values.mainCategory ? [values.mainCategory] : []
                    }
                    isInvalid={errors.mainCategory && touched.mainCategory}
                    color={
                      errors.mainCategory && touched.mainCategory && "danger"
                    }
                    errorMessage={errors.mainCategory && touched.mainCategory}
                  >
                    {(item) => (
                      <SelectItem key={item?.uniqueId}>{item?.name}</SelectItem>
                    )}
                  </Select>
                  <Input
                    type="text"
                    name="category"
                    label="Category Name"
                    placeholder="Enter Category Name"
                    labelPlacement="outside"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      inputWrapper: "border shadow-none",
                    }}
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.category && errors.category}
                    color={touched.category && errors.category ? "danger" : ""}
                    error={touched.category && errors.category}
                    errorMessage={errors.category}
                  />
                  <Checkbox
                    isSelected={values.status}
                    onValueChange={(value) => setFieldValue("status", value)}
                  >
                    is Active
                  </Checkbox>
                </GridContainer>
                <FlexContainer variant="row-start" gap="sm">
                  <NextButton colorScheme="primary" type="submit">
                    Create Category
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

export default AddSubCategories;
