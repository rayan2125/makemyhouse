import React, { useEffect, useRef, useState , useCallback} from 'react';
import { View, Text, BackHandler, TextInput, StyleSheet, ImageBackground, Dimensions } from 'react-native'; 
 


import Images from '../utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

// import SignInCard from '../../components/card/signIn'; // signIn card
import CTMButton from '../../components/button';

const {width, height} = Dimensions.get('window');
 
import { useNavigation,useNavigationState  } from '@react-navigation/native';
 
import FontSize, {FontWeight  } from '../utility/fonts';

// Start: icons 
import Logo from '../../../assets/images/logo.svg'; 
import HeartIcon from "../../../assets/images/heartIcon.svg"

// end: icons 
import Colors from '../utility/color';

import CountryPicker from 'react-native-country-picker-modal';
  

// notification 
import AnimatedMessage from '../../components/animatedNotification';

import { useFocusEffect } from '@react-navigation/native';
import { actuatedNormalize, actuatedNormalizeVertical } from '../utility/scaling';
 
const SigninView = (props) => {
  // aimate notification 
  const [messages, setMessages] = useState([]);
  // useEffect(()=>{
  //   setTimeout(()=>{
  //     if(props.messagesP != null ){
  //       setMessages([`${props.messagesP}`]);
  //     } 
  //   },10);
  // },[props.messagesP]);

  console.log("message ",props.messagesP)
  
  const [isSignIN,setIsSignIN] = useState(false);
  const [isLoading,setIsLoading] = useState(false); 

  // useEffect(()=>{
  //   setIsSignIN(props.isSignIN)
  // },[props.isSignIN]);

  // useEffect(()=>{
  //   setIsLoading(props.isLoading)
  // },[props.isLoading]);
  
  // start: card component 
  const [countryCode, setCountryCode] = useState('IN'); // Default country code
  const [countryPhoneCode,setCountryPhoneCode] = useState('91')
  
  const [phoneNumber,setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const onSelect = (selectedCountry) => {
    console.log(selectedCountry);
    setCountryPhoneCode(selectedCountry.callingCode[0])
    setCountryCode(selectedCountry.cca2);  
    props.isd(selectedCountry.callingCode[0]);
    setIsFocused(true);
  };

  const handleFocus = () => {
    setIsFocused(true);  
  };

  const handleBlur = () => {
    setIsFocused(false); 
  };

  const onChangeText = (text)=>{
    setPhoneNumber(text);  
    console.log("-----phone number-----", text);
    props.phonenumber(text);
    props.isd(countryPhoneCode);
  }
  // end: card component 
   
  const signinHandler = ()=>{
    if(phoneNumber == '' || phoneNumber == null){
      setMessages(['Enter mobile number.'])
    }else{
      props.onSubmit();
    }
  }

  // start: here we will disable the back 
  const handleBackPress = () => {   
    return true;
  };
  // useFocusEffect(
  //   useCallback(() => { 
  //   console.log('Screen came into focus');
  //   const backSubscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  //   return () => backSubscription.remove();
  //   }, [])
  // );
  // end: here we will disable the back 

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
      {
        messages.length > 0 &&
        <>
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
        </> 
      } 
         
        </View>
        {/* End: Notification Bar  */}

        <ImageBackground style={styles.backgroundImage}  source={Images.Background}>
           <View style={{width:width, padding:0,marginTop:30, justifyContent:'center',alignContent:'center', alignItems:'center'}}>    
                {/* <Logo  width={actuatedNormalize(width-180)}    /> */}
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
                <View style={styles.innercontainer}>
                    <Text style={{color:Colors.TextColorPrimary,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium, marginBottom:(18),}}>
                            Login With Mobile Number
                    </Text>
                    <View  style={[styles.InputText,
                            {
                            borderColor: isFocused? Colors.PrimaryColor: Colors.lightGray
                            }
                    ]}> 
                        <CountryPicker
                        withFlag
                        withCallingCode
                        withCallingCodeButton
                        withEmoji
                        withFilter
                        onSelect={onSelect}
                        countryCode={countryCode}
                        visible={false}
                        textStyle={{ color: Colors.PrimaryColor  }} // Change text color
                        callingCodeTextStyle={{ color: Colors.SecondaryColor, }} // Change calling code text color 
                        togglerLabelStyle={{ fontSize:FontSize.h4 }}
                        /> 
                        
                        <View style={{width:2, height:'28%', backgroundColor:'#212121', marginHorizontal:2, marginLeft:6}}></View>
                        <TextInput
                        style={styles.TextInput}
                        placeholder="Enter phone number"
                        placeholderTextColor={Colors.lightGray}
                        value={phoneNumber}
                        onChangeText={(text) => onChangeText(text)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        keyboardType="phone-pad" 
                       
                        />

                    </View>
                    <Text style={{color:Colors.gray,fontSize:FontSize.xp}}>
                        We will send one Time Password [OTP]
                    </Text> 
                </View> 
                <CTMButton btnText="Login" marginBottom={true} theme="default"  functionType="login" onPress={()=>signinHandler()} isLoading={isLoading} />
                <View style={{flexDirection:'row', justifyContent:'center',alignContent:'center',alignItems: 'center',}}> 
                    <Text style={{color:Colors.TextColorPrimary,fontSize:FontSize.xp}}>Crafting home with Love</Text>
                   
                    
                </View>

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
  innercontainer:{
    width:'100%',
    minHeight:height/3,
    backgroundColor:'#ffffff',
    padding:16,
    paddingTop:32,
    paddingBottom:22,
    borderRadius:22, 
    marginTop:-8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 6,
    marginBottom:28
},
InputText:{
  width:'100%',  
  height:60,
  flexDirection:'row',
  justifyContent:'flex-start',
  alignContent:'center',
  alignItems:'center',
  padding:0,
  // paddingLeft:9,
  // paddingRight:9,
  paddingHorizontal: 9,
  borderRadius:9,
  borderWidth:2, 
  marginBottom:actuatedNormalizeVertical(32),
},
TextInput:{
  width:'75%',
  color:'#212121',
  fontSize:FontSize.h6,
  fontWeight:FontWeight.regular, 
}
});
export default SigninView
