import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import WebView from 'react-native-webview'
import ScreenWrapper from '../../components/screenWrapper';
import Colors from '../utility/color';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation,useNavigationState  } from '@react-navigation/native';

const WebViewScreen = () => {
    const navigation = useNavigation();
    const [webview,setwebview] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem('weblink',(error,cre)=>{
                setwebview(cre);
            }); 
            return;
        }, []),
    );  

    return (
        <ScreenWrapper> 
            <View style={{width:'100%', height:45,backgroundColor:Colors.SecondaryColor, justifyContent:'center',}}>
                <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')} style={{paddingHorizontal:12}}>
                    <Text style={{fontSize:16,color:'#fff', fontWeight:'500'}}>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{padding:0, height:'100%', width:'100%', backgroundColor:"#fff" }}>
                {
                    webview != null ?
                        <WebView
                            source={{ uri:webview}} 
                            style={{with:'100%',height:'100%'}}
                            loading={false}
                            description="web page" 
                            // onLoadProgress={handleLoadProgress}
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
                        />  
                    :
                        <View style={{with:'100%', height:'100%', justifyContent:'center',alignContent:'center',alignItems:'center'}}> 
                            <Text style={{color:'#000000', fontSize:14, fontWeight:'500'}}>Loading...</Text>
                        </View>
                }     
            </View>
        </ScreenWrapper>    
    )
}

export default WebViewScreen