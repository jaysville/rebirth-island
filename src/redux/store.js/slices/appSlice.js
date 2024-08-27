import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQuantity: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload.product;

      const quantity = action.payload.quantity;
      const size = action.payload.size;

      const existingCartItem = state.cart.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity += quantity;
      if (!existingCartItem) {
        state.cart.push({ ...newItem, quantity, size });
      } else {
        existingCartItem.quantity += quantity;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingCartItem = state.cart.find((item) => item.id === id);

      if (existingCartItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== id);
      } else {
        existingCartItem.quantity--;
      }
      state.totalQuantity--;
    },
    clearItem(state, action) {
      const id = action.payload;
      const item = state.cart.find((item) => item.id === id);
      state.totalQuantity -= item.quantity;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    clearCart(state, actions) {
      state.cart = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearItem, clearCart } =
  appSlice.actions;

export default appSlice.reducer;
