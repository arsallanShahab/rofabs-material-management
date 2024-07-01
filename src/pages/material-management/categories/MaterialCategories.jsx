import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import useGet from "../../../lib/hooks/get-api";

// const MainCategories = [
//   { value: "kitchen Management", key: "kitchen" },
//   { value: "Laundry Management", key: "laundry" },
//   {
//     value: "House Keeping Management",
//     key: "house-keeping",
//   },
//   {
//     key: "electronics",
//     value: "Electronics Management",
//   },
//   {
//     key: "miscellaneous",
//     value: "Miscellaneous Management",
//   },
// ];

const API_URL = import.meta.env.VITE_SERVER_URL;

const MaterialCategories = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("_session"))
  );
  console.log(user);
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

  const {
    data: MainCategoriesData,
    error: MainCategoriesError,
    loading: MainCategoriesLoading,
    invalidateCache: invalidateMainCategoriesCache,
    refresh: refreshMainCategories,
    getData: getMainCategoriesData,
  } = useGet({ showToast: false });

  const {
    data: AllCategoriesData,
    error: AllCategoriesError,
    loading: AllCategoriesLoading,
    invalidateCache: invalidateAllCategoriesCache,
    refresh: refreshAllCategories,
    getData: getAllCategoriesData,
  } = useGet({ showToast: false });

  useEffect(() => {
    getAllCategoriesData(
      `${API_URL}/getMinCategories?includeSubCategories=true`,
      "categories"
    );
    getMainCategoriesData(`${API_URL}/getMinCategories`, "mainCategories");
  }, []);

  console.log(MainCategoriesData);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleAddMainCategory = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const res = await axios.post(`${API_URL}/createMainCategories`, {
        name: values.category,
        status: true,
      });
      const data = await res.data;
      console.log(data, "data");
      invalidateMainCategoriesCache("mainCategories");
      refreshMainCategories();
      toast.success("Main Category added successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleAddSubCategory = async (values, { setSubmitting }) => {
    try {
      console.log(values);
      const res = await axios.post(`${API_URL}/createSubCategories`, {
        name: values.category,
        mainCategoryId: values.mainCategory,
      });
      const { data } = await res.data;
      invalidateAllCategoriesCache("categories");
      refreshAllCategories();
      console.log(data);
      toast.success("Sub Category added successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
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
          title="Create Main Category"
          isActiveTab={activeTab === 2}
          isError={tabsError[2]}
          onClick={() => handleTabClick(2)}
        />
        <Tab
          title="Create Sub Category"
          isActiveTab={activeTab === 3}
          isError={tabsError[3]}
          onClick={() => handleTabClick(3)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <FlexContainer variant="column-start" gap="xl">
          <Table
            aria-label="Purchase Order"
            striped
            hover
            responsive
            className="mt-4"
          >
            <TableHeader>
              <TableColumn>Main Category Name</TableColumn>
              <TableColumn>Sub Categories</TableColumn>
              <TableColumn>Active Status</TableColumn>
              <TableColumn>Created At</TableColumn>
            </TableHeader>
            <TableBody>
              {AllCategoriesData?.map((category) => (
                <TableRow key={category?.uniqueId}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <FlexContainer>
                      {category.subCategories.map((subCategory) => (
                        <div key={subCategory.uniqueId}>
                          {subCategory.name},
                        </div>
                      ))}
                      {category.subCategories.length === 0 &&
                        "No Sub Categories Added Yet"}
                    </FlexContainer>
                  </TableCell>
                  <TableCell>
                    {category.status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    {dayjs(category.createdAt).format("DD MMM, YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FlexContainer>
      )}

      {activeTab === 2 && (
        <Formik
          initialValues={{
            category: "",
          }}
          validationSchema={Yup.object().shape({
            category: Yup.string().required("Category Name is required"),
          })}
          onSubmit={handleAddMainCategory}
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
                  </GridContainer>
                  <FlexContainer variant="row-start" gap="sm">
                    <NextButton colorScheme="primary" type="submit">
                      Create Main Category
                    </NextButton>
                  </FlexContainer>
                </FlexContainer>
              </Form>
            );
          }}
        </Formik>
      )}

      {activeTab === 3 && (
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
                      items={MainCategoriesData}
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
                        <SelectItem key={item?.uniqueId}>
                          {item?.name}
                        </SelectItem>
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
