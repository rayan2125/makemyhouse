import React,{useState, useEffect ,memo } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Keyboard } from 'react-native'


const {width, height} = Dimensions.get('window');
import Colors from '../../utility/color';
import FontSize , { FontWeight } from '../../screens/utility/fonts';

import CountryPicker from 'react-native-country-picker-modal';

import {actuatedNormalizeVertical} from '../../utility/scaling';
 

const SignInCard = (props) => {

  const [countryCode, setCountryCode] = useState('IN'); // Default country code
  const [countryPhoneCode,setCountryPhoneCode] = useState('91')
  
  const [phoneNumber,setPhoneNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const onSelect = (selectedCountry) => {
    console.log(selectedCountry);
    setCountryPhoneCode(selectedCountry.callingCode[0])
    setCountryCode(selectedCountry.cca2); 
    // setPhoneNumber(`${selectedCountry.emoji} ${''}`);
    setIsFocused(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // console.log("handleFocus: ",phoneNumber);
    props.chnagePhoneNumberHandler({
      phoneNumber,
      isd:countryPhoneCode, 
    })
  };

  const handleBlur = () => {
    setIsFocused(false);
    // console.log("handleBlur: ",phoneNumber);
    props.chnagePhoneNumberHandler({
      phoneNumber,
      isd:countryPhoneCode, 
    })
  };

  const onChangeText = (text)=>{
    setPhoneNumber(text);
    props.chnagePhoneNumberHandler({
      phoneNumber:text,
      isd:countryPhoneCode, 
    })
  }
 
  return ( 
    <View style={styles.innercontainer}>
        <Text style={{color:Colors.TextColorPrimary,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium, marginBottom:actuatedNormalizeVertical(18),}}>
          {props.title}
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
            {/* <Text style={{color:'#212121'}}>+{countryPhoneCode}</Text> */} 
            <TextInput
               style={styles.TextInput}
               placeholder="Enter phone number"
               placeholderTextColor={Colors.lightGray}
               value={phoneNumber}
               onChangeText={(text) => onChangeText(text)}
               onFocus={handleFocus}
               onBlur={handleBlur}
               keyboardType="phone-pad" 
               // onPress={Keyboard.dismiss}
            />

        </View>
        <Text style={{color:Colors.gray,fontSize:FontSize.xp}}>
          {props.para}
        </Text> 
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
      color:'#212121',
      fontSize:FontSize.h6,
      fontWeight:FontWeight.regular
    }
});

export default SignInCard