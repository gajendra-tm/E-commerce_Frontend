import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUser, createUser, signOutUser } from "./authAPI";

const initialState = {
  status: "Idle",
  loggedInUser: null,
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loggedData, { rejectWithValue }) => {
    try {
      const response = await checkUser(loggedData);
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue("something went wrong" );
    }
  }
);

export const signOutUserAsync = createAsyncThunk(
  "user/signOutUser",
  async (loggedData) => {
    const response = await signOutUser(loggedData);
    return response.data;
  }
);

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
        state.error = action.payload;
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state) => {
        state.status = "Successfull";
        state.loggedInUser = null;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectLoggedInError = (state) => state.auth.error;
export const selectLoggedInStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
