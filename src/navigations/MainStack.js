import React, { useEffect, useCallback, useState, createContext } from 'react';
import { Alert, BackHandler, ToastAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();







import { AuthStack } from './AuthStack.js';

import { Home } from './innerMainStack.js';

import { OthersScreens } from './othersScreen.js';


// start: testing stack 



// slect add-ons



// update profile page


// webview for links 





// Architect Design 
export const ArchitectDesign = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="ArchitectList">
      <Stack.Screen name="ArchitectList" component={ArchitectList} options={{ headerShown: false, title: 'ArchitectList', tabBarVisible: false }} />
      <Stack.Screen name="Architectdetaillist" component={Architectdetaillist} options={{ headerShown: false, title: 'Architectdetaillist', tabBarVisible: false }} />

      <Stack.Screen name="WorkingStructuralDrawings" component={WorkingStructuralDrawings} options={{ headerShown: false, title: 'WorkingStructuralDrawings', tabBarVisible: false }} />
      <Stack.Screen name="ModifyThisPLan" component={ModifyThisPLan} options={{ headerShown: false, title: 'ModifyThisPLan', tabBarVisible: false }} />
      <Stack.Screen name="PurchaseCAD" component={PurchaseCAD} options={{ headerShown: false, title: 'PurchaseCAD', tabBarVisible: false }} />
      <Stack.Screen name="ImageModel" component={ImageModel} options={{ headerShown: false, title: 'PurchaseCAD', tabBarVisible: false }} />

    </Stack.Navigator>
  )
}

// Interior Design 
export const InteriorDesign = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="InteriorList">
      <Stack.Screen name="InteriorList" component={InteriorList} options={{ headerShown: false, title: 'InteriorList', tabBarVisible: false }} />
      <Stack.Screen name="Architectdetaillist" component={Architectdetaillist} options={{ headerShown: false, title: 'Architectdetaillist', tabBarVisible: false }} />

      <Stack.Screen name="WorkingStructuralDrawings" component={WorkingStructuralDrawings} options={{ headerShown: false, title: 'WorkingStructuralDrawings', tabBarVisible: false }} />
      <Stack.Screen name="ModifyThisPLan" component={ModifyThisPLan} options={{ headerShown: false, title: 'ModifyThisPLan', tabBarVisible: false }} />
      <Stack.Screen name="PurchaseCAD" component={PurchaseCAD} options={{ headerShown: false, title: 'PurchaseCAD', tabBarVisible: false }} />

      <Stack.Screen name="ImageModel" component={ImageModel} options={{ headerShown: false, title: 'PurchaseCAD', tabBarVisible: false }} />

    </Stack.Navigator>
  )
}

// extra screens 


// profile 


// start: a new stack navigatino for mypeoject and project details 

import AsyncStorage from '@react-native-async-storage/async-storage';
// end: a new stack navigatino for mypeoject and project details 

import { useNavigation } from '@react-navigation/native';

import RNRestart from 'react-native-restart';

// import OneSignal  from 'react-native-onesignal'; 
// import messaging from '@react-native-firebase/messaging'; 




const TOPIC = 'MyNews';
export const Notificationdata = createContext();

import { useFocusEffect } from '@react-navigation/native';
import ApiService from '../ApiServices/index.js';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { signin, clearallinit, haveOrder } from '../redux';
import InteriorList from '../screens/InteriorList/index-old-4Aug.js';
import Architectdetaillist from '../screens/Architectdetaillist/index.js';
import WorkingStructuralDrawings from '../screens/Architectdetaillist/WorkingStructurealDrawing.js';
import ModifyThisPLan from '../screens/Architectdetaillist/ModifyPlan.js';
import PurchaseCAD from '../screens/Architectdetaillist/PurchaseCAD.js';
import ImageModel from '../screens/Architectdetaillist/imageModel.js';
import Package from '../screens/package/index.js';
import DetectLocation from '../screens/location/index.js';
import DetectLocationUpdate from '../screens/location/upateLocation copy.js';
import AddNewSiteFillDetails from '../screens/sites/addNewSiteFillDetails.js';
import CreatePlot from '../screens/plot/createPlot.js';
import Solutions from '../screens/solution/index.js';
import SelectSite from '../screens/sites/selectSite.js';
import SiteDetails from '../screens/sites/siteDetails.js';
import SelectAddOn from '../screens/selectAddOns/index.js';
import CheckOut from '../screens/checkout/index-old.js';
import CheckOutWebView from '../screens/checkout/checkOutWebView.js';
import MySite from '../screens/sites/mySites.js';
import UpdateCreatePlot from '../screens/plot/UpdateCreatePlot.js';
import UpdateAddNewSiteFillDetails from '../screens/sites/UpdateAddNewSiteFillDetails.js';
import LanguageScreen from '../screens/language/index.js';
import MyProfile from '../screens/myprofile/index.js';
import { ProjectDetailsStack } from './myprojectStack.js';
import WebViewScreen from '../screens/dashboard/webView.js';
import RsForm from '../screens/webViews/RsForm.js';
import Contract from '../screens/webViews/Contract.js';
import ArchitectList from '../screens/ArchitectList/index copy.js';
import Dashobard from '../screens/dashboard/index.js';



// Main Stack...
export const MainStack = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();


  const handleNotificationClick = (screenName, orderCode) => {
    console.log("unser pressed start");
    // here implement deeplink 
    AsyncStorage.removeItem('projectCode');
    AsyncStorage.setItem('projectCode', orderCode);

    // for chat screen
    if (screenName == 'Chat') {
      return navigation.navigate('ProjectStack', {
        screen: 'Dashboard',
        params: {
          screen: screenName,
          params: {
            code: orderCode
          }
        }
      });
    }

    // for timeline screen
    if (screenName == 'Timeline') {
      return navigation.navigate('ProjectStack', {
        screen: 'Dashboard',
        params: {
          screen: screenName,
          params: {
            code: orderCode
          }
        }
      });
    }

    // for payment 
    if (screenName == 'payment') {
      // AsyncStorage.setItem("PaymentLink",`${GlobalData.LINKURL}payment-flow/?amount=${dueAmount}&orderid=${orderid}&token=${props.token}&source=app`);  

      return navigation.navigate('CheckOutWebView');
    }


    // for contract form 
    if (screenName == 'contract') {
      return navigation.navigate('Contract', { id: orderCode });
    }

    // 
    if (screenName == 'Projects') {
      return navigation.navigate('ProjectStack', {
        screen: 'Dashboard',
        params: {
          screen: screenName,
          params: {
            code: orderCode
          }
        }
      });
    }

  }


  // start: one signal 
  const [nottificationdata, setnottificationdata] = useState('')
  const [sendnotidata, setsendnotidata] = useState('');


  // useEffect(() => {

  //     OneSignal.setNotificationOpenedHandler(notification => {
  //       console.log("notification data: ", notification.notification);

  //       let data = notification.notification.additionalData;
  //       // notificationType
  //       console.log("set Notification Opened Handler---", {
  //         data, 
  //         fulldata:notification.notification
  //       });

  //       // notificationType - screenName

  //       // chatMessage - chat 
  //       // paymentReceived - Home
  //       // contract - show contract with token
  //       // orderActivated - project details
  //       // approval- project details
  //       // payment - payment flow url add token
  //       // cardMoved - project details 



  //       // DONE
  //       if(data.notificationType == 'chatMessage'){
  //        return handleNotificationClick('Chat', data.orderCode);
  //       }

  //       // DONE
  //       if(data.notificationType == 'paymentReceived'){
  //         AsyncStorage.setItem('projectCode',data.projectID);
  //         AsyncStorage.setItem('projectIdNewTimeline',data.pid);
  //         return handleNotificationClick('Projects', data.pid);
  //       }  

  //       // DONE
  //       if(data.notificationType == 'orderActivated'){
  //         AsyncStorage.setItem('projectCode',data.projectID);
  //         AsyncStorage.setItem('projectIdNewTimeline',data.pid);
  //         return handleNotificationClick('Projects', data.pid);
  //       }

  //       // DONE
  //       if(data.notificationType == 'payment'){
  //         // ${GlobalData.LINKURL}payment-flow/?amount=${dueAmount}&orderid=${orderid}&token=${props.token}&source=app 
  //         AsyncStorage.getItem('UserToken', (err,token)=>{
  //           AsyncStorage.setItem("PaymentLink",`${notification.notification.launchURL}&token=${token}`);   
  //           return handleNotificationClick('payment', notification.notification.launchURL);
  //         })

  //       }

  //       // DONE
  //       if(data.notificationType == 'approval'){
  //         AsyncStorage.setItem('projectCode',data.projectID);
  //         AsyncStorage.setItem('projectIdNewTimeline',data.projectID);
  //         return handleNotificationClick('Timeline', data.projectID);
  //       }

  //       // DONE
  //       if(data.notificationType == 'contract'){
  //         return handleNotificationClick('contract', data.orderCode);
  //       }

  //       // DONE
  //       if(data.notificationType == 'cardMoved'){
  //         AsyncStorage.setItem('projectCode',data.projectID);
  //         AsyncStorage.setItem('projectIdNewTimeline',data.projectID);
  //         return handleNotificationClick('Timeline', data.projectID);
  //       }

  //       // 
  //       if(data.notificationType == 'rsform'){

  //       }


  //     });


  //   }, []);

  // End: OneSignal 

  // start: check for the token session 
  const checkForSession = async (Token) => {
    console.log("checkForSession run")
    const url = `customer/me`
    let config = {
      headers: {
        "x-api-key": Token,
        "Content-type": "application/json"
      }
    };
    await axios.get(`${GlobalData.APIURL}${url}`, config)
      .then(response => {
        if (response && response.status != 200) {
          console.log("user session is not present. Logout this.-->")
          console.log("token not avaliable===", cr);
          AsyncStorage.removeItem('UserToken');
          AsyncStorage.clear();
          dispatch(clearallinit({
            isLoggedIn: false,
            token: ""
          }));
        } else {
          console.log("user session is present.-->")
        }
      })
      .catch(error => {
        console.log("checkForSession: ", error);
        console.log("token not avaliable===", cr);
        AsyncStorage.removeItem('UserToken');
        AsyncStorage.clear();
        dispatch(clearallinit({
          isLoggedIn: false,
          token: ""
        }));
      })

  }
  useFocusEffect(
    useCallback(() => {
      console.log("screen went in focus. --  --- ")
      AsyncStorage.getItem('UserToken', (err, cr) => {
        // console.log("==========================",{isLoggedIn,token} );
        if (cr != null && cr && cr != undefined) {
          // uselogin();
          console.log("token avaliable---", cr);
          checkForSession(cr);
        } else {
          console.log("token not avaliable===", cr);
          AsyncStorage.removeItem('UserToken');
          AsyncStorage.clear();
          dispatch(clearallinit({
            isLoggedIn: false,
            token: ""
          }));
        }
      });
      return () => {
        console.log('Screen went out of focus');
      };
    }, [])
  );
  // end: check for the token session 



  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Dashboard">

      <Stack.Screen name="Dashboard" component={Home} options={{ headerShown: false, title: 'Dashboard', tabBarVisible: false }} />
      <Stack.Screen name="Package" component={Package} options={{ headerShown: false, title: 'Package', tabBarVisible: false }} />
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false, title: 'AuthStack', tabBarVisible: false }} />
      <Stack.Screen name="FirstTimeSser" component={OthersScreens} options={{ headerShown: false, title: 'FirstTimeSser', tabBarVisible: false }} />

      {/* start: testing stack */}
      <Stack.Screen name="DetectLocation" component={DetectLocation} options={{ title: 'DetectLocation' }} />
      <Stack.Screen name="DetectLocationUpdate" component={DetectLocationUpdate} options={{ title: 'DetectLocation' }} />

      <Stack.Screen name="AddNewSiteFillDetails" component={AddNewSiteFillDetails} options={{ title: 'AddNewSiteFillDetails' }} />
      <Stack.Screen name="CreatePlot" component={CreatePlot} options={{ title: 'CreatePlot' }} />
      <Stack.Screen name="SolutionFirstStackr" component={Solutions} options={{ title: 'Solutions' }} />

      <Stack.Screen name="SelectSite" component={SelectSite} options={{ title: 'SelectSite' }} />
      <Stack.Screen name="SiteDetails" component={SiteDetails} options={{ title: 'SiteDetails' }} />
      <Stack.Screen name="SelectAddOn" component={SelectAddOn} options={{ title: 'SelectAddOn' }} />

      <Stack.Screen name="CheckOut" component={CheckOut} options={{ title: 'CheckOut' }} />
      <Stack.Screen name="CheckOutWebView" component={CheckOutWebView} options={{ title: 'CheckOutWebView' }} />

      <Stack.Screen name="MySite" component={MySite} options={{ title: 'SiteDetails', headerShown: false }} />

      <Stack.Screen name="MainStack" component={MainStack} />

      <Stack.Screen name="UpdateCreatePlot" component={UpdateCreatePlot} />
      <Stack.Screen name="UpdateAddNewSiteFillDetails" component={UpdateAddNewSiteFillDetails} />

      <Stack.Screen name="ArchitectDesign" component={ArchitectDesign} />
      <Stack.Screen name="InteriorDesign" component={InteriorDesign} />

      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />

      <Stack.Screen name="MyProfile" component={MyProfile} />

      <Stack.Screen name="ProjectStack" component={ProjectDetailsStack} />


      <Stack.Screen name="WebView" component={WebViewScreen} />


      <Stack.Screen name="RsForm" component={RsForm} />

      <Stack.Screen name="Contract" component={Contract} />


    </Stack.Navigator>
  )
}