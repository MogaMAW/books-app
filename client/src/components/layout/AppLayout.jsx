import React, { Fragment } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export const AppLayout = (props) => {
  return (
    <Fragment>
      <div
        className="min-h-screen bg-gray-900
         w-full relative"
      >
        <Sidebar />
        <div className={`px-4 sm:px-12 xl:ml-72 relative`}>
          <div>
            <Header />
          </div>
          <main className="w-full min-h-[84vh] h-auto">{props.children}</main>
        </div>
      </div>
    </Fragment>
  );
};
