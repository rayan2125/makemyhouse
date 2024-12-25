import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
 
// location 
import DetectLocation from "../screens/location/index.js";
import DetectLocationUpdate from "../screens/location/upateLocation copy.js";
import Solutions from "../screens/solution/index.js";

// site
import AddNewSiteFillDetails from "../screens/sites/addNewSiteFillDetails.js";

import SelectSite from "../screens/sites/selectSite.js";

import SiteDetails from "../screens/sites/siteDetails.js";

import MySite from "../screens/sites/mySites.js";


// plot 
import CreatePlot from "../screens/plot/createPlot.js";

// Package
import Package from "../screens/package/index.js";

// slect add-ons
import SelectAddOn from "../screens/selectAddOns/index.js";



// checkout 
import checkout from "../redux/reducer/checkout.js";
import CheckOutWebView from "../screens/checkout/checkOutWebView.js";


// main stack
import { MainStack } from './MainStack.js';

// update profile page
import UpdateAddNewSiteFillDetails from "../screens/sites/UpdateAddNewSiteFillDetails.js";

import UpdateCreatePlot from "../screens/plot/UpdateCreatePlot.js";
import CheckOut from "../screens/checkout/index.js";


// start: auth stack 
export function OthersScreens() { 
    return(
        <Stack.Navigator screenOptions={{ headerShown: false,}} initialRouteName="DetectLocation">
            <Stack.Screen name="DetectLocation" component={DetectLocation} options={{ title: 'DetectLocation'}}/>     
            <Stack.Screen name="DetectLocationUpdate" component={DetectLocationUpdate} options={{ title: 'DetectLocation'}}/>     
            <Stack.Screen name="AddNewSiteFillDetails" component={AddNewSiteFillDetails} options={{ title: 'AddNewSiteFillDetails'}}/>  
            <Stack.Screen name="CreatePlot" component={CreatePlot} options={{ title: 'CreatePlot'}}/>       
            <Stack.Screen name="SolutionFirstStackr" component={Solutions} options={{ title: 'Solutions'}}/>       
            <Stack.Screen name="Package" component={Package} options={{ title: 'Package'}}/>  
            <Stack.Screen name="SelectSite" component={SelectSite} options={{ title: 'SelectSite'}}/>
            <Stack.Screen name="SiteDetails" component={SiteDetails} options={{ title: 'SiteDetails'}}/>
            <Stack.Screen name="SelectAddOn" component={SelectAddOn} options={{ title: 'SelectAddOn'}}/>
           
            <Stack.Screen name="CheckOut" component={CheckOut} options={{ title: 'CheckOut'}}/>
            <Stack.Screen name="CheckOutWebView" component={CheckOutWebView} options={{ title: 'CheckOutWebView'}}/>


            <Stack.Screen name="MySite" component={MySite} options={{ title: 'SiteDetails',headerShown: false}}/>

            <Stack.Screen name="MainStack" component={MainStack}/> 
            
            <Stack.Screen name="UpdateCreatePlot" component={UpdateCreatePlot}/>
            <Stack.Screen name="UpdateAddNewSiteFillDetails" component={UpdateAddNewSiteFillDetails}/>
        </Stack.Navigator>
    )
}