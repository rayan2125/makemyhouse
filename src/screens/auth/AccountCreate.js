import React, { useEffect, useRef, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native'; 

import {actuatedNormalizeVertical} from '../../utility/scaling';
import Images from '../utility/images';


import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
 
import CreateAccountCard from '../../components/card/accountCreate';

import CTMButton from '../../components/button';

const {width, height} = Dimensions.get('window');
import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper';
import { useNavigation,useNavigationState  } from '@react-navigation/native';


// redux 
import { useDispatch, useSelector } from 'react-redux';
import { signin,conformCode} from "../../redux" 
     
// notification 
import AnimatedMessage from '../../components/animatedNotification';

// api servicew 
import ApiService from '../../ApiServices';


const CreateAccount = () => {  
  // aimate notification 
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    // setTimeout(()=>{
    //   setMessages([]);
    // },2000);
  },[messages]);

  const  navigation = useNavigation();   

  // reudX-toolkit 
  const dispatch = useDispatch()
  const phoneNumberR = useSelector(state => state.isLogIn.phonenumber);
  const isdR = useSelector(state => state.isLogIn.isd);

 
  const [isSignIN,setIsSignIN] = useState(false);
  const [isLoading,setIsLoading] = useState(false);  

  const [name,setName] = useState(null);
  const [email,setEmail] = useState(null);
  const [countryShortName,setCountryShortName] = useState('IN');

  // name hanler 
  const nameHandler = (text)=>{
    setName(text); 
  }
  //  email handler 
  const emailHandler = (text)=>{
    setEmail(text)
  } 
  // country short name handler 
  const countryShortNameHandler = (text)=>{
    setCountryShortName(text);
  } 

  // create user account 
  const CreateAccountHandler = ()=>{ 
    setIsLoading(true);
    setIsSignIN(true);
    console.log("account created", {
      phoneNumberR,
      countryShortName,
      name,
      email
    });
    if(name == null){
      setMessages(['Kindly, enter your name.']);
      setIsLoading(false);
      setIsSignIN(false);
    }else if(email == null){
      setMessages(['Kindly, enter your email.']);
      setIsLoading(false);
      setIsSignIN(false);
    }else if(countryShortName == null){
      setMessages(['Kindly, choose your country.']);
      setIsLoading(false);
      setIsSignIN(false);
    }
    else{
      let body = {
        firstName: name, 
        email: email, 
        country:countryShortName
      }
      let url = `customer/me`
      ApiService.Post(url, body)
      .then(response => {
          console.log('post----api--response', response);  
          if (response.status == 200) {
              setIsLoading(false);
              setIsSignIN(false); 
              navigation.navigate('FirstTimeSser', { screen: 'DetectLocation', fromPage:"accountCreate"});
              // navigation.navigate('DetectLocation',{fromPage:"home"})
              // props.navigation.navigate("LoginStack")
          }else{
              console.log("response account create: ", response);
              setIsLoading(false);
              setIsSignIN(false); 
              // setMessages(['Something went wrong: ',response]);
          }
      }).catch(e => { 
          setIsLoading(false);
          setIsSignIN(false);
          console.log('post----api--error', e);
          setMessages([`CreateAccountHandler: ${e}`]);
      });
    } 
  } 
  
  return ( 
    <KeyboardAvoidingWrapper>
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
          <View style={{width:width, padding:0,marginTop:30, 
            justifyContent:'center',alignContent:'center', 
            alignItems:'center'}}>    
            <View style={{marginBottom:40}}></View>
            <AutoHeightImage
                width={width-30} 
                maxHeight={170} 
                resizeMode="contain"
                source={Images.auth3}
            />
          </View>
          <View style={styles.cardContainer}>
              {/* staert: Account Create  */}
              <CreateAccountCard title="Create an Account" nameHandler={nameHandler} emailHandler={emailHandler} countryShortNameHandler={countryShortNameHandler}/> 
              <CTMButton btnText="Continue" marginBottom={true} theme="default" functionType="createaccount" onPress={CreateAccountHandler} isLoading={isLoading} /> 
              {/* End: Account Create  */}
          </View>
        </ImageBackground> 
    </View> 
    </KeyboardAvoidingWrapper>
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
export default CreateAccount;