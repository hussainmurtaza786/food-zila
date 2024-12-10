import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};

const API_URL = "http://localhost:3000/api/admin/products";

const getToken = () => {
  return localStorage.getItem("token");
};

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};


// Custom error for session expiration
const handleSessionExpiredError = (error: any) => {
  if (error.response && error.response.status === 401) {
    throw new Error("Your session has expired. Please log in again.");
  }
  throw error;
};

// Fetch products
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async () => {
    const response = await axios.get(API_URL);
    return response.data.products;
  }
);

// Add a product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: any, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.put("/api/admin/products", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: any, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.patch("/api/admin/products", product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Delete a product

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.delete("/api/admin/products", {
        data: { id },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add product";
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update product";
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.products = state.products.filter((p) => p.id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export default productSlice.reducer;
