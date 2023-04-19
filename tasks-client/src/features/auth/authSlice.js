import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    status: "idle",
    error: "",
};

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async () => {
    const response = await axios.get("/api/user");
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.user = action.payload;
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            });
    },
});

export const selectAllAuth = (state) => state.auth.user;
export const getAuthStatus = (state) => state.auth.status;
export const getAuthError = (state) => state.auth.error;

export default authSlice.reducer;
