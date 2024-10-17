import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from './ApiService';

const apiService = new ApiService();

const initialState = {
    courses: [],
    loading: false,
    totalRecords: 0,
    coursesError: null,
    categories: [],
    categoriesError: null,
    addNewCategorySuccessfully: null,
    addNewCategoryError: null,
    editCategorySuccessfully: null,
    editCategoryError: null,
    deleteCategorySuccessfully: null,
    deleteCategoryError: null,
    chapters: [],
    chaptersError: null,
    chaptersLoading: null,

    // nextUrl: null,
    // previousUrl: null,
    // currentUrl: null,
    // walletLoading: null,
    // walletError: null,
    // walletSuccessfully : null,
    // assignTeacherLoading: null,
    // assignTeacherError: null,
    // assignTeacherSuccessfully : null
};


export const coursesList = createAsyncThunk(
    'i-course/courses',
    async ({selectedCategory}, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/i-courses/courses?category-id=${selectedCategory}`);
            return response.data;

        } catch (error) {

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const categoryList = createAsyncThunk(
    'i-course/new-category',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get('/i-courses/categories');
            return response.data;

        } catch (error) {

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const addNewCategory = createAsyncThunk(
    'i-course/category',
    async ({title,  titleInArabic, photo}, { rejectWithValue }) => {
        try {

            const formData = new FormData();
            formData.append('title', title);
            formData.append('titleInArabic', titleInArabic);
            formData.append('icon', photo);
            const response = await apiService.postFormData('/i-courses/category', formData);
            return response.data;

        } catch (error) {
            console.log("error", error.message);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const EditCategory = createAsyncThunk(
    'i-course/edit-category',
    async ({ categoryId, title, titleInArabic, photo }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('id', categoryId);
            formData.append('title', title);
            formData.append('titleInArabic', titleInArabic);

            if (photo) {
                formData.append('icon', photo);
            }

            const response = await apiService.putFormData('/i-courses/category', formData);
            return response.data;
        } catch (error) {
            console.log("error", error.message);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const DeleteCategory = createAsyncThunk(
    'i-course/delete-category',
    async ({categoryId}, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(`/i-courses/category?categoryId=${categoryId}`);
            return response.data;

        } catch (error) {
            console.log("error", error.message);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const chaptersList = createAsyncThunk(
    'i-course/chapters',
    async ({selectedCourseId}, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/i-courses/chapters?courseId=${selectedCourseId}`);
            return response.data;

        } catch (error) {

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);



const updateFulfilledState = (state, action) => {
    
};

const coursesSlice = createSlice({
    name: 'icourse',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        
        builder
            .addCase(coursesList.pending, (state) => {
                state.loading = true;
                state.coursesError = null;
            })
            .addCase(coursesList.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action.payload.items", action.payload);
                state.courses = action.payload.items.items;
                state.totalRecords = action.payload.links?.totalRecord || 0;
            })
            .addCase(coursesList.rejected, (state, action) => {
                state.loading = false;
                state.coursesError = action.payload?.message || 'An error occurred';
            })
            .addCase(categoryList.pending, (state) => {
                state.loading = true;
                state.categoriesError = null;
            })
            .addCase(categoryList.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.items;
                console.log("action.payload.items", action.payload);
                state.totalRecords = action.payload.items?.lenght || 0;
                state.addNewCategoryError = null;
                state.addNewCategorySuccessfully = null;
                state.editCategorySuccessfully = null;
                state.editCategoryError = null;
                state.deleteCategorySuccessfully = null;
                state.deleteCategoryError = null;
            })
            .addCase(categoryList.rejected, (state, action) => {
                state.loading = false;
                state.categoriesError = action.payload?.message || 'An error occurred';
            })
            .addCase(addNewCategory.pending, (state) => {
                state.loading = true;
                state.addNewCategoryError = null;
            })
            .addCase(addNewCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.addNewCategorySuccessfully = true;
            })
            .addCase(addNewCategory.rejected, (state, action) => {
                state.loading = false;
                state.addNewCategoryError = action.payload?.message || 'An error occurred';
            })
            .addCase(EditCategory.pending, (state) => {
                state.loading = true;
                state.editCategoryError = null;
                state.editCategorySuccessfully = null;
            })
            .addCase(EditCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.editCategorySuccessfully = true;
            })
            .addCase(EditCategory.rejected, (state, action) => {
                state.loading = false;
                console.log("action.payload", action.payload.message);
                state.editCategoryError = action.payload?.message || 'An error occurred';
            })
            .addCase(DeleteCategory.pending, (state) => {
                state.loading = true;
                state.deleteCategoryError = null;
            })
            .addCase(DeleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteCategorySuccessfully = true;
            })
            .addCase(DeleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.deleteCategoryError = action.payload?.message || 'An error occurred';
            })
            .addCase(chaptersList.pending, (state) => {
                state.chaptersLoading = true;
                state.chaptersError = null;
            })
            .addCase(chaptersList.fulfilled, (state, action) => {
                state.chaptersLoading = false;
                state.chapters = action.payload.items;
            })
            .addCase(chaptersList.rejected, (state, action) => {
                state.chaptersLoading = false;
                state.chaptersError = action.payload?.message || 'An error occurred';
            })


        },
});


export default coursesSlice.reducer;
