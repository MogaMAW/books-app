import { notificationActions } from "../index";

export const showCardNotification = ({ type, message }) => {
  return (dispatch) => {
    dispatch(
      notificationActions.showCardNotification({ type: type, message: message })
    );
  };
};

export const hideCardNotification = () => {
  return (dispatch) => {
    dispatch(notificationActions.hideCardNotification());
  };
};

export const clearNotification = () => {
  return (dispatch) => {
    dispatch(notificationActions.clearNotification());
  };
};
