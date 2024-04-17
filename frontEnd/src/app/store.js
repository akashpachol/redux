import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/authSlice'
import adminReducer from "../feature/adminAuth/adminAuthSlice"
export const store = configureStore({
    reducer: { 
      auth:authReducer,
      adminAuth:adminReducer
     },
  });
  