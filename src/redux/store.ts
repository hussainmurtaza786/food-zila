import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/admin/adminSlice';
import productReducer from './slices/admin/productSlice';
const store = configureStore({
reducer:{
auth:adminReducer,
products:productReducer

}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store