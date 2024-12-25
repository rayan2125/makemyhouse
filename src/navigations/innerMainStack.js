import React, { useEffect, useCallback } from "react";
import { BackHandler } from 'react-native';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();





import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import DesignIdea from "../screens/designIdea";
import Solutions from "../screens/solution";
import MyProject from "../screens/myproject";
import More from "../screens/more";
import CustomTabBar from "./tabs/customTabBar";
import Dashobard from "../screens/dashboard";


export const Home = ({ navigation }) => {
  // language 
  const { t, i18n } = useTranslation();

  // const navigationa = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const state = navigation.getState();
    const currentRoute = state?.routes[state.index];
    const currentStackName = state?.routeNames[state.index];

   

  }, [navigation]);



  const handleBackPress = () => {
    return true;
  };
  useFocusEffect(
    useCallback(() => {
      console.log('Screen came into focus');
      // AsyncStorage.clear();
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        backHandler.remove();
        console.log('Screen went out of focus');
      };
    }, [])
  );


  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBar {...props} />}>

      <Tab.Screen name="Home" component={Dashobard} options={{ tabBarIcon: 'home', displayName: t('navigation.home') }} />
      {/* <Tab.Screen name="Home" component={CheckOut} options={{ tabBarIcon: 'home', displayName:t('navigation.home')}}/>   */}

      <Tab.Screen name="DesignIdea" component={DesignIdea} options={{ tabBarIcon: 'DesignIdea', displayName: t('navigation.designIdea') }} />

      <Tab.Screen name="Solution" component={Solutions} initialParams={{ SkipScreenParams: false }} options={{ tabBarIcon: 'Solution', displayName: t('navigation.solution') }} />

      <Tab.Screen name="MyProject" component={MyProject} options={{ tabBarIcon: 'MyProject', displayName: t('navigation.myproject') }} />

      <Tab.Screen name="More" component={More} options={{ tabBarIcon: 'More', displayName: t('navigation.more') }} />


    </Tab.Navigator>
  )
}