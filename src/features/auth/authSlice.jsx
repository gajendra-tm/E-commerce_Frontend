import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authAPI";

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loggedData) => {
      const response = await checkUser(loggedData);
      return response.data;
  }
);



const initialState = {
  status: "Idle",
  loggedInUser: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "Successfull";
        state.loggedInUser = action.payload;
      })

      .addCase(checkUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "Successfull";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.error.message;
      });
      
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
