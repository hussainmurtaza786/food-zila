import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "@/types/user";

interface AuthState {
  customer: Customer | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  customer: null,
  token: typeof window !== "undefined" ? localStorage.getItem("foodzilla-auth-token") : null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const registerCustomer = createAsyncThunk<Customer, { name: string; email: string; password: string; phone: string }>(
  "auth/register",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.error || "Registration failed");
      localStorage.setItem("foodzilla-auth-token", data.token);
      return data.customer;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const loginCustomer = createAsyncThunk<Customer, { email: string; password: string }>(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.error || "Login failed");
      localStorage.setItem("foodzilla-auth-token", data.token);
      return data.customer;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<Customer>(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.error || "Not authenticated");
      return data.customer;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutCustomer(state) {
      state.customer = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") localStorage.removeItem("foodzilla-auth-token");
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCustomer.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.customer = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginCustomer.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginCustomer.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.loading = false;
        state.customer = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<Customer>) => {
        state.customer = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.customer = null;
        state.isAuthenticated = false;
        state.loading = false;
        if (typeof window !== "undefined") localStorage.removeItem("foodzilla-auth-token");
      });
  },
});

export const { logoutCustomer, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
