import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductsByFilters,
  fetchProductsById,
} from "./productAPI";

const initialState = {
  status: "idle",
  products: [],
  brands: [],
  categories: [],
  totalItems: 0,
  productsById: [],
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    const response = await fetchProductsById(id);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
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
        state.status = "idle";
        state.products = action.payload;
      })

      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })

      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })

      .addCase(fetchProductsByIdAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchProductsByIdAsync.fulfilled, (state, action) => {
        state.status = "Loading";
        state.productsById = action.payload;
      });
  },
});

export const seletAllProducts = (state) => state.product.products;
export const selectProductsById = (state) => state.product.productsById;
export const seletAllTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const { extraReducers } = productSlice.actions;
export default productSlice.reducer;
