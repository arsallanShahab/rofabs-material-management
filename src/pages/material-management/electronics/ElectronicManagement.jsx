import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useState } from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import NextButton from "../../../components/micro/NextButton";
import Tab from "../../../components/micro/Tab";

const ElectronicManagement = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [tabsError, setTabsError] = useState({
    1: false,
    2: false,
  });
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Electronics"}
        title={"Electronics Management"}
        showButton={true}
        buttonHref={"add"}
        buttonText={"Create"}
      />
      <FlexContainer variant="row-between">
        <FlexContainer variant="row-start" className="overflow-x-auto">
          <Tab
            title="Purchase Order"
            isActiveTab={activeTab === 1}
            isError={tabsError[1]}
            onClick={() => handleTabClick(1)}
          />
          <Tab
            title="Utilization"
            isActiveTab={activeTab === 2}
            isError={tabsError[2]}
            onClick={() => handleTabClick(2)}
          />
        </FlexContainer>
        <NextButton colorScheme="flat" className="text-blue-500 underline">
          View Consumption Report
        </NextButton>
      </FlexContainer>
      {/* purchase order product name quantity price vendor purchase date */}
      {activeTab === 1 && (
        <Table
          aria-label="Purchase Order"
          striped
          hover
          responsive
          className="mt-4"
        >
          <TableHeader>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Vendor</TableColumn>
            <TableColumn>Purchase Date</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Purchase Date</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Falana Dimkana</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Purchase Date</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {/* room number product name quantity date of installation miscellaneous
      damages ? popup - desc, date, amount recovered */}
      {activeTab === 2 && (
        <Table
          aria-label="Utilization"
          striped
          hover
          responsive
          className="mt-4"
        >
          <TableHeader>
            <TableColumn>Room Number</TableColumn>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Date of Installation</TableColumn>
            <TableColumn>Miscellaneous</TableColumn>
            <TableColumn>Damage</TableColumn>
            <TableColumn>Damage Description</TableColumn>
            <TableColumn>Damage Amount</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Date of Installation</TableCell>
              <TableCell>Miscellaneous</TableCell>
              <TableCell>Damage</TableCell>
              <TableCell>Damage Description</TableCell>
              <TableCell>Damage Amount</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </FlexContainer>
  );
};

export default ElectronicManagement;
