import React, { Fragment } from "react";
import { Button } from "./Button";

export const OrderBook = () => {
  // api functionality
  return (
    <Fragment>
      <div>
        <Button
          label={"Add To Cart"}
          type="button"
          className="text-sm py-2 w-44 bg-primaryDark"
        />
      </div>
    </Fragment>
  );
};
