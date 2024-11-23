import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    user: null,
    error: null,
}

const authSlide = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

    }
})