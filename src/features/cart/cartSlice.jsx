import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart, deleteCartItems, fetchCartItemsByUserId, resetCart, updateCartItems } from "./cartAPI";

const initialState = {
  status: "Idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (cartItems) => {
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

export const deleteCartItemsAsync = createAsyncThunk(
  "cart/deleteCartItems",
  async (itemId ) => {
    const response = await deleteCartItems(itemId);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId ) => {
    const response = await resetCart(userId);
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
        state.items.push(action.payload);//to add multiple items into cartAPI
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        state.items = action.payload; //to fetch updated items from cartAPI
      })
      .addCase(updateCartItemsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateCartItemsAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        const index = state.items.findIndex((item)=>item.id === action.payload.id) //this is to find the index of the item to be updated
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemsAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(deleteCartItemsAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        const index = state.items.findIndex((item)=>item.id === action.payload.id)
        state.items.splice(index,1);//to delete one item of this index from items array
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "Successful";
        state.items = [];//to delete the entire cart of the user after order placed successfully
      })
  },
});

export const seletCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
