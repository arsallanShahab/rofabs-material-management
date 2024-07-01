import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
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
import axios from "axios";
import dayjs from "dayjs";
import { FieldArray, Form, Formik } from "formik";
import { Trash } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const VENDOR_DETAILS = [
  { id: 1, vendor_name: "Vendor 1" },
  { id: 2, vendor_name: "Vendor 2" },
  { id: 3, vendor_name: "Vendor 3" },
];

const PRODUCT_DETAILS = [
  {
    id: 1,
    product_name: "Paneer",
    category: "Dairy Products",
    mainCategory: "kitchen",
  },
  {
    id: 2,
    product_name: "Apple",
    category: "Fruits",
    mainCategory: "kitchen",
  },
];

const AddInventory = () => {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const initialValues = {
    items: [
      {
        vendorID: "",
        vendorName: "",
        productID: "",
        productName: "",
        quantity: "",
        incomingDate: null,
        expiryDate: null,
      },
    ],
  };
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
    data: inventoryData,
    error: inventoryError,
    loading: inventoryLoading,
    invalidateCache: invalidateInventoryCache,
    refresh: refreshInventoryData,
    getData: getInventoryData,
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
    if (activeTab === 1) {
      getInventoryData(
        `${API_URL}/getInventory?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
        "inventory"
      );
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 2) {
      getAllVendorsData(`${API_URL}/getVendors`, "allVendors");
      getItemsData(`${API_URL}/getItems`, "items");
    }
  }, [activeTab]);

  const handleAddInventory = async (values) => {
    const { items } = values;
    const itemsData = items.map((item) => {
      return {
        vendorId: item.vendorID,
        productId: item.productID,
        quantity: item.quantity,
        incomingDate: new Date(item.incomingDate).toISOString(),
        expiryDate: new Date(item.expiryDate).toISOString(),
      };
    });
    console.log(itemsData);

    try {
      const res = await axios.post(`${API_URL}/createInventory`, {
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        items: itemsData,
      });
      toast.success(res?.data?.message || "Inventory added successfully");
      invalidateInventoryCache("inventory");
      refreshInventoryData();
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    }
    // API call to add inventory
  };

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Inventory"}
        subheading={"Add"}
        title={"Add Inventory"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Inventory Details"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Add Items to Inventory"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <Table aria-label="inventory">
          <TableHeader>
            <TableColumn>S No.</TableColumn>
            <TableColumn>Vendor Name</TableColumn>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Expiry Date</TableColumn>
            <TableColumn>Incoming Date</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {!inventoryLoading &&
              inventoryData?.map((inventory, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{inventory.vendorName}</TableCell>
                  <TableCell>{inventory.productName}</TableCell>
                  <TableCell>{inventory.quantity}</TableCell>
                  <TableCell>
                    {dayjs(inventory.expiryDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    {dayjs(inventory.incomingDate).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <NextButton
                      onClick={async () => {
                        try {
                          const res = await axios.delete(
                            `${API_URL}/deleteInventory?uniqueId=${inventory.uniqueId}`
                          );
                          toast.success(
                            res?.data?.message ||
                              "Inventory deleted successfully"
                          );
                          invalidateInventoryCache("inventory");
                          refreshInventoryData();
                        } catch (error) {
                          toast.error(
                            error?.response?.data?.error || "An error occurred"
                          );
                        }
                      }}
                      colorScheme="error"
                      isIcon
                    >
                      <Trash className="w-4 h-4" />
                    </NextButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      {activeTab === 2 && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleAddInventory}
          validationSchema={Yup.object().shape({
            items: Yup.array().of(
              Yup.object().shape({
                vendorID: Yup.string().required("Vendor is required"),
                productID: Yup.string().required("Product is required"),
                quantity: Yup.number().required("Quantity is required").min(1),
                incomingDate: Yup.date().required("Incoming Date is required"),
                expiryDate: Yup.date().required("Expiry Date is required"),
              })
            ),
          })}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form>
              <FlexContainer variant="column-start" gap="lg">
                <FieldArray
                  name="items"
                  render={(arrayHelpers) => (
                    <FlexContainer variant="column-start" gap="lg">
                      {values?.items?.length > 0 &&
                        values.items.map((item, index) => {
                          return (
                            <Fragment key={index}>
                              <p className="font-medium text-rose-600">
                                Item {index + 1}
                              </p>

                              <GridContainer
                                gap="lg"
                                key={index}
                                className="md:grid-cols-4 lg:grid-cols-6"
                              >
                                <Select
                                  label="Select Vendor"
                                  labelPlacement="outside"
                                  name={`items[${index}].vendorID`}
                                  placeholder="Select Vendor"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    trigger: "border shadow-none",
                                  }}
                                  items={allVendorsData || []}
                                  selectedKeys={
                                    values.items[index].vendorID
                                      ? [values.items[index].vendorID]
                                      : []
                                  }
                                  onChange={(e) => {
                                    setFieldValue(
                                      `items[${index}].vendorID`,
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
                                    errors.items[index].vendorID
                                  }
                                  error={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].vendorID
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].vendorID
                                  }
                                >
                                  {(vendor) => (
                                    <SelectItem key={vendor?.uniqueId}>
                                      {vendor?.vendorName}
                                    </SelectItem>
                                  )}
                                </Select>
                                <Select
                                  label="Select Product"
                                  labelPlacement="outside"
                                  name={`items[${index}].productID`}
                                  placeholder="Select Product"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    trigger: "border shadow-none",
                                  }}
                                  items={itemsData || []}
                                  // selectedKeys={
                                  //   values.items[index].productID
                                  //     ? [values.items[index].productID]
                                  //     : []
                                  // }
                                  onChange={(e) => {
                                    setFieldValue(
                                      `items[${index}].productID`,
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
                                    errors.items[index].productID
                                  }
                                  error={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].productID
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
                                  label="Product Quantity"
                                  labelPlacement="outside"
                                  name={`items[${index}].quantity`}
                                  type="number"
                                  placeholder="Enter Product Quantity"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-900",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.items[index].quantity}
                                  isInvalid={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].quantity
                                  }
                                  error={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].quantity
                                  }
                                  color={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].quantity
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].quantity
                                  }
                                />

                                <Input
                                  name={`items[${index}].incomingDate`}
                                  labelPlacement="outside"
                                  label="Incoming Date"
                                  type="date"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-800",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  value={values.items[index].incomingDate}
                                  onChange={(date) => {
                                    setFieldValue(
                                      `items[${index}].incomingDate`,
                                      date.target.value
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].incomingDate
                                  }
                                  color={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].incomingDate
                                  }
                                  error={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].incomingDate
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].incomingDate
                                  }
                                />
                                <Input
                                  name={`items[${index}].expiryDate`}
                                  labelPlacement="outside"
                                  label="Expiry Date"
                                  type="date"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-800",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  value={values.items[index].expiryDate}
                                  onChange={(date) => {
                                    setFieldValue(
                                      `items[${index}].expiryDate`,
                                      date.target.value
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].expiryDate
                                  }
                                  color={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].expiryDate
                                  }
                                  error={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].expiryDate
                                  }
                                  errorMessage={
                                    errors.items &&
                                    errors.items[index] &&
                                    errors.items[index].expiryDate
                                  }
                                />
                                <FlexContainer variant="row-center">
                                  <NextButton
                                    onClick={() => arrayHelpers.remove(index)}
                                    colorScheme="error"
                                    type="button"
                                    isIcon
                                  >
                                    <Trash className="w-4 h-4" /> Delete
                                  </NextButton>
                                </FlexContainer>
                              </GridContainer>
                            </Fragment>
                          );
                        })}
                      <FlexContainer variant="row-end">
                        <NextButton
                          type="button"
                          colorScheme="badge"
                          onClick={() =>
                            arrayHelpers.push({
                              vendorID: "",
                              vendorName: "",
                              productID: "",
                              productName: "",
                              quantity: "",
                              incomingDate: null,
                              expiryDate: null,
                            })
                          }
                        >
                          Add Item
                        </NextButton>
                      </FlexContainer>
                    </FlexContainer>
                  )}
                />

                <FlexContainer variant="row-end">
                  <NextButton type="submit" colorScheme="primary">
                    Add above Items to Inventory
                  </NextButton>
                </FlexContainer>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      )}
    </FlexContainer>
  );
};

export default AddInventory;
