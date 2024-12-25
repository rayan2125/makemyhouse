import React, { useState, useEffect, memo, useRef } from 'react';   
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;  // Adjust the item width to show 3 items per screen

import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';

import { RFValue } from 'react-native-responsive-fontsize';  
import FastImage from 'react-native-fast-image';

import SvgUri from 'react-native-svg-uri'; // Import SvgUri

const Addons = (props) => {
    
    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / ITEM_WIDTH);
        setCurrentIndex(newIndex);
    };  

    console.log("addons data: ", props.data);
    // render item: start
    const renderItem = ({ item,index }) => (
        <View style={styles.itemBox} key={item.id}>
            <View style={styles.itemBoxShadow}></View>
            <View style={[styles.itemBoxContent]}>
                <View style={{height:'40%', width:'60%', backgroundColor:'transparent', marginTop:10, justifyContent:'center', overflow:'hidden' }}> 
                    {/* {
                        (item.icon != null) && (item.icon != ' ') && (item.icon != undefined)  ? 
                            <SvgUri
                                width={RFValue(26)}
                                maxHeight={RFValue(26)}
                                source={{ uri:item.icon}} // Set the source to the SVG URL
                            />
                        :
                        (item.feature_image != '') && (item.feature_image != null) && (item.feature_image != undefined)  ?  
                            <FastImage  
                                resizeMode={FastImage.resizeMode.contain} 
                                // width={120}
                                // height={120}
                                style={{height:'100%', }}
                                source={{ uri: item.feature_image }} 
                            /> 
                        : 
                        <FastImage  
                            resizeMode={FastImage.resizeMode.contain} 
                            // width={120}
                            // height={120}
                            style={{height:'100%', }}
                            source={{ uri: 'https://www.makemyhouse.com/assets/themelibv2assets/app_assets/images/new/1750sqft.webp?version=203' }} 
                        /> 
                    } */}
                    {
                        (item.feature_image != '') && (item.feature_image != null) && (item.feature_image != undefined)  ?  
                        <FastImage  
                            resizeMode={FastImage.resizeMode.contain} 
                            // width={120}
                            // height={120}
                            style={{height:'100%', }}
                            source={{ uri: item.feature_image }} 
                        /> 
                        :
                        (item.icon != null) && (item.icon != ' ') && (item.icon != undefined)  ? 
                            <SvgUri
                                width={RFValue(26)}
                                maxHeight={RFValue(26)}
                                source={{ uri:item.icon}} // Set the source to the SVG URL
                            />
                        :
                        <FastImage  
                            resizeMode={FastImage.resizeMode.contain} 
                            // width={120}
                            // height={120}
                            style={{height:'100%', }}
                            source={{ uri: 'https://www.makemyhouse.com/assets/themelibv2assets/app_assets/images/new/1750sqft.webp?version=203' }} 
                        /> 
                    }
                </View>
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={styles.descText}>{item.description}</Text>
            </View>
        </View>
    )
    // render item: end

    return (
        <View style={styles.container}> 
         
            <FlatList
                ref={flatListRef}
                data={props.data}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={false}  // Disable paging as we need custom scroll handling
                snapToInterval={ITEM_WIDTH}  // Snap to each item
                decelerationRate="normal"  // Control the speed of deceleration
                // onScroll={handleScroll}
                keyExtractor={(item, index) => index.toString()} 
            />
         
      </View>
    )
}

const styles = StyleSheet.create({
    container: { 
      width:'100%',
      minHeight:200,
      paddingLeft:6,
      marginTop:16 
    },  
    itemBox:{
        width:150, height:200,
        // backgroundColor:'#8E8E8E33',
        marginRight:12,
        // borderRadius:9,
        // overflow:'hidden', 
        position:'relative'
    },
    itemBoxShadow:{
        position:'absolute',
        top:-0,
        left:0,
        height:22,
        width:'100%',
        backgroundColor:Colors.SecondaryColor, 
        borderRadius:12,
    },
    itemBoxContent:{
        height:'100%',
        width:"100%",
        backgroundColor:'#eee',
        borderRadius:12,
        zIndex:999,
        marginTop:2, 
        padding:10,
        // flexDirection:'column',
        // justifyContent:'center',
        // alignContent:'center',
        // alignItems:'flex-start'
    },
    titleText:{
        color:'#000000',
        fontSize:FontSize.xp,
        fontWeight:FontWeight.regular,  
        // marginBottom:5,
        fontFamily: 'Inter-SemiBold',
    },
    descText:{ 
        color:'#000000',
        fontSize:FontSize.xxp,
        fontWeight:'300', 
        fontFamily: 'Inter-Regular',
    }
  });
export default Addons;