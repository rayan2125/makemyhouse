import { View, Dimensions } from 'react-native'
import React, { memo } from 'react' 
 
import Colors from '../utility/color';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
 
const LoaingComponent = () => {
  return (
        <View style={{width:windowWidth,height:windowHeight,backgroundColor:'#fff',flexDirection:'flex-start',justifyContent:'flex-start',padding:12}}>  
            <View style={{width:'100%',height:'25%',backgroundColor:Colors.lightGray,marginBottom:22,borderRadius:6}}> 
            </View>
            <View style={{width:'100%',height:25,backgroundColor:Colors.lightGray,marginBottom:20,borderRadius:6}}></View>
            <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray,marginBottom:10,borderRadius:6}}></View> 
            <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray,marginBottom:10,borderRadius:6}}></View> 
            <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray,marginBottom:20,borderRadius:6}}></View>
            <View style={{width:'50%',height:20,backgroundColor:Colors.lightGray,marginBottom:10,borderRadius:6}}></View>
            <View style={{width:'100%',height:180,flexDirection:'row', justifyContent:'space-between',marginBottom:30}}>   
                <View style={{width:'48%',height:'100%',backgroundColor:Colors.lightGray,borderRadius:6}}></View>
                <View style={{width:'48%',height:'100%',backgroundColor:Colors.lightGray,borderRadius:6}}></View>
            </View>
            <View style={{width:'100%',height:180,flexDirection:'row', justifyContent:'space-between',marginBottom:30}}>   
                <View style={{width:'48%',height:'100%',backgroundColor:Colors.lightGray,borderRadius:6}}></View>
                <View style={{width:'48%',height:'100%',backgroundColor:Colors.lightGray,borderRadius:6}}></View>
            </View>
        </View>
  )
}

export default LoaingComponent