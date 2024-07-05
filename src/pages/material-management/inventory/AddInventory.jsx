import { getLocalTimeZone, parseDate } from "@internationalized/date";
import {
  Checkbox,
  DateInput,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
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

const PURCHASE_ORDER = [
  {
    id: 1,
    vendor_name: "Rofabs",
    incomingDate: "2021-09-01",
    items: [
      { productName: "Vaccum Cleaner", category: "Electronics", quantity: 5 },
      { productName: "Soap Bar", category: "Laundry", quantity: 2 },
    ],
  },
  {
    id: 2,
    vendor_name: "Laundry Masters",
    incomingDate: "2021-09-01",
    items: [
      { productName: "Towel", category: "Laundry", quantity: 5 },
      { productName: "Bed Sheet", category: "Laundry", quantity: 2 },
    ],
  },
];

const AddInventory = () => {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState({});

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
        <Tab
          title="Purchase History"
          isActiveTab={activeTab == 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="In Transit"
          isActiveTab={activeTab == 2}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 2 && (
        <Table aria-label="inventory">
          <TableHeader>
            <TableColumn>S No.</TableColumn>
            <TableColumn>Vendor Name</TableColumn>

            <TableColumn>Quantity</TableColumn>
            <TableColumn>Incoming Date</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {PURCHASE_ORDER?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.vendor_name}</TableCell>
                <TableCell>
                  {item?.items?.map((item, index) => (
                    <div key={index}>
                      {item.productName} - {item.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{item.incomingDate}</TableCell>
                <TableCell>Ordered</TableCell>
                <TableCell>
                  <NextButton
                    colorScheme="badge"
                    onClick={() => {
                      setSelectedPurchaseOrder(item);
                      onOpen();
                      // setActiveTab(2)
                    }}
                  >
                    View
                  </NextButton>
                </TableCell>
              </TableRow>
            ))}
            {/* <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Vendor 1</TableCell>
              <TableCell>Paneer</TableCell>
              <TableCell>10</TableCell>
              <TableCell>12/12/2021</TableCell>
              <TableCell>
                Ordered
            
              </TableCell>
              <TableCell>
                <NextButton
                  colorScheme="badge"
                  onClick={() => {
                    setSelectedPurchaseOrder(item);
                    onOpen();
                    // setActiveTab(2)
                  }}
                >
                  View
                </NextButton>
              </TableCell>
            </TableRow> */}
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
      <Modal
        classNames={{
          backdrop: "z-[550]",
          wrapper: "z-[600]",
        }}
        size="4xl"
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold">
                  Purchase Order Details
                </h2>
              </ModalHeader>
              <ModalBody>
                <FlexContainer variant="column-start">
                  <Select
                    label="Select Purchase Status"
                    labelPlacement="outside"
                    name={`orderedStatus`}
                    placeholder="Select Purchase Status"
                    radius="sm"
                    classNames={{
                      label: "font-medium text-zinc-900",
                      trigger: "border shadow-none",
                    }}
                    items={[
                      { uniqueId: 1, status: "Ordered" },
                      { uniqueId: 2, status: "In House" },
                      { uniqueId: 3, status: "Damaged" },
                    ]}
                  >
                    {(status) => (
                      <SelectItem key={status?.uniqueId}>
                        {status?.status}
                      </SelectItem>
                    )}
                  </Select>
                  {selectedPurchaseOrder?.items.map((item, index) => (
                    <Formik
                      key={index}
                      initialValues={{
                        orderedStatus: "",
                        expiryDate: "",
                        productName: item.productName,
                        category: item.category,
                        quantity: item.quantity,
                        isReceived: false,
                        recievedQuantity: 0,
                        isDamaged: false,
                        damagedQuantity: 0,
                        description: "",
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        console.log("values", values);
                      }}
                    >
                      {({
                        values,
                        errors,
                        touched,
                        // handleSubmit,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                      }) => (
                        <Form>
                          <FlexContainer variant="column-start" gap="md">
                            <h3 className="text-lg font-semibold text-zinc-900">
                              Item {index + 1}
                            </h3>
                            <GridContainer gap="lg">
                              <Input
                                name="productName"
                                label="Product Name"
                                labelPlacement="outside"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-900",
                                  inputWrapper: "border shadow-none",
                                }}
                                value={item.productName}
                                isReadOnly
                              />
                              <Input
                                name="category"
                                label="Category"
                                labelPlacement="outside"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-800",
                                  inputWrapper: "border shadow-none",
                                }}
                                value={item.category}
                                isReadOnly
                              />
                              <Input
                                type="number"
                                min="1"
                                name="quantity"
                                label="Quantity"
                                labelPlacement="outside"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-800",
                                  inputWrapper: "border shadow-none",
                                }}
                                value={item.quantity}
                              />
                              <Input
                                name="expiryDate"
                                label="Expiry Date"
                                labelPlacement="outside"
                                radius="sm"
                                classNames={{
                                  label: "font-medium text-zinc-900",
                                  inputWrapper: "border shadow-none",
                                }}
                                value={values.expiryDate}
                              />
                              <Checkbox
                                name="isReceived"
                                label="Received"
                                value={values.isReceived}
                                onValueChange={(value) => {
                                  setFieldValue("isReceived", value);
                                  if (value) {
                                    setFieldValue(
                                      "recievedQuantity",
                                      item.quantity
                                    );
                                  }
                                }}
                                onBlur={handleBlur}
                                isInvalid={
                                  errors.isReceived && touched.isReceived
                                }
                                color={
                                  errors.isReceived && touched.isReceived
                                    ? "danger"
                                    : ""
                                }
                                error={errors.isReceived && touched.isReceived}
                                errorMessage={errors.isReceived}
                              >
                                Received
                              </Checkbox>
                              {values.isReceived && (
                                <Input
                                  type="number"
                                  min="1"
                                  name="recievedQuantity"
                                  label="Received Quantity"
                                  labelPlacement="outside"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-800",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  value={values.recievedQuantity}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    errors.recievedQuantity &&
                                    touched.recievedQuantity
                                  }
                                  color={
                                    errors.recievedQuantity &&
                                    touched.recievedQuantity
                                      ? "danger"
                                      : ""
                                  }
                                  error={
                                    errors.recievedQuantity &&
                                    touched.recievedQuantity
                                  }
                                  errorMessage={errors.recievedQuantity}
                                />
                              )}
                              <Checkbox
                                name="damages"
                                label="Damages"
                                value={values.damages}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.damages && touched.damages}
                                color={
                                  errors.damages && touched.damages
                                    ? "danger"
                                    : ""
                                }
                                error={errors.damages && touched.damages}
                                errorMessage={errors.damages}
                              >
                                Damages
                              </Checkbox>
                              {values.damages && (
                                <Input
                                  name="description"
                                  labelPlacement="outside"
                                  label="Description"
                                  radius="sm"
                                  classNames={{
                                    label: "font-medium text-zinc-800",
                                    inputWrapper: "border shadow-none",
                                  }}
                                  placeholder="Enter description"
                                  value={values.description}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={
                                    errors.description && touched.description
                                  }
                                  color={
                                    errors.description && touched.description
                                      ? "danger"
                                      : ""
                                  }
                                  error={
                                    errors.description && touched.description
                                  }
                                  errorMessage={errors.description}
                                />
                              )}
                            </GridContainer>
                            <FlexContainer variant="row-end">
                              <NextButton
                                type="submit"
                                onClick={() => {
                                  //update the items array in formik state
                                  const updatedItems = items.map((item, i) => {
                                    if (i === index) {
                                      return {
                                        ...item,
                                        ...values,
                                      };
                                    }
                                    return item;
                                  });
                                  setItems(updatedItems);
                                }}
                                colorScheme="badge"
                              >
                                Update Item
                              </NextButton>
                            </FlexContainer>
                          </FlexContainer>
                        </Form>
                      )}
                    </Formik>
                  ))}
                  {/* <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold">Items</h3>
                    <Table>
                      <TableBody></TableBody>
                    </Table>
                  </div> */}
                </FlexContainer>
              </ModalBody>
              <ModalFooter>
                <NextButton onClick={onClose}>Close</NextButton>
                <NextButton colorScheme="primary">Save</NextButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </FlexContainer>
  );
};

export default AddInventory;
