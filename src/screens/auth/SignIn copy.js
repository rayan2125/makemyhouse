import React, { useEffect, useRef, useState , useCallback} from 'react';
import { View, Text, KeyboardAvoidingView, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native'; 
 

import {actuatedNormalizeVertical} from '../../utility/scaling';
import Images from '../../utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

import SignInCard from '../../components/card/signIn'; // signIn card
import CTMButton from '../../components/button';

const {width, height} = Dimensions.get('window');
 
import { useNavigation,useNavigationState  } from '@react-navigation/native';

import Colors from '../../utility/color';
import FontSize, { FontWeight } from '../../utility/fonts';  

// Start: icons 
import Logo from '../../../assets/images/logo.svg'; 
import HeartIcon from '../../../assets/images/heartIcon.svg';
import {actuatedNormalize} from '../../utility/scaling';
// end: icons

 
// this methos is used to work with the action redux  
import { useDispatch, useSelector } from 'react-redux';
import { signin,conformCode, clearallinit } from '../../redux';

// auth firebase 
// import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// notification 
import AnimatedMessage from '../../components/animatedNotification';
 
// import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from '@react-navigation/native';


// api servicew 
import ApiService from '../../ApiServices';

// main compoennt 
const SignIn = () => { 
   
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
  const isLogInR = useSelector(state => state.isLogIn.isLoggedIn);
  const conformR = useSelector(state => state.isLogIn.conform)
  const phoneNumberR = useSelector(state => state.isLogIn.phonenumber);


  const [isSignIN,setIsSignIN] = useState(false);
  const [isLoading,setIsLoading] = useState(false); 
  const [phoneNumber,stePhoneNumber] = useState(null);
  const [isd, setIsd] = useState(null);

  const [phoneNumberISD,setphoneNumberISD] = useState(null);
 
  // start: clear every thing when screen load 
  useFocusEffect(
    useCallback(() => { 
      // console.log('Screen came into focus'); 
      // AsyncStorage.clear();
      setIsLoading(false);
      setIsSignIN(false);
      stePhoneNumber(null);
      setIsd(null);
      setphoneNumberISD(null);

      auth().signOut();
      
      dispatch(clearallinit({
        isLoggedIn:false,
        token:""
      })); 
      // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return () => { 
        console.log('Screen went out of focus'); 
        // subscriber();
      };
    }, [])
  );
  // end: clear every thing when screen load 

  useEffect(()=>{ 
    // setphoneNumberISD(`+${isd}${phoneNumber}`);
    // crashlytics().recordError(`phoneNumberISD: ${phoneNumberISD}`);
    console.log(`+${isd}${phoneNumber}`);
  },[phoneNumberISD]);
  
  
  const chnagePhoneNumberHandler = (text)=>{
    console.log("chnagePhoneNumberHandler signin Screen",text);
    stePhoneNumber(text.phoneNumber);
    setIsd(text.isd);
    // setMessages([`ph: ${text.phoneNumber}`,`isd: ${text.isd.trim()}`,`complete: +${text.isd}${text.phoneNumber}`]); 
    // crashlytics().setAttributes({
    //   ph:text.phoneNumber,
    //   isd:text.isd,
    //   commplete: `+${isd}${phoneNumber}`
    // });
    setphoneNumberISD(`+${text.isd.trim()}${text.phoneNumber.trim()}`); 
  }

  const [onesignaltoken,setonesignaltoken] = useState(''); 

  useEffect(() => {
    AsyncStorage.getItem('onesignaltoken', (err, credentials) => {
        setonesignaltoken(credentials);
    })
  }, []);
 

   // Handle login
   function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
      console.log("firebase user state change", user);
      dispatch(clearallinit({
        isLoggedIn:false,
        token:""
      }));
      auth().signOut(); 
    }
  }
 

  const SignINHandler = async ()=>{ 
      setIsLoading(true);
      setIsSignIN(true);
      
      // auth().signOut(); 
      try {
        console.log("firebase auth starts from here");
        if( phoneNumberISD != null  && phoneNumberISD != '' && phoneNumberISD != undefined ){
          console.log("PhoneNumber & ISD ",{
            isd,
            phoneNumber,
            phoneNumberISD
          });
          // here i have to check for the auth 
          const confirmation = await auth().signInWithPhoneNumber(phoneNumberISD.trim());
          if (confirmation) {
            auth().onAuthStateChanged(user => {
              // console.log("user.uid exit singin:",confirmation);
              // crashlytics().recordError(`user.uid exit: ${user}`);
              dispatch(conformCode({
                confirmation:confirmation,
                phonenumber:phoneNumber,
                isd:isd
              })); 
              let uid = auth().currentUser.uid;
              let idToken =  auth().currentUser.getIdToken();
              setTimeout(()=>{
                setIsLoading(false);
                setIsSignIN(false);
                // here navigate to the signINotpscreen
                // navigation.navigate('SignOTP')
                callApiToDatabase(uid,idToken)
              },10);
              // if (user && user.uid) {  
              //   console.log("user alreay exist singin:", user.uid);
              //   dispatch(conformCode({
              //     confirmation:confirmation,
              //     phonenumber:phoneNumber,
              //     isd:isd
              //   })); 
              //   let uid = auth().currentUser.uid;
              //   let idToken =  auth().currentUser.getIdToken();
              //   setTimeout(()=>{
              //     setIsLoading(false);
              //     setIsSignIN(false);
              //     // here navigate to the signINotpscreen
              //     // navigation.navigate('SignOTP')
              //     callApiToDatabase(uid,idToken)
              //   },10);
              // }else{ 
              //   // console.log("User Created singin:", user );
              //   // // crashlytics().recordError(`user created: ${user}`);
              //   // // also run the redux to store the conformation thing 
              //   // // simple navigate to the otp screen 
              //   // dispatch(conformCode({
              //   //   confirmation:confirmation,
              //   //   phonenumber:phoneNumber,
              //   //   isd:isd
              //   // })); 
              //   // setTimeout(()=>{
              //   //   // setIsLoading(false);
              //   //   // setIsSignIN(false);
              //   //   // here navigate to the signINotpscreen
              //   //   navigation.navigate('SignOTP')
              //   // },10);
              //   auth().onAuthStateChanged(onAuthStateChanged)
              // }
            })
          }else{ 
            dispatch(conformCode({
              confirmation:confirmation,
              phonenumber:phoneNumber,
              isd:isd
            }));  
            setTimeout(()=>{
              setIsLoading(false);
              setIsSignIN(false);
              // here navigate to the signINotpscreen
              navigation.navigate('SignOTP')
            },10);
          }
        }else{
          setMessages(['Please enter mobile number']);
          setphoneNumberISD('');
          stePhoneNumber('');
          setIsd('');
          setTimeout(()=>{
            setIsLoading(false);
            setIsSignIN(false); 
          },10);
        }
      }
      catch (error){
        setphoneNumberISD('');
        stePhoneNumber('');
        setIsd('');
        //crashlytics().recordError(`signin Handler: ${error}`);
        console.log('Error signing in:', error);
        // crashlytics().recordError(`Error signing in: ${error}`);
        // setMessages(['Something went wrong.']);
        setMessages([`${error}`]);
        // here i have to show the error notification error 
        setTimeout(()=>{
          setIsLoading(false);
          setIsSignIN(false); 
        },10); 
      }
  } 
 
  
  const [token,setToken]  = useState('');
  
  // check for the user data
  const callApiToDatabase =  (uid, idToken) => {
    let params = {
        "mobile": phoneNumber,
        "isd": isd,
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
      console.log("callApiToDatabase error signIN",error);
      // setMessages(['Internal server error.']);
      setMessages([`callApiToDatabase eoor signIN: ${error}`]);
     // crashlytics().log(`call api to database: otp ${error}`);
      setIsLoading(false);
      setIsSignIN(false);
    })
  } 

  return ( 
    <View style={styles.container}>

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
            <Logo  width={actuatedNormalize(width-180)}    />
            <View style={{marginBottom:40}}></View>
            <AutoHeightImage
                width={width-30} 
                maxHeight={height} 
                resizeMode="contain"
                source={Images.auth1}
            />
          </View>
          <View style={styles.cardContainer}>
              {/* start: SignIn  */}
              <SignInCard title="Login With Mobile Number" para="We will send one Time Password [OTP]" chnagePhoneNumberHandler={chnagePhoneNumberHandler}/>
              <CTMButton btnText="Login" marginBottom={true} theme="default"  functionType="login" onPress={()=>SignINHandler()} isLoading={isLoading} />
              <View style={{flexDirection:'row', justifyContent:'center',alignContent:'center',alignItems: 'center',}}> 
                  <Text style={{color:Colors.TextColorPrimary,fontSize:FontSize.xp}}>Crafting home with Love</Text>
                  {/* <Image source={Images.HeartIcon}/> */}
                  {/* <AutoHeightSVG url={Images.HeartIcon} style={{width:40,height:40}} /> */} 
                  <HeartIcon  width={actuatedNormalize(22)} height={actuatedNormalize(22)}  style={{marginLeft:6}}/>
              </View>
              {/* <Text style={{color:'red'}}>redux: state: =--{phoneNumberR}</Text> */}
              {/* end: SignIn  */} 
          </View>
        </ImageBackground> 
    </View> 
  )
}
 const styles = StyleSheet.create({
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
export default SignIn;