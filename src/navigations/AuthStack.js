import React, { useState, useEffect, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();

// auth screens
import SignIn from "../screens/auth/index.js";
import CreateAccount from "../screens/auth/AccountCreate.js";

import { MainStack } from './MainStack.js';
import { OthersScreens } from './othersScreen.js';

// this methos is used to work with the action redux  
import { useDispatch, useSelector } from 'react-redux';
import { BackHandler, ToastAndroid } from "react-native";


// start: auth stack 
export function AuthStack() {
    const dispatch = useDispatch();
    // on otp verification screen run otp to check if user have any order yet. 
    // if have any orer then naviagarion him to home page. if not then 
    // show the account create screen 
    const [ifHaveOrder, setIfHaveOrder] = useState(true);



    return (
        <Stack.Navigator screenOptions={{ headerShown: false, initialRouteName: "SignIn" }}>

            {/* <Stack.Group>  */}
            <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'SignIn' }} />
            {/* <Stack.Screen name="SignOTP" component={SignOTP} options={{ title: 'SignOTP'}}/>       */}
            <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ title: 'CreateAccount' }} />
            {/* Start: below are others screen  */}
            <Stack.Screen name="FirstTimeSser" component={OthersScreens} />
            <Stack.Screen name="MainStack" component={MainStack} />
            {/* End: below are others screen  */}
            {/* </Stack.Group> */}

        </Stack.Navigator>
    );
}
// end: auth stack 


