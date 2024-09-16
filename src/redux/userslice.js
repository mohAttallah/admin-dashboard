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

export const getNextData = createAsyncThunk(
    'admin/users/next-data',
    async ( { rejectWithValue }) => {
        try {
            const nextUrl = initialState.nextUrl;
            if(!nextUrl ) return;
            const response = await apiWithoutBaseUrl.get();
            return response.data;
        } catch (error) {
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
            });
    },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
