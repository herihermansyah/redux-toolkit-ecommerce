// src/features/product/productSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Product } from "./types";
import { fetchProductsAPI } from "./productAPI";

// Async thunk ambil produk dari API
export const fetchProducts = createAsyncThunk<Product[]>(
  "product/fetchProducts",
  async () => {
    const data = await fetchProductsAPI();
    return data;
  }
);

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[]; // daftar kategori otomatis
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  categories: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterByCategory: (state, action: { payload: string }) => {
      if (action.payload === "all") {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter(
          (p) => p.product_category.name === action.payload
        );
      }
    },
    sortByPrice: (state, action: { payload: "asc" | "desc" }) => {
      state.filteredProducts.sort((a, b) =>
        action.payload === "asc" ? a.price - b.price : b.price - a.price
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload;

        // generate kategori otomatis dari data API
        const cats = new Set<string>();
        action.payload.forEach((p) => cats.add(p.product_category.name));
        state.categories = Array.from(cats);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { filterByCategory, sortByPrice } = productSlice.actions;
export const selectFilteredProducts = (state: RootState) =>
  state.product.filteredProducts;
export const selectCategories = (state: RootState) =>
  state.product.categories;

export default productSlice.reducer;
