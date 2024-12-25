import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import {signin, signotp, signout  } from './action/auth'

export const store = configureStore({
  reducer: rootReducer, 
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})

// export {store, signin, signotp, signout}; 