import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {FontWeight} from '../../screens/utility/fonts';
import Colors from '../../screens/utility/color';
import { RFValue } from 'react-native-responsive-fontsize';
const DesignCard = (props) => {
  return (
    <View style={styles.container}>
        {/* <View style={styles.innerBox}>
            <Text style={styles.innerBoxText}>Current Service</Text>
            <View style={{height:30, backgroundColor:'transparent'}}>
        
                <View style={styles.innerBoxBox}>
                    <Text style={[styles.innerBoxBoxText,{textAlign:'center'}]}>{props.data.currentService!=''?props.data.currentService:"No Active Service"}</Text>
                </View>
            </View>
        </View>
        <View style={[styles.innerBox,{borderLeftWidth:1,borderRightWidth:1,borderColor:"#eee"}]}>
            <Text style={styles.innerBoxText}>Design Stage</Text>
            <TouchableOpacity style={[styles.innerBoxBox,{backgroundColor:Colors.PrimaryColor,borderWidth:0,borderRadius:6}]}>
                <Text style={[styles.innerBoxBoxText,{color:'#fff', textAlign:'center', textTransform:'capitalize'}]}>{props.data.currentStage}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.innerBox}>
            <Text style={styles.innerBoxText}>Due Date</Text>
            <View style={styles.innerBoxBox}>
                <Text style={[styles.innerBoxBoxText,{textAlign:'center'}]}>{props.data.dueDate}</Text>
            </View>
        </View> */}
        <View style={{flexDirection:'row',}}> 
                <View style={{width:'33%', minHeight:40, backgroundColor:'transparent', flexDirection:'column', justifyContent:'center', padding:4}}>
                        <View style={{width:'100%', minHeight:30,backgroundColor:'transparent', justifyContent:'flex-end', alignContent:'center', alignItems:'center'}}>
                            <Text style={styles.innerBoxText}>Current Service</Text>
                        </View> 
                </View>
                <View style={{width:'33%', minHeight:40,  backgroundColor:'transparent',flexDirection:'column', justifyContent:'center',  padding:4, borderLeftWidth:1,borderRightWidth:1,borderColor:"#eee"}}>
                        <View style={{width:'100%', minHeight:30,backgroundColor:'transparent', justifyContent:'flex-end', alignContent:'center', alignItems:'center'}}>
                            <Text style={styles.innerBoxText}>Design Stage</Text>
                        </View> 
                </View>
                <View style={{width:'33%', minHeight:40, backgroundColor:'transparent', flexDirection:'column', justifyContent:'center', padding:4}}>
                        <View style={{width:'100%', minHeight:30,backgroundColor:'transparent', justifyContent:'flex-end', alignContent:'center', alignItems:'center'}}>
                            <Text style={styles.innerBoxText}>Due Date</Text>
                        </View> 
                </View>
        </View>

        <View style={{flexDirection:'row'}}>
                <View style={{width:'33%', height:40, backgroundColor:'transparent', flexDirection:'column', justifyContent:'flex-start', padding:6,paddingBottom:8}}>
                        <View style={{width:'100%', minHeight:30,backgroundColor:'transparent', justifyContent:'flex-end', alignContent:'center', alignItems:'center'}}>
                            <View style={styles.innerBoxBox}>
                                <Text style={[styles.innerBoxBoxText,{textAlign:'center'}]}>{props.data.currentService!=''?props.data.currentService:"No Active Service"}</Text>
                            </View> 
                        </View> 
                </View>
                <View style={{width:'33%', height:40,  backgroundColor:'transparent',flexDirection:'column', justifyContent:'flex-start',  padding:6, paddingBottom:8,borderLeftWidth:1,borderRightWidth:1,borderColor:"#eee"}}>
                        <View style={{width:'100%', minHeight:30,backgroundColor:'transparent', justifyContent:'flex-end', alignContent:'center', alignItems:'center'}}>
                            <TouchableOpacity style={[styles.innerBoxBox,{backgroundColor:Colors.PrimaryColor,borderWidth:0,borderRadius:6}]}>
                                <Text style={[styles.innerBoxBoxText,{color:'#fff', textAlign:'center', textTransform:'capitalize'}]}>{props.data.currentStage}</Text>
                            </TouchableOpacity>
                        </View> 
                </View>
                <View style={{width:'33%', height:40, backgroundColor:'transparent', flexDirection:'column', justifyContent:'flex-start', padding:6, paddingBottom:8}}>
                     <View style={{width:'100%', minHeight:30,backgroundColor:'transparent', justifyContent:'flex-end', alignContent:'center', alignItems:'center'}}>
                            <View style={styles.innerBoxBox}>
                                <Text style={[styles.innerBoxBoxText,{textAlign:'center'}]}>{props.data.dueDate}</Text>
                            </View> 
                        </View> 
                </View>
        </View>

        
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        with:'100%',
        minHeight:86,
        backgroundColor:"#ffffff", 
        elevation:3,
        borderRadius:9,
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        marginVertical:8, 
        overflow:'hidden',
    },
    innerBox:{
        width:'33%',
        height:'100%', 
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        alignContent:'center',
        padding:0, 
    },
    innerBoxText:{
        fontSize:RFValue(11),
        fontWeight:FontWeight.medium,
        color:Colors.black,
        marginBottom:6,
        textAlign:'center'
    },
    innerBoxBox:{
        width:'100%', 
        minHeight:35,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius:14,
        borderWidth:1,
        borderColor:Colors.lightGray,
        paddingHorizontal:6,
        paddingVertical:4
    },
    innerBoxBoxText:{
        fontSize:RFValue(9),
        fontWeight:FontWeight.medium,
        color:Colors.black,
        textTransform:'capitalize'
    }
})
export default DesignCard