import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './slices/admin/adminSlice';

const store = configureStore({
reducer:{
auth:adminReducer,

}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store