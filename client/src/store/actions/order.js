import { orderActions } from "../index";

export const updateOrder = (bookId) => {
  return async (dispatch) => {
    await dispatch(orderActions.updateOrders({ bookId: bookId }));
  };
};

export const removeFromOrder = (bookId) => {
  return async (dispatch) => {
    await dispatch(orderActions.removeFromOrder({ bookId: bookId }));
  };
};

export const clearOrder = () => {
  return async (dispatch) => {
    await dispatch(orderActions.clearOrders());
  };
};
