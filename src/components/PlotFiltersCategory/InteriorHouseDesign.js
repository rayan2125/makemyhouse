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

import { useNavigation,useNavigationState  } from '@react-navigation/native';

import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
 

const InteriorHouseDesign = (props) => {
  const navigation = useNavigation();

  const [interiorDesignCategories,setInteriorDesignCategories] = useState([]);
  const [isLoadingInteriorDesignCategories,setIsLoadingInteriorDesignCategories] = useState(false);
  useEffect(()=>{
    setInteriorDesignCategories([
      {id:1,image:Images.bedroom,data:{area:'Bed Room'}},
      {id:2,image:Images.livingroom,data:{area:'Living Room'}},
      {id:3,image:Images.bathroom,data:{area:'Bath Room'}},
      {id:4,image:Images.pujaroom,data:{area:'Puja Room'}},
      {id:5,image:Images.study,data:{area:'Study Room'}}, 
      {id:6,image:Images.kitchen,data:{area:'Kitchen'}}, 
      {id:7,image:Images.kidsroom,data:{area:'Kids Room'}},
    ]);
  },[]);

  const handleFilters = (filter)=>{
    AsyncStorage.removeItem('interiorcategory');
     console.log("clicked on filters", filter.toLowerCase().trim());

    let filters = filter.toLowerCase().trim() == 'bed room'? 'bedroom': filter.toLowerCase().trim() == 'bath room'? 'bathroom' : filter.toLowerCase().trim().replace(" ","-") ;  
    AsyncStorage.setItem('interiorcategory',filters);
    setTimeout(()=>{
      let object = {subcategory:filters,webviewStatus:true,filterType:"subcategory"}
      // console.log("interior-design-list:---- ",{ 
      //     object
      // }); 
      
      navigation.navigate('InteriorDesign',{screen:'InteriorList',params:{object}});
    },10); 
  }

  const renderItemData = ({ item,index }) => (
    <TouchableOpacity key={index}  activeOpacity={0.91} style={styles.container} onPress={()=>{handleFilters(item.data.area)}}>
      <AutoHeightImage
          width={windowWidth/2}
          maxHeight={160} 
          resizeMode="contain"
          source={item.image}
          style={{borderTopLeftRadius:12,borderTopRightRadius:12,}}
      /> 
      <Text style={[styles.filtersDataText,styles.filtersDataTextTwo,{marginTop:6}]}>
          {item.data.area}
      </Text> 
    </TouchableOpacity>
  );

  return(
    <View style={{padding:0}}> 
      <View style={{padding:10}}>  
        <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Interior Design Categories</Text>
      </View>
      <View style={{flexDirection:'row',flexWrap:'wrap',padding:0,marginLeft:10,marginBottom:12}}> 
          
          <FlatList
            style={{marginTop:18}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={interiorDesignCategories}
            renderItem={renderItemData}
            keyExtractor={(item) => item.id}
            bounces={false}
          /> 
        </View>  
    </View>    
)
}

export default InteriorHouseDesign