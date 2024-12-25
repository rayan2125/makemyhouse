/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect,useCallback, useState} from 'react'; 
import {
  useColorScheme, StatusBar, BackHandler, PermissionsAndroid, AppState, ActivityIndicator
} from 'react-native';  
import {View, Text, Image, Dimensions,Cache ,Linking } from 'react-native';
import {
  Colors 
} from 'react-native/Libraries/NewAppScreen';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
 
 

// start:  Navigations
// import { AuthStack } from './AuthStack.js';
import { MainStack } from './MainStack.js';
import { OthersScreens } from './othersScreen.js';
// end: Navigation



// this methos is used to work with the action redux  
import { useDispatch, useSelector } from 'react-redux';
import { signin,clearallinit, haveOrder } from '../redux';
import ApiService from '../ApiServices/index.js'; 
import axios from "axios";

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");


// import {deeplinkUrlHanlder} from './deeplinkFunction.js';

// import linking from './DeepLink.js';

// import { useNavigation,useNavigationState } from '@react-navigation/native';

function AppStack() {  
  
  const dispatch = useDispatch(); 
 // const haveOrder = useSelector(state => state.isLogIn.haveOrder);
 

  // start: clear local storage
  const cleanLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error cleaning local storage:', error);
    }
  };
  // end: clear local storage

  //start: clear caches 
  const cleanCaches = async () => {
    try {
      await Cache.clear();
    } catch (error) {
      console.error('Error cleaning caches:', error);
    }
  };
  //end: clear caches 
  // start: handle install 
  const handleAppInstall = async () => {
    try {
      await cleanLocalStorage();
      await cleanCaches();
    } catch (error) {
      console.error('Error cleaning local storage and caches on app install:', error);
    }
  };
  // end: handle install 
  // start: handle onInstall
  // useEffect(()=>{
  //   Linking.addEventListener('onInstall', handleAppInstall);
  // },[]);
  // end: handle onInstall
   
  const isLoggedIn = useSelector(state => state.isLogIn.isLoggedIn);
  const token = useSelector(state => state.isLogIn.token); 
  const [authLoaded, setAuthLoaded] = useState(false);
  const [islog, setislog] = useState(2);

  useEffect(()=>{
    console.log('=======+++++++++ current screen stack =======+++++++++++', islog);
  },[islog]);
  
  // useEffect(() => {  
  //     AsyncStorage.getItem('UserToken',(err, cr)=>{  
  //       // console.log("==========================",{isLoggedIn,token} );
  //       if(cr!=null && cr && cr != undefined ){  
  //         // uselogin();
  //         console.log("token avaliable---", cr);
  //         checkPendingOrder(cr); 
  //       }else{
  //         console.log("token not avaliable===", cr);
  //         setislog(1)
  //         dispatch(clearallinit({
  //           isLoggedIn:false,
  //           token:""
  //         }));
  //       }
  //     });
  // }, []);   

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

  
  // kindly active splash screen here 
  // start: now check is user have any pending order yet 
  // end: now check is user have any pending order yet  

  // here i have to check for the peding order for users 
  // because somehow haveOrder is set to false by default

  
  // const checkPendingOrder =  (token)=>{ 
  //   let url = 'customer/orders';
  //   axios.get('https://api.makemyhouse.com/customer/orders',{
  //     headers: {
  //       "x-api-key": token, 
  //     }
  //   })
  //   .then(response=>{ 
  //       // console.log("Pending order list navigation index.js: ", response.data.orders);
  //       if(response.data.orders){ 
  //         console.log("------------------------------------ 0",{
  //           url,
  //           "data": response.data.orders.length
  //         });
  //         setTimeout(()=>{
  //           if(response.data.orders.length > 0 ){
  //             console.log("------------------------------------ 1",{
  //               url,
  //               "data": response.data.orders.length
  //             });
  //             setislog(2);  
  //             getAllCretedSites(token);  
  //           }else{ 
  //             console.log("------------------------------------ 2",{
  //               url,
  //               "data":response.data.orders.length
  //             });
  //             setislog(3);  
  //             dispatch(haveOrder({
  //               haveOrder:false
  //             })); 
  //           }
  //         },10);  
  //       }else{
  //         setislog(2);
  //       }
  //   })
  //   .catch(error=>{
  //     console.log("Have order api app::: ",error);
  //     setislog(2); 
  //   }) 
  // }  

  // start: for default site selector
  // const getAllCretedSites =  async ()=>{
  //   let url = 'customer/ConstructionSite';
  //  await ApiService.Getapiheader(url)
  //   .then(response=>{ 
  //       let data = response.data.sites;
  //       console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL from navigation: ",data[0]);
  //       AsyncStorage.setItem('SelectedSite',`${data[0].ID}`); 
  //       AsyncStorage.setItem("siteName",`${data[0].name}`); 
  //       dispatch(signin({
  //         isLoggedIn:true,
  //         token,
  //         haveOrder:true
  //       }));
  //   })
  //   .catch(error=>{
  //       console.log(error); 
  //   })
  // } 
  // end: for default site selector

  // const handleNavigationError = (error, dispatch) => {
  //   if (error) {
  //     console.log("----------- :navigaino error: -----------",error);
  //   }
  // }  

  // start: deeplink handlers  
  // const linking = {
  //   prefixes: ['myapp://', 'https://makemyhouse.com/'],
  //   config: {
  //     screens: {
  //       MainStack: {
  //         screens: {
  //           ArchitectDesign: 'architectural-design/',
  //           Timeline: 'deeplink/timeline',
  //           Contract: 'deeplink/contract',
  //           RSForm: 'deeplink/rsform',
  //         },
  //       },
  //       AuthStack: {
  //         screens: {
  //           SignIn: 'signin',
  //         },
  //       },
  //     },
  //   },
  //   subscribe(listener) {

  //     const onReceiveURL = ({ url }) => {
  //       console.log('Deep link received:', url);
  //       deeplinkUrlHandler(url,listener);
  //     };

  //     // Listen to incoming links from deep linking
  //     const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

  //     // If the app was launched from a link
  //     Linking.getInitialURL()
  //     .then(url => {
  //       if (url) {
  //         console.log('Initial URL: ', url);
  //         deeplinkUrlHandler(url,listener);
  //       }
  //     })
  //     // .catch(error=>{
  //     //   console.log("deeplink does not work here", error);
  //     // })

  //     return () => {
  //       // Clean up the event listener
  //       linkingSubscription.remove();
  //     };
  //   },
  // }; 

// Deep link URL handler main function
// const deeplinkUrlHandler = async (url, listener) => {
   
//   console.log("Handling deep link URL:", url);

//   if (url) {
//     const { onlyPath, OnlyqueryParams } = extractUrlPath(url);
//     console.log("Extracted only path and query params:", { onlyPath, OnlyqueryParams });

//     if (onlyPath.includes('architectural-design')) {
//       const { path, queryParams } = extractUrlDetails(url);
//       console.log('Navigate to architecture design list:', { path, queryParams });

//       if (islog == 2) {
//         console.log('User token available', token);
//        // navigation.navigate('ArchitectDesign', queryParams); // Navigate to the ArchitectDesign screen with params
//         // navigation.navigate('MainStack', {
//         //   screen: 'ArchitectDesign',
//         //   params: queryParams,
//         // });
//         return listener(path);
//       } else {
//         console.log('User token not available');
//        //  navigation.navigate('AuthStack', { screen: 'SignIn' }); // Navigate to sign-in if no token
//       }
//     }

//     // Handle other deep links similarly...

//   }
// };

// Extract only path and query params
//  const extractUrlPath = (url) => {
//   const [path, queryString] = url.split('?');
//   return {
//     onlyPath: path.split('.com/')[1],
//     OnlyqueryParams: queryString,
//   };
// };

// Get the URL path and query parameters
//  const extractUrlDetails = (url) => {
//   const [path, queryString] = url.split('?');
//   const queryParams = {};

//   if (queryString) {
//     const queryArray = queryString.split('&');
//     queryArray.forEach(param => {
//       const [key, value] = param.split('=');
//       queryParams[key] = value;
//     });
//   }

//   return {
//     path: path.split('.com/')[1],
//     queryParams,
//   };
// };
  // end: deeplink handler

  return (
    <NavigationContainer onError={handleNavigationError} linking={linking}  fallback={<ActivityIndicator size="large" color="blue" />}> 
        {/* Start: Wokring start  */}  
        {
          
          (islog == 2)? 
          <MainStack  />
          :
          (islog == 3)?  
          <OthersScreens />
          :
          <View style={{flex:1}}>
            <View style={{height:'90%',width:'100%', backgroundColor:'#fff',
                justifyContent:'center', alignItems:'center'
              }}> 
              <AutoHeightImage
                width={windowWidth/3}  
                source={require('../../assets/images/applauncher.jpg')}
                style={{borderRadius:12, backgroundColor:'#fff'}}
              />
            </View>
            <View>
              <Text style={{color:'#212121',fontSize:14, textAlign:'center', fontWeight:'600'}}>Version 11.8.1</Text>
            </View>
          </View>
        }
         

        
        
      
    </NavigationContainer>
  );
} 

export default AppStack;
