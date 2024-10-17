import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from './ApiService';

const apiService = new ApiService();

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
    assignTeacherLoading: null,
    assignTeacherError: null,
    assignTeacherSuccessfully : null,
    deleteUserSuccessfully: null,
    deleteUserError: null,
    reactivatedUserSuccessfully: null,
    reactivatedUserError: null,
    removeTeacherSuccessfully: null,
    removeTeacherError: null,
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
            const response = await apiService.get(`/admin/users?limit=${limit}&offset=${offset}`);
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


export const assignTeacher= createAsyncThunk(
    '/teachers/assign',
    async (data, { rejectWithValue }) => {
        try {
            console.log("data assign teacher", data);

            const response = await apiService.post('/teachers/assign', data);
            return response.data;
        } catch (error) {
            console.log("error.response?.data ", error.response?.data.message);
            console.log("error.message", error.message);
            return rejectWithValue( error.response?.data.message || { message: error.message });
        }
    }
);


export const removeTeacher= createAsyncThunk(
    '/teachers/delete',
    async ({userId}, { rejectWithValue }) => {
        try {
            console.log("userId", userId)
            const response = await apiService.delete(`/teachers/delete-teacher?userId=${userId}`, );
            return response.data;
        } catch (error) {
            console.log("error.response?.data ", error.response?.data.message);
            console.log("error.message", error.message);
            return rejectWithValue( error.response?.data.message || { message: error.message });
        }
    }
);

export const deleteUserById= createAsyncThunk(
    '/users/delete',
    async ({userId}, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(`/users/delete-user?userId=${userId}`);

            return response.data;

        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export  const reactivatedUserById= createAsyncThunk(
    '/users/reactivated',
    async ({userId}, { rejectWithValue }) => {
        try {
            const data = { userId }
            const response = await apiService.patch(`/users/re-activate-user`, data);

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
            })  
            .addCase(assignTeacher.pending, (state) => {
                state.assignTeacherLoading = true;
                state.assignTeacherError = null;
                state.assignTeacherSuccessfully = false;
            })
            .addCase(assignTeacher.fulfilled, (state, action) => {
                state.assignTeacherLoading = false;
                state.assignTeacherError = null;
                state.assignTeacherSuccessfully = true;
            })
            .addCase(assignTeacher.rejected, (state, action) => {
                state.assignTeacherLoading = false;
                state.assignTeacherError = true;
                state.assignTeacherSuccessfully = false;
            })
            .addCase(deleteUserById.pending, (state) => {
                state.loading = true;
                state.deleteUserError = null;
                state.deleteUserSuccessfully = false;
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteUserError = null;
                state.deleteUserSuccessfully = true;
            })
            .addCase(deleteUserById.rejected, (state, action) => {
                state.loading = false;
                state.deleteUserError = action.payload.message;
                state.deleteUserSuccessfully = false;
            })
            .addCase(reactivatedUserById.pending, (state) => {
                state.loading = true;
                state.reactivatedUserError = null;
                state.reactivatedUserSuccessfully = false;
            })
            .addCase(reactivatedUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.reactivatedUserError = null;
                state.reactivatedUserSuccessfully = true;
            })
            .addCase(reactivatedUserById.rejected, (state, action) => {
                state.loading = false;
                state.reactivatedUserError = action.payload.message;
                state.reactivatedUserSuccessfully = false;
            })
            .addCase(removeTeacher.pending, (state) => {
                state.loading = true;
                state.removeTeacherError = null;
                state.removeTeacherSuccessfully = false;
            })
            .addCase(removeTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.removeTeacherError = null;
                state.removeTeacherSuccessfully = true;
            })
            .addCase(removeTeacher.rejected, (state, action) => {
                state.loading = false;
                state.removeTeacherError =true
                state.removeTeacherSuccessfully = false;
            })

        },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
