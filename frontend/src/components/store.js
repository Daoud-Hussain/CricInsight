import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../../../backend/profileSlice';  // Profile reducer (to be created)

const store = configureStore({
  reducer: {
    profile: profileReducer,  // Key for the profile slice
  },
});

export default store;
