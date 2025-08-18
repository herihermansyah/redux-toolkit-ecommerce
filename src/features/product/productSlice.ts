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
  searchTerm: string; // ✅ tambahkan searchTerm
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  categories: [],
  searchTerm: "", // initial
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    filterByCategory: (state, action: { payload: string }) => {
      const category = action.payload;

      // filter berdasarkan kategori
      let filtered =
        category === "all"
          ? state.products
          : state.products.filter((p) => p.category === category);

      // jika searchTerm ada, filter lagi berdasarkan title atau description
      if (state.searchTerm) {
        const term = state.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
      }

      state.filteredProducts = filtered;
    },

    sortByPrice: (state, action: { payload: "asc" | "desc" }) => {
      state.filteredProducts.sort((a, b) =>
        action.payload === "asc" ? a.price - b.price : b.price - a.price
      );
    },

    setSearchTerm: (state, action: { payload: string }) => {
      state.searchTerm = action.payload;

      const term = action.payload.toLowerCase();
      // filter berdasarkan searchTerm
      state.filteredProducts = state.products.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
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
        state.categories = Array.from(cats); // simpan kategori asli
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { filterByCategory, sortByPrice, setSearchTerm } =
  productSlice.actions;

export const selectFilteredProducts = (state: RootState) =>
  state.product.filteredProducts;
export const selectCategories = (state: RootState) => state.product.categories;
export const selectSearchTerm = (state: RootState) => state.product.searchTerm;

export default productSlice.reducer;
