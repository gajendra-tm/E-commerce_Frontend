import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

export const createOrderAsync = createAsyncThunk(
    "order/createOrder",
    async (orders)=>{
        const response = await createOrder(orders);
        return response.data;
    }
);

const initialState = {
    status:"Idle",
    orderDetails:[],
};

const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createOrderAsync.pending,(state)=>{
            state.status = "Loading";
        })
        .addCase(createOrderAsync.fulfilled,(state,action)=>{
            state.status = "Successful";
            state.orderDetails.push(action.payload);
        });
    }
});

export const selectOrderDetails = (state)=>state.order.orderDetails
export default orderSlice.reducer;


