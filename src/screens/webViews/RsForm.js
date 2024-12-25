import { StyleSheet, Text, View, ActivityIndicator , BackHandler, Dimensions,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/screenWrapper';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import Colors from '../utility/color';

const RsForm = ({route}) => {
    // https://www.makemyhouse.com/deeplink/rsform/?id=V2O202111260068&isdcode=91&mobile=9685252052
    
    const { id,isdcode ,mobile } = route.params;

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
        
          console.log("-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-",`https://www.makemyhouse.com/rsform?id=${id}&isdcode=${isdcode}&mobile=${mobile}&token=${token}`)
          setUserToken(token);
          setwebViewS(`https://www.makemyhouse.com/rsform?id=${id}&isdcode=${isdcode}&mobile=${mobile}&token=${token}`);
        
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

export default RsForm

const styles = StyleSheet.create({

})