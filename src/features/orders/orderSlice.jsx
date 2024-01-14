import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrders } from "./orderAPI";

const initialState = {
  status: "Idle",
  orderDetails: [],
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  "orders/createOrder",
  async (orders) => {
    const response = await createOrder(orders);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
    "orders/fetchAllOrders",
    async ({sort})=>{
        const response = await fetchAllOrders(sort);
        return response.data;
    }
);

export const updateOrdersAsync = createAsyncThunk(
  "orders/updateOrders",
  async(order)=>{
    const response = await updateOrders(order);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        state.orderDetails.push(action.payload);
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        state.orderDetails = action.payload.data;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrdersAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateOrdersAsync.fulfilled, (state, action) => {
        state.status = "Successful";
        const index = state.orderDetails.findIndex((order)=>order.id === action.payload.id)
        state.orderDetails[index] = action.payload;
      });
  },
});

export const selectOrderDetails = (state) => state.orders.orderDetails;
export const selectTotalOrders = (state)=>state.orders.totalOrders;
export default orderSlice.reducer;
