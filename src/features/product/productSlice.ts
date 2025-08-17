import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Product } from "./types";
import { fetchProductsAPI } from "./productAPI";

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
  categories: string[];
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
          (p) => p.category === action.payload
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

        const cats = new Set<string>();
        action.payload.forEach((p) => cats.add(p.category));
        state.categories = Array.from(cats); // simpan kategori asli (tanpa replace)
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
export const selectCategories = (state: RootState) => state.product.categories;

export default productSlice.reducer;
