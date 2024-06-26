import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";
import NextButton from "../../components/micro/NextButton";

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
  const navigate = useNavigate();
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Banquet"}
        title={"Banquet Management"}
        showButton={true}
        buttonHref={"/banquet/create-estimate"}
        buttonText={"Create Estimate"}
      />
      <Table>
        <TableHeader>
          <TableColumn>Event ID</TableColumn>
          <TableColumn>Booking Name</TableColumn>
          <TableColumn>Phone Number</TableColumn>
          <TableColumn>Address</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {Banquet_DATA.map((banquet) => (
            <TableRow key={banquet.id}>
              <TableCell>{banquet.id}</TableCell>
              <TableCell>{banquet.name}</TableCell>
              <TableCell>{banquet.phone}</TableCell>
              <TableCell>{banquet.address}</TableCell>
              <TableCell>
                <NextButton
                  onClick={() =>
                    navigate("/banquet/create-estimate", { state: banquet.id })
                  }
                >
                  Create Estimate
                </NextButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FlexContainer>
  );
};

export default BanquetManagement;
