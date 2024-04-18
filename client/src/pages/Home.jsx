import React, { Fragment } from "react";
import { BooksList } from "./BooksList";

export const Home = () => {
  return (
    <Fragment>
      <div
        className="w-full flex flex-col items-center justify-center
        space-y-8"
      >
        <BooksList />
        <div>{/* More elements */}</div>
      </div>
    </Fragment>
  );
};
