import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
  fetchProductsByFilters,
  fetchProductsById,
  updateProduct,
} from "./productAPI";

const initialState = {
  status: "idle",
  products: [],
  brands: [],
  categories: [],
  productsById: [],
  totalItems: 0,
};

export const fetchProductsByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    const response = await fetchProductsById(id);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination, admin}) => {
    const response = await fetchProductsByFilters(filter, sort, pagination, admin);
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
  reducers: {
    clearProductsById: (state) => {
      state.productsById = null;
    },
  },
  extraReducers: (bulider) => {
    bulider
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
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "Loading";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "Loading";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductsById = (state) => state.product.productsById;
export const selectAllTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const { clearProductsById } = productSlice.actions;
export default productSlice.reducer;
