import React, { useEffect, useRef,createRef , useState, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';

import Colors from '../../screens/utility/color';
import FontSize ,{FontWeight} from '../../screens/utility/fonts';
import { Dropdown } from 'react-native-element-dropdown';


const CTMTextInput = (props)=>{  

    const inputRef = createRef();
    const [isFocused, setIsFocused] = useState(false);

    const [valueDefault,setValueDefault] = useState('');
    let valueDefaultTemp = props.value;
   
    // useEffect(()=>{
    //     console.log("default value:----------",props.value);
    // },[])
    // const onSelect = (selectedCountry) => { 
    //     // setPhoneNumber(`${selectedCountry.emoji} ${''}`);
    //     setIsFocused(true);
    // };

    const handleFocus = () => {
        setIsFocused(true);
        // const currentValue = inputRef.current; 
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const renderLabel = () => {
        if (value || isFocused) {
          return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
              Dropdown label
            </Text>
          );
        }
        return null;
    };

    return ( 
        <View style={[styles.textInputContainer,{ borderColor:isFocused == false?Colors.lightGray:Colors.PrimaryColor}, props.constant == true? {borderColor:'#f2f2f2',backgroundColor:"#fcfcfc"}: {}]} >
             
            <Text style={styles.title}>{props.title}
                {
                    props.mandatory == true?
                    <Text style={{color:'red',fontSize:FontSize.xp}}> *</Text>
                    :
                    <Text></Text>
                }  
            </Text>
           
            {
                props.dropDown == true ? 

                <Dropdown
                    style={[styles.dropdown ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}

                    itemTextStyle={{ color: Colors.grayThird, fontSize:FontSize.xp }} 

                    iconStyle={styles.iconStyle}
                    data={props.dropdowndata}
                    value={props.defaultValue}
                    search={false}
                    maxHeight={300}
                    mode="auto"
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocused && props.dropDownTitle ? props.dropDownTitle : '...'}
                    searchPlaceholder="Search..." 
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(text) => {
                        setValueDefault(text.value); 
                        props.onChangeText(text.value)
                    }}
                    dropdownPosition="top" // 0 for above, 1 for below, 'auto' for automatic
                    // renderLeftIcon={() => (
                    //   <AntDesign
                    //     style={styles.icon}
                    //     color={isFocus ? 'blue' : 'black'}
                    //     name="Safety"
                    //     size={20}
                    //   />
                    // )}
                /> 
                :
                <TextInput     
                    //ref={props.refFunction}
                    ref={inputRef}
                    placeholder={props.placeholder}
                    placeholderTextColor={Colors.lightGray}
                    // value={props.value}
                    defaultValue={props.defaultValue}
                    onChangeText={(text) => {props.onChangeText(text); setValueDefault(text); valueDefaultTemp = text}}
                    secureTextEntry={props.secureTextEntry ? true : false}  
                    style={[styles.textInput,{marginTop:4}, props.constant == true? {backgroundColor:'#fcfcfc'}: {}]} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    keyboardType={props.keyboard}
                    editable={props.constant == true? false: true}
                /> 
            } 
        </View> 
    )
}

const styles = StyleSheet.create({
    textInputContainer:{
        width:'100%',
        position:  "relative",
        flexDirection:"column" ,
        height:50,
        backgroundColor:Colors.white,  
        borderRadius:6,
        borderWidth:2, 
    },
    title:{
        position:'absolute',
        top:-13,
        left:12,
        backgroundColor:Colors.white,
        paddingHorizontal:6,
        zIndex:999,
        fontSize:FontSize.xp,
        color:Colors.blackShadeTwo,
        fontWeight:FontWeight.regular
    },  
    textInput:{ 
        zIndex:111,
        paddingHorizontal:16,  
        fontSize:FontSize.h6, 
        // fontWeight:FontWeight.medium
        color:Colors.black,
        fontWeight:FontWeight.regular , 
    },
    dropdown:{
        width:'100%',
        paddingHorizontal:16, 
        height:'100%',
        color:Colors.black,
        fontWeight:FontWeight.regular, 
    },  
    placeholderStyle:{
        color:Colors.lightGray,
        fontSize:FontSize.h6,  
    },
    selectedTextStyle:{
        zIndex:111,
        fontSize:FontSize.h6, 
        // fontWeight:FontWeight.medium
        color:Colors.black,
        fontWeight:FontWeight.regular  
    }
})

export default CTMTextInput