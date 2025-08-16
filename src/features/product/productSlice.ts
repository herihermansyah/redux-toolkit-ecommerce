// src/features/product/productSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
};

// Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    filterByCategory: (state, action: PayloadAction<string>) => {
      if (action.payload === "all") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (p) => p.category === action.payload
        );
      }
    },
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      state.filteredProducts.sort((a, b) =>
        action.payload === "asc" ? a.price - b.price : b.price - a.price
      );
    },
  },
});

export const { setProducts, filterByCategory, sortByPrice } =
  productSlice.actions;

// Selector
export const selectFilteredProducts = (state: RootState) =>
  state.product.filteredProducts;

export default productSlice.reducer;
