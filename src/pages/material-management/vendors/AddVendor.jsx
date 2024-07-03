import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
  Checkbox,
  DateInput,
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
import { Field, FieldArray, Form, Formik } from "formik";
import React, { Fragment, act, useEffect, useState } from "react";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import { AddVendorsValidation } from "../../../lib/validation/material-management/vendor";

import { useDateFormatter } from "@react-aria/i18n";
import axios, { AxiosError } from "axios";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import Tab from "../../../components/micro/Tab";
import { MAIN_CATEGORES } from "../../../lib/consts/categories";
import useGet from "../../../lib/hooks/get-api";

const ITEMS_DATA = [
  {
    id: 1,
    name: "Paneer",
    category: "Dairy",
    mainCategory: "Kitchen",
    status: "active",
  },
  {
    id: 2,
    name: "Dettol Handwash",
    category: "Sanitizer",
    mainCategory: "House Keeping",
    status: "active",
  },
  {
    id: 3,
    name: "OnePlus 12R",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 4,
    name: "Samsung Galaxy S21",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 5,
    name: "Dell XPS 15",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 6,
    name: "HP Pavilion",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 7,
    name: "Lenovo Thinkpad",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 8,
    name: "Apple MacBook Pro",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 9,
    name: "Apple iPhone 13",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 10,
    name: "Apple iPad Pro",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 11,
    name: "Apple Watch Series 7",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 12,
    name: "Apple AirPods Pro",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 13,
    name: "Apple HomePod Mini",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 14,
    name: "Apple AirTag",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
  {
    id: 15,
    name: "Apple TV 4K",
    category: "Electronics",
    mainCategory: "Electronics",
    status: "active",
  },
];

const VENDORS_DATA = [
  {
    id: 1,
    vendor_name: "Rofabs",
    vendor_email: "rofabs@gmail.com",
    vendor_phone: "08012345678",
    vendor_address: "No 1, Rofabs street, Lagos",
    vendor_category: "Laundry",
  },
  {
    id: 2,
    vendor_name: "Laundry Masters",
    vendor_email: "laundry@gamilc.com",
    vendor_phone: "08012345678",
    vendor_address: "No 1, Laundry street, Lagos",
    vendor_category: "Laundry",
  },
];

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

const CATEGORIES_DATA = [
  {
    id: 1,
    category: "Dairy Products",
    mainCategory: "kitchen",
    status: "active",
  },
  {
    id: 2,
    category: "Fruits",
    mainCategory: "kitchen",
    status: "active",
  },
  {
    id: 3,
    category: "Detergent",
    mainCategory: "house-keeping",
    status: "active",
  },
  {
    id: 3,
    category: "Vegetables",
    mainCategory: "kitchen",
    status: "active",
  },
];

const API_URL = import.meta.env.VITE_SERVER_URL;

const AddVendor = () => {
  const [categories, setCategories] = useState([]);

  const {
    data: AllCategoriesData,
    error: AllCategoriesError,
    loading: AllCategoriesLoading,
    invalidateCache: invalidateAllCategoriesCache,
    refresh: refreshAllCategories,
    getData: getAllCategoriesData,
  } = useGet({ showToast: false });

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vendor_category: "",
  });

  const handleAddVendor = async (values, { resetForm }) => {
    const vendor = {
      vendorName: values.name,
      vendorEmail: values.email,
      vendorPhoneNumber: values.phone,
      vendorAddress: values.address,
      vendorCategory: values.vendor_category,
      vendorStatus: true,
    };
    try {
      const res = await axios.post(`${API_URL}/createVendor`, vendor);
      const { data } = res;
      console.log(data, "created vendor");
      toast.success("Vendor created successfully");
      // invalidateAllVendorsCache("allVendors");
      // refreshAllVendorsData();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
    console.log(vendor);
    // resetForm();
  };

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Add"}
        subheading={"Vendors"}
        title={"Create Vendor"}
        showButton={false}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={AddVendorsValidation}
        onSubmit={handleAddVendor}
      >
        {({
          isSubmitting,
          values,
          touched,
          errors,
          setFieldValue,
          handleSubmit,
        }) => {
          return (
            <Form>
              <FlexContainer variant="column-start" gap="2xl">
                <GridContainer gap="lg">
                  {" "}
                  <Input
                    type="text"
                    name="name"
                    label="Vendor Name"
                    labelPlacement="outside"
                    placeholder="Enter vendor name"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("name", e.target.value);
                    }}
                    isInvalid={errors.name && touched.name}
                    color={errors.name && touched.name && "danger"}
                    errorMessage={errors.name && touched.name && errors.name}
                  />
                  <Input
                    type="email"
                    name="email"
                    label="Vendor Email"
                    labelPlacement="outside"
                    placeholder="Enter vendor email"
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
                    errorMessage={errors.email && touched.email && errors.email}
                  />
                  <Input
                    type="tel"
                    name="phone"
                    label="Vendor Phone Number"
                    labelPlacement="outside"
                    placeholder="Enter vendor Phone Number"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("phone", e.target.value);
                    }}
                    isInvalid={errors.phone && touched.phone}
                    color={errors.phone && touched.phone && "danger"}
                    errorMessage={errors.phone && touched.phone && errors.phone}
                  />
                  <Input
                    type="text"
                    name="address"
                    label="Vendor Address"
                    labelPlacement="outside"
                    placeholder="Enter vendor Address"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-100",
                      inputWrapper: "border shadow-none",
                    }}
                    onChange={(e) => {
                      setFieldValue("address", e.target.value);
                    }}
                    isInvalid={errors.address && touched.address}
                    color={errors.address && touched.address && "danger"}
                    errorMessage={
                      errors.address && touched.address && errors.address
                    }
                  />
                  <Select
                    label="Vendor Category"
                    labelPlacement="outside"
                    name="category"
                    placeholder="Select vendor category"
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
                      setFieldValue("vendor_category", e.target.value);
                    }}
                    isInvalid={
                      errors.vendor_category && touched.vendor_category
                    }
                    color={
                      errors.vendor_category &&
                      touched.vendor_category &&
                      "danger"
                    }
                    errorMessage={
                      errors.vendor_category &&
                      touched.vendor_category &&
                      errors.vendor_category
                    }
                  >
                    {(categories) => (
                      <SelectItem key={categories?.uniqueId}>
                        {categories.name}
                      </SelectItem>
                    )}
                  </Select>
                </GridContainer>
                <FlexContainer
                  variant="row-end"
                  className="items-center p-5 mt-5"
                >
                  <NextButton type="submit" colorScheme="primary">
                    Create Vendor
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

export default AddVendor;
