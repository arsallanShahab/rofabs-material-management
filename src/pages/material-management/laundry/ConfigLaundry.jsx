import {
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
import { FieldArray, Form, Formik } from "formik";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import { API_TAGS } from "../../../lib/consts/API_TAGS";
import { MAIN_CATEGORES } from "../../../lib/consts/categories";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const ConfigLaundry = () => {
  const [activeTab, setActiveTab] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const initialValues = {
    vandorId: "",
    items: [
      {
        productId: "",
        price: "",
      },
    ],
  };

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

  useEffect(() => {
    getItemsData(
      `${API_URL}/inhouse?mainCategoryName=${MAIN_CATEGORES.LAUNDRY_MANAGEMENT}`,
      API_TAGS.GET_LAUNDRY_LIST
    );
    getAllVendorsData(`${API_URL}/getVendors`, API_TAGS.GET_VENDORS);
  }, []);
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Configuration"}
        subheading={"Laundry"}
        title={"Laundry Configurations"}
      />
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Price List"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Configure Price"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <Table aria-label="Price List">
          <TableHeader>
            <TableColumn>Vendor Name</TableColumn>
            <TableColumn>Products</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Vendor 1</TableCell>
              <TableCell>Product 1,Product 2</TableCell>
              <TableCell>
                <NextButton colorScheme="badge" onClick={onOpen}>
                  View
                </NextButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {activeTab === 2 && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => {
            return (
              <Form>
                <FlexContainer variant="column-start" gap="xl">
                  <GridContainer>
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
                    >
                      {(vendor) => (
                        <SelectItem key={vendor?.uniqueId}>
                          {vendor?.vendorName}
                        </SelectItem>
                      )}
                    </Select>
                  </GridContainer>
                  <FieldArray
                    name="items"
                    render={(arrayHelpers) => (
                      <FlexContainer variant="column-start">
                        {values?.items?.map((price, index) => (
                          <div key={index}>
                            <GridContainer>
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
                                type="text"
                                name={`items.${index}.price`}
                                label="Price"
                                labelPlacement="outside"
                                placeholder="Enter price"
                                value={price.price}
                                onChange={handleChange}
                              />
                              <div>
                                <NextButton
                                  onClick={() => arrayHelpers.remove(index)}
                                  isIcon
                                  colorScheme="error"
                                >
                                  <Trash className="w-4 h-4" />
                                </NextButton>
                              </div>
                            </GridContainer>
                          </div>
                        ))}
                        <FlexContainer variant="row-end" gap="md">
                          <NextButton
                            onClick={() =>
                              arrayHelpers.push({ productId: "", price: "" })
                            }
                            isIcon
                            colorScheme="badge"
                          >
                            Add Item
                          </NextButton>
                        </FlexContainer>
                      </FlexContainer>
                    )}
                  />
                  <FlexContainer variant="row-end">
                    <NextButton type="submit" colorScheme="primary">
                      Save
                    </NextButton>
                  </FlexContainer>
                </FlexContainer>
              </Form>
            );
          }}
        </Formik>
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
                <h2 className="text-lg font-semibold">Vendor Name: Vendor 1</h2>
              </ModalHeader>
              <ModalBody>
                <Table aria-label="Price List">
                  <TableHeader>
                    <TableColumn>Product Name</TableColumn>
                    <TableColumn>Price</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Product 1</TableCell>
                      <TableCell>100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Product 2</TableCell>
                      <TableCell>200</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ModalBody>
              <ModalFooter>
                <NextButton onClick={onClose}>Close</NextButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </FlexContainer>
  );
};

export default ConfigLaundry;
