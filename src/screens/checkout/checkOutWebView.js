import { View, Text, Dimensions, TouchableOpacity,BackHandler,Modal, ActivityIndicator } from 'react-native';
import React,{useEffect, useState} from 'react';
import ScreenWrapper from '../../components/screenWrapper';
import { WebView } from 'react-native-webview';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';


const CheckOutWebView = () => {
  const [loader,setLoader] = useState(true);
  const [token,setToken] = useState(''); 

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
  const  navigation = useNavigation();  

  useEffect(()=>{
    AsyncStorage.getItem('UserToken', (err,token)=>{
      AsyncStorage.getItem('PaymentLink', (err,creds)=>{ 
        if(token && creds){ 
          console.log("-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-",`${creds}&source=app`)
          setUserToken(token); 
          setwebViewS(`${creds}&source=app`);
        } 
      });
    });
  },[]);
  
  const handleWebViewMessage = ()=>{
    const message = JSON.parse(event.nativeEvent.data); 
    if (message.type == 'buttonClick'){
      const { event } = message.data;
      if(event == 'PAYMENT_SUCCESS'){
        console.log("PAYMENT_SUCCESS navigate to MainStack");
        // navigaet to dashboard 
        navigation.navigate('MainStack'); 
      }else{
        // navigate to checkout page 
        console.log("PAYMENT_FAILED navigate to Checkout");
        navigation.navigate('CheckOut');
      }
    }else{
      console.log("nothing happends here...");
    }
  } 
  
  const handleLoadProgress = ({ nativeEvent }) => {
    if (nativeEvent.progress === 1) {
        setLoader(false); // Page is fully loaded
    }
  };  


  const [logoutState,setlogoutState] = useState(false);

  const logoutHandler = ()=>{
      setlogoutState(logoutState==true?false:true);   
  }

  const logout = ()=>{
    setlogoutState(false);
    setTimeout(()=>{
      navigation.navigate('MainStack')
    },10); 
  }
   
   
    return (
      <ScreenWrapper>
           
          <View style={{width:'100%', height:'20',backgroundColor:Colors.SecondaryColor,padding:10}}>
              <TouchableOpacity onPress={logoutHandler}>
                <Text style={{fontSize:16,color:'#fff', fontWeight:'500'}}>
                    Cancel
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
          {/* {
            webviewS != null? */}
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
              cacheEnabled={false} 
              onMessage={handleWebViewMessage}   
              javaScriptEnabled={true} 
              source={{ uri: webviewS?webviewS:""}} 
              style={{ width:Width, height:Height }}
            />
            <Modal animationType="slide" transparent={true} visible={logoutState}>     
                        <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                            <TouchableOpacity style={{ backgroundColor:'transparent', width: '100%', height: "30%" }}  onPress={()=>setlogoutState(false)}>
                            <View  ></View>
                            </TouchableOpacity>
                            <View style={{width:'100%', maxHeight:360, backgroundColor:'transparent', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                                <View style={{width:'90%', height:"88%", backgroundColor:'#ffffff', borderRadius:12,padding:12, elevation:4, flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:FontSize.h3, fontWeight:'600', color:'#000000'}}>Are you sure?</Text>
                                    <Text style={{fontSize:FontSize.p, fontWeight:'400',color:'#141414', marginTop:6}}>Are you sure you want to cancel</Text>
                                    <Text style={{fontSize:FontSize.xp, fontWeight:'400', color:'#141414',marginTop:1,marginBottom:15}}>This action cannot be undone</Text>
                                    <TouchableOpacity onPress={logout} style={{marginVertical:12, backgroundColor:"#EF4444", width:'70%', height:40, justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:12, borderWidth:2,borderColor:'#EF4444'}}>
                                        <Text style={{color:'#ffffff', fontSize:FontSize.xxp, fontWeight:FontWeight.medium, }}>Yes, Go to Dashbaord</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={logoutHandler} style={{ backgroundColor:"#ffffff", width:'70%', height:40, justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:12, borderWidth:2,borderColor:Colors.lightGray}}>
                                        <Text style={{color:Colors.gray, fontSize:FontSize.xxp, fontWeight:FontWeight.medium, }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                        </View>      
                </Modal>
      </ScreenWrapper>
    )
   
 
  
}

export default CheckOutWebView;