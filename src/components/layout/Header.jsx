import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  Avatar,
} from "@nextui-org/react";

function Header({ isSidebarOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("_session");
    navigate("/login");
  };
  useEffect(() => {
    setUserName(
      JSON.parse(localStorage.getItem("_session")).fname +
        " " +
        JSON.parse(localStorage.getItem("_session")).lname
    );
    setUserEmail(JSON.parse(localStorage.getItem("_session")).email);
    // setProfileImg(JSON.parse(localStorage.getItem("userSession")).profile_img);
  }, []);
  return (
    <div className="header grid grid-cols-2 justify-between p-[16px] rounded-[12px] bg-[#F8F8F8] items-center mb-[30px]">
      <div className="flex gap-[30px]">
        <button className="text-black" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        <h1 className="text-[24px] font-[600] text-[#9a9a9a] hidden md:block">
          Welcome {userName}
        </h1>
      </div>
      <div className="flex flex-row gap-[20px] justify-end">
        {!JSON.parse(localStorage.getItem("_session")).role === "owner" ? (
          <div className="flex w-full justify-end items-center gap-2">
            <Select
              size="lg"
              aria-label="Select Property"
              labelPlacement="outside"
              placeholder="Select Property"
              variant="flat"
              className="max-w-[16rem]"
              showScrollIndicators
              color="primary"
            >
              <SelectItem key="1" value="1">
                Alfalfa Hotels
              </SelectItem>
            </Select>
          </div>
        ) : null}
        <div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {JSON.parse(localStorage.getItem("_session")).profile_img ? (
                <Avatar
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  className="cursor-pointer"
                />
              ) : (
                <Avatar
                  size="md"
                  src="https://images.unsplash.com/broken"
                  className="cursor-pointer"
                  showFallback
                />
              )}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userEmail}</p>
              </DropdownItem>
              <DropdownItem
                key="profile"
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
        </div>
      </div>
    </div>
  );
}

export default Header;
