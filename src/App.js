import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import ScreenWrapper from './components/screenWrapper';
import AppStack from './navigations';
import { store } from './redux/store';
import Colors from './screens/utility/color';
import { OneSignal } from 'react-native-onesignal';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
    useEffect(()=>{
      OneSignal.initialize('c23f18fe-b63d-4266-8504-5e2a0db11aa5');
    },[])
  const [notificationData, setNotificationData] = useState('');
  // console.log(OneSignal)
// console.log(OneSignal.setNotificationWillShowInForegroundHandler())
  // useEffect(() => {
  //   // Initialize OneSignal
  //   OneSignal.initialize('c23f18fe-b63d-4266-8504-5e2a0db11aa5');

  //   // Handle foreground notifications
  //   OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  //     const notification = notificationReceivedEvent.getNotification();
  //     console.log('Foreground notification:', notification);
  //     setNotificationData(notification);
  //     notificationReceivedEvent.complete(notification);
  //   });

  //   // Handle clicked notifications
  //   OneSignal.setNotificationOpenedHandler(notification => {
  //     console.log('Notification clicked:', notification);
  //   });

  //   // Retrieve OneSignal token
  //   OneSignal.getDeviceState()
  //     .then(state => {
  //       if (state.userId) {
  //         console.log('OneSignal Token:', state.userId);
  //         AsyncStorage.setItem('onesignalToken', state.userId);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching OneSignal token:', error);
  //     });

  //   // Example usage of tags
  //   OneSignal.User.addTag('app_user', 'true');
  //   OneSignal.User.getTags().then(tags => console.log('User Tags:', tags));
  // }, []);

  return (
    <ScreenWrapper>
      <StatusBar animated={true} backgroundColor="#002F5B" />
      <Provider store={store}>
        <AppStack />
      </Provider>
    </ScreenWrapper>
  );
};

export default App;
