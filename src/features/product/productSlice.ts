import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductState } from './types';
import { fetchProductsAPI, fetchProductByIdAPI } from './productAPI';
import type { RootState } from '../../app/store';

export const fetchProducts = createAsyncThunk<Product[]>('product/fetchProducts', async () => {
  return await fetchProductsAPI();
});

export const fetchProductById = createAsyncThunk<Product, string>('product/fetchProductById', async (id) => {
  return await fetchProductByIdAPI(id);
});

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      // fetch product detail
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectProducts = (state: RootState) => state.product.products;
export const selectSelectedProduct = (state: RootState) => state.product.selectedProduct;

export default productSlice.reducer;
