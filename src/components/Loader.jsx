import { Loader2 } from "lucide-react";
import React from "react";
import FlexContainer from "./layout/FlexContainer";

const Loader = () => {
  return (
    <FlexContainer className={"py-5"}>
      <Loader2 className="w-6 h-6 animate-spin" /> Loading...
    </FlexContainer>
  );
};

export default Loader;
