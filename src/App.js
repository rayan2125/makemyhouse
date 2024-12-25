import { View, Text, StatusBar, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from './components/screenWrapper';
import { Provider } from 'react-redux';
import AppStack from './navigations';
import { store } from './redux/store';
import Colors from './screens/utility/color';
import { OSNotification, OneSignal } from 'react-native-onesignal';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
//   if (!firebase.apps.length) {
//     firebase.initializeApp();
// } 
console.log("testing",OneSignal.Notifications)
const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
}; 
  // const requestUserPermission = async () => { 
  //   const authStatus = await messaging().requestPermission();
  //   return (
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL
  //   );
  // };  
  const [nottificationdata,setnottificationdata] = useState('') 
const [sendnotidata, setsendnotidata] = useState('');
  // useEffect(() => {
  //   OneSignal.setAppId('c23f18fe-b63d-4266-8504-5e2a0db11aa5');
  //   OneSignal.promptForPushNotificationsWithUserResponse();
  //   OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  //       let notification = notificationReceivedEvent.getNotification();
  //       setsendnotidata(notification)
  //       const data = notification.additionalData;
  //       setnottificationdata(notification);
         
  //       if (data.orderCode) {
  //           console.log('jnkjnnwihui2n');
  //           console.log("notification", notification)
  //           // AsyncStorage.setItem('Notification_data', ''+JSON.stringify(notification));
  //           // handleNotificationClick("Chat")
  //       } else if (data.notificationType == '') {

  //       }
  //       notificationReceivedEvent.complete(notification);
  //   });
 
  
    
  //   OneSignal.addSubscriptionObserver(event => {
  //       console.log('Subscription state changed:', event); 
  //       if(event.to.userId){
  //           console.log('onesignal-------token-----------', event.to.userId);  
  //           AsyncStorage.setItem("onesignaltoken", event.to.userId); 
  //       }
  //   });
  //   const deviceState = (OneSignal.getDeviceState());
  //   deviceState
  //   .then((data) => {
  //       console.log('onesignal-------token-----------', data.userId);
  //       AsyncStorage.setItem("onesignaltoken", data.userId);
  //   })
  //   .catch(error=>{
  //       console.log("error in getting onesignal token", error);
  //   })

  // }, []);
  return (
    
     
      <ScreenWrapper>
        <StatusBar animated={true} backgroundColor="#002F5B" />
        {/* <Notificationdata.Provider value={{value:nottificationdata}}>  */}
            
            <Provider store={store}> 
                <AppStack/>  
            </Provider>

        {/* </Notificationdata.Provider> */}
      </ScreenWrapper> 
    
  );
  
}

export default App