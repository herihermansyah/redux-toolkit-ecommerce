// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, LoginPayload, User, SignupPayload } from "./types";
import { loginAPI, logoutAPI, signupAPI } from "./authAPI";

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await loginAPI(payload);
      return res;
    } catch (err: unknown) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Login gagal");
    }
  }
);

// SIGNUP
export const signup = createAsyncThunk(
  "auth/signup",
  async (payload: SignupPayload, { rejectWithValue }) => {
    try {
      const res = await signupAPI(payload);
      return res; // { user, token }
    } catch (err: unknown) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue("Signup gagal");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutAPI();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
