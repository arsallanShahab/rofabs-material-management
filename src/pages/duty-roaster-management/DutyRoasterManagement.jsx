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
      />
    </FlexContainer>
  );
};

export default DutyRoasterManagement;
