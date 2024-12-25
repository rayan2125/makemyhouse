import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


const authSlice = createSlice({
  name: 'isLogIn',
  initialState: {
    isLoggedIn: false,
    token: '',
    conform: '',
    phonenumber: '',
    isd: '',
    haveOrder: false,
  },
  reducers: {
    haveOrder(state, action) {
      const { haveOrder } = action.payload;
      state.haveOrder = haveOrder;
    },
    signin(state, action) {
      const { isLoggedIn, token, haveOrder } = action.payload;
      console.log('signIN reducer: ', action.payload);
      state.isLoggedIn = isLoggedIn;
      state.token = token;
      state.haveOrder = haveOrder
    },
    signotp(state) {
      console.log("Store the state in signOTP reducer-slice", state)
      // state.isLoggedIn = action.payload.isLoggedIn;
      state.conform = "";
      state.isLoggedIn = true;
    },
    signout(state) {
      console.log("Store the state in signout reducer-slice", state)
      state.isLoggedIn = false;
      AsyncStorage.clear();
    },
    conformCode(state, action) {
      // here i just store the states 
      const { confirmation, phonenumber, isd } = action.payload;
      console.log("conformcode reducer:---", { phonenumber, isd, confirmation });
      state.conform = confirmation;
      state.phonenumber = phonenumber;
      state.isd = isd;
    },
    newuser(state) {
      console.log("New User Action Redux ", state);
    },
    clearallinit(state, action) {
      console.log("clearallinit -_-_-_-_-_-_-_-_-_-_-_-_ cleat everything");
      // state.isLoggedIn = false;
      state.phonenumber = "";
      state.isLoggedIn = false;
      state.token = '';
      state.conform = '';
      state.phonenumber = '';
      state.isd = '';
      state.haveOrder = false;
      console.log('clearallinit: ', action.payload);
      // state.isd="+19";  
      // state.conform="" ;
      // state.token = "";
      AsyncStorage.clear();
      AsyncStorage.setItem('isLogin', "1");

    },
  },
});


export default authSlice.reducer;