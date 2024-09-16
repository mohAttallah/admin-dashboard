import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authslice';
import  userslice from './userslice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    users : userslice
  },
});

export default store;