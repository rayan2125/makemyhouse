import React,{useState, useEffect ,memo } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Keyboard } from 'react-native'
 
const {width, height} = Dimensions.get('window');
import Colors from '../../screens/utility/color';
import FontSize ,{FontWeight} from '../../screens/utility/fonts';



import { actuatedNormalizeVertical } from '../../screens/utility/scaling';
 
import CTMTextInput from '../textInput';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccountCard = (props) => {


    

    const [countryCode, setCountryCode] = useState('IN'); // Default country code 
    const [countryName,setCountryName] = useState('India');
    const [isFocused, setIsFocused] = useState(false);
    
    useEffect(()=>{
        props.countryShortNameHandler(countryCode);
    },[countryCode]);

    // const onSelect = (selectedCountry) => {
    //     console.log(selectedCountry);
    //     setCountryName(selectedCountry.name);
    //     setCountryCode(selectedCountry.cca2);  
    //     // country short code
    //     props.countryShortNameHandler(selectedCountry.cca2)
    //     setIsFocused(true);
    // };
    const onChangeTextHander = (stage, value) => {
        console.log("returned text: ", value);
        setCountryName(value);
        props.countryShortNameHandler(value);
        // setCountryName
        AsyncStorage.setItem("country", value); 
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
   
    
    const nameHandler = (data)=>{
        props.nameHandler(data);
    }

    const emailHandler = (data)=>{
        props.emailHandler(data);
    }
 
    const DropDownData = [ 
        { label: 'France', value: 'FR' },
        { label: 'Germany', value: 'DE' }, 
        { label: 'Italy ', value: 'IT' },
        { label: 'India', value: 'IN' }, 
        { label: 'Mexico', value: 'MX' }, 
        { label: 'Spain', value: 'ES' },
        { label: 'Turkey', value: 'TR' },
        { label: 'Thailand ', value: 'TH' },  
        { label: 'United States', value: 'US' }, 
        { label: 'United Arab Emirates', value: 'UAE' }, 
        { label: 'United Kingdom', value: 'UK' }, 
    ];
  
    return(
        <View style={styles.container}>
            <Text style={{color:Colors.TextColorPrimary,fontSize:FontSize.h4,fontWeight:FontWeight.medium, marginBottom:actuatedNormalizeVertical(18),}}>
                {props.title}
            </Text> 
            <View style={{flexDirection:'column', }}>
                <View style={{height:16}}></View> 
                <CTMTextInput title="Name" placeholder="Ex. John Smith" onChangeText={nameHandler} keyboard="default"/>
                <View style={{height:22}}></View>
                <CTMTextInput title="Email" placeholder="Ex. JohnSmith@email.com" onChangeText={emailHandler} keyboard="default"/>
                <View style={{height:22}}></View>

                <CTMTextInput title="Country" defaultValue={countryName}  mandatory={false} placeholder="Select Country" onChangeText={(value)=>onChangeTextHander("stage",value)} keyboard="default" dropDown={true} dropDownTitle="Country" dropdowndata={DropDownData}/> 
                
                {/* <View  style={[styles.InputText,
                        {
                        borderColor: isFocused? Colors.PrimaryColor: Colors.lightGray
                        }
                ]}>
                    <Text style={styles.title}>Country</Text>
                    <CountryPicker
                            withFlag
                            withCallingCode={false}
                            withCallingCodeButton={false}
                            withEmoji
                            withFilter
                            onSelect={onSelect}
                            countryCode={countryCode}
                            visible={false}
                            textStyle={{ color: Colors.PrimaryColor }} // Change text color
                            callingCodeTextStyle={{ color: Colors.SecondaryColor }} // Change calling code text color
                            /> 
                            <Text style={{color:'#212121'}}>{countryName}</Text>   
                        </View> */}
            </View>
             
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
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
      borderColor:'yellow', 
      marginBottom:actuatedNormalizeVertical(32),
    },
    TextInput:{
      color:'#212121',
      fontSize:FontSize.h4
    },
    title:{
        position:'absolute',
        top:-10,
        left:12,
        backgroundColor:Colors.white,
        paddingHorizontal:6,
        zIndex:999,
        fontSize:FontSize.h4,
        color:Colors.blackShadeTwo
    }, 
});

export default CreateAccountCard

