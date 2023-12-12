import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
} from "./productAPI";

const initialState = {
  status: "idle",
  products: [],
  totalItems:0,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (bulider) => {
    bulider
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        (state.status = "idle"), (state.products = action.payload);
      })

      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
  },
});

export const seletAllProducts = (state) => state.product.products;
export const seletAllTotalItems = (state) => state.product.totalItems;
export const { extraReducers } = productSlice.actions;
export default productSlice.reducer;
