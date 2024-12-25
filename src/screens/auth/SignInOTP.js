import React, { useEffect,  useState } from 'react';
import { View,  StyleSheet, ImageBackground, Dimensions } from 'react-native'; 
 
import Images from '../../utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
 
import SignInOTPCard from '../../components/card/signInOtp'; // signIn card
import CTMButton from '../../components/button';

const {width, height} = Dimensions.get('window');
 
 

import { useNavigation,useNavigationState  } from '@react-navigation/native';

// redux 
import { useDispatch, useSelector } from 'react-redux';
import { signotp,signin } from '../../redux';

// auth firebase 
// import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// notification 
import AnimatedMessage from '../../components/animatedNotification';

// api servicew 
import ApiService from '../../ApiServices';
 
// import crashlytics from '@react-native-firebase/crashlytics';

const SignOTP = () => { 

  // aimate notification 
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    // setTimeout(()=>{
    //   setMessages([]);
    // },2000);
  },[messages]);

  const  navigation = useNavigation();   

  // reudX-toolkit 
  const dispatch = useDispatch(); 
  const conformR = useSelector(state => state.isLogIn.conform);
  const phoneNumberR = useSelector(state => state.isLogIn.phonenumber);
  const isdR = useSelector(state => state.isLogIn.isd);

 
  const [isSignIN,setIsSignIN] = useState(false);
  const [isLoading,setIsLoading] = useState(false); 

  const [otpCode, setOtpCode] = useState(null);

  const OtpCodeHandler = (data)=>{
    setOtpCode(data)
    console.log("otp handler: ", data);
    // crashlytics().log(`otp handler: ${data}`);
  }

  const [onesignaltoken, setonesignaltoken] = useState('');

  useEffect(() => {
     auth().signOut();
      AsyncStorage.getItem('onesignaltoken', (err, credentials) => {
          setonesignaltoken(credentials);
      })
  }, []); 
  
  const SignINOTPHandler = async ()=>{
    setIsLoading(true);
    setIsSignIN(true); 
    // console.log("conformR: ",conformR);
    try {
      let currentUser = await conformR.confirm(otpCode);
      if (currentUser) {
          let uid = auth().currentUser.uid;
          let idToken = await auth().currentUser.getIdToken();
          // dispatch(signotp());  
          callApiToDatabase(uid,idToken);
      }else{
        console.log("Kindly refresh your app.");
        setMessages(['Kindly refresh your app.']);
        // crashlytics().log(`Kindly refresh your app`);
      }
    } catch (error) {
        setIsLoading(false);
        setIsSignIN(false); 
        console.log("SignINOTPHandler",error);   
        setMessages([`SignINOTPHandler ${error}`]);
        // crashlytics().log(`SignIN otp handler ${error}`);
        // setMessages(['Something went wrong']);
        // auth().onAuthStateChanged((user) => {
        //   console.log('user______________', user)
        //   if (user) {
        //       let uid = user.uid;
        //       let idToken = user.getIdToken();
        //       console.log('autoautho______________', uid, idToken)
        //       callApiToDatabase(uid,idToken);
        //   }else{
        //     setMessages([`${error}`]);
        //     setIsLoading(false);
        //     setIsSignIN(false);
        //   }
        // });
    } 
  }
 const [token,setToken]  = useState('');
  
 // check for the user data
  const callApiToDatabase =  (uid, idToken) => {
    let params = {
        "mobile": phoneNumberR,
        "isd": isdR,
        "appcode": "ANRD",
        "uid": uid,
        "idToken": idToken,
        "player_id": onesignaltoken,
    }
    // console.log("params data:------------",params);
    let url = `customer/me/authenticate?mode=firebaseotp`; 
    ApiService.Post(url, params)
    .then(response=>{
      console.log("call Api ID:", {
        "repsonse":response.data,
        "hasOrer":response.data.userDetails.hasOrder, 
      }); 
      AsyncStorage.setItem('UserToken', response.data.token); 
      if(response.data.token){ 
        setToken(response.data.token);
        // getAllCretedSites();
        dispatch(signin({
          isLoggedIn:true,
          token:response.data.token,
          haveOrder:response.data.userDetails.hasOrder
        })); 
        
       
        // now we will check if the user alreay have any projet  
        if(response.data.userDetails.firstname == null || response.data.userDetails.firstname == '' || response.data.userDetails.firstname == undefined ){
          // here navigate to create accout name:
          setIsLoading(false);
          setIsSignIN(false);
          AsyncStorage.setItem('isLogin', "3"); 
          navigation.navigate('CreateAccount');
        }else{
          console.log(Object.keys(response.data.userDetails.site).length != 0); 
          // now here i have to set
          // user default site and also check for
          // any previous order
          if (Object.keys(response.data.userDetails.site).length != 0 && response.data.userDetails.hasOrder == true ) {
            console.log('Object not empty');
            AsyncStorage.setItem('SelectedSite',`${response.data.userDetails.site.id}`); 
            AsyncStorage.setItem("siteName",`${response.data.userDetails.site.name}`); 
            setIsLoading(false);
            setIsSignIN(false);
            AsyncStorage.setItem('isLogin', "2");
            navigation.navigate('MainStack');
          }
          if(Object.keys(response.data.userDetails.site).length == 0 && response.data.userDetails.hasOrder == true){
            // assume its a new user 
            // here to navigate to the create a new site  
            setIsLoading(false);
            setIsSignIN(false);
            navigation.navigate('FirstTimeSser', { screen: 'DetectLocation'}); 
          }
          if(Object.keys(response.data.userDetails.site).length == 0 && response.data.userDetails.hasOrder == false ){
            // here to navigate to the create a new site 
            // navigation.navigate('MainStack');
            setIsLoading(false);
            setIsSignIN(false);
            navigation.navigate('FirstTimeSser', { screen: 'DetectLocation'});
          } 
        }
      }else{
        setIsLoading(false);
        setIsSignIN(false);
        setMessages([`User token is not generated yet.`]);
      }
    })
    .catch(error=>{
      console.log("callApiToDatabase",error);
      // setMessages(['Internal server error.']);
      setMessages([`callApiToDatabase eoor: ${error}`]);
     // crashlytics().log(`call api to database: otp ${error}`);
      setIsLoading(false);
      setIsSignIN(false);
    })
  } 
  
  return (   
    <View style={{...styles.container}}>
        {/* Start: Notification Bar  */}
        <View
            style={{
            position: 'absolute', 
            left: 0, 
            top:'0%',
            width:'100%',
            zIndex:999, 
            padding:12
            }}
        >
            {messages.map((message) => (
            <AnimatedMessage
                key={message}
                message={message}
                onHide={() => {
                setMessages((messages) =>
                    messages.filter(
                    (currentMessage) =>
                        currentMessage !== message
                    )
                );
                }}
            />
            ))}
        </View>
        {/* End: Notification Bar  */}
        <ImageBackground style={styles.backgroundImage}  source={Images.Background}>
          <View style={{width:width, padding:0,marginTop:30, justifyContent:'center',alignContent:'center', alignItems:'center'}}>    
            <View style={{marginBottom:40}}></View>
            <AutoHeightImage
                width={width-30} 
                maxHeight={180} 
                resizeMode="contain"
                source={Images.auth2}
            />
          </View>
          <View style={styles.cardContainer}>
              {/* staert: SignInOTP  */}
              <SignInOTPCard title="OTP Verification" para="Didn’t Received The Code? 0:59 " OtpCodeHandler={OtpCodeHandler} phoneNumberR={`${isdR} ${phoneNumberR}`}/>
              <CTMButton btnText="Verify" theme="default" marginBottom={false} functionType="otpVerify" onPress={SignINOTPHandler} isLoading={isLoading} /> 
              {/* end: SignInOTP  */} 
          </View>
        </ImageBackground> 
    </View> 
  )
}
export const styles = StyleSheet.create({
	container: { 
    flex:1,
		// backgroundColor: '#012E58'
    backgroundColor:'#ffffff',
    padding:0,
    margin:0 ,
    flexDirection:'column'
	},
  backgroundImage:{ 
    width:width ,
    height:height,
    flexDirection:'column',
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
    paddingLeft:14,
    paddingRight:14
  },  
  cardContainer:{
    width:width,
    minHeight:120, 
    marginBottom:40,  
    padding:14,
    paddingTop:0,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },

});
export default SignOTP;