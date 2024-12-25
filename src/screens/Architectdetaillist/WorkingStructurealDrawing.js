import React,{useEffect, useState,useCallback} from 'react'
import { View, Text , ActivityIndicator, Image, TouchableOpacity} from 'react-native'
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
import GlobalData from '../utility/config';
import { useFocusEffect } from '@react-navigation/native';
import Images from '../utility/images';

import AutoHeightImage from 'react-native-auto-height-image';
import Colors from '../utility/color';
 
 
function WorkingStructuralDrawings({route,navigation}) {
    const [loader,setLoader] = useState(true);
    const [token,setToken] = useState('');  
   
     useFocusEffect(
        useCallback(() => { 
            if(route.params.projectId){
                // setLoader(true);
                AsyncStorage.getItem('UserToken',(error,tokenCreds)=>{
                    setToken(tokenCreds);
                    console.log(`${GlobalData.LINKURL}get-drawing/${route.params.projectId}/architectural-design?viewmode=app&key=${tokenCreds}`);
                }); 
            }else{
               // setLoader(false);
            }
            return () => { 
            console.log('Screen went out of focus');  
            };
        }, [])
        ); 
    
        const handleLoadStart = () => {
            setLoader(false);
            console.log("WebView start loading")
        };
    
        const handleLoadEnd = () => {
            setLoader(true);
            console.log("WebView end loading")
        };
    
        const handleLoadProgress = ({ nativeEvent }) => {
            if (nativeEvent.progress === 1) {
                setLoader(false); // Page is fully loaded
            }
          };
        

    return ( 
        <View style={{flex:1}}>
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
                {/* <Text>{`https://www.makemyhouse.com/get-drawing/${route.params.projectId}/architectural-design?token=${token}`}</Text>  */}
                <View style={{flex:1}}>
                    <View style={{width:'100%', height:50, backgroundColor:Colors.SecondaryColor, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', alignContent:'center', padding:8}}>
                        <TouchableOpacity onPress={()=>navigation.goBack()}> 
                                <AutoHeightImage
                                    width={17}
                                    maxHeight={17}
                                    resizeMode="contain"
                                    source={Images.ArrowLeftLight} 
                                /> 
                        </TouchableOpacity>
                    </View>
                      <WebView 
                       //  onLoadStart={handleLoadStart}
                        //  onLoadEnd={handleLoadEnd}
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
                      cacheEnabled={false} source={{ uri: `${GlobalData.LINKURL}get-drawing/${route.params.projectId}/architectural-design?viewmode=app&key=${token}`}}  style={{ width: '100%', height: '100%' }}  />
                </View>
              
        </View>
    )
}

export default WorkingStructuralDrawings;