import React from "react";
import ActionArea from "../components/layout/ActionArea";
import FlexContainer from "../components/layout/FlexContainer";

function dashboard() {
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"Dashboard"}
        title={"Dashboard Management"}
        buttonHref={"/hotel-config"}
        buttonText={"Config"}
        showButton
      />
    </FlexContainer>
  );
}

export default dashboard;
