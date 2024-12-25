import React, { useEffect, useRef, useState , useCallback} from 'react';
import { View, Text, KeyboardAvoidingView, Image, StyleSheet, BackHandler, Dimensions } from 'react-native'; 
  
const {width, height} = Dimensions.get('window');
 
import { useNavigation,useNavigationState  } from '@react-navigation/native';
 
 
// api servicew 
import ApiService from '../../ApiServices';

// this methos is used to work with the action redux  
import { useDispatch, useSelector } from 'react-redux';
import { signin,conformCode, clearallinit } from '../../redux';

// auth firebase 
// import auth  from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

// notification 
import AnimatedMessage from '../../components/animatedNotification';
 
// import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from '@react-navigation/native';

 
import SigninView from './signinView';

 
// import OneSignal  from 'react-native-onesignal'; 

import { StackActions } from '@react-navigation/native'; 
import SignOTPView from './SignInOTPView';

const SignIn = ()=>{
 
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

    // aimate notification 
    const [message, setMessage] = useState(null); 

    const  navigation = useNavigation(); 


    // reudX-toolkit 
    const dispatch = useDispatch();
    const isLogInR = useSelector(state => state.isLogIn.isLoggedIn);
    const conformR = useSelector(state => state.isLogIn.conform)
    const phoneNumberR = useSelector(state => state.isLogIn.phonenumber); 

    const [isSignIN,setIsSignIN] = useState(false);
    const [isLoading,setIsLoading] = useState(false);  

    const [phone,setPhone] = useState('');
    const [isd,setISD] = useState('');

    useEffect(()=>{
        
    },[isd,phone]);
        
    // onesignal key is known as playerId
    const [onesignaltoken,setonesignaltoken] = useState('');  
    // useFocusEffect(
    //     useCallback(   () => { 
    //     AsyncStorage.getItem('onesignaltoken', (err, credentials) => {
    //         console.log("-------one signal-------", credentials);
    //         setonesignaltoken(credentials);
    //         if(!credentials || credentials == null || credentials == undefined){
    //         OneSignal.addSubscriptionObserver(event => {
    //             console.log('Subscription state changed:', event); 
    //             if(event.to.userId){ 
    //                 setonesignaltoken(event.to.userId);
    //                 console.log('onesignal-------token-----------', event.to.userId);  
    //                 AsyncStorage.setItem("onesignaltoken", event.to.userId); 
    //             }
    //         });
    //         const deviceState = (OneSignal.getDeviceState());
    //         deviceState
    //         .then((data) => { 
    //             setonesignaltoken(data.userId);
    //             console.log('onesignal-------token-----------', data.userId);
    //             AsyncStorage.setItem("onesignaltoken", data.userId);
    //         })
    //         .catch(error=>{
    //             console.log("error in getting onesignal token", error);
    //         })
    //         }
    //     })
    //     return () => { 
    //         console.log('signin screen ');  
    //     };
    //     }, [])
    // );

    const [moveToTheOtpScreen,setmoveToTheOtpScreen] = useState(false);
 
    const SignINHandler = async ()=>{ 
        console.log("clicked on siginin handler" );    
        setIsSignIN(true);
        setIsLoading(true); 
        // auth().signOut();
        try {
        //   const confirmation = await auth().signInWithPhoneNumber("+" + isd + phone);
        //   if (confirmation) {
        //     console.log(confirmation);
        //     setconfirmationS(confirmation); 
        //     setIsSignIN(false);
        //     setIsLoading(false); 
        //   }
        // api call will happend here
        let url =`customer/me/loginotp`;
        let data = {
            mobile:phone,
            isd:isd,
            appcode:"ANRD",
            // utm_source:"",
            // utm_medium:"",
            // utm_campaign:""
        }
        await ApiService.Post(url,data)
        .then(response=>{ 
           
            if(response.data.hasOwnProperty('data') && response.data.msg != "otp sent successfully"){
                return (
                    console.log("inside",response.data.msg),
                    setMessage(`${response.data.msg}`),
                    setIsLoading(false),
                    setIsSignIN(false) 
                )
            }
            // if(response.data.hasOwnProperty("phone") || response.data.hasOwnProperty("data")){
                return (
                    setmoveToTheOtpScreen(true),
                    setIsLoading(false),
                    setMessage(null)
                )
            
        })
        .catch(error=>{
            console.log(error);
            setMessage('Error while phone number verifing.')
            setIsSignIN(false);
            setIsLoading(false);
        })
        }
        catch (error) {
          setIsSignIN(false);
          setIsLoading(false); 
          console.log('Error signing in:', error);
          setMessage(`Error signing in: ${error}`);
        }  
    }

    const [opt,setOTP] = useState('');

    // verify otp here...
    const confirmCode = async (code)=>{
        console.log("clicked on siginin handler" );    
        setIsSignIN(true);
        setIsLoading(true); 
        setMessage(null)
        
        try{
            let url =`customer/me/veryfyotp`;
            let data = {
                mobile:phone,
                isd:isd,
                otp:code,
                appcode:"ANRD", 
                player_id:`${onesignaltoken}`
                // utm_source:"",
                // utm_medium:"",
                // utm_campaign:""
            }
            console.log("customer/me/veryfyotp: request:- ",data);
            await ApiService.Post(url,data)
            .then(response =>{
                console.log("response of otp verification: ", response);
                // console.log("response of otp verification snd: ",response.data); 
                // add flag for msg and extra flag for status code.
                if(response && response.data && response.status == 200){  

                    AsyncStorage.setItem('UserToken', response.data.token); 
                    dispatch(signin({
                        isLoggedIn:true,
                        token:response.data.token,
                        haveOrder:response.data.userDetails.hasOrder
                    }));
                    if(response.data.userDetails.firstname == null || response.data.userDetails.firstname == '' || response.data.userDetails.firstname == undefined ){ 
                            console.log("response of otp verification snd: ",response.data)
                            setIsLoading(false)
                            setIsSignIN(false)
                            AsyncStorage.setItem('isLogin', "3")
                            //navigation.navigate('CreateAccount')
                            navigation.dispatch(
                                StackActions.replace('CreateAccount')
                            ); 
                    }else{
                         // now here i have to set
                        // user default site and also check for
                        // any previous order
                        console.log("else ")
                        // user already exist check for site and have order, then move to MainStack
                        if (Object.keys(response.data.userDetails.site).length != 0 && response.data.userDetails.hasOrder == true ) {
                            console.log("else  1")
                            console.log('Object not empty')
                            AsyncStorage.setItem('SelectedSite',`${response.data.userDetails.site.id}`)
                            AsyncStorage.setItem("siteName",`${response.data.userDetails.site.name}`)
                            setIsLoading(false)
                            setIsSignIN(false)
                            AsyncStorage.setItem('isLogin', "2")
                            //navigation.navigate('MainStack')
                            navigation.dispatch(
                                StackActions.replace('MainStack')
                            );
                        }
                        // User already exist but dont have any site yet And haveOrder or not 
                        else if(Object.keys(response.data.userDetails.site).length == 0 && response.data.userDetails.hasOrder == false ){
                        // else if(Object.keys(response.data.userDetails.site).length == 0 && response.data.userDetails.hasOrder == true ){
                            // assume its a new user 
                            // here to navigate to the create a new site  
                            console.log("else  2")
                            setIsLoading(false)
                            setIsSignIN(false)
                            // navigation.navigate('FirstTimeSser', { screen: 'DetectLocation'})
                            const pushAction = StackActions.push('FirstTimeSser', { screen: 'DetectLocation' }); 
                            navigation.dispatch(pushAction); 
                        }
                        // i have site but dont have any order then navigate to the project select screen (which is solution screen). 
                        else if(Object.keys(response.data.userDetails.site).length != 0 && response.data.userDetails.hasOrder == false){
                            console.log("else  3")
                            console.log("response.data.userDetails.site", response.data.userDetails.site); 
                            // now select this site and navigate the user to the project selections screen. 
                            AsyncStorage.setItem('SelectedSite',`${response.data.userDetails.site.id}`);
                            AsyncStorage.setItem("siteName",`${response.data.userDetails.site.name.trim()}`);
                            // navigation.navigate('FirstTimeSser',{screen:'SolutionFirstStackr',params: {
                            //     SkipScreenParams: true,
                            // }});
                            const pushAction = StackActions.push('FirstTimeSser', {
                                screen: 'SolutionFirstStackr',
                                params: {
                                  SkipScreenParams: true,
                                },
                            });
                            navigation.dispatch(pushAction);
                            // navigation.dispatch(
                            //     StackActions.replace('MainStack')
                            // ); 
                        }
                        else{
                            console.log("else  4")
                            setmoveToTheOtpScreen(true),
                            setIsLoading(false),
                            setMessage('Something went wrong, Please try again in sometime.')
                        }
                    } 
                }
                else if(response.status != 200){
                    
                    setMessage(`${response.data.msg}`);
                    setIsSignIN(false);
                    setIsLoading(false); 
                }
                else{
                    console.log("Error in otp verification: ", error);
                    setMessage(`Error in otp verification: ${error}`);    
                    setIsSignIN(false);
                    setIsLoading(false);    
                }
            })
            .catch(error=>{
                console.log("Error in otp verification: ", error);
                setMessage(`Error in otp verification: ${error}`);    
                setIsSignIN(false);
                setIsLoading(false);
            })
        }
        catch (error) {
            console.log("error in opt verification.", error);
            setIsLoading(false);
            setIsSignIN(false); 
            console.log('Error signing in:', error);
            setMessage(`Error signing in: ${error}`);
        }
    }
    const changePhoneNumberButton = ()=>{
        setIsSignIN(false);
        setIsLoading(false);
        setmoveToTheOtpScreen(false);
    } 
    if(moveToTheOtpScreen == false){
        return(
            <SigninView onSubmit={() => SignINHandler()} phonenumber={(p)=>setPhone(p)} isd={(i)=>setISD(i)} isSignIN={isSignIN} isLoading={isLoading}  messagesP={message}/>
        )
    } 
    if(moveToTheOtpScreen == true){
        return (
            <View style={{width:'100%', height:50,backgroundColor:'green'}}>
                <SignOTPView isd={isd} phonenumber={phone}  onSubmit={(code)=>confirmCode(code)} opt={(c)=>setOTP(c)} changePhoneNumberButton={changePhoneNumberButton} isSignIN={isSignIN} isLoading={isLoading} messagesP={message}/>
            </View>
        )
    }   
}

export default SignIn;