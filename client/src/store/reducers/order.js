import { createSlice } from "@reduxjs/toolkit";
const initialState = { orders: [] };

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrders(state, action) {
      const orders = state.orders;
      bookId = action.payload.bookId;
      const bookIdExists = !!orders.find(
        (bookId) => bookId === action.payload.bookId
      );
      if (bookIdExists) return;

      orders.push(action.payload.bookId);
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});
