import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/admin/productSlice";
import userReducer from "./slices/admin/userSlice";
import cartReducer from "./slices/customer/cartSlice";
import authReducer from "./slices/customer/authSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
