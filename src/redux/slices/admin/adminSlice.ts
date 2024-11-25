import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

type User = {
    id: string;
    email: string;
    password: string;
};

type AdminLogin = {
    email: string;
    password: string;
};
export const adminLoginThunk = createAsyncThunk<User, AdminLogin, { rejectValue: string }>(
    "auth/adminLogin",
    async ({ email, password }: AdminLogin, { rejectWithValue }) => {
        try {
            const usersRes = await fetch(ADMIN_USER_CONNECTION_STRING);
            if (!usersRes.ok) {
                throw new Error("Something went wrong");
            }

            const users = await usersRes.json();

            // Access the user array correctly
            const userArray = users.data || []; // Update key if different
            if (!Array.isArray(userArray)) {
                throw new Error("Invalid API response format.");
            }

            const user = userArray.find((user) => user.email === email);
            if (!user) {
                throw new Error("Invalid Email address");
            }

            if (user.password !== password) {
                throw new Error("Incorrect password");
            }

            return user;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


const ADMIN_USER_CONNECTION_STRING = `http://localhost:3000/api/admin/users`;

const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    user: null as User | null,
    error: null as string | null,
};



const adminSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(adminLoginThunk.pending, (state) => {
            state.isAuthenticating = true;
            state.error = null;
        });
        builder.addCase(adminLoginThunk.fulfilled, (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.isAuthenticating = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(adminLoginThunk.rejected, (state, action) => {
            state.isAuthenticating = false;
            state.error = action.payload || "Login failed";
        });
    },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
