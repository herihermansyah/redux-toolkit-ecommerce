// src/features/cart/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./types";
import type { RootState } from "../../app/store";

// Helpers: LocalStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const serialized = localStorage.getItem("cart");
    if (!serialized) return [];
    return JSON.parse(serialized) as CartItem[];
  } catch {
    return [];
  }
};

const saveCartToLocalStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (e) {
    console.error("Save failed", e);
  }
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
    removeSelectedItems: (state, action: PayloadAction<number[]>) => {
      state.items = state.items.filter(
        (item) => !action.payload.includes(item.id)
      );
      saveCartToLocalStorage(state.items);
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  removeSelectedItems,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, i) => total + i.price * i.quantity, 0);

export default cartSlice.reducer;
