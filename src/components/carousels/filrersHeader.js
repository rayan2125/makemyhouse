import React, { useCallback, memo, useRef, useState } from "react";
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

const FiltersHeader = (props) => {
  
  const Data = props.filters; 
  // renderItem component 
  const renderItem = ({ item,index }) => (
    <TouchableOpacity key={index} onPress={()=>props.filtersSelected(item)} style={[styles.Box,item.trim().toLowerCase().replace(' ','-') == props.firstFilter.trim().toLowerCase().replace(' ','-')?styles.ActiveBox:{}]}>
      <Text style={[styles.BoxText,item.trim().toLowerCase().replace(' ','-') == props.firstFilter.trim().toLowerCase().replace(' ','-')?styles.ActiveTextBox:{}]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={Data}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />
  )
}

const styles = new StyleSheet.create({ 
  Box:{
    padding:8,
    paddingHorizontal:12,
    backgroundColor:Colors.lighteshGray,
    marginRight:8,
    borderRadius:6, 
  },
  ActiveBox:{
    backgroundColor:Colors.PrimaryColor,
    color:Colors.white
  },
  BoxText:{
    fontSize:FontSize.xp,
    fontWeight:FontWeight.regular,
    color:Colors.TextColor
  },
  ActiveTextBox:{
    color:Colors.white, 
  }
})

export default FiltersHeader