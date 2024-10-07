import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import  userslice from './userslice';
import  universitySlice  from './universityslice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users : userslice,
    university: universitySlice
  },
});

export default store;