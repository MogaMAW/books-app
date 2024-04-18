import { orderActions } from "../index";

export const updateOrder = (bookId) => {
  return async (dispatch) => {
    await dispatch(orderActions.updateOrders(bookId));
  };
};

export const clearOrder = (auth) => {
  return async (dispatch) => {
    await dispatch(orderActions.clearOrders());
  };
};
