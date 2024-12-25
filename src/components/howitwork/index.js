import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../screens/utility/color";
import FontSize from "../../screens/utility/fonts";
import Images from "../../screens/utility/images";
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const HowItWorks = (props) => {
    const Data = props.data; 
    const [activeIndex,setActiveIndex] = useState(1);
    return(
        <View style={styles.container}> 
            <View style={styles.dotsContainer}>
                <TouchableOpacity key={11} style={[styles.dotsBox,activeIndex == 1 ?{backgroundColor:'#4CB050'}:{backgroundColor:'#B6E7B8'}]} onPress={()=>{setActiveIndex(1);  }} ></TouchableOpacity>
                <TouchableOpacity key={12} style={[styles.dotsBox,activeIndex == 2 ?{backgroundColor:'#4CB050'}:{backgroundColor:'#B6E7B8'}]} onPress={()=>{setActiveIndex(2);  }}></TouchableOpacity>
                <TouchableOpacity key={13} style={[styles.dotsBox,activeIndex == 3 ?{backgroundColor:'#4CB050'}:{backgroundColor:'#B6E7B8'}]} onPress={()=>{setActiveIndex(3);  }}></TouchableOpacity> 
                {/* <View style={[styles.dotsBox,{backgroundColor:'#B6E7B8'}]}></View>
                <View style={[styles.dotsBox,{backgroundColor:'#B6E7B8'}]}></View> */}
            </View> 

            {
                Data.map((item,index)=>{
                    return(  
                            <View key={index} style={[{width:'100%',minHeight:250}, activeIndex == index+1?{ display:'flex'}:{ display:'none'}]}>
                                <View style={[styles.upperSection,{borderRadius:12,height:140}]}> 
                                        <Image source={item.coverImage} style={{width:'100%',height:'100%',
                                    borderTopLeftRadius:22,borderTopRightRadius:22}}/>
                                </View>
                                <View style={styles.LowwerSection}>
                                        <Text style={{fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:500,color:Colors.black,marginBottom:12}}>{item.mainTitle}</Text>
                                        {
                                            item.data.map((item,index)=>{
                                                return(
                                                    <View key={index} style={{marginBottom:12}}>
                                                        <View style={{marginBottom:4,flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                                            <AutoHeightImage
                                                                width={18}
                                                                maxHeight={18}
                                                                resizeMode="contain"
                                                                source={Images.Hcheck}
                                                            /> 
                                                            <Text style={{marginLeft:4,fontSize:FontSize.h6,color:Colors.SecondaryColor,fontWeight:'500'}}>{item.title}</Text>
                                                        </View>
                                                        <Text style={{fontSize:FontSize.p,color:Colors.black}}>{item.subData}</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                </View>
                            </View>
                        
                    )
                })
            } 
        </View>
    ) 
}

const styles= new StyleSheet.create({
    container:{
        width:'100%',
        minHeight:350,       
        marginBottom:6,
        padding:0,       
        position:'relative',  
    },
    dotsContainer:{
        width:'100%',
        height:16,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:12
    },
    dotsBox:{
        width:'32%',
        height:'100%', 
        borderRadius:3
    },
    LowwerSection:{
        padding:12,
        borderBottomLeftRadius:22,
        borderBottomRightRadius:22,
        backgroundColor:'#fff',
        elevation:6, 
        minHeight:200
    }
});

export default HowItWorks;