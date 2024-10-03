import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from './ApiService';
const apiService = new ApiService();

const initialState = {
    universityListData: [],
    universityPginationsData: [],
    universityPginationsErorr: null,
    loading: false,
    totalRecords: 0,
    error: null,
    nextUrl: null,
    previousUrl: null,
    currentUrl: null,
};

export const universityList = createAsyncThunk(
    'university/list',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/university/list');
            return response.data;

        } catch (error) {

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const universityListPginations = createAsyncThunk(
    'university/all',
    async (_, { rejectWithValue }) => {
        try {

            const response = await apiService.get('/university/all');
            return response.data;

        } catch (error) {

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const getNextUniversityData = createAsyncThunk(
    'university/paginations',
    async ({ limit, offset }, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/university/all?limit=${limit}&offset=${offset}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);



const updateFulfilledState = (state, action) => {
    state.loading = false;
    state.universityPginationsData = action.payload.items;
    state.totalRecords = action.payload.links.totalRecord;
    state.nextUrl = action.payload.links.next;
    state.previousUrl = action.payload.links.previous;
};


const universitySlice = createSlice({
    name: 'university',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(universityList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(universityList.fulfilled, (state, action) => {
                state.loading = false;
                state.universityListData = action.payload.items;
            })
            .addCase(universityList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(universityListPginations.pending, (state) => {
                state.loading = true;
                state.universityPginationsErorr = null;
            })
            .addCase(universityListPginations.fulfilled, (state, action) => {
                updateFulfilledState(state, action);
            })
            .addCase(universityListPginations.rejected, (state, action) => {
                state.loading = false;
                state.universityPginationsErorr = action.payload.message;
            })
            .addCase(getNextUniversityData.pending, (state) => {
                state.loading = true;
                state.universityPginationsErorr = null;
            })
            .addCase(getNextUniversityData.fulfilled, (state, action) => {
                updateFulfilledState(state, action);
            })
            .addCase(getNextUniversityData.rejected, (state, action) => {
                state.loading = false;
                state.universityPginationsErorr = action.payload.message;
            });
    },
});

export default universitySlice.reducer;