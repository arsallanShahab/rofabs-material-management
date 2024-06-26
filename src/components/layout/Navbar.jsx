/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { ChevronLeftIcon } from "lucide-react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import FlexContainer from "./FlexContainer";

const Navbar = ({ showSidebar, setShowSidebar }) => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  // const [profileImg, setProfileImg] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("_session");
    navigate("/login");
  };
  useEffect(() => {
    let userSession = JSON.parse(localStorage.getItem("_session"));
    if (!userSession) {
      navigate("/login");
    } else {
      let userSession = JSON.parse(localStorage.getItem("_session"));
      const { fname, lname, email } = userSession;
      if (fname && lname && email) {
        setUserName(`${fname} ${lname}`);
        setUserEmail(email);
      }
    }
    // setProfileImg(JSON.parse(localStorage.getItem("userSession")).profile_img);
  }, []);

  useEffect(() => {
    if (width < 768) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [width]);
  return (
    <FlexContainer
      variant="row-between"
      className={"p-5 border-b border-zinc-200"}
    >
      <FlexContainer className={"items-center"}>
        <button
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
          className="p-2 bg-zinc-100 hover:border-zinc-300 rounded-lg border duration-100"
        >
          <ChevronLeftIcon
            className={cn("h-4 w-4 duration-150", !showSidebar && "rotate-180")}
          />
        </button>
        Welcome {userName}
      </FlexContainer>
      {userName && userEmail ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="cursor-pointer">
            <Avatar
              showFallback
              classNames={{
                base: "bg-zinc-900 text-zinc-100 font-medium text-sm",
              }}
              fallback={userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            ></Avatar>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="user_metadata" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userEmail}</p>
            </DropdownItem>
            <DropdownItem
              key="navigate"
              onClick={() => {
                navigate("/profile");
              }}
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              key="change-password"
              onClick={() => {
                navigate("/change-password");
              }}
            >
              Change Password
            </DropdownItem>

            <DropdownItem key="logout" onClick={handleLogout} color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : null}
    </FlexContainer>
  );
};

Navbar.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

export default Navbar;
