import handleTokenExpiry from "@/redux/utils/TokenExpiry";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string
};

const API_URL = "/api/admin/users";

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
    if (currentTime > decoded.exp) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return true;
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
export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data.products;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch products"
      );
    }
  }
);

// Add user
export const addUser = createAsyncThunk<User, Omit<User, "id">>(
  "users/add",
  async (user: any, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found");
      if (isTokenExpired(token)) {
        handleTokenExpiry("Your session has expired. Please log in again.");
        return;
      }

      const response = await axios.put(API_URL, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    } catch (error: any) {
      console.log(error)
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add product"
      );
      
    }

  });

// Update user
export const updateUser = createAsyncThunk<User, User>(
  "users/update",
  async (user: any, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token found");
      if (isTokenExpired(token)) {
        handleTokenExpiry("Your session has expired. Please log in again.");
        return;
      }
      const response = await axios.patch(API_URL, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Response ==>",response)
      return response.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update product"
      );
    }

  });

// Delete user
export const deleteUser = createAsyncThunk<{ id: string }, string>(
  "users/delete",
  async (id: string, thunkAPI) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }
      if (isTokenExpired(token)) {
        handleTokenExpiry("Your session has expired. Please log in again.");
        return thunkAPI.rejectWithValue("Session expired");
      }

      await axios.delete(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
        data:{id}
      });
      return { id };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete user"
      );
    }
  }
);







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
