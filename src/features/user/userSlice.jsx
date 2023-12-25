  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders } from "./userAPI";

const initialState = {
    status:"Idle",
    userOrders:[],
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    "user/fetchLoggedInUserOrders",
    async(userId)=>{
        const response = await fetchLoggedInUserOrders(userId);
        return response.data;
    }
);

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLoggedInUserOrdersAsync.pending,(state)=>{
            state.status = "Loading";
        })
        .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state,action)=>{
            state.status = "Successfull";
            state.userOrders = action.payload;
        });
    }
});



export const selectUserOrders = (state)=>state.user.userOrders;
export default userSlice.reducer;