import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ApiService from './ApiService';
import { daDK } from '@mui/material/locale';
const apiService = new ApiService();
const apiWithoutBaseUrl = apiService.createApiWithoutBaseUrl();

const initialState = {
    data: [],
    loading: false,
    totalRecords: 0,
    error: null,
    nextUrl: null,
    previousUrl: null,
    currentUrl: null,
    walletLoading: null,
    walletError: null,
    walletSuccessfully : null,
};


export const getUsers = createAsyncThunk(
    'admin/users',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/admin/users');
            return response.data;
        } catch (error) {
            console.log("response", error);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const usersSearch = createAsyncThunk(
    'admin/search-users',
    async (keyword, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/admin/search-users?keyword=${keyword}`);
            return response.data;
        } catch (error) {
            console.log("response", error);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const getNextData = createAsyncThunk(
    'admin/users/next-data',
    async ({ limit, offset }, { rejectWithValue }) => {
        try {
            const response = await apiWithoutBaseUrl.get(`https://4gpa.dev2.prodevr.com/admin/users?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const assignToWallet = createAsyncThunk(
    '/payment/assign-to-wallet',
    async (data, { rejectWithValue }) => {
        console.log("data", data);
        try {
            const response = await apiService.post('/payment/assign-to-wallet', data);
        
            return response.data;
        } catch (error) {
            console.log("response", error);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);






const updateFulfilledState = (state, action) => {
    state.loading = false;
    state.data = action.payload.items;
    state.msg = action.payload.message;
    state.totalRecords = action.payload.links.totalRecord;
    state.nextUrl = action.payload.links.next;
    state.previousUrl = action.payload.links.previous;
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                updateFulfilledState(state, action)
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getNextData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getNextData.fulfilled, (state, action) => {
                updateFulfilledState(state, action);
            })
            .addCase(getNextData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(usersSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(usersSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.data = action.payload.items
            })
            .addCase(usersSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(assignToWallet.pending, (state) => {
                state.walletLoading = true;
                state.walletError = null;
                state.walletSuccessfully = false;
            })
            .addCase(assignToWallet.fulfilled, (state, action) => {
                state.walletLoading = false;
                state.walletError = null;
                state.walletSuccessfully = true;
            })
            .addCase(assignToWallet.rejected, (state, action) => {
                state.walletLoading = false;
                state.walletError = action.payload.message;
                state.walletSuccessfully = false;

            });

        },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
