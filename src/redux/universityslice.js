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
    addNewUniversitySuccessfully: null,
    addNewUniversityError: null,
    editUniversitySuccessfully: null,
    editUniversityError: null,
    deleteUniversitySuccessfully: null,
    deleteUniversityError: null,
    collageListData: [],
    collageListDataErorr: null,
    addNewCollageSuccessfully: null,
    addNewCollageError: null,
    dapartmentList: [],
    dapartmentListError: null,
    AddDepartmentSuccessfully: null,
    AddDepartmentError: null,
    editDepartmentSuccessfully: null,
    editDepartmentError: null,
    deleteDepartmentSuccessfully: null,
    deleteDepartmentError: null,
    materilsList: [],
    materilsListError: null,
    editCollageSuccessfully: null,
    editCollageError: null,
    deleteCollageSuccessfully: null,
    deleteCollageError: null,
    addMaterialSuccessfully: null,
    addMaterialError: null,
    editMaterialSuccessfully: null,
    editMaterialError: null,
    deleteMaterialSuccessfully: null,
    deleteMaterialError: null,
    groupsListData: [],
    groupsPginationsData: [],
    groupsPginationsErorr: null,
    groupsLoading: false,
    groupsTotalRecords: 0,
    createGroupSuccessfully: null,
    createGroupError: null,
    editGroupSuccessfully: null,
    editGroupError: null,
    requestGroups:[],
    deleteGroupSuccessfully: null,
    deleteGroupError: null,
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


export const addNewUniversity = createAsyncThunk(
    'university/create',
    async ({ name, nameInArabic, address, country, photo }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('nameInArabic', nameInArabic);
            formData.append('address', address);
            formData.append('country', country);
            formData.append('image', photo);
            const response = await apiService.postFormData(`university/create`, formData);
            return response.data;
        } catch (error) {
            console.log("error.message", error)
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const editUniversity = createAsyncThunk(
    'university/edit',
    async ({ name, nameInArabic, address, country, photo, universityId }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('nameInArabic', nameInArabic);
            formData.append('address', address);
            formData.append('country', country);
            formData.append('image', photo);
            formData.append("id", universityId);
            const response = await apiService.postFormData(`university/edit`, formData);

            return response.data;

        } catch (error) {
            console.log("error.message", error.message);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const deleteUniversity = createAsyncThunk(
    'university/delete',
    async ({ universityId }, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(`/university/delete?universityId=${universityId}`);
            return response.data;
        } catch (error) {
            console.log("error.message", error.message);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);



export const getCollageForEachUniversity = createAsyncThunk(
    'university/collage',
    async ({ universityId }, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/university/collage-by-UniversityId?universityId=${universityId}`);
            return response.data;

        } catch (error) {
            console.log("error.message", error.message);

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);



export const addNewCollage = createAsyncThunk(
    'university/new-collage',
    async ({ name, nameInArabic, universityId }, { rejectWithValue }) => {
        try {

            const data = {
                "university": universityId,
                "name": name,
                "nameInArabic": nameInArabic
            };
            console.log("data", data);

            const response = await apiService.post(`/university/collage/create`, data);
            return response.data;
        } catch (error) {
            console.log("error.message", error.message);
            console.log("error.response?.data ", error.response?.data);

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const editCollage = createAsyncThunk(
    'university/edit-collage',
    async ({ collageId, name, nameInArabic, universityId }, { rejectWithValue }) => {
        try {
            const data = {
                "collegeId": collageId,
                "university": universityId,
                "name": name,
                "nameInArabic": nameInArabic
            };
            console.log("data", data);

            const response = await apiService.put(`/university/collage/edit-collage`, data);
            return response.data;
        } catch (error) {
            console.log("error.message", error.message);
            console.log("error.response?.data ", error.response?.data);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const deleteCollage = createAsyncThunk(
    'university/delete-collage',
    async ({ collageId }, { rejectWithValue }) => {
        try {

            const response = await apiService.delete(`/university/collage/delete-collage?collageId=${collageId}`);
            return response.data;

        } catch (error) {
            console.log("error.message", error.message);
            console.log("error.response?.data ", error.response?.data);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const getDepartmentForEachCollage = createAsyncThunk(
    'university/department',
    async ({ collageId }, { rejectWithValue }) => {


        try {
            const response = await apiService.get(`/university/department-by-collageId?collageId=${collageId}`);
            return response.data;

        } catch (error) {
            console.log("error.message", error.message);

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const addNewDepartment = createAsyncThunk(
    'university/department-create',
    async ({ name, nameInArabic, collageId }, { rejectWithValue }) => {
        try {

            const data = {
                "college": collageId,
                "name": name,
                "nameInArabic": nameInArabic
            };

            const response = await apiService.post(`/university/department/create`, data);
            return response.data;
        } catch (error) {
            console.log("error.message", error.message);
            console.log("error.response?.data ", error.response?.data);

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const editDepartment = createAsyncThunk(
    'university/department-edit',
    async ({ name, nameInArabic, departmentId }, { rejectWithValue }) => {
        try {

            const data = {
                "departmentId": departmentId,
                "name": name,
                "nameInArabic": nameInArabic
            };

            const response = await apiService.put(`/university/edit-department`, data);
            return response.data;

        } catch (error) {
            console.log("error.message", error.message);
            console.log("error.response?.data ", error.response?.data);

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);



export const deleteDepartment = createAsyncThunk(
    'university/department-delete',
    async ({ departmentId }, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(`/university/delete-department?departmentId=${departmentId}`);
            return response.data;
        } catch (error) {
            console.log("error.message", error.message);
            console.log("error.response?.data ", error.response?.data);
        }
    });




export const getMaterialsForEachDepartment = createAsyncThunk(
    'university/materials',
    async ({ departmentId }, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/material-of-groups/all?departmentId=${departmentId}`);
            return response.data;

        } catch (error) {
            console.log("error.message", error.message);

            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const addNewMaterial = createAsyncThunk(
    '/material-of-groups/new',
    async ({ name, departmentId, icon }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('departmentId', departmentId);
            formData.append('icon', icon);
            const response = await apiService.postFormData(`/material-of-groups`, formData);
            return response.data;
        } catch (error) {
            console.log("error.message", error)
            console.log("error.response?.data ", error.response?.data);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const editMaterial = createAsyncThunk(
    '/material-of-groups/edit',
    async ({ name, materialId, icon }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('materialId', materialId);
            formData.append('icon', icon);
            const response = await apiService.putFormData(`/material-of-groups`, formData);
            return response.data;
        } catch (error) {
            console.log("error.message", error)
            console.log("error.response?.data ", error.response?.data);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const deleteMaterial = createAsyncThunk(
    '/material-of-groups/delete',
    async ({ materialId }, { rejectWithValue }) => {
        try {
            console.log("materialIdtttttt", materialId)
            const response = await apiService.delete(`/material-of-groups?materialId=${materialId}`);
            return response.data;
        } catch (error) {
            console.log("error.message", error)
            console.log("error.response?.data ", error.response?.data);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);




export const getGroupsList = createAsyncThunk(
    '/groups/list',
    async ({ materialId }, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/groups/all?status=active&materialId=${materialId}`);
            return response.data;
        } catch (error) {
            console.log("error.message", error)
            console.log("error.response?.data ", error.response?.data);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);


export const addNewGroup = createAsyncThunk(
    '/groups/new',
    async ({ name, selectedMaterial, description, language, icon, status, type, pricePerHour, tutorialType }, { rejectWithValue }) => {
        try {

            const formData = new FormData();

            formData.append('name', name);
            formData.append('materialId', selectedMaterial);
            formData.append('description', description);
            formData.append('language', language);
            formData.append('status', status);
            formData.append('type', type);
            formData.append('icon', icon);
            formData.append('pricePerHour', pricePerHour);
            formData.append('tutorialType', tutorialType);

            const response = await apiService.postFormData(`/groups/create`, formData);
            return response.data;

        } catch (error) {
            console.log("error.message", error)
            console.log("error.response?.data ", error.response?.data);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export const editGroup = createAsyncThunk(
    '/groups/edit',
    async ({ groupId, name, description, language, icon, status, type, pricePerHour, tutorialType }, { rejectWithValue }) => {
        try {

            const formData = new FormData();

            formData.append('name', name);
            formData.append('groupId', groupId);
            formData.append('description', description);
            formData.append('language', language);
            formData.append('status', status);
            formData.append('type', type);
            formData.append('icon', icon);
            formData.append('pricePerHour', pricePerHour);
            formData.append('tutorialType', tutorialType);

            const response = await apiService.postFormData(`/groups/edit`, formData);
            return response.data;

        } catch (error) {
            console.log("error.message", error)
            console.log("error.response?.data ", error.response?.data);
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);



export const requestGroup = createAsyncThunk(
    'groups/request-group',
    async ( _ , { rejectWithValue }) => {
        try {
            const response = await apiService.get(`/groups/request-group`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: error.message });
        }
    }
);

export  const deleteGroup = createAsyncThunk(
    'groups/delete-group',
    async ({ groupId }, { rejectWithValue }) => {
        try {
            const response = await apiService.delete(`/groups/delete?groupId=${groupId}`);
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
    reducers: {
    },
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
            })
            .addCase(addNewUniversity.fulfilled, (state, action) => {
                state.addNewUniversitySuccessfully = true;
                state.addNewUniversityError = false;
            })
            .addCase(addNewUniversity.rejected, (state, action) => {
                state.addNewUniversityError = true;
                state.addNewUniversitySuccessfully = false;
            })
            .addCase(editUniversity.fulfilled, (state, action) => {

                state.editUniversitySuccessfully = true;
                state.editUniversityError = false;
            })
            .addCase(editUniversity.rejected, (state, action) => {
                state.editUniversitySuccessfully = false;
                state.editUniversityError = true;
            })
            .addCase(deleteUniversity.fulfilled, (state, action) => {
                state.deleteUniversitySuccessfully = true;
                state.deleteUniversityError = false;
            })
            .addCase(deleteUniversity.rejected, (state, action) => {
                state.deleteUniversitySuccessfully = false;
                state.deleteUniversityError = true;
            })
            .addCase(getCollageForEachUniversity.pending, (state) => {
                state.loading = true;
                state.collageListDataErorr = false;
            })
            .addCase(getCollageForEachUniversity.fulfilled, (state, action) => {
                state.loading = false;
                state.collageListData = action.payload.items;
                state.collageListDataErorr = false;
            })
            .addCase(getCollageForEachUniversity.rejected, (state, action) => {
                state.loading = false;
                state.collageListData = [];
                state.collageListDataErorr = true;
            })
            .addCase(addNewCollage.fulfilled, (state, action) => {
                state.addNewCollageSuccessfully = true
                state.addNewCollageError = false;
            })
            .addCase(addNewCollage.rejected, (state, action) => {
                state.addNewCollageSuccessfully = false
                state.addNewCollageError = true;
            })
            .addCase(editCollage.fulfilled, (state, action) => {
                state.editCollageSuccessfully = true
                state.editCollageError = false;
            })
            .addCase(editCollage.pending, (state, action) => {
                state.editCollageSuccessfully = null
                state.editCollageError = null;
            })
            .addCase(editCollage.rejected, (state, action) => {
                state.editCollageSuccessfully = false
                state.editCollageError = true;
            })
            .addCase(deleteCollage.fulfilled, (state, action) => {
                state.deleteCollageSuccessfully = true
                state.deleteCollageError = false;
            })
            .addCase(deleteCollage.pending, (state, action) => {
                state.deleteCollageSuccessfully = null
                state.deleteCollageError = null;
            })
            .addCase(deleteCollage.rejected, (state, action) => {
                state.deleteCollageSuccessfully = false
                state.deleteCollageError = true;
            })
            .addCase(getDepartmentForEachCollage.pending, (state, action) => {
                state.loading = true;
                state.dapartmentListError = false;
                state.dapartmentList = [];
            })
            .addCase(getDepartmentForEachCollage.fulfilled, (state, action) => {
                state.dapartmentList = action.payload.items;
                state.dapartmentListError = false;
                state.loading = false
            })
            .addCase(getDepartmentForEachCollage.rejected, (state, action) => {
                state.dapartmentList = []
                state.dapartmentListError = true;
                state.loading = false
            })
            .addCase(addNewDepartment.fulfilled, (state, action) => {
                state.AddDepartmentSuccessfully = true
                state.AddDepartmentError = false;
            })
            .addCase(addNewDepartment.pending, (state, action) => {
                state.AddDepartmentSuccessfully = null
                state.AddDepartmentError = null;
            })
            .addCase(addNewDepartment.rejected, (state, action) => {
                state.AddDepartmentSuccessfully = false
                state.AddDepartmentError = true;
            })
            .addCase(editDepartment.fulfilled, (state, action) => {
                state.editDepartmentSuccessfully = true
                state.editDepartmentError = false;
            })
            .addCase(editDepartment.pending, (state, action) => {
                state.editDepartmentSuccessfully = null
                state.editDepartmentError = null;
            })
            .addCase(editDepartment.rejected, (state, action) => {
                state.editDepartmentSuccessfully = false
                state.editDepartmentError = true;
            })

            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.deleteDepartmentSuccessfully = true
                state.deleteDepartmentError = false;
            })
            .addCase(deleteDepartment.pending, (state, action) => {
                state.deleteDepartmentSuccessfully = null
                state.deleteDepartmentError = null;
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.deleteDepartmentSuccessfully = false
                state.deleteDepartmentError = true;
            })
            .addCase(getMaterialsForEachDepartment.pending, (state, action) => {
                state.loading = true;
                state.dapartmentListError = false;
                state.materilsList = [];
            })
            .addCase(getMaterialsForEachDepartment.fulfilled, (state, action) => {
                state.materilsList = action.payload.items;
                state.materilsListError = false;
                state.loading = false
            })
            .addCase(getMaterialsForEachDepartment.rejected, (state, action) => {
                state.materilsList = []
                state.materilsListError = true;
                state.loading = false
            })
            .addCase(addNewMaterial.fulfilled, (state, action) => {
                state.addMaterialSuccessfully = true
                state.addMaterialError = false;
            })
            .addCase(addNewMaterial.pending, (state, action) => {
                state.addMaterialSuccessfully = null
                state.addMaterialError = null;
            })
            .addCase(addNewMaterial.rejected, (state, action) => {
                state.addMaterialSuccessfully = false
                state.addMaterialError = true;
            })
            .addCase(editMaterial.fulfilled, (state, action) => {
                state.editMaterialSuccessfully = true
                state.editMaterialError = false;
            })
            .addCase(editMaterial.pending, (state, action) => {
                state.editMaterialSuccessfully = null
                state.editMaterialError = null;
            })
            .addCase(editMaterial.rejected, (state, action) => {
                state.editMaterialSuccessfully = false
                state.editMaterialError = true;
            })
            .addCase(deleteMaterial.fulfilled, (state, action) => {
                state.deleteMaterialSuccessfully = true
                state.deleteMaterialError = false;
            })
            .addCase(deleteMaterial.pending, (state, action) => {
                state.deleteMaterialSuccessfully = null
                state.deleteMaterialError = null;
            })
            .addCase(deleteMaterial.rejected, (state, action) => {
                state.deleteMaterialSuccessfully = false
                state.deleteMaterialError = true;
            })
            .addCase(getGroupsList.pending, (state) => {
                state.groupsLoading = true;
                state.groupsPginationsErorr = null;
            })
            .addCase(getGroupsList.fulfilled, (state, action) => {
                state.groupsLoading = false;
                state.groupsListData = action.payload.items;
                state.groupsTotalRecords = action.payload.links.totalRecord;
                state.createGroupSuccessfully = null;
                state.createGroupError = null;
                state.editGroupSuccessfully = null;
                state.editGroupError = null;
            })
            .addCase(getGroupsList.rejected, (state, action) => {
                state.groupsLoading = false;
                state.groupsPginationsErorr = action.payload.message;
            })
            .addCase(addNewGroup.fulfilled, (state, action) => {
                state.createGroupSuccessfully = true;
                state.createGroupError = false;
            })
            .addCase(addNewGroup.pending, (state, action) => {
                state.createGroupSuccessfully = null;
                state.createGroupError = null;
            })
            .addCase(addNewGroup.rejected, (state, action) => {
                state.createGroupSuccessfully = false;
                state.createGroupError = true;
            })
            .addCase(editGroup.fulfilled, (state, action) => {
                state.editGroupSuccessfully = true;
                state.editGroupError = false;
            })
            .addCase(editGroup.pending, (state, action) => {
                state.editGroupSuccessfully = null;
                state.editGroupError = null;
            })
            .addCase(editGroup.rejected, (state, action) => {
                state.editGroupSuccessfully = false;
                state.editGroupError = true;
            })
            .addCase(requestGroup.fulfilled, (state, action) => {
                state.requestGroups = action.payload.items;
                state.error = false;
                state.loading= false
            })
            .addCase(requestGroup.pending, (state, action) => {
                state.requestGroups = null;
                state.error = null;
                state.loading= true
            })
            .addCase(requestGroup.rejected, (state, action) => {
                state.requestGroups = null;
                state.error = true;
                state.loading= false;
            })
            .addCase(deleteGroup.fulfilled, (state, action) => {
                state.deleteGroupSuccessfully = true;
                state.deleteGroupError = false;
                state.loading= false;
            })
            .addCase(deleteGroup.pending, (state, action) => {
                state.deleteGroupSuccessfully = null;
                state.deleteGroupError = null;
                state.loading= true;
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.deleteGroupSuccessfully = false;
                state.deleteGroupError = true;
                state.loading= false;
            })

    },
});

export default universitySlice.reducer;