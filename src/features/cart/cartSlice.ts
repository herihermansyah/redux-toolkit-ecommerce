// src/features/cart/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./types";
import type { RootState } from "../../app/store";
import { login } from "../auth/authSlice"; // ✅ import login thunk

// Ambil username dari auth state
const getUsername = (): string | null => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).username : null;
  } catch {
    return null;
  }
};

// Helpers: LocalStorage per user
const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const username = getUsername();
    if (!username) return [];
    const serialized = localStorage.getItem(`cart_${username}`);
    if (!serialized) return [];
    return JSON.parse(serialized) as CartItem[];
  } catch {
    return [];
  }
};

const saveCartToLocalStorage = (items: CartItem[]) => {
  try {
    const username = getUsername();
    if (!username) return;
    localStorage.setItem(`cart_${username}`, JSON.stringify(items));
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
    resetCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    // 🔹 Load cart dari localStorage sesuai user saat login sukses
    builder.addCase(login.fulfilled, (state, action) => {
      const username = action.payload.user.username;
      try {
        const serialized = localStorage.getItem(`cart_${username}`);
        state.items = serialized ? JSON.parse(serialized) : [];
      } catch {
        state.items = [];
      }
    });
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  removeSelectedItems,
  resetCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, i) => total + i.price * i.quantity, 0);

export default cartSlice.reducer;
