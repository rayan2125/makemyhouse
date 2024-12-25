import React, { useEffect,  useState } from 'react';
import { View,  StyleSheet, ImageBackground, Dimensions } from 'react-native'; 
 
import Images from '../utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
 
import SignInOTPCard from '../../components/card/signInOtp'; // signIn card
import CTMButton from '../../components/button';

const {width, height} = Dimensions.get('window');
 
 

import { useNavigation,useNavigationState  } from '@react-navigation/native';

// redux 
// import { useDispatch, useSelector } from 'react-redux';
// import { signotp,signin } from '../../redux';

// auth firebase 
// import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// notification 
import AnimatedMessage from '../../components/animatedNotification';

// api servicew 
// import ApiService from '../../ApiServices';
 
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
  // const dispatch = useDispatch(); 
  // const conformR = useSelector(state => state.isLogIn.conform);
  // const phoneNumberR = useSelector(state => state.isLogIn.phonenumber);
  // const isdR = useSelector(state => state.isLogIn.isd);

 
  const [isSignIN,setIsSignIN] = useState(false);
  const [isLoading,setIsLoading] = useState(false); 

  const [otpCode, setOtpCode] = useState(null);

  const OtpCodeHandler = (data)=>{
    setOtpCode(data)
    console.log("otp handler: ", data);
    crashlytics().log(`otp handler: ${data}`);
  }

  const [onesignaltoken, setonesignaltoken] = useState('');

  useEffect(() => {
      AsyncStorage.getItem('onesignaltoken', (err, credentials) => {
          setonesignaltoken(credentials);
      })
  }, []); 
  
  // const SignINOTPHandler = async ()=>{
  //   setIsLoading(true);
  //   setIsSignIN(true); 
  //   // console.log("conformR: ",conformR);
  //   try {
  //     let currentUser = await conformR.confirm(otpCode);
  //     if (currentUser) {
  //         let uid = auth().currentUser.uid;
  //         let idToken = await auth().currentUser.getIdToken();
  //         // dispatch(signotp());  
  //         callApiToDatabase(uid,idToken);
  //     }else{
  //       console.log("nothing");
  //       setMessages(['Kindly refresh your app.']);
  //       crashlytics().log(`Kindly refresh your app`);
  //     }
  //   } catch (error) {
  //       setIsLoading(false);
  //       setIsSignIN(false); 
  //       console.log("SignINOTPHandler",error)   
  //       setMessages([`SignINOTPHandler ${error}`]);
  //       crashlytics().log(`SignIN otp handler ${error}`);
  //       // setMessages(['Something went wrong']);
  //       auth().onAuthStateChanged((user) => {
  //         console.log('user______________', user)
  //         if (user) {
  //             let uid = user.uid;
  //             let idToken = user.getIdToken();
  //             console.log('autoautho______________', uid, idToken)
  //             callApiToDatabase(uid,idToken);
  //         }else{
  //           setMessages([`${error}`]);
  //           setIsLoading(false);
  //           setIsSignIN(false);
  //         }
  //       });
  //   } 
  // }
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
        if(response.data.userDetails.hasOrder == true){
          // directly navigate to the dashboard 
          // AsyncStorage.setItem('isLogin', "2");
          // navigation.navigate('MainStack') 
        }else{
          // navigate to the profile create screen
          // AsyncStorage.setItem('isLogin', "3"); 
          // here we have to make a new request to check wather user profile is updated or not
          // if no then create account screen 
          // else dashboard  
          // navigation.navigate('CreateAccount')
          // CheckProfileStatus();
        }
      } 
    })
    .catch(error=>{
      console.log("callApiToDatabase",error);
      // setMessages(['Internal server error.']);
      setMessages([`callApiToDatabase: ${error}`]);
      crashlytics().log(`call api to database: otp ${error}`);
      setIsLoading(false);
      setIsSignIN(false);
    })
  } 

  // check if user edit his profile before
  const CheckProfileStatus =   () => {
    let url = 'customer/me';
    ApiService.Getapiheader(url)
    .then(response=>{
        console.log("CheckProfileStatus:---",response.data)  
        setIsLoading(false);
        setIsSignIN(false); 
        if(response.data.firstname == null){
          AsyncStorage.setItem('isLogin', "3"); 
          navigation.navigate('CreateAccount')
        }else{
          AsyncStorage.setItem('isLogin', "2");
          navigation.navigate('MainStack');
        }
    })
    .catch(error=>{
      console.log("CheckProfileStatus", error);
      // setMessages(['Internal server error.']);
      setMessages([`CheckProfileStatus: ${error}`]);
      setIsLoading(false);
      setIsSignIN(false);
      crashlytics().log(`CheckProfileStatus, ${error}`);
    })
  }

  // check if the user alreay have prouct 
  // const projectapicall = async () => {
  //   let url = `customer/orders`;
  //   try {
  //     const response = await ApiService.Getapiheader(url);
  //     console.log('respons-------------project------', response);
  //     if (response?.data?.projects != null && response?.data?.projects?.length > 0) {
  //       // mavigate to the Dashobard  
  //       await AsyncStorage.setItem('isLogin', 3); 
  //       navigation.navigate('MainStack')
  //     }else{
  //       // navigate to the Profile Create Screen
  //       await AsyncStorage.setItem('isLogin', 2); 
  //       navigation.navigate('CreateAccount')
  //     }
  //   }
  //   catch(error){
  //     console.log(error);
  //     setMessages(['Something went wrong']);
  //     setIsLoading(false);
  //     setIsSignIN(false);
  //   } 
  // }


  const getAllCretedSites =  ()=>{
    let url = 'customer/ConstructionSite';
    AsyncStorage.getItem('UserToken',(err,creds)=>{
      if(creds){
        ApiService.Getapiheader(url)
        .then(response=>{
          console.log("default Selected site response data: ", response.data);
          if(response.data.sites.length > 0 ){
            let data = response.data.sites;
            console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL from navigation: ",data[0]);
            AsyncStorage.setItem('SelectedSite',`${data[0].ID}`); 
            AsyncStorage.setItem("siteName",`${data[0].name}`); 
          }
        })
        .catch(error=>{
            console.log("getAllCretedSites error:", error); 
            setMessages([`getAllCretedSites ${error}`]);
        }) 
      }else{
        console.log("get all create sites: new user.");
      }
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
              <SignInOTPCard title="OTP Verification" para="Didn’t Received The Code? 0:59 " OtpCodeHandler={OtpCodeHandler} />
              <CTMButton btnText="Verify" theme="default" marginBottom={false} functionType="otpVerify" isLoading={isLoading} /> 
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