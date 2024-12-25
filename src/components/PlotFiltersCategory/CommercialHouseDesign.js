import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../screens/utility/color";
import FontSize ,{FontWeight} from "../../screens/utility/fonts";
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component


import styles from "./style";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

import { useNavigation,useNavigationState  } from '@react-navigation/native';
import ApiService from "../../ApiServices";
import GlobalData from "../../screens/utility/config";

let APIURL = 'https://api.makemyhouse.com/'; 


import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'; 
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient) 

import FastImage from "react-native-fast-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
 

const CommercialHouseDesign = (props)=>{  
    const navigation = useNavigation();
    const [trendingHouseFilters,setTrendingHouseFilters] = useState(['Magnificient Commercial Design', 'Elegent Institutional Designs','Residential / Rental Apartment Designs']); 
    const [filtersSelected,setFiltersSelected] = useState(props.filters[0]); 
  
    // renderItem component 
    const renderItem = ({ item,index }) => (
      <TouchableOpacity key={index} onPress={()=>{setFiltersSelected(item);}} style={[styles.Box,item == filtersSelected?styles.ActiveBox:{}]}>
        <Text style={[styles.BoxText,item==filtersSelected?styles.ActiveTextBox:{}]}>
          {item}
        </Text>
      </TouchableOpacity>
    ); 

    const [loadinData,setLoadingData] = useState(false);

    const [trendingData,setTrendingData] = useState([]);
    useEffect(()=>{
      console.log("change-----------------------",filtersSelected.trim().toLowerCase().replaceAll(' ','-') )
      if(props.type == '1' && filtersSelected.trim().toLowerCase().replaceAll(' ','-') == 'magnificient-commercial-design'){ 
        //console.log(getTheProductList('commercial'))
        // let data = getTheProductList('commercial');
        // console.log("data", getTheProductList('commercial'))
        setLoadingData(true)
        setTrendingData([]);
         ApiService.Getapiheader('public/projects?categorytype=commercial')
         .then(response => {
          // console.log(response);
          if(response && response.length > 0){
              response.map((item,index)=>{
                AsyncStorage.setItem("ShareUrlFilters", '&categorytype=commercial');
                setTrendingData(prevData => [...prevData, {
                  id:item.projectID, 
                  image:`${APIURL}public/media/rimage/200/completed-project/${item.image.img}?watermark=false`, 
                  data:{area: `${item.dimension} - ${item.plotArea} | ${item.designStyle}`},
                  extraText:false,
                  text:''
                }])
                if(response.length == index+1){
                  setLoadingData(false)
                }
              })
          }else{
            setTrendingData([]);
            setLoadingData(false)
          }
         })
         .catch(error=>{
          console.log(error);
          setTrendingData([]);
          setLoadingData(false)
         })
          
      }

      if(props.type == '1' && filtersSelected.trim().toLowerCase().replaceAll(' ','-') == 'elegent-institutional-designs'){
        // console.log(getTheProductList('institutional'))
        setTrendingData([]);
        setLoadingData(true)
         ApiService.Getapiheader('public/projects?categorytype=institutional')
         .then(response => {
         //  console.log(response);
          if(response && response.length > 0){
            AsyncStorage.setItem("ShareUrlFilters", '&categorytype=institutional');
              response.map((item,index)=>{
                setTrendingData(prevData => [...prevData, {
                  id:item.projectID, 
                  image:`${APIURL}public/media/rimage/200/completed-project/${item.image.img}?watermark=false`, 
                  data:{area: `${item.dimension} - ${item.plotArea} | ${item.designStyle}`},
                  extraText:false,
                  text:''
                }])
                if(response.length == index+1){
                  setLoadingData(false)
                }
              })
          }else{
            setTrendingData([]);
            setLoadingData(false)
          }
         })
         .catch(error=>{
          console.log(error);
          setTrendingData([]);
          setLoadingData(false)
         })
          
      }

      if(props.type == '1' && filtersSelected.trim().toLowerCase().replaceAll(' ','-') == 'residential-/-rental-apartment-designs'){
        // console.log(getTheProductList('residential'))
        setTrendingData([]);
        setLoadingData(true)
         ApiService.Getapiheader('public/projects?categorytype=residential')
         .then(response => {
          // console.log(response);
          if(response && response.length > 0){
            AsyncStorage.setItem("ShareUrlFilters", '&categorytype=residential');
              response.map((item,index)=>{
                setTrendingData(prevData => [...prevData, {
                  id:item.projectID, 
                  image:`${APIURL}public/media/rimage/200/completed-project/${item.image.img}?watermark=false`, 
                  data:{area: `${item.dimension} - ${item.plotArea} | ${item.designStyle}`},
                  extraText:false,
                  text:''
                }])
                if(response.length == index+1){
                  setLoadingData(false)
                }
              })
          }else{
            setTrendingData([]);
            setLoadingData(false)
          }
         })
         .catch(error=>{
          console.log(error);
          setTrendingData([]);
          setLoadingData(false)
         })
          
      }  
    },[filtersSelected]);  

    // renderItem component 
    const renderItemData = ({ item,index }) => (
      <TouchableOpacity key={index}  activeOpacity={0.91} style={[styles.container]} onPress={()=>{
       // navigation.navigate("ArchitectList",{data:{}})
      //   if(filtersSelected.trim().toLowerCase().replaceAll(' ','-') == 'magnificient-commercial-design'){
      //     navigation.navigate('ArchitectDesign', { screen: 'ArchitectList', params:{data:{
      //       see_all:false,
      //       seeAllType:'othersFilters',
      //       mainKey:'categorytype',
      //       mainValue:'commercial'
      //     }}})
      //   }

      //   if(filtersSelected.trim().toLowerCase().replaceAll(' ','-') == 'elegent-institutional-designs'){
      //     navigation.navigate('ArchitectDesign', { screen: 'ArchitectList', params:{data:{
      //       see_all:false,
      //       seeAllType:'othersFilters',
      //       mainKey:'categorytype',
      //       mainValue:'institutional'
      //     }}})
      //   }
      //   if(filtersSelected.trim().toLowerCase().replaceAll(' ','-') == 'residential-/-rental-apartment-designs'){
      //     // navigation.navigate('ArchitectDesign', { screen: 'ArchitectList', params:{data:{
      //     //   see_all:false,
      //     //   seeAllType:'othersFilters',
      //     //   mainKey:'categorytype',
      //     //   mainValue:'residential'
      //     // }}})
      //     // navigation.navigate('ArchitectDesign', { screen: 'Architectdetaillist', params:{projectId:item.id}});  
      //   }
        console.log("project id on which i have clicked: ", {projectId:item.id});
        navigation.navigate('ArchitectDesign', { screen: 'Architectdetaillist', params:{projectId:item.id}});  

      }}
    >
        <View style={{width:windowWidth/2, maxHeight:168, backgroundColor:'#eee',borderTopLeftRadius:12,borderTopRightRadius:12, overflow:'hidden'}}> 
          <ImageBackground source={{uri:item.image}} blurRadius={50}  resizeMode="cover" style={{width:'100%',height:'100%'}}>
            <FastImage
               resizeMode={FastImage.resizeMode.contain} 
              // source={item.image}
              source={{uri:item.image}}
              style={{width:'100%', height:'100%',borderTopLeftRadius:12,borderTopRightRadius:12}}  
            />
          </ImageBackground>  
        </View>
        {/*<AutoHeightImage
            width={windowWidth/2} 
            maxHeight={168}
            resizeMode="contain"
            source={item.image}
            style={{borderTopLeftRadius:12,borderTopRightRadius:12,}}
        /> */}
        <View style={{marginVertical:2}}></View> 
          {
            item.extraText == true ? 
            <Text style={styles.filtersDataText}>    
              {item.text} {item.data.area} 
            </Text>
            :
            <Text style={styles.filtersDataText}>    
                {item.data.area} 
            </Text> 
          }
    </TouchableOpacity> 
    );
 

    return(
        <View style={{padding:0}}> 
          <View style={{padding:10}}>  
            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Commercial House Design</Text>
          </View>
          <View style={{padding:0,marginLeft:10,marginBottom:12}}> 
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={props.filters}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
              {
                trendingData.length > 0 ? 
                <FlatList
                  style={{marginTop:18}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={trendingData}
                  renderItem={renderItemData}
                  keyExtractor={(item) => item.id}
                  bounces={false}
                />
                :
                <FlatList
                  style={{marginTop:18}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={[{id:1},{id:2},{id:3},{id:4}]}
                  renderItem={(item,index)=>{
                   return <View key={index} style={[styles.container]}>
                      <View style={{width:windowWidth/2, maxHeight:168, backgroundColor:'#eee',borderTopLeftRadius:12,borderTopRightRadius:12, overflow:'hidden',}}> 
                      <ShimmerPlaceholder 
                        style={{width:windowWidth/2, height:168, }}
                        shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                      > 
                      </ShimmerPlaceholder> 
                      </View> 
                      <View style={{marginVertical:2}}></View> 
                      <ShimmerPlaceholder 
                        style={{width:windowWidth/6, height:10,borderRadius:12}}
                        shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                      > 
                      </ShimmerPlaceholder>
                    </View>
                  }}
                  keyExtractor={(item) => item.id}
                  bounces={false}
                /> 
              }
               
            </View>  
        </View>     
    )
} 
export default CommercialHouseDesign; 