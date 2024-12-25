import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../utility/color'

const LoadingAddons = () => {
  return (
    <View style={[styles.container]}>
        <View style={styles.upperbox}></View>
       <View style={styles.innerBox}>
            <View style={styles.Headerbox}>
                <View style={styles.HeaderText}></View>
            </View>
            <View style={styles.content}>
                    <View style={styles.boxLine}></View>
                    <View style={styles.boxLine}></View>
                    <View style={styles.boxLine}></View> 
                    <View style={styles.boxLine}></View> 
            </View>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        width:'100%',
        minHeight:120,
        backgroundColor:'#fff',
        position:'relative',
        marginTop:16

    },
    upperbox:{
        width:'100%',
        height:202,
        backgroundColor:Colors.SecondaryColor,  
        position:'absolute',
        top:-2,
        borderRadius:12,
        borderTopRightRadius:0,
        borderWidth:2 
    },
    innerBox:{
        width:'100%',
        minHeight:200,
        backgroundColor:Colors.lighteshGray,
        zIndex:999,
        borderRadius:9,
        borderTopRightRadius:0
    },
    Headerbox:{
        width:'100%',
        height:40,
        backgroundColor:'#EDF4F9', 
        borderTopLeftRadius:12, 
        padding:8
    },
    HeaderText:{
        width:'100%',
        height:20,
        backgroundColor:Colors.lightGray,
        borderRadius:6
    },
    content:{
        width:'100%', 
        padding:8,
        marginTop:8
    },
    boxLine:{
        width:'100%',
        height:30,
        backgroundColor:Colors.lightGray,
        marginBottom:8,
        borderRadius:6
    }
})

export default LoadingAddons;


