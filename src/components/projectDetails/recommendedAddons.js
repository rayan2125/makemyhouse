import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React,{memo, useState, useRef, useCallback} from 'react';
 
const { width, height} = Dimensions.get("window");


import CTMButton from '../../components/button';
import Colors from '../../utility/color';


import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize, { FontWeight } from '../../utility/fonts';

// Start: icons
import PendingOrder from '../../../assets/images/icons/pendingOrder.svg'; 
import {actuatedNormalize} from '../../utility/scaling';
 
import Swiper,{SwiperSlide } from 'react-native-swiper';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import RupeeLight from '../../../assets/images/icons/rupeeWhite.svg';
import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg';
import RupeeColor from '../../../assets/images/icons/rupeeColor.svg';

import CircleWithPlusSign from '../../../assets/images/icons/circleWithPlusSign.svg';

// pendingPayment
import PendingPayment from '../../../assets/images/icons/pendingPayment.svg';
import { RFValue } from 'react-native-responsive-fontsize';


// End: Icons
const RecommendedAddons = (props) => { 

  return (
     <View style={{flexDirection:'row',flexWrap:'wrap',}}> 
        {
          props.data.map((item,index)=>{
              return(
                      <TouchableOpacity key={item.id} activeOpacity={0.41}  style={styles.containerBox} onPress={()=>{props.onPress(item.id)}}>
                            <View style={[styles.box,styles.upperBox,{backgroundColor:item.type=='BNDL'?'#D3EDD7':'#D4D4D4'}]}> 
                                <View style={{width:50,height:50, backgroundColor:'#ffffff', borderRadius:50,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                        <AutoHeightImage
                                              width={32}
                                              maxHeight={32}
                                              resizeMode="contain"
                                              source={{uri:item.featured_image}}
                                          /> 
                                </View>
                            </View>
                            <View style={[styles.box,styles.lowwerBox]}>
                                <Text style={{textAlign:'center',color:Colors.black,fontSize:FontSize.xp,fontWeight:FontWeight.regular, margin:10}}>{item.name}</Text>
                                <CircleWithPlusSign width={RFValue(32)} height={RFValue(32)}/>
                            </View> 
                        </TouchableOpacity>
              )
          })
        } 
     </View>
  );
}

const styles = new StyleSheet.create({
  containerBox:{
      width:width / 3 - 16,
      height:210,
      backgroundColor:'#ffffff',
      margin:4,
      marginHorizontal:5, 
      marginTop:0,
      marginBottom:14,
      flexDirection:'column', 
      borderTopLeftRadius:12,
      shadowColor: 'rgba(0,0,0,1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 1,
      elevation: 3,
  },
  box:{ 
      flexDirection:'column',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      padding:10, 
  },
  upperBox:{
      height:90,
      borderTopLeftRadius:12,
      borderBottomRightRadius:12,
      position:'relative'
  },  
  lowwerBox:{
      height:110,
      backgroundColor:'#ffffff',
  },
  tag:{
      position:'absolute', top:10, left:0,
      backgroundColor:Colors.PrimaryColor, zIndex:999,
      borderTopRightRadius:4,borderBottomRightRadius:4,
      flexDirection:'row', justifyContent:'flex-start'
  },
  tagText:{
      fontSize:12,
      textAlign:'left',
      paddingVertical:2,
      paddingLeft:4,
      paddingRight:6,
      fontWeight:'500'
  }

})

export default RecommendedAddons;