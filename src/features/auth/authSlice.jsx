import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  createUser,
  signOutUser,
  checkUser,
  resetPasswordRequest,
  resetPassword,
} from "./authAPI";

const initialState = {
  status: "Idle",
  loggedInUserToken: null,
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false
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
  "auth/signOutUser",
  async ({rejectWithValue}) => {
    const response = await signOutUser();
    try{
      if(response){
        return response
      }else{
        return rejectWithValue(response);
      }
    }catch(error){
      return rejectWithValue("something went wrong")
    }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  "auth/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await resetPasswordRequest(email);
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPassword(data);
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
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
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state) => {
        state.status = "Successfull";
        state.loggedInUserToken = null;
      })
      .addCase(signOutUserAsync.rejected, (state,action) => {
        state.status = "Failed";
        state.error = action.payload;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state) => {
        state.status = "Successfull";
        state.mailSent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state,action)=>{
        state.status = "Failed";
        state.mailSent = action.payload
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = "Successfull";
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state,action)=>{
        state.status = "Failed";
        state.passwordReset = action.payload
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectLoggedInError = (state) => state.auth.error;
export const selectLoggedInStatus = (state) => state.auth.status;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const  selectPasswordReset = (state)=>state.auth.passwordReset;
export default authSlice.reducer;
