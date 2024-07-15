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
import { Trash } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import { API_TAGS } from "../../../lib/consts/API_TAGS";
import { MAIN_CATEGORES } from "../../../lib/consts/categories";
import useGet from "../../../lib/hooks/get-api";
import { AddLaundryOutwardValidation } from "../../../lib/validation/material-management/laundry";

const API_URL = import.meta.env.VITE_SERVER_URL;

const ITEMS_DATA = [
  {
    id: 1,
    vendor_name: "Rofabs",
    vendor_email: "rofabs@gmail.com",
    vendor_phone: "08012345678",
    vendor_address: "No 1, Rofabs street, Lagos",
    vendor_category: "Laundry",
    vendor_items: [
      {
        productID: 1,
        productName: "Vaccum Cleaner",
        category: "Electronics",
        quantity: 10,
      },
      {
        productID: 2,
        productName: "Soap Bar",
        category: "Laundry",
        quantity: 5,
      },
      {
        productID: 3,
        productName: "Detergent",
        category: "Laundry",
        quantity: 20,
      },
    ],
  },
  {
    id: 2,
    vendor_name: "Laundry Masters",
    vendor_email: "laundry@gamilc.com",
    vendor_phone: "08012345678",
    vendor_address: "No 1, Laundry street, Lagos",
    vendor_category: "Laundry",
    vendor_items: [
      { productID: 1, productName: "Towel", category: "Laundry", quantity: 10 },
      {
        productID: 2,
        productName: "Bed Sheet",
        category: "Laundry",
        quantity: 5,
      },
      {
        productID: 3,
        productName: "Pillow Case",
        category: "Laundry",
        quantity: 20,
      },
    ],
  },
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

const OUTWARD_DATA = [
  {
    id: 1,
    vendor_name: "Rofabs",
    outDate: "2021-09-01",
    items: [
      { productName: "Vaccum Cleaner", category: "Electronics", quantity: 5 },
      { productName: "Soap Bar", category: "Laundry", quantity: 2 },
    ],
  },
  {
    id: 2,
    vendor_name: "Laundry Masters",
    outDate: "2021-09-01",
    items: [
      { productName: "Towel", category: "Laundry", quantity: 5 },
      { productName: "Bed Sheet", category: "Laundry", quantity: 2 },
    ],
  },
];

const LaundryManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedInward, setSelectedInward] = useState({});

  const [initialValues, setInitialValues] = useState({
    vendorId: "",
    outDate: "",
    items: [
      {
        productId: "",
        quantity: "",
      },
    ],
  });

  const {
    data: utilizationData,
    error: utilizationError,
    loading: utilizationLoading,
    invalidateCache: invalidateUtilizationCache,
    refresh: refreshUtilizationData,
    getData: getUtilizationData,
  } = useGet({ showToast: false });

  const {
    data: itemsData,
    error: itemsError,
    loading: itemsLoading,
    invalidateCache: invalidateItemsCache,
    refresh: refreshItemsData,
    getData: getItemsData,
  } = useGet({ showToast: false });

  const {
    data: allVendorsData,
    error: allVendorsError,
    loading: allVendorsLoading,
    invalidateCache: invalidateAllVendorsCache,
    refresh: refreshAllVendorsData,
    getData: getAllVendorsData,
  } = useGet({ showToast: false });

  const handleSubmitOutward = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const items = values.items.map((item) => {
        return {
          productId: item.productId,
          noOfProducts: item.quantity,
          vendorId: values.vendorId,
        };
      });
      const data = {
        items,
        propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
        outDate: new Date(values.outDate).toISOString(),
      };

      const res = await axios.post(`${API_URL}/createLaundryOutward`, data);
      toast.success(res?.data?.message || "Outward created successfully");
    } catch (error) {
      toast.error(error?.response?.data?.error || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (activeTab == 1) {
      getUtilizationData(
        `${API_URL}/getLaundryOutwards?propertyId=2a869149-342b-44c8-ad86-8f6465970638`,
        "laundryOutwards"
      );
    }
    if (activeTab == 2) {
      getItemsData(
        `${API_URL}/inhouse?mainCategoryName=${MAIN_CATEGORES.LAUNDRY_MANAGEMENT}`,
        API_TAGS.GET_LAUNDRY_LIST
      );
      getAllVendorsData(`${API_URL}/getVendors`, "allVendors");
    }
  }, [activeTab]);

  return (
    <>
      <FlexContainer variant="column-start" gap="xl">
        <ActionArea
          heading={"Management"}
          subheading={"Laundry"}
          title={"Laundry Management"}
          showButton={true}
          buttonHref={"config"}
          buttonText={"Laundry Configurations"}
        />
        <FlexContainer variant="row-between">
          <FlexContainer variant="row-start" className="overflow-x-auto">
            <Tab
              title="In Transit"
              isActiveTab={activeTab === 1}
              onClick={() => handleTabClick(1)}
            />
            <Tab
              title="Outward"
              isActiveTab={activeTab === 2}
              onClick={() => handleTabClick(2)}
            />
            <Tab
              title="Invoice"
              isActiveTab={activeTab === 3}
              onClick={() => handleTabClick(3)}
            />
          </FlexContainer>
          <NextButton colorScheme="flat" className="text-blue-500 underline">
            View Consumption Report
          </NextButton>
        </FlexContainer>
        {activeTab === 1 && (
          <FlexContainer variant="column-start">
            <h3 className="text-lg font-semibold">Transit List</h3>
            <Table aria-label="Inward List">
              <TableHeader>
                <TableColumn>Vendor Name</TableColumn>
                <TableColumn>No of Products</TableColumn>
                <TableColumn>Out Date</TableColumn>
                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                {!utilizationLoading &&
                  utilizationData?.length &&
                  utilizationData?.map((item) => (
                    <TableRow key={item?.uniqueId}>
                      <TableCell>{item?.vendorName}</TableCell>
                      <TableCell>{item?.noOfProducts}</TableCell>
                      <TableCell>
                        {dayjs(item?.outDate).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        <NextButton>Delete</NextButton>
                      </TableCell>
                    </TableRow>
                  ))}

                {/* {OUTWARD_DATA.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.vendor_name}</TableCell>
                    <TableCell>{item.outDate}</TableCell>
                    <TableCell>
                      <NextButton
                        colorScheme="badge"
                        onClick={() => {
                          setSelectedInward(item);
                          onOpen();
                          // setActiveTab(2)
                        }}
                      >
                        View
                      </NextButton>
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </FlexContainer>
        )}
        {activeTab === 2 && (
          <FlexContainer variant="column-start">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object().shape({
                items: Yup.array().of(
                  Yup.object().shape({
                    productId: Yup.string().required("Please select a product"),
                    quantity: Yup.number().required("Please enter quantity"),
                  })
                ),
                vendorId: Yup.string().required("Please select a vendor"),
                outDate: Yup.date().required("Please enter out date"),
              })}
              onSubmit={handleSubmitOutward}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                // handleSubmit,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => (
                <Form>
                  <FlexContainer variant="column-start" gap="2xl">
                    <h3 className="text-2xl font-semibold text-zinc-900">
                      Add Items to Outward List
                    </h3>
                    <FieldArray
                      name="items"
                      render={(arrayHelpers) => (
                        <FlexContainer variant="column-start">
                          {values?.items?.length > 0 &&
                            values.items.map((item, index) => (
                              <Fragment key={index}>
                                <GridContainer
                                  gap="lg"
                                  className="lg:grid-cols-4"
                                >
                                  <Select
                                    name={`items.${index}.productId`}
                                    label="Product Name"
                                    labelPlacement="outside"
                                    placeholder="Select a product"
                                    radius="sm"
                                    items={itemsData || []}
                                    classNames={{
                                      label: "font-medium text-zinc-100",
                                      inputWrapper: "border shadow-none",
                                    }}
                                    onChange={(e) => {
                                      setFieldValue(
                                        `items.${index}.productId`,
                                        e.target.value
                                      );
                                    }}
                                  >
                                    {(item) => (
                                      <SelectItem key={item?.productId}>
                                        {item?.productName}
                                      </SelectItem>
                                    )}
                                  </Select>

                                  <Input
                                    type="number"
                                    min="1"
                                    name={`items.${index}.quantity`}
                                    labelPlacement="outside"
                                    label="Quantity"
                                    radius="sm"
                                    classNames={{
                                      label: "font-medium text-zinc-800",
                                      inputWrapper: "border shadow-none",
                                    }}
                                    placeholder="Enter quantity"
                                    value={values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={
                                      errors.quantity && touched.quantity
                                    }
                                    color={
                                      errors.quantity && touched.quantity
                                        ? "danger"
                                        : ""
                                    }
                                    error={errors.quantity && touched.quantity}
                                    errorMessage={errors.quantity}
                                  />
                                  <FlexContainer variant="row-start">
                                    <NextButton
                                      colorScheme="error"
                                      isIcon
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                      }}
                                    >
                                      <Trash className="w-4 h-4" />
                                    </NextButton>
                                  </FlexContainer>
                                </GridContainer>
                              </Fragment>
                            ))}
                          <FlexContainer variant="row-end">
                            <NextButton
                              colorScheme="badge"
                              onClick={() =>
                                arrayHelpers.push({
                                  productID: "",
                                  productName: "",
                                  quantity: "",
                                })
                              }
                            >
                              Add Item
                            </NextButton>
                          </FlexContainer>
                        </FlexContainer>
                      )}
                    />

                    <h3 className="text-2xl font-semibold text-zinc-900">
                      Vendor Details
                    </h3>
                    <GridContainer gap="lg">
                      <Select
                        label="Select Vendor"
                        labelPlacement="outside"
                        placeholder="Select a vendor"
                        name="vendorId"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-900",
                          trigger: "border shadow-none",
                        }}
                        items={allVendorsData || []}
                        onChange={(e) => {
                          setFieldValue("vendorId", e.target.value);
                        }}
                        // selectedKeys={[values.vendorName]}
                        isInvalid={errors.vendorId && touched.vendorId}
                        color={
                          errors.vendorId && touched.vendorId ? "danger" : ""
                        }
                        errorMessage={errors.vendorId}
                      >
                        {(vendor) => (
                          <SelectItem key={vendor?.uniqueId}>
                            {vendor?.vendorName}
                          </SelectItem>
                        )}
                      </Select>
                      <Input
                        name="outDate"
                        labelPlacement="outside"
                        label="Out Date"
                        type="date"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-800",
                          inputWrapper: "border shadow-none",
                        }}
                        value={values.outDate}
                        onChange={(date) => {
                          setFieldValue("outDate", date.target.value);
                        }}
                        onBlur={handleBlur}
                        isInvalid={errors.outDate && touched.outDate}
                        color={
                          errors.outDate && touched.outDate ? "danger" : ""
                        }
                        error={errors.outDate && touched.outDate}
                        errorMessage={errors.outDate}
                      />
                    </GridContainer>
                    <FlexContainer
                      variant="row-end"
                      className={"p-5"}
                    ></FlexContainer>

                    <FlexContainer variant="row-end" className={"p-5"}>
                      <NextButton
                        isSubmitting={isSubmitting}
                        // onClick={handleSubmit}
                        type="submit"
                        colorScheme="primary"
                      >
                        Create
                      </NextButton>
                    </FlexContainer>
                  </FlexContainer>
                </Form>
              )}
            </Formik>
          </FlexContainer>
        )}
        {activeTab === 3 && (
          <FlexContainer variant="column-start">
            <Table aria-label="Outward List">
              <TableHeader>
                <TableColumn>Vendor Name</TableColumn>
                <TableColumn>Amount </TableColumn>
                <TableColumn>Date</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Rofabs</TableCell>
                  <TableCell>₹ 5000</TableCell>
                  <TableCell>2021-09-01</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </FlexContainer>
        )}
      </FlexContainer>
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
                  Inward Details for {selectedInward?.vendor_name}
                </h2>
              </ModalHeader>
              <ModalBody>
                <FlexContainer variant="column-start">
                  {selectedInward?.items.map((item, index) => (
                    <Formik
                      key={index}
                      initialValues={{
                        productName: item.productName,
                        category: item.category,
                        quantity: item.quantity,
                        isReceived: false,
                        recievedQuantity: 0,
                        isDamaged: false,
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
                                  const updatedItems = selectedInward.items.map(
                                    (item, i) => {
                                      if (i === index) {
                                        return {
                                          ...item,
                                          isDamaged: values.damages,
                                          description: values.description,
                                        };
                                      }
                                      return item;
                                    }
                                  );
                                  setSelectedInward({
                                    ...selectedInward,
                                    items: updatedItems,
                                  });
                                  console.log("selectedInward", selectedInward);
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
    </>
  );
};

export default LaundryManagement;
