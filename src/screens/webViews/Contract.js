import { StyleSheet, Text, View, ActivityIndicator,BackHandler, Dimensions,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/screenWrapper';
import { WebView } from 'react-native-webview';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation  } from '@react-navigation/native';
import Colors from '../utility/color';

const Contract = ({route}) => {
    // https://www.makemyhouse.com/deeplink/contract?id=V2O202408100058

    const { id } = route.params; 
    
    // let idData = null;
    // useEffect(() => {
    //     // Retrieve the parameters from AsyncStorage
    //     AsyncStorage.getItem('contractData')
    //       .then(data => {
    //         if (data) {
    //           let { id } = JSON.parse(data);
    //           idData = id;
    //         }
    //       })
    //       .catch(error => {
    //         console.error('Error retrieving contract data:', error);
    //       });
    //   }, []);

    const  navigation = useNavigation();  

    // start: prevent the user to press back button 
    useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress ); 
    return () => {
        backHandler.remove();
    };
    }, []);
    const handleBackPress = () => {
        return false;
    };
    // end: prevent the user to press back button

    const [loader,setLoader] = useState(true);
    const [webviewS,setwebViewS] = useState('');
    const [userToken,setUserToken] = useState('');
    
    useEffect(()=>{
        AsyncStorage.getItem('UserToken', (err,token)=>{

        //   if(orderCode != undefined){ 
           console.log("-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0- 1 ",`https://www.makemyhouse.com/deeplink/contract?id=${id}&token=${token}`),
            setUserToken(token),
            setwebViewS(`https://www.makemyhouse.com/deeplink/contract?id=${id}&token=${token}`) 
        //   }

        //   if(idData != undefined || idData != null){
        //     return ( console.log("-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0- 2 ",`https://www.makemyhouse.com/deeplink/contract?id=${idData}&token=${token}`),
        //     setUserToken(token),
        //     setwebViewS(`https://www.makemyhouse.com/deeplink/contract?id=${idData}&token=${token}`)) 
        //   }

        });
    },[]); 

    
    const handleLoadProgress = ({ nativeEvent }) => {
        if (nativeEvent.progress === 1) {
            setLoader(false); // Page is fully loaded
        }
    };

  return (
    <ScreenWrapper> 
        <View style={{width:'100%', height:45,backgroundColor:Colors.SecondaryColor, justifyContent:'center',}}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{paddingHorizontal:12}}>
                <Text style={{fontSize:16,color:'#fff', fontWeight:'500'}}>
                    Back
                </Text>
            </TouchableOpacity>
        </View>
            {
                loader&&(<>
                    <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 999999, 
                        justifyContent:'center',
                        alignItems:'center'
                        }}
                    >    
                         <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                </>
                )
            } 
        <View style={{padding:10, height:'100%', width:'100%', backgroundColor:"#fff" }}>    
           
                    <WebView
                       onLoadProgress={handleLoadProgress}
                       renderError={() => (
                         <View style={{ 
                          height: '100%',
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent:'center'
                         }}>
                           <Text style={{
                                color: '#000000',
                                fontSize: 18,
                           }}>Failed to load content</Text>
                         </View>
                       )}
                  cacheEnabled={false} source={{ uri: `${webviewS}` }}  style={{ width: '100%', height: '100%' }}  />
        </View>
    </ScreenWrapper>
  )
}

export default Contract

const styles = StyleSheet.create({

})