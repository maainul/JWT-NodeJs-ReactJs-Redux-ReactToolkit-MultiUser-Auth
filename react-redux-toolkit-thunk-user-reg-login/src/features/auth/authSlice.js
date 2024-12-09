import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8081/auth/login", {
        email,
        password,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    token: Cookies.get("authToken") || null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      Cookies.remove("authToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("tokenExpiry");
    },
    setUserData(state, action) {
      console.log("Auth Slice Data :", action.payload.data);
      console.log("Auth Slice Token:", action.payload.token);
      state.user = action.payload.data;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.data;

      // Save token in cookies
      Cookies.set("authToken", action.payload.token, {
        expires: 1 / 288, // 5 minutes
        secure: true,
        sameSite: "Strict",
      });

      // Save user data in localStorage
      localStorage.setItem("userData", JSON.stringify(action.payload.data));

      // Save token expiry in localStorage
      const tokenPayload = JSON.parse(atob(action.payload.token.split(".")[1]));
      const expiryTime = tokenPayload.exp * 1000;
      localStorage.setItem("tokenExpiry", expiryTime);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const autoLogout = () => (dispatch) => {
  const expiryTime = localStorage.getItem("tokenExpiry");
  if (expiryTime) {
    const remainingTime = expiryTime - Date.now();
    if (remainingTime > 0) {
      setTimeout(() => {
        dispatch(logout());
      }, remainingTime);
    } else {
      dispatch(logout());
    }
  }
};

export const { logout, setUserData } = authSlice.actions;

export default authSlice.reducer;
