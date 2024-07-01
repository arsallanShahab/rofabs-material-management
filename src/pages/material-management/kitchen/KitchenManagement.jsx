import {
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

const UTILIZATION_TYPE = [
  "kitchen-utilization",
  "banquet",
  "room-sale",
  "outwards-supply",
];

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

const API_URL = import.meta.env.VITE_SERVER_URL;

const KitchenManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [utilizationType, setUtilizationType] = useState("");
  const [initialValues, setInitialValues] = useState({
    productID: "",
    productName: "",
    quantity: "",
    utilizationDate: "",
    authorizedBy: "",
    utilizationType: "",
    eventId: "",
    eventDate: "",
    roomNumber: "",
    saleType: "",
  });

  const {
    data: itemsData,
    error: itemsError,
    loading: itemsLoading,
    invalidateCache: invalidateItemsCache,
    refresh: refreshItemsData,
    getData: getItemsData,
  } = useGet({ showToast: false });

  const {
    data: utilizationData,
    error: utilizationError,
    loading: utilizationLoading,
    invalidateCache: invalidateUtilizationCache,
    refresh: refreshUtilizationData,
    getData: getUtilizationData,
  } = useGet({ showToast: false });

  useEffect(() => {
    getUtilizationData(
      `${API_URL}/getKitchenUtilizationEntry`,
      "kitchen-utilization"
    );
    getItemsData(`${API_URL}/getItems`, "items");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateUtilization = async (values, { setSubmitting }) => {
    const utilization = {
      propertyId: "2a869149-342b-44c8-ad86-8f6465970638",
      productUniqueId: values.productID,
      quantity: values.quantity,
      utilizationDate: values.utilizationDate,
      authorisedBy: values.authorizedBy,
      utilizationType: values.utilizationType,
      roomNumber: values.roomNumber,
      eventId: values.eventId,
      eventDate: values.eventDate,
      saleType: values.saleType,
    };
    try {
      const res = await axios.post(
        `${API_URL}/createKitchenUtilizationEntry`,
        utilization
      );
      toast.success("Utilization created successfully");
      invalidateUtilizationCache("kitchen-utilization");
      refreshUtilizationData();
      console.log(res);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong");
    }
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Kitchen"}
        title={"Kitchen Management"}
        showButton={false}
        buttonHref={"add"}
        buttonText={"Create"}
      />
      <FlexContainer variant="row-between">
        <FlexContainer variant="row-start" className="overflow-x-auto">
          <Tab
            title="Utilization List"
            isActiveTab={activeTab === 1}
            isError={tabsError[1]}
            onClick={() => handleTabClick(1)}
          />
          <Tab
            title="Create Utilization Entry"
            isActiveTab={activeTab === 2}
            isError={tabsError[2]}
            onClick={() => handleTabClick(2)}
          />
        </FlexContainer>
        <NextButton colorScheme="flat" className="text-blue-500 underline">
          View Consumption Report
        </NextButton>
      </FlexContainer>
      {activeTab === 1 && (
        <FlexContainer variant="column-start">
          <h3 className="text-lg font-semibold">Inward List</h3>
          <Table aria-label="Inward List">
            <TableHeader
              columns={[
                {
                  key: "product-name",
                  label: "Product Name",
                },
                {
                  key: "quantity",
                  label: "Quantity",
                },
                {
                  key: "utilization-type",
                  label: "Utilization Type",
                },
                {
                  key: "utilization-date",
                  label: "Utilization Date",
                },
                {
                  key: "authorized-by",
                  label: "Authorized By",
                },
              ]}
            >
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {!utilizationLoading &&
                utilizationData?.map((utilization) => (
                  <TableRow key={utilization?.uniqueId}>
                    <TableCell>{utilization?.productName}</TableCell>
                    <TableCell>{utilization?.quantity}</TableCell>
                    <TableCell>{utilization?.utilizationType}</TableCell>
                    <TableCell>{utilization?.utilizationDate}</TableCell>
                    <TableCell>{utilization?.authorisedBy}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </FlexContainer>
      )}
      {activeTab === 2 && (
        <FlexContainer variant="column-start">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              productID: Yup.string().required("Product ID is required"),
              quantity: Yup.number().required("Quantity is required"),
              utilizationDate: Yup.string().required(
                "Utilization Date is required"
              ),
              authorizedBy: Yup.string().required("Authorized By is required"),
              utilizationType: Yup.string().required(
                "Utilization Type is required"
              ),
            })}
            onSubmit={handleCreateUtilization}
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
                  <FlexContainer variant="column-start">
                    <GridContainer gap="lg">
                      <Select
                        name="productName"
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
                          setFieldValue("productID", e.target.value);
                        }}
                        value={values.productID}
                        isInvalid={errors.productID && touched.productID}
                        color={
                          errors.productID && touched.productID && "danger"
                        }
                        errorMessage={errors.productID}
                      >
                        {(product) => (
                          <SelectItem key={product?.uniqueId}>
                            {product?.productName}
                          </SelectItem>
                        )}
                      </Select>
                      <Input
                        type="number"
                        name="quantity"
                        label="Quantity"
                        labelPlacement="outside"
                        placeholder="Enter quantity"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-100",
                          inputWrapper: "border shadow-none",
                        }}
                        onChange={(e) => {
                          setFieldValue("quantity", e.target.value);
                        }}
                        value={values.quantity}
                        isInvalid={errors.quantity && touched.quantity}
                        color={errors.quantity && touched.quantity && "danger"}
                        errorMessage={
                          errors.quantity && touched.quantity && errors.quantity
                        }
                      />
                      <Input
                        type="date"
                        name="utilizationDate"
                        label="Utilization Date"
                        labelPlacement="outside"
                        placeholder="Enter utilization date"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-100",
                          inputWrapper: "border shadow-none",
                        }}
                        onChange={(e) => {
                          setFieldValue("utilizationDate", e.target.value);
                        }}
                        value={values.utilizationDate}
                        isInvalid={
                          errors.utilizationDate && touched.utilizationDate
                        }
                        color={
                          errors.utilizationDate &&
                          touched.utilizationDate &&
                          "danger"
                        }
                        errorMessage={
                          errors.utilizationDate &&
                          touched.utilizationDate &&
                          errors.utilizationDate
                        }
                      />
                      <Input
                        type="text"
                        name="authorizedBy"
                        label="Authorized By"
                        labelPlacement="outside"
                        placeholder="Enter authorized by"
                        radius="sm"
                        classNames={{
                          label: "font-medium text-zinc-100",
                          inputWrapper: "border shadow-none",
                        }}
                        onChange={(e) => {
                          setFieldValue("authorizedBy", e.target.value);
                        }}
                        value={values.authorizedBy}
                        isInvalid={errors.authorizedBy && touched.authorizedBy}
                        color={
                          errors.authorizedBy &&
                          touched.authorizedBy &&
                          "danger"
                        }
                        errorMessage={
                          errors.authorizedBy &&
                          touched.authorizedBy &&
                          errors.authorizedBy
                        }
                      />
                      <Select
                        name="utilizationType"
                        label="Utilization Type"
                        labelPlacement="outside"
                        placeholder="Select utilization type"
                        radius="sm"
                        items={[
                          {
                            key: "kitchen-utilization",
                            label: "kitchen utilization",
                          },
                          { key: "room-sale", label: "room sale" },
                          { key: "banquet", label: "banquet" },
                          { key: "outwards-supply", label: "outwards supply" },
                        ]}
                        classNames={{
                          label: "font-medium text-zinc-100",
                          inputWrapper: "border shadow-none",
                        }}
                        onChange={(e) => {
                          setFieldValue("utilizationType", e.target.value);
                          setUtilizationType(e.target.value);
                        }}
                        value={values.utilizationType}
                        isInvalid={
                          errors.utilizationType && touched.utilizationType
                        }
                        color={
                          errors.utilizationType &&
                          touched.utilizationType &&
                          "danger"
                        }
                        errorMessage={
                          errors.utilizationType &&
                          touched.utilizationType &&
                          errors.utilizationType
                        }
                      >
                        {(vendor) => (
                          <SelectItem key={vendor.key} value={vendor.key}>
                            {vendor.label}
                          </SelectItem>
                        )}
                      </Select>
                      {UTILIZATION_TYPE[1] === values.utilizationType && (
                        <>
                          <Input
                            type="text"
                            name="eventId"
                            label="Event ID"
                            labelPlacement="outside"
                            placeholder="Enter event id"
                            radius="sm"
                            classNames={{
                              label: "font-medium text-zinc-100",
                              inputWrapper: "border shadow-none",
                            }}
                            onChange={(e) => {
                              setFieldValue("eventId", e.target.value);
                            }}
                            value={values.eventId}
                            isInvalid={errors.eventId && touched.eventId}
                            color={
                              errors.eventId && touched.eventId && "danger"
                            }
                            errorMessage={
                              errors.eventId &&
                              touched.eventId &&
                              errors.eventId
                            }
                          />
                          <Input
                            type="date"
                            name="eventDate"
                            label="Event Date"
                            labelPlacement="outside"
                            placeholder="Enter event date"
                            radius="sm"
                            classNames={{
                              label: "font-medium text-zinc-100",
                              inputWrapper: "border shadow-none",
                            }}
                            onChange={(e) => {
                              setFieldValue("eventDate", e.target.value);
                            }}
                            value={values.eventDate}
                            isInvalid={errors.eventDate && touched.eventDate}
                            color={
                              errors.eventDate && touched.eventDate && "danger"
                            }
                            errorMessage={
                              errors.eventDate &&
                              touched.eventDate &&
                              errors.eventDate
                            }
                          />
                        </>
                      )}
                      {UTILIZATION_TYPE[2] === values.utilizationType && (
                        <Input
                          type="text"
                          name="roomNumber"
                          label="Room Number"
                          labelPlacement="outside"
                          placeholder="Enter room number"
                          radius="sm"
                          classNames={{
                            label: "font-medium text-zinc-100",
                            inputWrapper: "border shadow-none",
                          }}
                          onChange={(e) => {
                            setFieldValue("roomNumber", e.target.value);
                          }}
                          value={values.roomNumber}
                          isInvalid={errors.roomNumber && touched.roomNumber}
                          color={
                            errors.roomNumber && touched.roomNumber && "danger"
                          }
                          errorMessage={
                            errors.roomNumber &&
                            touched.roomNumber &&
                            errors.roomNumber
                          }
                        />
                      )}
                      {UTILIZATION_TYPE[3] === values.utilizationType && (
                        <Select
                          name="saleType"
                          label="Sale Type"
                          labelPlacement="outside"
                          placeholder="Select sale type"
                          radius="sm"
                          items={[
                            {
                              key: "zomato",
                              label: "Zomato",
                            },
                            { key: "swiggy", label: "Swiggy" },
                            { key: "counter-sale", label: "Counter Sale" },
                          ]}
                          classNames={{
                            label: "font-medium text-zinc-100",
                            inputWrapper: "border shadow-none",
                          }}
                          onChange={(e) => {
                            setFieldValue("saleType", e.target.value);
                            setUtilizationType(e.target.value);
                          }}
                          value={values.saleType}
                          isInvalid={errors.saleType && touched.saleType}
                          color={
                            errors.saleType && touched.saleType && "danger"
                          }
                          errorMessage={
                            errors.saleType &&
                            touched.saleType &&
                            errors.saleType
                          }
                        >
                          {(vendor) => (
                            <SelectItem key={vendor.key} value={vendor.key}>
                              {vendor.label}
                            </SelectItem>
                          )}
                        </Select>
                      )}
                    </GridContainer>
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
              );
            }}
          </Formik>
        </FlexContainer>
      )}
    </FlexContainer>
  );
};

export default KitchenManagement;
