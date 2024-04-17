import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCardNotification: false,
  cardNotificationType: null,
  cardMessage: null,
  cardNotificationTitle: null,
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showCardNotification(state, action) {
      state.showCardNotification = true;
      state.cardNotificationType = action.payload.type;
      state.cardMessage = action.payload.message;
    },
    hideCardNotification(state) {
      state.showCardNotification = false;
      state.cardNotificationType = null;
      state.cardMessage = null;
    },
    clearNotification(state) {
      state.showCardNotification = false;
      state.cardNotificationType = null;
      state.cardMessage = null;
      state.notifications = [];
    },
  },
});

export default notificationSlice.reducer;
