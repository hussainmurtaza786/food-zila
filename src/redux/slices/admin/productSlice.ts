import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


type Product = {
  id: string;
  title: string;
  price: number;
  imgUrl: string;
  description: string;
};


const API_URL = "http://localhost:3000/api/admin/products";


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


export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.products;
  }
);


export const addProduct = createAsyncThunk<Product, Product>(
  "products/add",
  async (product) => {
    console.log("product",product)
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    return data.product;
  }
);


export const updateProduct = createAsyncThunk(
    "products/update",
    async (product: Product) => {

      const response = await fetch("http://localhost:3000/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update product: ${response.statusText}`);
      }
  
      const updatedProduct = await response.json();
      console.log("updatedProduct",updatedProduct)
      return updatedProduct;
    }
  );
  



export const deleteProduct = createAsyncThunk<{ id: string }, string>(
  "products/delete",
  async (id) => {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }


    const responseBody = await response.json(); 
    console.log("Response Body:", responseBody);

    return { id: responseBody.product.id };
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
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.products = state.products.filter((p) => p.id !== action.payload.id);
      });
  },
});

export default productSlice.reducer;
