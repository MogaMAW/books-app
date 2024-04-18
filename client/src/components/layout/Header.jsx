import React from "react";
import { openSidebarHandler } from "../../store/actions/sidebar";
import { useSelector, useDispatch } from "react-redux";
import { IconContext } from "react-icons";
import { IoIosMenu } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { extractFirstLetter } from "../../utils/extractFirstLetter";
import { FaCartArrowDown } from "react-icons/fa";

export const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const orders = useSelector((state) => state.order.orders);
  const showCartNumber = !!orders[0];

  const dispatch = useDispatch();

  const handleOpenSidebar = () => {
    dispatch(openSidebarHandler());
  };

  return (
    <header
      className="transition-all w-full z-[110] py-3 pt-4 h-16
       bg-gray-inherit border-b-[1px] border-gray-800 px-6
       text-gray-100"
    >
      <div
        className="flex justify-between gap-4 sm:gap-6 md:flex-row
        md:items-center"
      >
        {!isLoggedIn && (
          <div>
            <span className="text-xl font-semibold">Moga Book Store</span>
          </div>
        )}
        {isLoggedIn && (
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-4">
              <span
                onClick={() => handleOpenSidebar()}
                className="inline-block xl:hidden cursor-pointer"
              >
                <IconContext.Provider
                  value={{ size: "1.8rem", color: "#f1f3f5" }}
                >
                  <IoIosMenu />
                </IconContext.Provider>
              </span>
            </div>
            <div className="xl:hidden">
              <span className="text-xl font-semibold">Moga Book Store</span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-4">
          {!isLoggedIn && (
            <ul className="flex items-center justify-center gap-4">
              <li>
                <NavLink to="/signup">Sign up</NavLink>
              </li>
              <li>
                <NavLink to="/signin">Sign in</NavLink>
              </li>
            </ul>
          )}
          {isLoggedIn && (
            <div className="flex items-center justify-center gap-4">
              <NavLink to="/order" className="relative">
                <span className="inline-block cursor-pointer">
                  <IconContext.Provider
                    value={{ size: "1.2rem", color: "#f8f9fa" }}
                  >
                    <FaCartArrowDown />
                  </IconContext.Provider>
                </span>
                {showCartNumber && (
                  <span
                    className="text-gray-300 bg-primaryDark 
                    rounded-[50%] absolute -top-4 -right-1 text-sm 
                    font-semibold px-2"
                  >
                    {orders.length}
                  </span>
                )}
              </NavLink>
              <span
                className="cursor-pointer grid place-items-center bg-gray-300s p-1
                 w-8 h-8 rounded-[50%] text-gray-50 first-letter:uppercase text-xl
                 bg-gradient-to-r from-indigo-500 via-blue-700 to-cyan-900"
              >
                {extractFirstLetter(user.username)}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
