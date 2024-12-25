import { VirtualizedList, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React,{useEffect, useState, memo, useCallback } from 'react'
import Colors from '../../screens/utility/color';
import FontSize from '../../screens/utility/fonts';

 
import { useNavigation} from '@react-navigation/native';

import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SelectSiteComponent = (props) => {
    const  navigation = useNavigation();  
    // data
    const Data = props.data;

    // state 
    const [selectedSite,setSelectedSite] = useState('');

    const onHandlerState = (state)=>{
        setSelectedSite(state.id)
        props.onPress(state.id);
        console.log("selecte site name: ",state.siteName);
        AsyncStorage.setItem("siteName",state.siteName);
    }

    // start: virtualization
    const getItemCount = (data,index) => data.length;
    const getItem  = (data,index)=>{ 
        return data[index];
    }

    useEffect(()=>{
        defaultSiteSelecter();
    },[]);

    const defaultSiteSelecter = ()=>{
        AsyncStorage.getItem('SelectedSite',(error,creds)=>{
            console.log("default site selected", creds);
            setSelectedSite(`${creds}`); 
        }); 
    }

    const renderItem = useCallback(({item,index}) => (
        <TouchableOpacity activeOpacity={0.9} key={index} style={[styles.Container,index == 0?{marginTop:22}:null]} onPress={()=>onHandlerState(item)}> 
            <View style={styles.InnerBoxShadow}></View>
            <View style={styles.InnerBox}>
                <View style={styles.innerUpper}>
                    <Text style={[styles.innerUpperText,{fontWeight:'500'}]}>{item.siteName}</Text>
                    {
                        item.id != selectedSite?
                        <View style={styles.radiusButton}></View>    
                        :
                        <View style={[styles.radiusButtonActive]}>
                            <View style={[styles.radiusButtonActiveInner]}></View>
                        </View>
                    } 
                </View>
                <View style={styles.innerLowwer}>
                    <Text style={{color:Colors.black,fontSize:FontSize.p}}>{item.content}</Text>
                </View>
            </View>
        </TouchableOpacity>
    ))
    // end: virtualization

    return(
        <VirtualizedList
            windowSize={4}
            data={Data}
            initialNumToRender={4}
            keyExtractor={(item,index) => index}
            getItemCount={getItemCount}
            renderItem={renderItem}
            getItem={getItem}  
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    )
}
// const styles = new StyleSheet.create({
//     Container:{
//         width:'100%', 
//         position:'relative',
//         marginTop:10,
//         marginBottom:12,  
//     },
//     InnerBoxShadow:{
//         width:'100%',
//         height:110,
//         backgroundColor:Colors.SecondaryColor, 
//         borderTopLeftRadius:3,
//         borderTopRightRadius:3,
//         borderBottomLeftRadius:3,
//         borderBottomRightRadius:3,
//         position:'absolute',
//         top:-2, 
//     },
//     InnerBox:{
//         width:'100%',
//         height:130,
//         backgroundColor:'#ffffff',
//         borderRadius:3, 
//         elevation:2, 
//     },
//     innerUpper:{
//         width:'100%',
//         height:45,
//         backgroundColor:Colors.PrimaryColorLight,
//         borderTopLeftRadius:3,
//         borderTopRightRadius:3,
//         paddingHorizontal:12,
//         flexDirection:'row',
//         justifyContent:'space-between',
//         alignContent:'center',
//         alignItems:'center'
//     }, 
//     innerLowwer:{
//         width:'100%',
//         height:85, 
//         paddingHorizontal:12,
//         paddingTop:10,
//         backgroundColor:'#ffffff'
//     },
//     radiusButton:{
//         width:22,
//         height:22,
//         backgroundColor:Colors.graySnd, 
//         borderWidth:2,
//         borderColor:Colors.graySnd,
//         borderRadius:32
//     },
//     radiusButtonActive:{
//         width:22,
//         height:22,
//         backgroundColor:'transparent',
//         borderWidth:2, 
//         borderColor:Colors.SecondaryColor,
//         borderRadius:32,
//         justifyContent:'center',
//         alignContent:'center',
//         alignItems:'center'
//     },
//     radiusButtonActiveInner:{
//         width:12,
//         height:12,
//         backgroundColor:Colors.SecondaryColor, 
//         borderRadius:12
//     },
//     innerUpperText:{
//         color:Colors.SecondaryColor,
//         fontSize:FontSize.h3-2,
//     }
// })
export default SelectSiteComponent