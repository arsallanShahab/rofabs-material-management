import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import ActionArea from "../../components/layout/ActionArea";
import FlexContainer from "../../components/layout/FlexContainer";

const DutyRoasterManagement = () => {
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Management"}
        subheading={"Duty Roaster"}
        title={"Duty Roaster Management"}
        showButton={true}
        buttonHref={"/duty-roaster/create"}
        buttonText={"Add"}
        showExtraButton={true}
        extraButtonText={"Config"}
        extraButtonHref={"/duty-roaster/config"}
      />
      <Table aria-label="Duty_Roaster_List">
        <TableHeader>
          <TableColumn>S No.</TableColumn>
          <TableColumn>Responsibility Name</TableColumn>
          <TableColumn className="text-right">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Responsibility 1</TableCell>
            <TableCell>
              <FlexContainer variant="row-end">
                <Button variant="text" color="error">
                  Delete
                </Button>
              </FlexContainer>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </FlexContainer>
  );
};

export default DutyRoasterManagement;
