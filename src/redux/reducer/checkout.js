import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, current } from '@reduxjs/toolkit';
 

// Helper function to save state to AsyncStorage
const saveStateToAsyncStorage = async (state) => {
  try {   
    console.log("Saving state to AsyncStorage: ",JSON.stringify(state));
    await AsyncStorage.setItem('globalData', JSON.stringify(state));  
  } catch (error) {
    console.error('Error saving state to AsyncStorage: ', error); 
  }
};
 


// Checkout slice
const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    orderId:'',
    addons: [],
    totalPrice: 0,
    recentAddedSite:[],
    couponCode: "",
    couponeData: [],
    couponeUpdatedPrice: {},
    storeAllproductIds:[]
  },
  reducers: {
    addGlobalData(state, action) {
      const { totalPrice, addons, changes, recentAddedSite, storeAllproductIds, orderId } = action.payload;
      
      // state.orderId=''
      // state.addons=[]
      // state.totalPrice=0
      // state.recentAddedSite=[]
      // state.couponCode=""
      // state.couponeData=[]
      // state.couponeUpdatedPrice=""
      // state.storeAllproductIds=[]

      if (changes == false) {
        state.orderId = orderId;
        state.totalPrice = parseFloat(totalPrice);
        state.addons = JSON.parse(addons); 
        state.recentAddedSite = JSON.parse(recentAddedSite);
        state.storeAllproductIds = JSON.parse(storeAllproductIds); 
        saveStateToAsyncStorage(state);
      } else {
        state.orderId = orderId;
        state.totalPrice = parseFloat(totalPrice);
        state.addons = JSON.parse(addons); 
        state.recentAddedSite = JSON.parse(recentAddedSite);
        state.storeAllproductIds = JSON.parse(storeAllproductIds);
        state.couponCode = "";
        state.couponeData = [];
        state.couponeUpdatedPrice = ""
        saveStateToAsyncStorage(state);
      } 
     
    },
    addOrRemoveCoupons(state, action) {
      const { couponCode, couponeData, couponeUpdatedPrice } = action.payload;

      state.couponCode = couponCode;
      state.couponeData = JSON.parse(couponeData);
      state.couponeUpdatedPrice = JSON.parse(couponeUpdatedPrice);

      console.log("addOrRemoveCoupons: ", state);

      // Save updated state to AsyncStorage
      saveStateToAsyncStorage(state);
    },
    clearAllTheData(state, action) {
      AsyncStorage.removeItem('globalData'); 
      state.totalPrice = 0;
      state.addons = [];
      state.recentAddedSite = [];
      state.couponCode = "";
      state.couponeData = [];
      state.couponeUpdatedPrice = "";
    }
  }
});

export default CheckoutSlice.reducer;