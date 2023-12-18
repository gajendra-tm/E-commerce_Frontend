import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, fetchCartItemsByUserId, updateCartItems } from "./cartAPI";

const initialState = {
  status: "Idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (cartItems) => {
    console.log(cartItems);
    const response = await addToCart(cartItems);
    return response.data;
  }
);

export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchCartItemsByUserId",
  async (userId ) => {
    const response = await fetchCartItemsByUserId(userId);
    return response.data;
  }
);

export const updateCartItemsAsync = createAsyncThunk(
  "cart/updateCartItems",
  async (updateValue ) => {
    const response = await updateCartItems(updateValue);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (bulider) => {
    bulider
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        state.items.push(action.payload);
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        state.items = action.payload;
      })
      .addCase(updateCartItemsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateCartItemsAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        const index = state.items.findIndex((item)=>item.id === action.payload.id)
        state.items[index] = action.payload;
      })
  },
});

export const seletCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
