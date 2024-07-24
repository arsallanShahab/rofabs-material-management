import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import axios from "axios";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";
import { API_TAGS } from "../../../lib/consts/API_TAGS";
import useGet from "../../../lib/hooks/get-api";

const API_URL = import.meta.env.VITE_SERVER_URL;

const VendorsManagement = () => {
  const {
    data: allVendorsData,
    error: allVendorsError,
    loading: allVendorsLoading,
    invalidateCache: invalidateAllVendorsCache,
    refresh: refreshAllVendorsData,
    getData: getAllVendorsData,
  } = useGet({ showToast: false });

  useEffect(() => {
    getAllVendorsData(`${API_URL}/getVendors`, API_TAGS.GET_VENDORS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Vendors"}
        subheading={"List"}
        title={"All Vendors"}
        showButton={true}
        buttonHref={"add"}
        buttonText={"Add Vendor"}
      />
      <VendorList data={allVendorsData} isLoading={allVendorsLoading} />
    </FlexContainer>
  );
};

const VendorList = ({ data, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Table aria-label="Vendors List">
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Phone</TableColumn>
        <TableColumn>Address</TableColumn>
        <TableColumn>Vendor Categories</TableColumn>
        <TableColumn>Vendor type</TableColumn>
        <TableColumn className="rounded-r-xl">Vendor Status</TableColumn>
        <TableColumn className="bg-white"></TableColumn>
      </TableHeader>
      <TableBody>
        {!isLoading &&
          data?.map((item, i) => {
            return (
              <TableRow
                // href={`/vendors/details/${item?.uniqueId}`}
                key={item?.uniqueId}
                className="cursor-pointer"
              >
                <TableCell>{item?.vendorName}</TableCell>
                <TableCell>{item?.vendorEmail}</TableCell>
                <TableCell>{item?.vendorPhoneNumber}</TableCell>
                <TableCell>{item?.vendorAddress}</TableCell>
                <TableCell className="max-w-xs">
                  {item?.vendorCategories?.map((c) => c?.name)?.join(", ")}
                </TableCell>
                <TableCell>
                  {item?.selfVending === "true"
                    ? "Self Vending"
                    : "Third Party Vending"}
                </TableCell>
                <TableCell>
                  {item?.vendorStatus ? (
                    <span className="text-green-500 font-medium">Active</span>
                  ) : (
                    <span className="text-rose-500 font-medium">In Active</span>
                  )}
                </TableCell>
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
            );
          })}
      </TableBody>
    </Table>
  );
};

export default VendorsManagement;
