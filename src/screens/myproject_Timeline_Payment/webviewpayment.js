import { View, Text, Dimensions, TouchableOpacity,BackHandler,ScrollView } from 'react-native';
import React,{useEffect, useState} from 'react';
import ScreenWrapper from '../../components/screenWrapper';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,  } from '@react-navigation/native';
import Colors from '../utility/color';



const Webviewpayment = () => {
  const  navigation = useNavigation();  
   // start: prevent the user to press back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress ); 
    return () => {
      backHandler.remove();
    };
  }, []);
  const handleBackPress = () => {
    return false
  };
 // end: prevent the user to press back button

  // on webview i got a payload with scuccess true/false 
  // if true = navigate to Dashbaord screen
  // else navigate to Checkout screen
  const [webviewS,setwebViewS] = useState(null);
  const [userToken,setUserToken] = useState('');
  
  useEffect(()=>{
    AsyncStorage.getItem('UserToken', (err,token)=>{
      AsyncStorage.getItem('myprojectPayment', (err,creds)=>{ 
        console.log("-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-",`${creds}${token}&source=app`)
        setUserToken(token);
        setwebViewS(creds);
      });
    });
  },[]);
  
//   const handleWebViewMessage = ()=>{
//     const message = JSON.parse(event.nativeEvent.data); 
//     if (message.type == 'buttonClick'){
//       const { event } = message.data;
//       if(event == 'PAYMENT_SUCCESS'){
//         console.log("PAYMENT_SUCCESS navigate to MainStack");
//         // navigaet to dashboard 
//         navigation.navigate('MainStack'); 
//       }else{
//         // navigate to checkout page 
//         console.log("PAYMENT_FAILED navigate to Checkout");
//         navigation.navigate('CheckOut');
//       }
//     }else{
//       console.log("nothing happends here...");
//     }
//   }
//  if(webviewS != "" || webviewS != null){
//   return (
//     <ScreenWrapper> 
//         <View style={{width:'100%', height:'20',backgroundColor:Colors.SecondaryColor}}>
//             <TouchableOpacity onPress={()=>navigation.navigate('MyProjectPayment')}>
//                 <Text style={{fontSize:16,color:'#fff', fontWeight:'500'}}>
//                     Back
//                 </Text>
//             </TouchableOpacity>
//         </View>
//         <WebView 
//            // onMessage={handleWebViewMessage}  
//             javaScriptEnabled={true} 
//             source={{ uri: webviewS}} 
//             style={{ width:Width, height:Height, }}
//         />
//     </ScreenWrapper>
//   )} 

  return (
    <ScreenWrapper> 
        <View style={{width:'100%', height:45,backgroundColor:Colors.SecondaryColor, justifyContent:'center',}}>
            <TouchableOpacity onPress={()=>navigation.navigate('MyProjectPayment')} style={{paddingHorizontal:12}}>
                <Text style={{fontSize:16,color:'#fff', fontWeight:'500'}}>
                    Back
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{padding:10, height:'100%', width:'100%', backgroundColor:"#fff" }}>    
            {
                webviewS != null?
                <> 
                    <WebView
                        source={{ uri:webviewS}} 
                        style={{with:'100%',height:'100%'}}
                        loading={false}
                        description="web page" 
                    />   
                </>
                : 
                <View style={{width:'100%', height:'100%', backgroundColor:Colors.lighteshGray, padding:12, justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                    <Text style={{color:'red', }}>Link not found..</Text>
                </View>   
            }   
        </View>
    </ScreenWrapper>
  )
}
export default Webviewpayment;
 