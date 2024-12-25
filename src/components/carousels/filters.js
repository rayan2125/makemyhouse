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
import Colors from "../../utility/color";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Filters = (props) => {
  
  const Data = props.filters;

  const renderItem = ({ item,index }) => (
    <TouchableOpacity key={index} onPress={props.onPress} style={styles.Box}>
      <Text>
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
      keyExtractor={(item) => item.id}
    />
  )
}

const styles = new StyleSheet.create({ 
  Box:{
    padding:8,
    paddingHorizontal:12,
    backgroundColor:Colors.lightGray,
    marginRight:8,
    borderRadius:6
  }
})

export default Filters