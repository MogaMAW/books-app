import React, { Fragment } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/actions/auth";

export const LogOut = (props) => {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <Fragment>
      <Menu>
        <MenuHandler>{props.children}</MenuHandler>
        <MenuList
          className="border-0 w-20 bg-gray-800 text-gray-100 p-0"
          placeholder={""}
        >
          <MenuItem
            className="flex items-center justify-center bg-gray-800
            text-gray-100 hover:bg-gray-800"
            placeholder={""}
            onClick={() => logOutHandler()}
          >
            <span>Log out</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </Fragment>
  );
};
