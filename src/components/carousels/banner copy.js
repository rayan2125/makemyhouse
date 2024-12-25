import React, { useEffect, useCallback, memo, useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  // Linking
} from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

import Colors from "../../utility/color";
import Images from "../../screens/utility/images";



import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize from "../../screens/utility/fonts";

import FastImage from "react-native-fast-image";

import Util from "../../utility/utility";

const Banner = (props) => { 

  const openUrl = async (link)=>{
    // const supported = await Linking.canOpenURL(link);  
    // await Linking.openURL(link);
  }
  // Start: Slide
  const Slide = function Slide({ data }) {   
    return (  
      
      (
        props.type == 'semi'?
          <TouchableOpacity key={data.id} activeOpacity={0.91} style={[styles.slide,{backgroundColor:'black', padding:10},data.id == 1?{marginLeft:0,marginRight:0}:{marginLeft:0,marginRight:0}, data.id == data.length?{}:{}]} onPress={()=>openUrl(data.link)}> 
                <View style={{width:'86%', height:'100%',borderRadius:9, overflow:'hidden'}}>
                <Image 
                  // source={data.image} 
                  // source={{ uri: data.image, cache: true }}
                  resizeMode="contain"
                  source={{ uri: data.image }}
                  // style={styles.slideImage}
                  style={{width:'100%', height:'100%',borderRadius:9, overflow:'hidden'}} 
                />
                </View>
                {/* <Image 
                  // source={data.image} 
                  // source={{ uri: data.image, cache: true }}
                  resizeMode="contain"
                  source={{ uri: data.image }}
                  // style={styles.slideImage}
                  style={{width:'100%', height:'100%'}} 
                />   */}

                {/* <AutoHeightImage  
                    resizeMode="contain"
                    width={windowWidth-18}
                    height={120}
                    source={{ uri: data.image }} 
                /> */}
               
          </TouchableOpacity>
        :
        (
          props.type == 'full'?
            <TouchableOpacity key={data.id} activeOpacity={0.91} style={[styles.slideFull,{position:'relative'}]}>  
              <FastImage  resizeMode={FastImage.resizeMode.contain}   source={data.image} style={[styles.slideImageFull]} />  
              <View style={{width:'100%',backgroundColor:'rgba(0,0,0,0.5)',position:'absolute',bottom:28,padding:5,paddingHorizontal:12}}>
                <Text style={{fontSize:FontSize.h6,fontWeight:'600',color:'#fff'}}>{data.title}</Text>
              </View> 
          </TouchableOpacity>
          :null
        )        
        
      ) 
    );
  };
  // end: Slide

  // start: pagination 
  function Pagination({ index }) {
    return (
      <View  style={[styles.pagination,props.type=='full'?{bottom:0,backgroundColor:'rgba(0,0,0,0.5)',padding:10}:{}]} pointerEvents="none">
        {props.bannerData.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }
  // end: pagination 

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const renderItem = useCallback(function renderItem({ item }) {
    return <Slide key={item.id}  data={item} />;
  }, []);
 

  return (
      <View style={props.type == 'semi'?{height:225}:{height:250}}> 
        {
          props.bannerData?.length > 0 ?
          <>
              <FlatList 
                  data={props.bannerData} 
                  style={props.type=='semi'?styles.carousel:{margin:0,padding:0,backgroundColor:'#fff'}}
                  renderItem={renderItem}
                  pagingEnabled={true}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  onScroll={onScroll}
                  {...flatListOptimizationProps}
              />
              <Pagination index={index}></Pagination>
          </>:
          <>
          <View style={styles.carousel}> 
              <View style={[styles.slide,{backgroundColor:Colors.lighteshGray,marginHorizontal:10}]}>
              </View> 
          </View>
          </> 
        }
        
      </View>
  );
}

const styles = StyleSheet.create({
    carousel: {  
        marginTop:12,   
    }, 
    slide: { 
        // height:'80%',
        // width: windowWidth, 
        // padding:0, 
        // justifyContent: "center",
        // alignItems: "center",  
        // borderRadius:12, 
        // position:'relative',
        // overflow:'hidden',
        // // margin:8,
        // // marginVertical:22,
        // elevation:4,
        // margin:0
        width:windowWidth-33,
        height:'80%',
        margin:0,
        padding:0
    },
    slideImage: {  
        width: '100%',
        height: '100%', 
        borderRadius:12 
    }, 
    slideFull: {
      height:250,
      width: windowWidth, 
      margin:0,
      padding:0, 
      justifyContent: "center",
      alignItems: "center",   
      position:'relative',
    },
    slideImageFull: { 
        width: windowWidth, 
        height: '100%', 
        borderRadius:0
    },  
    pagination: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      justifyContent: "center",
      flexDirection: "row", 
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 2,
    },
    paginationDotActive: { backgroundColor: Colors.PrimaryColor,width:12 },
    paginationDotInactive: { backgroundColor: Colors.lightGray }  
  });
export default Banner