import React, { Fragment } from "react";
import { Button } from "./Button";
import { updateOrder, removeFromOrder } from "../../store/actions/order";
import { useDispatch, useSelector } from "react-redux";

export const OrderBook = (props) => {
  const orders = useSelector((state) => state.order.orders);

  const dispatch = useDispatch();

  const updateOrderHandler = () => {
    dispatch(updateOrder(props.bookId));
  };

  const removeFromOrderHandler = () => {
    dispatch(removeFromOrder(props.bookId));
  };

  const IsAddedToCart = !!orders.find((bookId) => bookId === props.bookId);

  // api functionality
  return (
    <Fragment>
      <div>
        {!IsAddedToCart && (
          <Button
            label={"Add To Cart"}
            type="button"
            className="text-sm py-2 w-44 bg-primaryDark"
            onClick={updateOrderHandler}
          />
        )}
        {IsAddedToCart && (
          <Button
            label={"Remove From Cart"}
            type="button"
            className="text-sm py-2 w-44 bg-yellow-900"
            onClick={removeFromOrderHandler}
          />
        )}
      </div>
    </Fragment>
  );
};
