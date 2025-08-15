import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./types";
import { loginAPI, logoutAPI } from "./authAPI";
import type { RootState } from "../../app/store";

// asyncThunk login
export const login = createAsyncThunk<
  { user: User; token: string }, // return type
  string, // argument type (email)
  { rejectValue: string } // reject type
>("auth/login", async (email, { rejectWithValue }) => {
  try {
    const response = await loginAPI(email);
    return response; // { user, token }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Login failed");
  }
});

// asyncThunk logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutAPI();
});

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.status = "succeeded";
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;

// selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
