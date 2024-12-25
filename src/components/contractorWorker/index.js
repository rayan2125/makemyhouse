import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
//   Linking
} from "react-native";
import Colors from "../../screens/utility/color";
import FontSize from "../../screens/utility/fonts";


import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { useNavigation,useNavigationState  } from '@react-navigation/native';
const ContractorWorker = (props) => {
    const navigation = useNavigation();
    const Data = props.data;

    useEffect(()=>{
        AsyncStorage.removeItem('weblink');
    },[]);

    const openLink = async (externalLink,link)=>{
        try{
            if(externalLink == false){
                AsyncStorage.setItem('weblink', link); 
                return navigation.navigate('WebView');
                // return console.log("open the link in in-app webview")  
            }  
    
            // if(link != '' && externalLink == true ){
            //     const supported = await Linking.canOpenURL(link); 
            //     await Linking.openURL(link); 
            // }  
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        (
            Data.map((item,index)=>{
                return(
                    <View key={index} style={[styles.container,index % 2 == 0?{paddingRigth:12}:{paddingLeft:12}]}>
                        <View style={[styles.innerContainerShadhow,index % 2 == 0?{left:-3}:{left:9},]}></View>
                        <TouchableOpacity activeOpacity={0.9} style={styles.innerContainer} onPress={()=>openLink(item.externalLink, item.link)}>
                            <View style={styles.leftBox}>
                                        <AutoHeightImage
                                            width={29}
                                            maxHeight={29}
                                            resizeMode="contain"
                                            source={item.image}
                                        />  
                            </View>
                            <View style={styles.rightBox}>
                                    <Text style={{color:Colors.black,fontSize:FontSize.xp,fontWeight:'500'}}>{item.title}</Text>
                            </View>
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
        height:66,       
        marginBottom:6,
        padding:0,       
        position:'relative', 
        marginTop:10,    
    }, 
    innerContainerShadhow:{
        position:'absolute', 
        top:0,
        width:'100%',
        height:'100%',
        backgroundColor:Colors.PrimaryColor, 
        borderTopLeftRadius:9,
        borderBottomLeftRadius:9,
        backgroundColor:Colors.PrimaryColor
    },  
    innerContainer:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'center',
        padding:0,
        borderTopLeftRadius:9,
        borderBottomLeftRadius:9,
        elevation:6,
        
    },
    leftBox:{
        width:'25%',
        height:'100%', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    rightBox:{
        width:'75%',
        height:'100%',
        justifyContent:'center',
        alignContent:'flex-start',
        alignItems:'flex-start',
        padding:4
    }
})

export default ContractorWorker;
 