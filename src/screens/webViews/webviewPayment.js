import { View, Text, Dimensions, TouchableOpacity,BackHandler,ScrollView } from 'react-native';
import React,{useEffect, useState} from 'react';
import ScreenWrapper from '../../components/screenWrapper';
import { WebView } from 'react-native-webview';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import Colors from '../../utility/color';

const WebViewPayment = ()=>{ 

    const [webviewS,setwebViewS] = useState(null);
    const [userToken,setUserToken] = useState('');
    const  navigation = useNavigation();  
  
    useEffect(()=>{
      AsyncStorage.getItem('UserToken', (err,token)=>{
         console.log("token---- ", token)
         setUserToken(token)
      });
    },[]);

    return(
        <ScreenWrapper>
            <View style={{width:'100%', height:'20',backgroundColor:Colors.SecondaryColor,padding:10}}>
                <TouchableOpacity onPress={()=>navigation.navigate('MainStack')}>
                    <Text style={{fontSize:16,color:'#fff', fontWeight:'500'}}>
                        Cancel
                    </Text>
                </TouchableOpacity>
          </View>
        </ScreenWrapper>
    )
}

export default WebViewPayment;