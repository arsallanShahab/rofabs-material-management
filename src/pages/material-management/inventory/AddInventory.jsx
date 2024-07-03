import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
  DateInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { EllipsisVertical, Trash } from "lucide-react";
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

  useEffect(() => {
    getInventoryData(
      `${API_URL}/getInventory?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
      "inventory"
    );
  }, []);

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Inventory"}
        subheading={"Add"}
        title={"Purchase Order"}
        showButton={true}
        buttonHref={"/material-management/inventory/purchase-order/create"}
        buttonText={"Create Purchase Order"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab title="Purchase History" isActiveTab={true} />
      </FlexContainer>
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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Vendor 1</TableCell>
            <TableCell>Paneer</TableCell>
            <TableCell>10</TableCell>
            <TableCell>12/12/2021</TableCell>
            <TableCell>12/12/2021</TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <NextButton isIcon colorScheme="flat">
                    <EllipsisVertical className="w-4 h-4" />
                  </NextButton>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
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
                          res?.data?.message || "Inventory deleted successfully"
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
    </FlexContainer>
  );
};

export default AddInventory;
