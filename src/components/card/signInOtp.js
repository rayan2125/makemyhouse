import React,{useState, useEffect ,memo, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Keyboard } from 'react-native'


const {width, height} = Dimensions.get('window');
import Colors from '../../screens/utility/color';
import FontSize , { FontWeight } from '../../screens/utility/fonts';

import CountryPicker from 'react-native-country-picker-modal';



import OTPTextView from 'react-native-otp-textinput';
 
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import { actuatedNormalizeVertical } from '../../screens/utility/scaling';
const SignInOTPCard = (props) => {

  const navigation = useNavigation();

  const [phoneNumber,setPhoneNumber] = useState(`+${props.phoneNumberR}`);
  // const [otp,setOtp] = useState();
  const optRef = useRef(''); 
  useEffect(()=>{
    if(optRef.current != undefined && optRef.current != "" && optRef.current.length == 4){
      console.log("Entered OTP number:", optRef.current);
      // setOtp(optRef.current);
      props.OtpCodeHandler(optRef.current);
    }
  },[optRef.current]);
 

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

  
  // navigation to change number 
  const NavigateChangeNumber = ()=>{
    if(counter==0 && activeNavigation == true){ 
      // here to navigate back to signIn screen
      navigation.navigate('SignIn')
    }else{
      // navigation.navigate('SignIn')
    }
  }

  return (
    <View style={styles.innercontainer}>
        <Text style={{color:Colors.TextColorPrimary,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium, marginBottom:actuatedNormalizeVertical(18),}}>
          {props.title}
        </Text>

        <View style={{width:'100%',flexDirection:'row', justifyContent:'flex-start',flexWrap:'wrap',marginBottom:10}}>
          <Text style={{fontSize:FontSize.p,color:Colors.gray,fontWeight:FontWeight.medium}}>Enter The verification code send to </Text> 
          <Text style={{fontSize:FontSize.p,color:Colors.TextColorPrimary,fontWeight:FontWeight.medium}}>{phoneNumber}</Text>
        </View>
        {
          activeNavigation == true?
          <TouchableOpacity onPress={()=>NavigateChangeNumber()}>
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
                width:"100%"
              }}
              textInputStyle={styles.otpInoutView} //input box style
              inputCount={6}
              inputCellLength={1}
              tintColor={Colors.PrimaryColor}
              offTintColor={Colors.lightGray}
              placeholder="0"
              placeholderTextColor="#eee"
            />
        </View>

        <Text style={{fontSize:FontSize.xp,color:Colors.gray}}>Didn’t Received The Code? 00:{counter.toString().padStart(2, '0')} </Text> 
    </View>
  )
}

const styles = StyleSheet.create({
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
      fontWeight:FontWeight.regular
    },
});

export default SignInOTPCard