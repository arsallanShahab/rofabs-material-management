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

const PLANS = [
  {
    id: 1,
    planName: "Plan 1",
    planDescription: "Plan Description 1",
    planPrice: "1000",
  },
  {
    id: 2,
    planName: "Plan 2",
    planDescription: "Plan Description 2",
    planPrice: "2000",
  },
];
const ManageDecorationPlans = () => {
  return (
    <FlexContainer variant="column-start" gap="xl" className={"h-full"}>
      <ActionArea
        heading={"Decoration Plans"}
        subheading={"View"}
        title={"Manage Decoration Plans"}
        showButton={true}
        buttonText={"Create Plan"}
        buttonHref={"create"}
      />
      <Table aria-label="view-decoration-plans">
        <TableHeader>
          <TableColumn>Plan Name</TableColumn>
          <TableColumn>Plan Description</TableColumn>
          <TableColumn>Plan Price</TableColumn>
        </TableHeader>
        <TableBody>
          {PLANS?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell>{item.planName}</TableCell>
              <TableCell>{item.planDescription}</TableCell>
              <TableCell>{item?.planPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </FlexContainer>
  );
};

export default ManageDecorationPlans;
