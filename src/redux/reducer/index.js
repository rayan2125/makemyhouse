import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth'; 
import CheckoutSlice from './checkout';
// Import other reducers as needed

const rootReducer = combineReducers({
    isLogIn: authSlice, 
    checkout:CheckoutSlice
  // Add other reducers here
});

export default rootReducer;