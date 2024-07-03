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
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import { MAIN_CATEGORES } from "../../../lib/consts/categories";
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
    data: mainCategoriesData,
    error: mainCategoriesError,
    loading: mainCategoriesLoading,
    invalidateCache: invalidateMainCategoriesCache,
    refresh: refreshMainCategories,
    getData: getMainCategoriesData,
  } = useGet({ showToast: false });

  const {
    data: subCategoriesData,
    error: subCategoriesError,
    loading: subCategoriesLoading,
    invalidateCache: invalidateSubCategoriesCache,
    refresh: refreshSubCategories,
    getData: getSubCategoriesData,
  } = useGet({ showToast: false });

  useEffect(() => {
    getSubCategoriesData(`${API_URL}/getSubCategories`, "subCategories");
    getMainCategoriesData(`${API_URL}/getMinCategories`, "mainCategories");
  }, []);

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

  return (
    <FlexContainer variant="column-start" gap="xl" className={"h-full"}>
      <ActionArea
        heading={"Categories"}
        subheading={"Material"}
        title={"Manage Material Categories"}
        showButton={true}
        buttonText={"Create Sub Category"}
        buttonHref={"/material-management/categories/sub-categories/add"}
      />

      <FlexContainer variant="row-end">
        <div>
          <Select
            name="mainCategory"
            placeholder="Select Main Category"
            radius="sm"
            classNames={{
              label: "font-medium text-zinc-900",
              trigger: "border shadow-none w-64",
            }}
            items={Object.keys(MAIN_CATEGORES).map((key) => ({
              uniqueId: key,
              name: MAIN_CATEGORES[key],
            }))}
          >
            {(item) => (
              <SelectItem key={item?.uniqueId}>{item?.name}</SelectItem>
            )}
          </Select>
        </div>
      </FlexContainer>

      <FlexContainer variant="column-start" gap="xl">
        <Table
          aria-label="Purchase Order"
          striped
          hover
          responsive
          className="mt-4"
        >
          <TableHeader>
            <TableColumn>Sub Category Name</TableColumn>
            {/* <TableColumn>Main Category</TableColumn> */}
            <TableColumn>Active Status</TableColumn>
            <TableColumn>Created At</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {!subCategoriesLoading &&
              subCategoriesData?.length &&
              subCategoriesData?.map((category) => (
                <TableRow key={category?.uniqueId}>
                  <TableCell>{category.name}</TableCell>
                  {/* <TableCell>{category.mainCategory.name}</TableCell> */}
                  <TableCell>
                    {category.status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    {dayjs(category.createdAt).format("DD MMM, YYYY")}
                  </TableCell>
                  <TableCell>
                    <NextButton
                      isIcon
                      colorScheme="badge"
                      onClick={async () => {
                        try {
                          const res = await axios.delete(
                            `${API_URL}/deleteSubCategory?uniqueId=${category?.uniqueId}`
                          );
                          toast.success(
                            res?.data?.message ||
                              "Sub Category deleted successfully"
                          );
                          invalidateSubCategoriesCache("subCategories");
                          refreshSubCategories();
                        } catch (error) {
                          toast.error(
                            error?.response?.data?.error ||
                              "Something went wrong"
                          );
                        }
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </NextButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </FlexContainer>

      {activeTab === 3 && (
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
    </FlexContainer>
  );
};

export default MaterialCategories;
