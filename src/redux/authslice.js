import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ApiService from './ApiService';
const apiService = new ApiService();

const initialState = {
    user: null,
    loading: false,
    error: null,
    token: null,
    msg: null,
    isAuth: false
};

export const login = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiService.post('/auth/mobile/login', credentials);
            if (response.data.user.isAdmin) {
                apiService.setToken(response.data.token);
                return response.data;
            } else {
                return rejectWithValue({ message: 'Access denied' });
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        checkToken: (state) => {
            const token = apiService.getToken();
            if (token) {
                state.token = token;
                state.isAuth = true;
            } else {
                state.token = null;
                state.isAuth = false;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.msg = action.payload.message;
                state.isAuth = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.isAuth = false;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;