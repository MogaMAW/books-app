import React, { Fragment } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export const ReduxProvider = (props) => {
  return (
    <Fragment>
      <Provider store={store}>{props.children}</Provider>
    </Fragment>
  );
};
