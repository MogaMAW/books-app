import React, { Fragment } from "react";
import { CreateOrder } from "../components/UI/CreateOrder";
import { PreviousOrders } from "../components/UI/PreviousOrders";
import { useDispatch } from "react-redux";
import {
  showCardNotification,
  hideCardNotification,
} from "../store/actions/notification";
import { getAllBooks } from "../API/books";
import { useQuery } from "@tanstack/react-query";

export const OrdersPages = () => {
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ["books"],
    queryFn: () => getAllBooks(),
    // onSuccess: (response) => {
    //   setBooks(() => response);
    // },
    onError: (error) => {
      dispatch(showCardNotification({ type: "error", message: error.message }));
      setTimeout(() => {
        dispatch(hideCardNotification());
      }, 5000);
    },
  });
  return (
    <Fragment>
      <div>
        <CreateOrder books={data} />
        <PreviousOrders />
      </div>
    </Fragment>
  );
};
