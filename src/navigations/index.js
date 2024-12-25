/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, Image, Dimensions, Linking, AppState, ActivityIndicator } from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();



// start:  Navigations
import { AuthStack } from './AuthStack.js';
import { MainStack } from './MainStack.js';
import { OthersScreens } from './othersScreen.js';
// end: Navigation



// this methos is used to work with the action redux  
import { useDispatch, useSelector } from 'react-redux';
import { signin, clearallinit, haveOrder } from '../redux';
import ApiService from '../ApiServices/index.js';
import axios from "axios";

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

import { DeepLinking } from './deeplinkFunction.js';
import TestingScressn from '../screens/TestingScressn.js';
// import {deeplinkUrlHanlder} from './deeplinkFunction.js';

// import linking from './DeepLink.js';

// import { useNavigation,useNavigationState } from '@react-navigation/native';

function AppStack() {

  const dispatch = useDispatch();
  // const haveOrder = useSelector(state => state.isLogIn.haveOrder);

  // useEffect(()=>{ 
  //   if(haveOrder == true){
  //     AsyncStorage.setItem('isLogin', "2");
  //   }else{
  //     AsyncStorage.setItem('isLogin', "3"); 
  //   } 
  // },[haveOrder]);

  // start: clear local storage
  const cleanLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error cleaning local storage:', error);
    }
  };
  // end: clear local storage

  // start: handle install 
  const handleAppInstall = async () => {
    try {
      await cleanLocalStorage();
    } catch (error) {
      console.error('Error cleaning local storage and caches on app install:', error);
    }
  };
  // end: handle install 

  // start: handle onInstall
  useEffect(() => {
    // Linking.addEventListener('onInstall', handleAppInstall);
  }, []);
  // end: handle onInstall





  const isLoggedIn = useSelector(state => state.isLogIn.isLoggedIn);
  const token = useSelector(state => state.isLogIn.token);
  const [authLoaded, setAuthLoaded] = useState(false);
  const [islog, setislog] = useState(null);
  console.log("--------++++++------------", islog)
  useEffect(() => {
    console.log('=======+++++++++ current screen stack =======+++++++++++', islog);
  }, [islog]);

  useEffect(() => {
    AsyncStorage.getItem('UserToken', (err, cr) => {
      // console.log("==========================",{isLoggedIn,token} );
      if (cr != null && cr && cr != undefined) {
        // uselogin();
        console.log("token avaliable---", cr);
        checkPendingOrder(cr);
      } else {
        console.log("token not avaliable===", cr);
        setislog(1)
        AsyncStorage.clear();
        dispatch(clearallinit({
          isLoggedIn: false,
          token: ""
        }));
      }
    });
  }, []);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // const handleAppStateChange = (nextAppState) => {
  //   if (nextAppState === 'active') {
  //     // Handle app becoming active again
  //     console.log('App has come to the foreground!');
  //     // Perform necessary actions such as data refresh
  //   }
  // };



  const checkPendingOrder = (token) => {
    let url = 'customer/orders';
    axios.get('https://api.makemyhouse.com/customer/orders', {
      headers: {
        "x-api-key": token,
      }
    })
      .then(response => {
        console.log("Pending order list navigation index.js: ", response.data.orders);
        if (response.data.orders && response.status == 200) {
          console.log("------------------------------------ 0", {
            url,
            "data": response.data.orders.length
          });
          setTimeout(() => {
            if (response.data.orders.length > 0) {
              console.log("------------------------------------ 1", {
                url,
                "data": response.data.orders.length
              });
              setislog(2);
              getAllCretedSites(token);
            } else {
              // here i have to check for the created site. 
              // if their is not site previsoully created then, dont intrupt the flow/ 
              // if user have site then select the site and take the user to the dashboard 
              let url = 'customer/ConstructionSite';
              ApiService.Getapiheader(url)
                .then(response => {
                  let data = response.data.sites;
                  console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL from navigation: ", {
                    response,
                    "a": response.status
                  });
                  if (data.length > 0) {
                    setislog(2);
                    AsyncStorage.setItem('SelectedSite', `${data[0].ID}`);
                    AsyncStorage.setItem("siteName", `${data[0].name}`);
                    dispatch(signin({
                      isLoggedIn: true,
                      token,
                      haveOrder: true
                    }));
                  } else {
                    console.log("------------------------------------ 2", {
                      url,
                      "data": response.data.orders.length
                    });
                    setislog(3);
                    dispatch(haveOrder({
                      haveOrder: false
                    }));
                  }
                })
                .catch(error => {
                  console.log("error from site selecting:", error);
                  setislog(1);
                  dispatch(signin({
                    isLoggedIn: false,
                    token: '',
                    haveOrder: false
                  }));
                })
            }
          }, 10);
        } else {
          setislog(1);
          dispatch(signin({
            isLoggedIn: false,
            token: '',
            haveOrder: false
          }));
        }
      })
      .catch(error => {
        console.log("Have order api app::: ", error);
        setislog(1);
        dispatch(signin({
          isLoggedIn: false,
          token: '',
          haveOrder: false
        }));
      })
  }

  // start: for default site selector
  const getAllCretedSites = () => {
    let url = 'customer/ConstructionSite';
    ApiService.Getapiheader(url)
      .then(response => {
        let data = response.data.sites;
        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL from navigation: ", data[0]);
        AsyncStorage.setItem('SelectedSite', `${data[0].ID}`);
        AsyncStorage.setItem("siteName", `${data[0].name}`);
        dispatch(signin({
          isLoggedIn: true,
          token,
          haveOrder: true
        }));
      })
      .catch(error => {
        console.log(error);
      })
  }
  // end: for default site selector

  const handleNavigationError = (error, dispatch) => {
    if (error) {
      console.log("----------- :navigaino error: -----------", error);
    }
  }


  return (
    <NavigationContainer onError={handleNavigationError} linking={DeepLinking} fallback={<ActivityIndicator size="large" color="blue" />}>
      {/* Start: Wokring start  */}
      {
        (islog == 1) ?
          <AuthStack />
          :
          (islog == 2) ?
            <MainStack />
            :
            (islog == 3) ?
              <OthersScreens />
              :
              <View style={{ flex: 1 }}>
                <View style={{
                  height: '90%', width: '100%', backgroundColor: '#fff',
                  justifyContent: 'center', alignItems: 'center'
                }}>
                  <AutoHeightImage
                    width={windowWidth / 3}
                    source={require('../../assets/images/applauncher.jpg')}
                    style={{ borderRadius: 12, backgroundColor: '#fff' }}
                  />
                </View>
                <View>
                  <Text style={{ color: '#212121', fontSize: 14, textAlign: 'center', fontWeight: '600' }}>Version 11.8.1</Text>
                </View>
              </View>
      }

    </NavigationContainer>
  );
}

export default AppStack;
