import { View, TouchableOpacity, Dimensions, Text } from 'react-native'
import React from 'react'

const {width, height} = Dimensions.get('window');  
import Colors from '../../utility/color'
import FontSize, { FontWeight } from '../../utility/fonts'

import styles from './styles';

const CouponCard = (props,{item}) => {

  return (
    <View key={index} style={[styles.Container,{marginTop:12}]}  > 
        <View style={styles.InnerBoxShadow}></View>
        <View activeOpacity={0.9} style={[styles.InnerBox,{padding:16,paddingTop:8}]}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center',marginBottom:0}}>
                    <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5,fontWeight:'500'}}>{item.code}</Text> 
                    {
                        props.couponCode == item.code ? 
                        <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor,paddingHorizontal:15,paddingVertical:8,borderRadius:6}} onPress={props.onPress()}>
                            <Text style={{color:Colors.white}}>Apply</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor,paddingHorizontal:15,paddingVertical:8,borderRadius:6}} onPress={props.onPress()}>
                            <Text style={{color:Colors.white}}>Applied</Text>
                        </TouchableOpacity>
                    }
            </View>
            <Text style={{color:Colors.gray,fontSize:FontSize.xp}}>{item.description}</Text>
        </View>
    </View>
  )
}

export default CouponCard