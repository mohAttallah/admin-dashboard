import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import  userslice from './userslice';
import  universitySlice  from './universityslice';
import  icourseSlice  from './icourseslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users : userslice,
    university: universitySlice,
    icourse:icourseSlice
  },
});

export default store;