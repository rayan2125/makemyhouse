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
import FontSize,{FontWeight} from "../../screens/utility/fonts";
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import Images from "../../screens/utility/images";


// Start: icons 
import StarDark  from '../../../assets/images/icons/starDark.svg';

import ArrowRightDark from '../../../assets/images/icons/arrowRightDark.svg';
import ArrowLeftDark from '../../../assets/images/icons/arrowLeftDark.svg';


// end: icons
import { RFValue } from 'react-native-responsive-fontsize';
import Swiper from "react-native-swiper";
 

const Testimonial = (props) => {
    const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true); // true for animated
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1, true); // true for animated
    }
  };
    return (
        <>
        <Swiper style={{ marginBottom:0, pointerEvents: "box-none"}} 
            loop={false}
            useNativeDriver={false}
            animated={true}  showsPagination={false} pagingEnabled={true}
            bounces={true} removeClippedSubviews={true}  
            ref={swiperRef}
            // onIndexChanged={(index) => setActiveIndex(index)}
            // dot={<View style={{backgroundColor:Colors.lightGray, width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 22, marginBottom: 3,}} />}
            // activeDot={<View style={{backgroundColor:Colors.PrimaryColor, width: 12, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 22, marginBottom: 3,}} />}
            >   
                {
                    props.data.map((item,index)=>{
                        return(
                            <View style={{paddingHorizontal:12}}>
                            <TouchableOpacity activeOpacity={0.9} key={index} style={[styles.container,{backgroundColor:'#EBEBEB'}]}>
                                <AutoHeightImage
                                    width={42}
                                    maxHeight={42}
                                    resizeMode="contain"
                                    source={Images.testimonialUserIcon}
                                    style={{marginBottom:6}}
                                /> 
                                <Text style={[styles.name,{color:Colors.SecondaryColor}]}>{item.name}</Text>
                                <View style={{paddingHorizontal:12}}>
                                    <Text style={[styles.comment,{color:Colors.SecondaryColor}]}>{item.comment}</Text>
                                </View> 
                                <View style={[styles.StarContainer]}>
                                    {
                                        (Array.from({ length: 5 }, (_, index) => ( 
                                            index< item.stars?  
                                            <StarDark key={index} width={RFValue(10)} height={RFValue(10)} />
                                            : 
                                            <StarDark key={index} width={RFValue(10)} height={RFValue(10)} />
                                        ))) 
                                    } 
                                </View>
                            </TouchableOpacity>
                            </View>
                        )
                    })
                }
        </Swiper>
        
            <TouchableOpacity style={[styles.navButton, styles.leftNavButton, styles.swiperbuttons,{left:12}]} onPress={goPrev}>
                <ArrowLeftDark width={RFValue(12)} height={RFValue(12)}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navButton, styles.rightNavButton, styles.swiperbuttons,{right:12}]} onPress={goNext}>
                <ArrowRightDark width={RFValue(12)} height={RFValue(12)}/>  
            </TouchableOpacity>

        </>
    )
}


const styles = new StyleSheet.create({  
    container:{
      width:'100%',
      height:190,
      marginRight:12, 
      position:'relative', 
      flexDirection:'column',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      paddingVertical:22,
      borderRadius:12, 
      padding:8
    },
    name:{
      fontSize:FontSize.h6, 
      marginBottom:6
    },
    comment:{
      fontSize:FontSize.xxxp,
      fontWeight:FontWeight.regular,
      textAlign:'center'
    },
    StarContainer:{
      width:'100%',
      height:30,
      marginTop:6, 
      flexDirection:'row',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center'
    },
    swiperbuttons:{  
        position:'absolute',
        top:220/2
    },
    leftNavButton: {
        left: 2, 
        height:20,
        width:20
    },
    rightNavButton: {
        right: 2,
        height:20,
        width:20
    }, 

  });

export default Testimonial