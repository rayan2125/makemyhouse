import React, { useEffect, useRef, useState, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../screens/utility/color';
import FontSize from '../../screens/utility/fonts';



const ButtonNotActive = (props)=>{  
    
    return (
        <View style={[styles.container,props.marginBottom==true?{marginBottom:16}:{},props.theme == 'default'?{
            backgroundColor:Colors.lightGray}:{
                backgroundColor:Colors.gray}]}>

            <TouchableOpacity activeOpacity={0.91} style={styles.TouchableOpacity} onPress={props.onPress}>
                <Text style={{fontSize:FontSize.medium, fontSize:FontSize.p,color:Colors.white}}>{props.btnText}</Text>
            </TouchableOpacity> 

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
      //   height:actuatedNormalizeVertical(24), 
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      borderRadius:8,
    }, 
    TouchableOpacity:{
        width:'100%',
        padding:12, 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center', 
        borderRadius:12
    } 
});

export default memo(ButtonNotActive);

