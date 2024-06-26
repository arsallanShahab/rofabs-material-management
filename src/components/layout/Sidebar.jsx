import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faChartBar } from "@fortawesome/free-solid-svg-icons";

function Sidebar(props) {
  const location = useLocation();
  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-5"
        >
          <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zm96 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32zm32 64H288c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 96H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
        </svg>
      ),
    },
    {
      name: "Property",
      path: "/property",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-5"
        >
          <path d="M0 32C0 14.3 14.3 0 32 0H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H304V464c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32zm96 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H240zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H112zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H368zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8H328z" />
        </svg>
      ),
    },
  ];
  return (
    <div
      className={`sidebar bg-[#17171B] fixed h-[100vh] flex flex-col items-center transition-width duration-500 ${
        props.isSidebarOpen ? "w-[280px] md:w-[280px]" : "w-[0px] md:w-[80px]"
      }`}
    >
      <div className="mt-[48px] mb-[70px] flex items-center">
        {props.isSidebarOpen ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-10 w-10"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <p className="font-sora text-[20px] font-semibold leading-[20px] text-inherit text-white">
              Rofabs <span className="block">For Hotels</span>
            </p>
          </>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-10 w-10"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
        )}
      </div>
      <div className="overflow-y-scroll w-full p-[20px]">
        <ul className="flex flex-col gap-[15px]">
          {menus.map((menu) => (
            <Link to={`${menu.path}`} key={menu.name}>
              <li
                className={`px-[16px] py-[10px] rounded-xl ${
                  location.pathname.startsWith(`${menu.path}`)
                    ? "text-black bg-white"
                    : "text-[#747475] hover:bg-gray-200 hover:text-black"
                }`}
              >
                <div className="flex flex-row gap-[12px] items-center">
                  <span>{menu.icon}</span>
                  <span
                    className={`text-[#747475] hover:text-black font-bold font-Inter ${
                      !props.isSidebarOpen ? "hidden" : ""
                    }`}
                  >
                    {menu.name}
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
