import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";

const KitsAndComplementaryManagement = () => {
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Manage"}
        subheading={"Kits & Complementary"}
        title={"Kits & Complementary Items Management"}
        buttonHref={"create"}
        buttonText={"Create Kit/Complementary Item"}
        showButton
      />
      <Table aria-label="Kits List">
        <TableHeader>
          <TableColumn>S.No.</TableColumn>
          <TableColumn>Kit Name</TableColumn>
          <TableColumn>Products</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Starter</TableCell>
            <TableCell>Handwash, facewash, toothbrush, toothpaste</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FlexContainer>
  );
};

export default KitsAndComplementaryManagement;
