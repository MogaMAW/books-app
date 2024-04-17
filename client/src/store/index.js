import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth";
import { sidebarSlice } from "./reducers/sidebar";
import { notificationSlice } from "./reducers/notification";

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice.reducer,
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

let url;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:8080/api/v1";
} else {
  url = "backend production url here";
}

export { url };
export const sidebarActions = sidebarSlice.actions;
export const authActions = authSlice.actions;
export const notificationActions = notificationSlice.actions;
