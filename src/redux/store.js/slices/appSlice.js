import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAdmin: false,
  // sessionExpiresAt: null,
  // timeout: false,
  // didLogOut: false,
  cart: [],
  cartItemIds: [],
  totalQuantity: 0,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    refreshToken: (state, action) => {
      const newToken = action.payload;

      state.token = newToken;
    },
    updateAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAdmin = false;
    },
    addToCart(state, action) {
      const newItem = action.payload.product;

      const quantity = action.payload.quantity;
      const size = action.payload.size;

      const existingCartItem = state.cart.find(
        (item) => item._id === newItem._id && item.size === size
      );

      state.totalQuantity += quantity;
      if (!existingCartItem) {
        state.cart.push({ ...newItem, quantity, size });
        state.cartItemIds.push(newItem._id);
      } else {
        existingCartItem.quantity += quantity;
      }
    },
    removeFromCart(state, action) {
      const { id, size } = action.payload;

      const existingCartItem = state.cart.find(
        (item) => item._id === id && item.size === size
      );

      if (existingCartItem) {
        if (existingCartItem.quantity === 1) {
          state.cart = state.cart.filter(
            (item) => !(item._id === id && item.size === size)
          );
          state.cartItemIds = state.cartItemIds.filter(
            (itemId) => itemId !== id
          );
        } else {
          existingCartItem.quantity--;
        }
        state.totalQuantity--;
      }
    },

    clearItem(state, action) {
      const { id, size } = action.payload;

      const item = state.cart.find(
        (item) => item._id === id && item.size === size
      );

      if (item) {
        state.totalQuantity -= item.quantity;
        state.cart = state.cart.filter(
          (item) => !(item._id === id && item.size === size)
        );
        state.cartItemIds = state.cartItemIds.filter((itemId) => itemId !== id);
      }
    },
    clearCart(state, actions) {
      state.cart = [];
      state.totalQuantity = 0;
    },
  },
});

export const {
  updateUser,
  refreshToken,
  updateAdmin,
  logout,
  addToCart,
  removeFromCart,
  clearItem,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;
