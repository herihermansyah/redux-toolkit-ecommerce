// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User, LoginPayload, SignupPayload } from "./types";
import { loginAPI, signupAPI, logoutAPI } from "./authAPI";

// ambil user dari localStorage
const savedUser = localStorage.getItem("user");
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedUser ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  { user: User; token: string },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    return await loginAPI(payload);
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue("Unknown error");
  }
});

export const signup = createAsyncThunk<
  { user: User; token: string },
  SignupPayload,
  { rejectValue: string }
>("auth/signup", async (payload, { rejectWithValue }) => {
  try {
    return await signupAPI(payload);
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue("Unknown error");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutAPI();
  localStorage.removeItem("user");
  localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    updateProfile: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login gagal";
      })
      .addCase(signup.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Signup gagal";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError, updateProfile } = authSlice.actions;
export default authSlice.reducer;
