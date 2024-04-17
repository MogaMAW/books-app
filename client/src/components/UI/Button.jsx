import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";

export const Button = (props) => {
  return (
    <Fragment>
      <button
        className={twMerge(
          "text-gray-100 bg-primary p-3 text-center rounded-2xl w-full outline-none",
          props.className
        )}
        type={props.type}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </Fragment>
  );
};
