import { createSlice } from "@reduxjs/toolkit";
const initialState = { orders: [] };

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrders(state, action) {
      const orders = state.orders;
      const bookIdExists = !!orders.find(
        (bookId) => bookId === action.payload.bookId
      );
      if (bookIdExists) return;

      orders.push(action.payload.bookId);
    },
    removeFromOrder(state, action) {
      const orders = state.orders;
      const bookIdExists = !!orders.find(
        (bookId) => bookId === action.payload.bookId
      );

      const updatedOrderList = orders.filter(
        (bookId) => bookId !== action.payload.bookId
      );
      if (!bookIdExists) return;
      state.orders = updatedOrderList;
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});
