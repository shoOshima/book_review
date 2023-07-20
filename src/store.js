import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import pageCount from './pages/pageCount';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pagecounter: pageCount,
  },
});
