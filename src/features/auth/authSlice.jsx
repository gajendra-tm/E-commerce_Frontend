import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, createUser, signOutUser, checkUser } from "./authAPI";

const initialState = {
  status: "Idle",
  loggedInUserToken: null,
  error: null,
  userChecked: false,
};
export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (loggedData, { rejectWithValue }) => {
    try {
      const response = await loginUser(loggedData);
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);

export const checkUserAsync = createAsyncThunk("auth/checkUser", async () => {
  const response = await checkUser();
  return response.data;
});

export const signOutUserAsync = createAsyncThunk(
  "user/signOutUser",
  async () => {
    const response = await signOutUser();
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
        state.loggedInUserToken = action.payload;
      })

      .addCase(loginUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "Successfull";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "Failed";
        state.error = action.payload;
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state) => {
        state.status = "Successfull";
        state.loggedInUserToken = null;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "Successfull";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkUserAsync.rejected, (state) => {
        state.status = "Failed";
        state.userChecked = true;
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectLoggedInError = (state) => state.auth.error;
export const selectLoggedInStatus = (state) => state.auth.status;
export const selectUserChecked = (state)=>state.auth.userChecked
export default authSlice.reducer;
