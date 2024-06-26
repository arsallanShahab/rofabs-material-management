import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FlexContainer from "./FlexContainer";
import Navbar from "./Navbar";
import SidebarLayout from "./SidebarLayout";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <FlexContainer
      variant="row-start"
      className={"items-stretch w-full h-screen gap-0"}
    >
      <SidebarLayout
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <FlexContainer
        variant="column-start"
        className={"w-full gap-0 duration-200"}
      >
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <main className="p-5">
          <Outlet />
        </main>
      </FlexContainer>
    </FlexContainer>
  );
};

export default Layout;
