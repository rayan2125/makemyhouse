import { View } from 'react-native'
import React,{ memo } from 'react'
import Colors from '../../screens/utility/color';

import styles from './styles';

const LoadingCard = () => {
  return (
    <View style={[styles.Container,{marginBottom:10}]}> 
        <View style={styles.InnerBox}>
            <View style={[styles.innerUpper,{backgroundColor:Colors.lightGray}]}>
                <View style={{width:'25%',height:'50%',backgroundColor:Colors.lighteshGray,borderRadius:9}}></View>
                <View style={{width:20,height:20,backgroundColor:Colors.lighteshGray,borderRadius:22}}></View>
            </View>
            <View style={[styles.innerLowwer,{backgroundColor:Colors.lighteshGray}]}>
                <View style={{width:'100%',height:15,backgroundColor:Colors.lightGray,marginBottom:6}}></View>
                <View style={{width:'100%',height:15,backgroundColor:Colors.lightGray,marginBottom:6}}></View>
                <View style={{width:'100%',height:15,backgroundColor:Colors.lightGray,marginBottom:6}}></View>
            </View>
        </View>
    </View>
  )
}
export default LoadingCard