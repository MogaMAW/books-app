import React, { Fragment } from "react";
import { ThemeProvider } from "@material-tailwind/react";

export const AppThemeProvider = (props) => {
  return (
    <Fragment>
      <ThemeProvider>{props.children}</ThemeProvider>
    </Fragment>
  );
};
