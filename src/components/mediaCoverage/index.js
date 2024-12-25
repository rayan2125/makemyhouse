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
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const MediaCoverage = (props) => { 

  const Data = props.data;
   

  // renderItem component 
  const renderItem = ({ item,index }) => (
    
      <TouchableOpacity activeOpacity={0.91} key={index} style={styles.container}>
            <View style={styles.upperBox}>
                {/* <AutoHeightImage
                    width={16}
                    maxHeight={16}
                    resizeMode="contain"
                    source={item.image}
                />  */}
                <Image source={item.image} resizeMode="contain" style={{width:'70%'}}/>
            </View>
            <View style={styles.lowwerBox}>
                <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.xp}}>Publication: {item.data.area}</Text>
            </View>
      </TouchableOpacity> 
    
  );

  return ( 
    <FlatList
      style={{marginTop:18}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={Data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      bounces={false}
    />
  )
}

const styles = new StyleSheet.create({  
  container:{
    width:windowWidth/2, 
    marginRight:12, 
    position:'relative',
    borderWidth:2,
    borderColor:Colors.lightGray
  },
  upperBox:{
    height:60,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    backgroundColor:Colors.white
  },    
  lowwerBox:{
    width:'100%',
    height:30,
    backgroundColor:'#D9D9D9',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    elevation:6
  }
})

export default MediaCoverage