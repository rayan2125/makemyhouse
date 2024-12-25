import React, { useEffect } from "react";
import { BackHandler } from 'react-native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import CustomTabBarSnd from './tabs/customTabBarSnd'
import MyProjectDashboard from "../screens/myproject_Timeline_Dashboard";

import MyProjectChat from "../screens/myproject_Timeline_Chat";
import MyProjectFiles from "../screens/myproject_Timeline_Files";
import MyProjectPayment from "../screens/myproject_Timeline_Payment";
import MyProjectMySite from "../screens/myproject_Timeline_MySite";
import Webviewpayment from "../screens/myproject_Timeline_Payment/webviewpayment";
import RequestFormWebView from "../screens/myproject_Timeline_MySite/RequestFormWebView";
import MyProjectTimeLine from "../screens/myproject_Timeline_Timeline";
import TestingScressn from "../screens/TestingScressn";





export const Dashboard = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBarSnd {...props} />} >

      <Tab.Screen name="Projects" component={MyProjectDashboard} options={{ tabBarIcon: 'Dashboard', displayName: 'Dashboard' }} />

      <Tab.Screen name="Timeline" component={MyProjectTimeLine} options={{ tabBarIcon: 'Timeline', displayName: 'Timeline' }} />

      <Tab.Screen name="Chat"  component={MyProjectChat}  options={{ tabBarIcon: 'Chat', displayName:'Chat',tabBarVisible: false }}/>   

      <Tab.Screen name="Files"  component={MyProjectFiles}  options={{ tabBarIcon: 'Files', displayName:'Files' }}/>    

    </Tab.Navigator>
  )
}


export const ProjectDetailsStack = () => {
  // start: prevent the user to press back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      backHandler.remove();
    };
  }, []);
  const handleBackPress = () => {
    return false
  };
  // end: prevent the user to press back button 

  // RequestFormWebView
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false, title: 'Dashboard', tabBarVisible: false }} />
      <Stack.Screen name="MyProjectPayment" component={MyProjectPayment} options={{ headerShown: false, title: 'Payment', tabBarVisible: false }} />
      <Stack.Screen name="MyProjectMySite" component={MyProjectMySite} options={{ headerShown: false, title: 'MySite', tabBarVisible: false }} />

      <Stack.Screen name="MyProjectPaymentWebView" component={Webviewpayment} options={{ headerShown: false, title: 'MyProjectPaymentWebView', tabBarVisible: false }} />


      <Stack.Screen name="RequestFormWebView" component={RequestFormWebView} options={{ headerShown: false, title: 'RequestFormWebView', tabBarVisible: false }} />

    </Stack.Navigator>
  )
}