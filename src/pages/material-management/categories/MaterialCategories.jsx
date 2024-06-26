import { Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";

const MainCategories = [
  { value: "kitchen Management", key: "kitchen" },
  { value: "Laundry Management", key: "laundry" },
  {
    value: "House Keeping Management",
    key: "house-keeping",
  },
  {
    key: "electronics",
    value: "Electronics Management",
  },
  {
    key: "miscellaneous",
    value: "Miscellaneous Management",
  },
];

const MaterialCategories = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
  });

  const [categories, setCategories] = useState([
    // dairy products, fruits, vegetables, etc
    { id: 1, category: "Dairy Products" },
    { id: 2, category: "Fruits" },
    { id: 3, category: "Vegetables" },
    { id: 4, category: "Meat" },
    { id: 5, category: "Poultry" },
    { id: 6, category: "Seafood" },
    { id: 7, category: "Grains" },
    { id: 8, category: "Beverages" },
    { id: 9, category: "Canned Goods" },
    { id: 10, category: "Frozen Foods" },
    { id: 11, category: "Bakery" },
    { id: 12, category: "Snacks" },
    { id: 13, category: "Confectionery" },
    { id: 14, category: "Condiments" },
    { id: 15, category: "Spices" },
    { id: 16, category: "Sauces" },
    { id: 17, category: "Oils" },
    { id: 18, category: "Dressings" },
    { id: 19, category: "Desserts" },
  ]);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <FlexContainer variant="column-start" gap="xl" className={"h-full"}>
      <ActionArea
        heading={"Categories"}
        subheading={"Material"}
        title={"Manage Material Categories"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="All Categories"
          isActiveTab={activeTab === 1}
          isError={tabsError[1]}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Create Category"
          isActiveTab={activeTab === 2}
          isError={tabsError[2]}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <FlexContainer variant="column-start" gap="xl">
          <GridContainer className="grid-cols-3 gap-4">
            {categories.map((category) => (
              <FlexContainer
                variant="column-center"
                gap="none"
                className={"bg-zinc-100 rounded-xl p-3 border"}
                key={category.id}
              >
                <h3 className="text-lg font-semibold">{category.category}</h3>
              </FlexContainer>
            ))}
          </GridContainer>
        </FlexContainer>
      )}

      {activeTab === 2 && (
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
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
          }}
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
                      color={
                        touched.category && errors.category ? "danger" : ""
                      }
                      error={touched.category && errors.category}
                      errorMessage={errors.category}
                    />
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
                      items={MainCategories}
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
                        <SelectItem key={item.key}>{item.value}</SelectItem>
                      )}
                    </Select>
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
      )}
    </FlexContainer>
  );
};

export default MaterialCategories;
