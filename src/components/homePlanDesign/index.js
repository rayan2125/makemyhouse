import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity, Alert 
} from "react-native";
import Colors from "../../screens/utility/color";
import FontSize from "../../screens/utility/fonts";
import Images from "../../screens/utility/images";
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomePlanDesign = (props) => {
    const Data = props.data;

    const navigation = useNavigation();
    const onPressHandler = async (link,external)=>{
        AsyncStorage.removeItem('weblink');
        AsyncStorage.setItem('weblink',link); 
        if(external == true){
                // const supported = await Linking.canOpenURL(link);  
                // await Linking.openURL(link);
               
        }else{
            navigation.navigate('WebView');
        } 
    }

    return(
         (
            Data.map((item,index)=>{
                return(
                    <View key={index} style={[styles.container,index % 2 == 0?{paddingRigth:12}:{paddingLeft:12}]}>
                        <View style={[styles.innerBoxShadow,index % 2 == 0?{left:0}:{left:12},
                            index+1 == 1?{backgroundColor:Colors.SecondaryColor}:index+1 == 2?{backgroundColor:Colors.PrimaryColor}:index+1 == 3?{backgroundColor:Colors.PrimaryColor}:{backgroundColor:Colors.SecondaryColor}]}></View>
                        <TouchableOpacity activeOpacity={0.9} style={[styles.innerBox,
                            index+1 == 1?{backgroundColor:'#D4EDD7'}:index+1 == 2?{backgroundColor:'#D4D4D4'}:index+1 == 3?{backgroundColor:"#D4D4D4"}:{backgroundColor:'#D4EDD7'}    
                        ]} onPress={()=>onPressHandler(item.link, item.external)}>
                            <View style={[styles.smallBox,
                              index+1 == 1?{borderColor:Colors.SecondaryColor}:index+1 == 2?{borderColor:Colors.PrimaryColor}:index+1 == 3?{borderColor:Colors.PrimaryColor}:{borderColor:Colors.SecondaryColor}
                            ]}>
                                <AutoHeightImage
                                    width={32}
                                    maxHeight={32}
                                    resizeMode="contain"
                                    source={item.image}
                                /> 
                            </View> 
                            <Text style={{marginBottom:8,color:Colors.SecondaryColor,fontSize:FontSize.h6,fontWeight:'500'}}>{item.title}</Text>
                            {
                                item.data.map((item,index)=>{
                                    return(
                                        <View key={index} style={{flexDirection:'row',marginBottom:6}}>
                                            <AutoHeightImage
                                                width={8}
                                                maxHeight={8}
                                                resizeMode="contain"
                                                source={Images.RigthArrow}
                                                style={{marginTop:6}}
                                            /> 
                                            <Text style={{fontSize:FontSize.xp,marginLeft:4,color:Colors.SecondaryColor}}>{item}</Text>
                                        </View>
                                        
                                    )
                                })
                            }
                        </TouchableOpacity> 
                    </View> 
                )
            })
         )
    )
}

const styles = new StyleSheet.create({
    container:{
        width:windowWidth / 2 - 10 ,
        height:315,       
        marginBottom:6,
        padding:0,       
        position:'relative', 
        marginTop:12,   
    },
    innerBoxShadow:{
        backgroundColor:'green',
        width:'100%',
        height:'100%',
        position:'absolute',
        top:-3,
        borderTopLeftRadius:12,
        borderTopRightRadius:31, 
    },  
    innerBox:{
        // backgroundColor:"#D4EDD7",
        backgroundColor:"#ffffff",
        width:'100%',
        height:'100%',
        borderTopLeftRadius:12,
        borderTopRightRadius:32,
        padding:12,
        paddingVertical:22,
        elevation:6
    },
    smallBox:{
        marginBottom:10,width:50,
        height:50,justifyContent:'center',
        alignContent:'center',alignItems:'center',
        backgroundColor:'#ffffff',
        borderRadius:6,
        borderWidth:2
    }
})

export default HomePlanDesign;
 