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

  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const {
    data: AllCategoriesData,
    error: AllCategoriesError,
    loading: AllCategoriesLoading,
    invalidateCache: invalidateAllCategoriesCache,
    refresh: refreshAllCategories,
    getData: getAllCategoriesData,
  } = useGet({ showToast: false });

  const {
    data: allVendorsData,
    error: allVendorsError,
    loading: allVendorsLoading,
    invalidateCache: invalidateAllVendorsCache,
    refresh: refreshAllVendorsData,
    getData: getAllVendorsData,
  } = useGet({ showToast: false });

  const {
    data: itemsData,
    error: itemsError,
    loading: itemsLoading,
    invalidateCache: invalidateItemsCache,
    refresh: refreshItemsData,
    getData: getItemsData,
  } = useGet({ showToast: false });

  useEffect(() => {
    getAllCategoriesData(
      `${API_URL}/getMinCategories?includeSubCategories=true`,
      "categories"
    );
  }, []);

  useEffect(() => {
    if (activeTab === 3) {
      getAllVendorsData(`${API_URL}/getVendors`, "allVendors");
      getItemsData(`${API_URL}/getItems`, "items");
    }
  }, [activeTab]);

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vendor_category: "",
  });
  const initialValuesItems = {
    items: [
      {
        category: "",
        mainCategory: "",
        productName: "",
        measurementUnit: "",
        unit: "",
        isActive: true,
      },
    ],
  };
  const initialValuesPrice = {
    items: [
      {
        vendorID: "",
        vendorName: "",
        productID: "",
        productName: "",
        price: "",
      },
    ],
  };

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
      invalidateAllVendorsCache("allVendors");
      refreshAllVendorsData();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
    console.log(vendor);
    // resetForm();
  };

  const handleAddItems = async (values, { resetForm }) => {
    const items = values.items.map((item) => {
      return {
        subCategory: item.category,
        mainCategory: item.mainCategory,
        productName: item.productName,
        measurementUnit: item.measurementUnit,
        weight: item.unit,
        status: item.isActive,
      };
    });
    console.log(items);
    try {
      const res = await axios.post(`${API_URL}/createItems`, items);
      const { data } = res;
      console.log(data, "created items");
      toast.success("Items created successfully");
      invalidateItemsCache("items");
      refreshItemsData();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
    // resetForm();
  };

  const handleUpdatePrice = async (values, { resetForm }) => {
    const price = values.items.map((item) => {
      return {
        vendorUniqueId: item.vendorID,
        itemUniqueId: item.productID,
        price: parseInt(item.price),
      };
    });
    console.log(price);
    try {
      const res = await axios.post(`${API_URL}/createPriceList`, {
        items: price,
      });
      const { data } = res;
      console.log(data, "updated price");
      toast.success("Price updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
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
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Create Vendor"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Add Items"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
        <Tab
          title="Price Setting"
          isActiveTab={activeTab === 3}
          onClick={() => handleTabClick(3)}
        />
      </FlexContainer>
      {activeTab === 1 && (
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
                      errorMessage={
                        errors.email && touched.email && errors.email
                      }
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
                      errorMessage={
                        errors.phone && touched.phone && errors.phone
                      }
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
                      items={AllCategoriesData || []}
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
      )}
      {activeTab === 2 && (
        <FlexContainer variant="column-start" gap="xl">
          <h3 className="text-2xl font-semibold text-zinc-900">Add Items</h3>
          <Formik
            initialValues={initialValuesItems}
            validationSchema={Yup.object().shape({
              items: Yup.array().of(
                Yup.object().shape({
                  category: Yup.string().required("Category is required"),
                  mainCategory: Yup.string().required(
                    "Main Category is required"
                  ),
                  productName: Yup.string().required(
                    "Product Name is required"
                  ),
                  measurementUnit: Yup.string().required(
                    "Measurement Unit is required"
                  ),
                  unit: Yup.string().required("Weight is required"),
                  isActive: Yup.string().required("Status is required"),
                })
              ),
            })}
            onSubmit={handleAddItems}
          >
            {({
              isSubmitting,
              values,
              touched,
              errors,
              setFieldValue,
              handleBlur,
              resetForm,
            }) => {
              return (
                <Form>
                  <FlexContainer variant="column-start">
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <Fragment>
                          {values?.items?.length > 0 &&
                            values.items.map((item, index) => (
                              <Fragment key={index}>
                                <h3 className="text-xl font-semibold text-indigo-600">
                                  Item {index + 1}
                                </h3>
                                <GridContainer
                                  gap="lg"
                                  key={index}
                                  className="lg:grid-cols-6"
                                >
                                  <Select
                                    label="Main Category"
                                    labelPlacement="outside"
                                    name={`items.${index}.mainCategory`}
                                    placeholder="Select Main Category"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-900",
                                      trigger: "border shadow-none",
                                    }}
                                    items={AllCategoriesData || []}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.mainCategory`,
                                        e.target.value
                                      );
                                      const category = AllCategoriesData.find(
                                        (category) =>
                                          category.uniqueId === e.target.value
                                      );
                                      setCategories(
                                        category?.subCategories || []
                                      );
                                    }}
                                    isInvalid={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].mainCategory
                                    }
                                    color={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].mainCategory &&
                                      "danger"
                                    }
                                    errorMessage={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].mainCategory
                                    }
                                  >
                                    {(category) => (
                                      <SelectItem key={category.uniqueId}>
                                        {category.name}
                                      </SelectItem>
                                    )}
                                  </Select>
                                  <Select
                                    label="Select Category"
                                    labelPlacement="outside"
                                    name={`items.${index}.category`}
                                    placeholder="Select Category"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-900",
                                      trigger: "border shadow-none",
                                    }}
                                    items={categories}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.category`,
                                        e.target.value
                                      );
                                    }}
                                    isInvalid={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].category
                                    }
                                    color={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].category &&
                                      "danger"
                                    }
                                    errorMessage={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].category
                                    }
                                  >
                                    {(category) => (
                                      <SelectItem key={category?.uniqueId}>
                                        {category.name}
                                      </SelectItem>
                                    )}
                                  </Select>

                                  <Input
                                    label="Product Name"
                                    labelPlacement="outside"
                                    name={`items.${index}.productName`}
                                    placeholder="Enter Product Name"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-900",
                                      inputWrapper: "border shadow-none",
                                    }}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.productName`,
                                        e.target.value
                                      );
                                    }}
                                    isInvalid={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].productName
                                    }
                                    color={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].productName &&
                                      "danger"
                                    }
                                    errorMessage={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].productName
                                    }
                                  />
                                  <Select
                                    label="Measurement Unit"
                                    labelPlacement="outside"
                                    name={`items.${index}.measurementUnit`}
                                    placeholder="Select Measurement Unit"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-900",
                                      trigger: "border shadow-none",
                                    }}
                                    items={[
                                      { value: "gram", key: "gram" },
                                      { value: "kg", key: "kg" },
                                      { value: "litre", key: "litre" },
                                      { value: "ml", key: "ml" },
                                    ]}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.measurementUnit`,
                                        e.target.value
                                      );
                                    }}
                                    isInvalid={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].measurementUnit
                                    }
                                    color={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].measurementUnit &&
                                      "danger"
                                    }
                                    errorMessage={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].measurementUnit
                                    }
                                  >
                                    {(unit) => (
                                      <SelectItem key={unit.key}>
                                        {unit.value}
                                      </SelectItem>
                                    )}
                                  </Select>
                                  <Input
                                    type="number"
                                    name={`items.${index}.unit`}
                                    label="Weight"
                                    labelPlacement="outside"
                                    placeholder="Enter Weight"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-900",
                                      inputWrapper: "border shadow-none",
                                    }}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.unit`,
                                        e.target.value
                                      );
                                    }}
                                    isInvalid={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].unit
                                    }
                                    color={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].unit &&
                                      "danger"
                                    }
                                    errorMessage={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].unit
                                    }
                                  />
                                  <FlexContainer
                                    variant="row-start"
                                    className={"items-center"}
                                    gap="lg"
                                  >
                                    <Checkbox
                                      isSelected={values.items[index].isActive}
                                      onValueChange={(value) =>
                                        setFieldValue(
                                          `items.${index}.isActive`,
                                          value
                                        )
                                      }
                                    >
                                      is Active
                                    </Checkbox>
                                    <NextButton
                                      colorScheme="error"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        arrayHelpers.remove(index);
                                      }}
                                      isIcon
                                    >
                                      <Trash className="w-4 h-4" />
                                    </NextButton>
                                  </FlexContainer>
                                </GridContainer>
                              </Fragment>
                            ))}
                          <FlexContainer
                            variant="row-end"
                            className="items-center p-5"
                          >
                            <NextButton
                              colorScheme="badge"
                              onClick={(e) => {
                                e.preventDefault();
                                arrayHelpers.push({
                                  category: "",
                                  mainCategory: "",
                                  productName: "",
                                  measurementUnit: "",
                                  unit: "",
                                  isActive: true,
                                });
                              }}
                            >
                              Add Item
                            </NextButton>
                          </FlexContainer>
                        </Fragment>
                      )}
                    />

                    <FlexContainer
                      variant="row-end"
                      className="items-center p-5"
                    >
                      <NextButton type="submit" colorScheme="primary">
                        Save Items
                      </NextButton>
                    </FlexContainer>
                  </FlexContainer>
                </Form>
              );
            }}
          </Formik>
        </FlexContainer>
      )}
      {activeTab === 3 && (
        <FlexContainer variant="column-start" gap="xl">
          <Formik
            initialValues={initialValuesPrice}
            validationSchema={Yup.object().shape({
              items: Yup.array().of(
                Yup.object().shape({
                  vendorID: Yup.string().required("Vendor ID is required"),
                  productID: Yup.string().required("Product ID is required"),
                  price: Yup.string().required("Price is required"),
                })
              ),
            })}
            onSubmit={handleUpdatePrice}
          >
            {({
              isSubmitting,
              values,
              touched,
              errors,
              setFieldValue,
              handleBlur,
              resetForm,
            }) => {
              return (
                <Form>
                  <FlexContainer variant="column-start">
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <Fragment>
                          {values?.items?.length > 0 &&
                            values.items.map((item, index) => (
                              <Fragment key={index}>
                                <h3 className="text-xl font-semibold text-indigo-600">
                                  Item {index + 1}
                                </h3>
                                <GridContainer
                                  gap="lg"
                                  key={index}
                                  className="lg:grid-cols-5"
                                >
                                  <Select
                                    label="Select Vendor"
                                    labelPlacement="outside"
                                    name={`items.${index}.vendorID`}
                                    placeholder="Select Vendor"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-900",
                                      trigger: "border shadow-none",
                                    }}
                                    items={allVendorsData || []}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.vendorID`,
                                        e.target.value
                                      );
                                    }}
                                    isInvalid={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].vendorID
                                    }
                                    color={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].vendorID &&
                                      "danger"
                                    }
                                    errorMessage={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].vendorID
                                    }
                                  >
                                    {(vendor) => (
                                      <SelectItem key={vendor?.uniqueId}>
                                        {vendor.vendorName}
                                      </SelectItem>
                                    )}
                                  </Select>
                                  <Select
                                    label="Select Product"
                                    labelPlacement="outside"
                                    name={`items.${index}.productID`}
                                    placeholder="Select Product"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-900",
                                      trigger: "border shadow-none",
                                    }}
                                    items={itemsData || []}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.productID`,
                                        e.target.value
                                      );
                                    }}
                                    isInvalid={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].productID
                                    }
                                    color={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].productID &&
                                      "danger"
                                    }
                                    errorMessage={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].productID
                                    }
                                  >
                                    {(product) => (
                                      <SelectItem key={product?.uniqueId}>
                                        {product?.productName}
                                      </SelectItem>
                                    )}
                                  </Select>
                                  <Input
                                    type="number"
                                    name={`items.${index}.price`}
                                    label="Price"
                                    labelPlacement="outside"
                                    placeholder="Enter Price"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-900",
                                      inputWrapper: "border shadow-none",
                                    }}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.price`,
                                        e.target.value
                                      );
                                    }}
                                    isInvalid={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].price
                                    }
                                    color={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].price &&
                                      "danger"
                                    }
                                    errorMessage={
                                      errors.items &&
                                      errors.items[index] &&
                                      errors.items[index].price
                                    }
                                  />
                                  <FlexContainer
                                    variant="row-start"
                                    className={"items-center"}
                                    gap="lg"
                                  >
                                    <NextButton
                                      colorScheme="error"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        arrayHelpers.remove(index);
                                      }}
                                      isIcon
                                    >
                                      <Trash className="w-4 h-4" />
                                    </NextButton>
                                  </FlexContainer>
                                </GridContainer>
                              </Fragment>
                            ))}
                          <FlexContainer
                            variant="row-end"
                            className="items-center p-5"
                          >
                            <NextButton
                              colorScheme="badge"
                              onClick={(e) => {
                                e.preventDefault();
                                arrayHelpers.push({
                                  vendorID: "",
                                  vendorName: "",
                                  productID: "",
                                  productName: "",
                                  price: "",
                                });
                              }}
                            >
                              Add Price
                            </NextButton>
                          </FlexContainer>
                        </Fragment>
                      )}
                    />
                    <FlexContainer
                      variant="row-end"
                      className="items-center p-5"
                    >
                      <NextButton type="submit" colorScheme="primary">
                        Save Price Setting
                      </NextButton>
                    </FlexContainer>
                  </FlexContainer>
                </Form>
              );
            }}
          </Formik>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default AddVendor;
