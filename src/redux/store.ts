import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/admin/productSlice';
import userReducer from './slices/admin/userSlice';
const store = configureStore({
    reducer: {
        // auth:adminReducer,
        products: productReducer,
        user: userReducer

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store