import React, { useEffect,  useState,useRef } from 'react';
import { View,  StyleSheet, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native'; 
 
import Images from '../utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
  
import CTMButton from "../../components/button/index"

const {width, height} = Dimensions.get('window');
 
import Colors from '../utility/color';
 
import FontSize ,{FontWeight} from '../utility/fonts'; 
import { actuatedNormalizeVertical } from '../utility/scaling';
 
// notification 
import AnimatedMessage from '../../components/animatedNotification';
 
import OTPTextView from 'react-native-otp-textinput';
 
const SignOTPView = (props) => { 

  // aimate notification 
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    setTimeout(()=>{
      if(props.messagesP != null ){
        setMessages([`${props.messagesP}`]);
      } 
    },10);
  },[props.messagesP]);

  const [isSignIN,setIsSignIN] = useState(false);
  const [isLoading,setIsLoading] = useState(false); 

  useEffect(()=>{
    setIsSignIN(props.isSignIN)
  },[props.isSignIN]);

  useEffect(()=>{
    setIsLoading(props.isLoading)
  },[props.isLoading]);
 

  const optRef = useRef(''); 
  useEffect(()=>{
    if(optRef.current != undefined && optRef.current != "" && optRef.current.length == 4){
      console.log("Entered OTP number:", optRef.current);
      // setOtp(optRef.current);
      // props.OtpCodeHandler(optRef.current);
      // onSubmit.onSubmit(optRef.current);
      props.opt(optRef.current); 
    } 
  },[optRef.current]); 

  const verifyOTP = ()=>{
    if(optRef.current != null){
        // if(otpCode.length == 6 ){
        props.onSubmit(optRef.current)
        // }else{
        //   setMessages(["Invalid otp"]); 
        // }
    }else{
      setMessages(["Kindly check the OTP and enter again."]); 
    } 
  }
   
  // start: counter
  const [counter, setCounter] = useState(10);
  const [activeNavigation,setActiveNavigation] = useState(false);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }else{
      setActiveNavigation(true);
    }
  }, [counter]);
  // end: counter

 
  
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

              <View style={styles.innercontainer}>
        <Text style={{color:Colors.TextColorPrimary,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium, marginBottom:actuatedNormalizeVertical(18),}}>
        OTP Verification
        </Text>

        <View style={{width:'100%',flexDirection:'row', justifyContent:'flex-start',flexWrap:'wrap',marginBottom:10}}>
          <Text style={{fontSize:FontSize.p,color:Colors.gray,fontWeight:FontWeight.medium}}>Enter The verification code send to </Text> 
          <Text style={{fontSize:FontSize.p,color:Colors.TextColorPrimary,fontWeight:FontWeight.medium}}>+{props.isd} {props.phonenumber}</Text>
        </View>
        {
          activeNavigation == true?
          <TouchableOpacity 
            onPress={()=>props.changePhoneNumberButton()}
          >
            <Text style={[
              {fontSize:FontSize.xp,color:Colors.gray,fontWeight:FontWeight.medium},
              activeNavigation == false ? {color:Colors.gray}:{color:Colors.SecondaryColor}
              ]}>Change Number?</Text>
          </TouchableOpacity>
          :
          <Text style={[
            {fontSize:FontSize.xp,color:Colors.gray,fontWeight:FontWeight.medium} 
            ]}>Change Number?</Text> 
        }


        <View style={{width:'100%',marginVertical:12}}>
          <OTPTextView
              // handleTextChange={val => props._handleOtp(val)}
              handleTextChange={(val) =>{
                optRef.current = val; 
              }}
              containerStyle={{ 
                width:"100%", 
                justifyContent:'center',
              }}
              textInputStyle={styles.otpInoutView} //input box style
              inputCount={4}
              inputCellLength={1}
              tintColor={Colors.PrimaryColor}
              offTintColor={Colors.lightGray}
              placeholder="0"
              placeholderTextColor="#eee"
            />
        </View>

          <Text style={{fontSize:FontSize.xp,color:Colors.gray}}>Didn’t Received The Code? 00:{counter.toString().padStart(2, '0')} </Text> 
      </View>
              
              <CTMButton btnText="Verify" theme="default" marginBottom={false} functionType="otpVerify" onPress={()=>verifyOTP()} isLoading={isLoading} /> 
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
  otpInoutView: { 
    width:width/7.5,
    height:60,
    borderWidth: 2,
    color:'#000000', 
    borderBottomWidth: 2,
    borderRadius: 6,
    backgroundColor: 'white',
    margin:0,
    padding:0,
    fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',
    fontWeight:FontWeight.regular,
    marginHorizontal:6
  },
});
export default SignOTPView;