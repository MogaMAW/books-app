import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { closeSidebarHandler } from "../../store/actions/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { HiMiniChevronDoubleLeft } from "react-icons/hi2";
import { AiOutlinePlus } from "react-icons/ai";
import { extractFirstLetter } from "../../utils/extractFirstLetter";
import { GoChevronDown } from "react-icons/go";

export const Sidebar = () => {
  const isOpenSidebar = useSelector((state) => state.sidebar.isOpen);

  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(closeSidebarHandler());
  };

  const pages = [
    {
      name: "Discover",
      icon: (
        <span className="inline-block cursor-pointer">
          <IconContext.Provider value={{ size: "1.6rem", color: "#f8f9fa" }}>
            <RiCompassDiscoverFill />
          </IconContext.Provider>
        </span>
      ),
      path: "",
    },
  ];

  return (
    <aside
      className={`bg-gray-900 fixed inset-0 top-0 z-[120] h-[100vh] w-72
       transition-transform duration-300 xl:translate-x-0
       ${isOpenSidebar ? "translate-x-0" : "-translate-x-80"}
       border-r-[1px] border-gray-800`}
    >
      <div className="relative">
        <span
          onClick={() => handleCloseSidebar()}
          className="cursor-pointer absolute right-5 top-9 grid 
          sxl:hidden z-20"
        >
          <IconContext.Provider value={{ size: "1.0rem", color: "#f8f9fa" }}>
            <HiMiniChevronDoubleLeft />
          </IconContext.Provider>
        </span>
      </div>
      <div
        className="flex items-center justify-start gap-0 relative 
         w-full h-14 pl-5 mt-4"
      >
        <span
          className="text-gray-50 text-lg font-semibold hidden
          sm:block"
        >
          Moga Book Store
        </span>
      </div>
      <div className="m-4 mt-1">
        <ul className="mb-4 flex flex-col gap-3">
          <li>
            <NavLink to="/character/new">
              {({ isActive }) => (
                <Button
                  className={`flex items-center gap-2 bg-inherit px-4 
                  capitalize bg-gray-800 text-gray-50 shadow-none hover:bg-gray-800
                  focus:bg-gray-800 relative outline-none rounded-3xl w-32 border-[1px]
                   border-gray-700
                  ${isActive && `bg-gray-800`}`}
                  fullWidth
                  placeholder={""}
                >
                  <span className="cursor-pointer">
                    <IconContext.Provider
                      value={{ size: "1.6rem", color: "#e9ecef" }}
                    >
                      <AiOutlinePlus />
                    </IconContext.Provider>
                  </span>
                  <Typography
                    color="inherit"
                    className={`font-medium capitalize`}
                    placeholder={""}
                  >
                    Create
                  </Typography>
                </Button>
              )}
            </NavLink>
          </li>
          {pages.map(({ icon, name, path }) => (
            <li key={name}>
              <NavLink to={`/${path}`}>
                {({ isActive }) => (
                  <Button
                    className={`flex items-center gap-4 bg-inherit px-4 
                      capitalize text-gray-50 shadow-none hover:bg-gray-800
                      focus:bg-gray-800 relative outline-none
                    ${isActive && `bg-gray-800`}`}
                    fullWidth
                    placeholder={""}
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className={`font-medium capitalize`}
                      placeholder={""}
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <div
          className="flex items-center justify-start gap-3
           rounded-md p-2 text-white  hover:bg-gray-800
           focus:bg-gray-800 absolute left-4 bottom-4 w-[88%]"
        >
          <span
            className="cursor-pointer grid place-items-center  bg-gray-300s p-1
            w-10 h-10 rounded-[50%] text-gray-50 first-letter:uppercase text-xl
            bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          >
            {extractFirstLetter("username")}
          </span>
          <p className="flex-1 flex  justify-between">
            <span
              className="cursor-pointer flex items-center gap-1
              text-gray-50 text-sm"
            >
              {"username"}
            </span>
            <span className="cursor-pointer">
              <IconContext.Provider
                value={{ size: "1.4rem", color: "#e9ecef" }}
              >
                <GoChevronDown />
              </IconContext.Provider>
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
};
