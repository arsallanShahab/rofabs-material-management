import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import NextButton from "../../components/micro/NextButton";
import Tab from "../../components/micro/Tab";

//  Event ID , booking name , phone number, address (optional)

const Banquet_DATA = [
  {
    id: 1,
    name: "John Doe",
    phone: "1234567890",
    address: "123, ABC Street, XYZ City",
  },
  {
    id: 2,
    name: "Alice",
    phone: "1234567890",
    address: "123, ABC Street, XYZ City",
  },
];

const BanquetManagement = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();
  return (
    <FlexContainer variant="column-start" gap="xl">
      <FlexContainer variant="row-between">
        <FlexContainer variant="row-start" gap="lg" className={"items-center"}>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="p-2 bg-zinc-100 hover:border-zinc-300 rounded-lg border duration-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <FlexContainer variant="column-start" className={"gap-0"}>
            <FlexContainer gap="sm" className={"items-center"}>
              <span className="text-sm">Management</span>
              <span className="text-sm">/ Banquet</span>
            </FlexContainer>
            <h3 className="-mt-1.5 text-lg font-semibold">
              Banquet Management
            </h3>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer variant="row-end">
          <NextButton
            href="/banquet/manage/decoration-plans"
            colorScheme="secondary"
          >
            Manage Decoration Plans
          </NextButton>
          <NextButton href="/banquet/manage/food-plans" colorScheme="secondary">
            Manage Food Plans
          </NextButton>
          <NextButton href="/banquet/manage/halls" colorScheme="secondary">
            Manage Halls
          </NextButton>
          <NextButton colorScheme="primary" href={"/banquet/bookings"}>
            Manage Booking
          </NextButton>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer variant="row-start" className="overflow-x-auto">
        <Tab
          title="Bookings History"
          isActiveTab={activeTab === 1}
          onClick={() => handleTabClick(1)}
        />
        <Tab
          title="Current Booking"
          isActiveTab={activeTab === 2}
          onClick={() => handleTabClick(2)}
        />
        <Tab
          title="Advance Booking"
          isActiveTab={activeTab === 3}
          onClick={() => handleTabClick(3)}
        />
      </FlexContainer>
      {activeTab === 1 && (
        <Table>
          <TableHeader>
            <TableColumn>Booker Name</TableColumn>
            <TableColumn>No of Pax</TableColumn>
            <TableColumn>Food Plan</TableColumn>
            <TableColumn>Decoration Plan</TableColumn>
            <TableColumn>Add Ons</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>100</TableCell>
              <TableCell>Plan 1</TableCell>
              <TableCell>Plan 1</TableCell>
              <TableCell>
                <ul>
                  <li>Extra Chairs</li>
                  <li>Extra Tables</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </FlexContainer>
  );
};

export default BanquetManagement;
