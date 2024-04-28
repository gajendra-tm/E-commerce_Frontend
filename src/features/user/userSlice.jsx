  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUserInfo, fetchLoggedInUserOrders, updateUser } from "./userAPI";

const initialState = {
    status:"Idle",
    userOrders:[],
    userInfo:null,
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    "user/fetchLoggedInUserOrders",
    async()=>{
        const response = await fetchLoggedInUserOrders();
        return response.data;
    }
);

export const fetchLoggedInUserInfoAsync = createAsyncThunk(
    "user/fetchLoggedInUserInfo",
    async()=>{
        const response = await fetchLoggedInUserInfo();
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    "auth/updateUser",
    async (updatedData) => {
        const response = await updateUser(updatedData);
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
        })
        
        .addCase(fetchLoggedInUserInfoAsync.pending,(state)=>{
            state.status = "Loading";
        })
        .addCase(fetchLoggedInUserInfoAsync.fulfilled, (state,action)=>{
            state.status = "Successfull";
            state.userInfo = action.payload;
        })
        
        .addCase(updateUserAsync.pending, (state) => {
            state.status = "Loading";
          })
          .addCase(updateUserAsync.fulfilled, (state, action) => {
            state.status = "Successfull";
            state.userInfo = action.payload;
          });
    }
});



export const selectUserOrders = (state)=>state.user.userOrders;
export const selectUserInfo = (state)=>state.user.userInfo;// returns full user info
export default userSlice.reducer;