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
import FontSize ,{FontWeight} from "../../screens/utility/fonts";
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import Images from "../../screens/utility/images";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// Start: icons 
import StarLight from '../../../assets/images/icons/starLight.svg'; 
import StarBlack from '../../../assets/images/icons/starBlack.svg';
import StarDark  from '../../../assets/images/icons/starDark.svg';
import {actuatedNormalize} from '../../utility/scaling';
// end: icons
import { RFValue } from 'react-native-responsive-fontsize';
const Testimonial = (props) => {
  
  // const to container data 
  const Data = props.data;  

    // renderItem component 
    const renderItem = ({ item,index }) => (
      <TouchableOpacity activeOpacity={0.9} key={index} style={[styles.container,index % 2==0?{backgroundColor:Colors.SecondaryColor}:{backgroundColor:Colors.lightGray}]}>
         <AutoHeightImage
              width={42}
              maxHeight={42}
              resizeMode="contain"
              source={Images.testimonialUserIcon}
              style={{marginBottom:6}}
          /> 
          <Text style={[styles.name,index%2==0?{color:Colors.white}:{color:Colors.SecondaryColor}]}>{item.name}</Text>
          <Text style={[styles.comment,index%2==0?{color:Colors.white}:{color:Colors.SecondaryColor}]}>{item.comment}</Text>
          <View style={[styles.StarContainer]}>
            {/* Create an array of length stars and map over it */}
            
            {
              index%2==0?
              (Array.from({ length: 5 }, (_, index) => (
                  // <Text key={index}>{index}</Text>
                  index< item.stars?                  
                  // <AutoHeightImage
                  //   key={index}
                  //   width={16}
                  //   maxHeight={16}
                  //   resizeMode="contain"
                  //     source={Images.startLight} 
                  // />
                  <StarLight key={index} width={RFValue(12)} height={RFValue(12)} />
                  :
                  // <AutoHeightImage
                  //   key={index}
                  //   width={16}
                  //   maxHeight={16}
                  //   resizeMode="contain"
                  //     source={Images.startBlack} 
                  // />
                  <StarBlack key={index} width={RFValue(12)} height={RFValue(12)} />
              ))) 
              :
              (Array.from({ length: 5 }, (_, index) => (
                // <Text key={index}>{index}</Text>
                index< item.stars?                  
                // <AutoHeightImage
                //   key={index}
                //   width={16}
                //   maxHeight={16}
                //   resizeMode="contain"
                //     source={Images.startDark} 
                // />
                <StarDark key={index} width={RFValue(12)} height={RFValue(12)} />
                :
                // <AutoHeightImage
                //   key={index}
                //   width={16}
                //   maxHeight={16}
                //   resizeMode="contain"
                //     source={Images.startLight} 
                // />
                <StarLight key={index} width={RFValue(12)} height={RFValue(12)} />
               
            ))) 
            }
           

          </View>
      </TouchableOpacity>
    );

  return(
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
  }
});

export default Testimonial;