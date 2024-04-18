import React, { Fragment } from "react";
import { CreateOrder } from "../components/UI/CreateOrder";
import { PreviousOrders } from "../components/UI/PreviousOrders";

export const OrdersPages = () => {
  return (
    <Fragment>
      <div>
        <CreateOrder />
        <PreviousOrders />
      </div>
    </Fragment>
  );
};
