import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
};

const API_URL = "http://localhost:3000/api/admin/users";

// Helper functions to check token
const getToken = () => {
  const token = localStorage.getItem("authToken");
  console.log("Retrieved token:", token);
  return token;
};

const isTokenExpired = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return currentTime > decoded.exp;
  } catch (err) {
    console.log(err);
    return true; // Treating invalid token as expired
  }
};

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Fetch users
export const fetchUsers = createAsyncThunk<User[]>("users/fetch", async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  if (isTokenExpired(token)) throw new Error("Token has expired");

  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.users;
});

// Add user
export const addUser = createAsyncThunk<User, Omit<User, "id">>("users/add", async (user) => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  if (isTokenExpired(token)) throw new Error("Token has expired");

  const response = await axios.post(API_URL, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
});

// Update user
export const updateUser = createAsyncThunk<User, User>("users/update", async (user) => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  if (isTokenExpired(token)) throw new Error("Token has expired");

  const response = await axios.patch(API_URL, user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user;
});

// Delete user
export const deleteUser = createAsyncThunk<{ id: string }, string>("users/delete", async (id) => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  if (isTokenExpired(token)) throw new Error("Token has expired");

  await axios.delete(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { id };
});

// User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.users = state.users.filter((u) => u.id !== action.payload.id);
      });
  },
});

export default userSlice.reducer;
