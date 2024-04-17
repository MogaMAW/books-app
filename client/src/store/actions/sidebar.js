import { sidebarActions } from "../index";

export const openSidebarHandler = () => {
  return async (dispatch) => {
    await dispatch(sidebarActions.openSidebar());
  };
};

export const closeSidebarHandler = () => {
  return async (dispatch) => {
    await dispatch(sidebarActions.closeSidebar());
  };
};
