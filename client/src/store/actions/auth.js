import { authActions } from "../index";

export const logOut = () => {
  localStorage.clear();
  return async (dispatch) => {
    await dispatch(authActions.logout());
  };
};

export const authenticate = (auth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
  return async (dispatch) => {
    await dispatch(authActions.authenticate(auth));
  };
};
