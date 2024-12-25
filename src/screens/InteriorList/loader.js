import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../utility/color';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const Loader = () => {
  return (
    <View style={{padding:12, flexDirection:'row', flexWrap:'wrap', justifyContent:"space-between", width:'100%', height:"100%", backgroundColor:"#fffv"}}>
        <View style={{width:'48%', height:'100%'}}>
            <View style={{width:'100%',height:220, backgroundColor:Colors.lighteshGray, marginBottom:12, borderRadius:12}}></View>
            <View style={{width:'100%',height:120, backgroundColor:Colors.lighteshGray, marginBottom:12, borderRadius:12}}></View>
            <View style={{width:'100%',height:190, backgroundColor:Colors.lighteshGray, marginBottom:12, borderRadius:12}}></View>
            <View style={{width:'100%',height:210, backgroundColor:Colors.lighteshGray, marginBottom:12, borderRadius:12}}></View> 
        </View> 
        <View style={{width:'48%', height:'100%'}}>
            <View style={{width:'100%',height:220, backgroundColor:Colors.lighteshGray, marginBottom:12, borderRadius:12}}></View>
            <View style={{width:'100%',height:320, backgroundColor:Colors.lighteshGray, marginBottom:12, borderRadius:12}}></View>
            <View style={{width:'100%',height:180, backgroundColor:Colors.lighteshGray, marginBottom:12, borderRadius:12}}></View>
        </View> 
    </View>
  )
}

export default Loader