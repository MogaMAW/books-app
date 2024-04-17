import React, { Fragment } from "react";

export const SearchBooks = () => {
  return (
    <Fragment>
      <div className="w-full">
        <input
          className="text-gray-100 bg-gray-800 outline-none p-4 md:px-8
          rounded-[32px] md:w-96"
          placeholder="Search for characters"
        />
      </div>
    </Fragment>
  );
};
