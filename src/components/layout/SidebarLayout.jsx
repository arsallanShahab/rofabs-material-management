import { cn } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building,
  IndianRupee,
  LayoutDashboard,
  Package,
  UserCog,
} from "lucide-react";
import PropTypes from "prop-types";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FlexContainer from "./FlexContainer";

const Links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Property",
    path: "/property",
    icon: <Building className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Material Management",
    path: "/material-management",
    icon: <Package className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Damaged Items",
    path: "/damages",
    icon: <Package className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Kitchen Service Request",
    path: "/ksr/inventory",
    icon: <Package className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Employee Management",
    path: "/employee/manage",
    icon: <UserCog className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Payroll Management",
    path: "/payroll",
    icon: <IndianRupee className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Banquet Management",
    path: "/banquet",
    icon: <IndianRupee className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Duty Roaster Management",
    path: "/duty-roaster/manage",
    icon: <UserCog className="h-4 w-4 stroke-[2.2px]" />,
  },
  {
    name: "Lost & Found",
    path: "/lost-n-found",
    icon: <UserCog className="h-4 w-4 stroke-[2.2px]" />,
  },
];

const SidebarLayout = ({ showSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          "flex flex-col justify-start items-start *:w-full gap-5 px-3 py-5 h-full border-r border-zinc-200 "
          //   !showSidebar ? "w-auto" : "w-[300px]"
        )}
        transition={{
          type: "spring",
          duration: 0.4,
          bounce: 0.2,
        }}
        animate={{ width: showSidebar ? 300 : 75 }}
        // transition={{ duration: 0.2 }}
      >
        <FlexContainer className={"items-center pl-2"} gap="md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 duration-100"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          {showSidebar && (
            <motion.div
              initial={{
                opacity: 1,
                x: 0,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -10,
              }}
            >
              <FlexContainer variant={"column-start"} className={"gap-0"}>
                <h3 className="text-2xl font-semibold">Rofabs</h3>
                <p className="-mt-1.5 text-sm font-medium text-zinc-600">
                  For Hotels
                </p>
              </FlexContainer>
            </motion.div>
          )}
        </FlexContainer>
        <div className="flex flex-col justify-start items-center gap-2">
          {Links.map((link, index) => (
            <Link
              to={link.path}
              key={index}
              className={cn(showSidebar && "w-full")}
            >
              <FlexContainer
                key={index}
                variant={"row-start"}
                className={cn(
                  "p-3 rounded-lg text-sm duration-200 hover:bg-zinc-50 border border-transparent items-center font-medium cursor-pointer",

                  location.pathname.includes(link.path) &&
                    "bg-zinc-100 border-zinc-200"
                )}
              >
                {link.icon}
                {showSidebar && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -10,
                    }}
                  >
                    {link.name}
                  </motion.span>
                )}
              </FlexContainer>
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

SidebarLayout.propTypes = {
  showSidebar: PropTypes.bool,
  setShowSidebar: PropTypes.func,
};

export default SidebarLayout;
