import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React,{memo} from 'react'
import Colors from '../../screens/utility/color';


import styles from './style';

 //AutoHeightImage component


const LoadingPackageCard = ()=>{
    return (
        <TouchableOpacity  style={styles.container}>
            <View style={[styles.box,styles.upperBox,{backgroundColor:Colors.lighteshGray}]}> 
                
            </View>
            <View style={[styles.box,styles.lowwerBox,{flexDirection:'Column'}]}> 
                <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray, marginBottom:6}}> 
                </View>
                <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray}}> 
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LoadingPackageCard