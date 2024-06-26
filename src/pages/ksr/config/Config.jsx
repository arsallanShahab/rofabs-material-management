import React from "react";
import { Link } from "react-router-dom";
import ActionArea from "../../../components/layout/ActionArea";
import FlexContainer from "../../../components/layout/FlexContainer";
import GridContainer from "../../../components/layout/GridContainer";

const KsrConfig = () => {
  return (
    <FlexContainer variant="column-start" gap="xl">
      <ActionArea
        heading={"KSR"}
        subheading={"Config"}
        title={"Manage KSR Configurations"}
      />
      <GridContainer className="lg:grid-cols-4 *:flex-1">
        <Link to={"restraunt"}>
          <FlexContainer
            variant="column-center"
            gap="none"
            className={"bg-zinc-100 rounded-xl p-3 border"}
          >
            <h3 className="text-lg font-semibold">Restraunt</h3>
            <p className="text-sm font-semibold">Restraunt Configurations</p>
          </FlexContainer>
        </Link>
        <Link to={"kot"}>
          <FlexContainer
            variant="column-center"
            gap="none"
            className={"bg-zinc-100 rounded-xl p-3 border"}
          >
            <h3 className="text-lg font-semibold">KOT</h3>
            <p className="text-sm font-semibold">KOT Configurations</p>
          </FlexContainer>
        </Link>
        <Link to={"qr-code"}>
          <FlexContainer
            variant="column-center"
            gap="none"
            className={"bg-zinc-100 rounded-xl p-3 border"}
          >
            <h3 className="text-lg font-semibold">QR Code</h3>
            <p className="text-sm font-semibold">QR Code Configurations</p>
          </FlexContainer>
        </Link>
      </GridContainer>
    </FlexContainer>
  );
};

export default KsrConfig;
