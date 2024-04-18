import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../store/actions/order";

export const CreateOrder = (props) => {
  const dispatch = useDispatch();

  const updateOrderHandler = () => {
    dispatch(updateOrder(props.bookId));
  };

  return (
    <Fragment>
      <div>CreateOrder</div>
    </Fragment>
  );
};
