import { cartItem, cartType, loadCart, saveCart } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { items: cartType } = {
  items: typeof window !== "undefined" ? loadCart() || {} : {},
};

interface cartProps extends cartItem {
  productId: string;
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: cartProps }) => {
      if (state.items[action.payload.productId]) {
        state.items[action.payload.productId].qty += action.payload.qty;
      } else {
        const itemToAdd = {
          productName: action.payload.productName,
          variant: action.payload.variant,
          qty: action.payload.qty,
          price: action.payload.price,
        };
        state.items[action.payload.productId] = itemToAdd;
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action: { payload: cartProps }) => {
      if (state.items[action.payload.productId].qty > 1) {
        state.items[action.payload.productId].qty -= action.payload.qty;
      } else {
        delete state.items[action.payload.productId];
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = {};
      saveCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
