import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Colors from "../../screens/utility/color";
import FontSize ,{FontWeight} from "../../screens/utility/fonts";
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import Images from "../../screens/utility/images";
import axios from 'axios';
import styles from "./style";
import { useFocusEffect } from '@react-navigation/native';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

import { useNavigation,useNavigationState  } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

let APIURL = 'https://api.makemyhouse.com/'; 
 
const TrendingHouseDesign = (props)=>{  
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();
    const [trendingHouseFilters,setTrendingHouseFilters] = useState(['By Area', 'By BHK', 'By Location', 'By Direction']); 
    const [filtersSelected,setFiltersSelected] = useState(props.filters[0]); 
  
    // renderItem component 
    const renderItem = ({ item,index }) => (
      <TouchableOpacity key={index} onPress={()=>{setFiltersSelected(item);}} style={[styles.Box,item == filtersSelected?styles.ActiveBox:{}]}>
        <Text style={[styles.BoxText,item==filtersSelected?styles.ActiveTextBox:{}]}>
          {item}
        </Text>
      </TouchableOpacity>
    ); 

    const [trendingData,setTrendingData] = useState([]);
    const [trendingDataSnd,setTrendingDataSnd] = useState([]);
    useEffect(()=>{
      console.log("change-----------------------",filtersSelected.trim().toLowerCase().replace(' ','-') )
      if(props.type == '1' && filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-area'){
        setTrendingData([
          {id:1,imageType:1,image:Images.Trending1,data:{area:'950sqft - 1100sqft'},extraText:true,text:'Area'},
          {id:2,imageType:1,image:Images.Trending3,data:{area:'1150sqft - 1300sqft'},extraText:true,text:'Area'}, 
          {id:3,imageType:1,image:Images.Trending2,data:{area:'1350sqft - 1500sqft'},extraText:true,text:'Area'},   
          {id:4,imageType:1,image:Images.Trending5,data:{area:'1550sqft - 1800sqft'},extraText:true,text:'Area'},   
        ]);
      }
      if(props.type == '1' && filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-location'){
        // setTrendingData([
        //   {id:1,image:Images.Location1,data:{area:'22ft x 30 ft - 660 sqft house design in Delhi',location:'Delhi'},extraText:false,text:''},
        //   {id:2,image:Images.Location2,data:{area:'23ft x 52 ft - 1196 sqft house design in Delhi',location:'Delhi'},extraText:false,text:''},  
        // ]); 
        setTrendingData(trendingDataSnd);
      }

      if(props.type == '1' && filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-bhk'){
        setTrendingData([
          {id:1,imageType:1,image:Images.BHK1,data:{area:'1BHK house design'},extraText:false,text:''},
          {id:2,imageType:1,image:Images.BHK2,data:{area:'2BHK house design'},extraText:false,text:''},  
          {id:3,imageType:1,image:Images.BHK3,data:{area:'3BHK house design'},extraText:false,text:''},
          {id:4,imageType:1,image:Images.BHK4,data:{area:'4BHK house design'},extraText:false,text:''},  
          {id:5,imageType:1,image:Images.BHK5,data:{area:'5BHK house design'},extraText:false,text:''},
          {id:6,imageType:1,image:Images.BHK6,data:{area:'6BHK house design'},extraText:false,text:''},  
        ]);
      } 

      if(props.type == '1' && filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-direction'){
        setTrendingData([
          {id:1,imageType:1,image:Images.BHK1,data:{area:'North facing design',direction:'NN'},extraText:false,text:''},
          {id:2,imageType:1,image:Images.BHK2,data:{area:'North East facing design',direction:'NE'},extraText:false,text:''},
          {id:3,imageType:1,image:Images.BHK3,data:{area:'North West facing design',direction:'NW'},extraText:false,text:''},
          {id:4,imageType:1,image:Images.BHK4,data:{area:'South facing design',direction:'SS'},extraText:false,text:''},
          {id:5,imageType:1,image:Images.BHK4,data:{area:'South East facing design',direction:'SE'},extraText:false,text:''},
          {id:6,imageType:1,image:Images.BHK4,data:{area:'South West facing design',direction:'SS'},extraText:false,text:''},
          {id:7,imageType:1,image:Images.BHK5,data:{area:'East facing design',direction:'EE'},extraText:false,text:''},
          {id:8,imageType:1,image:Images.BHK6,data:{area:'West facing design',direction:'WW'},extraText:false,text:''},
        ]);
      } 
    },[filtersSelected]);  

    // start: by location   
    const [currentLocation,setcurrentLocation] = useState(''); 

    useFocusEffect(
      useCallback(() => { 
        AsyncStorage.getItem('CurrentLocationCity',(err,creds)=>{
          console.log("currentLocationCity:", creds); 
          setcurrentLocation(JSON.parse(creds)); 
        })
        return () => { 
          console.log('Screen went out of focus');  
        };
      }, [])
    ); 

    useEffect(()=>{
      if(currentLocation != ''){ 
        GetByLocation();
      }else{
        GetByLocation();
      }
    },[currentLocation]);

    const GetByLocation = ()=>{ 
      if(currentLocation != ''){ 
        console.log('Get By Location 1', currentLocation); 
        let url = `${APIURL}public/projects?location=${currentLocation}&mode=app`;  
        axios.get(url)
          .then(response=>{ 
            if(response && response.data.length != 0){
              // filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-location'
              setTrendingDataSnd([]);
              // console.log("response.data[0]:---- ", response.data[0]);
              response.data.map((item,index)=>{
                if(index < 5){  
                    setTrendingDataSnd((prevs)=>[...prevs, {
                      id:item.projectID,
                      imageType:2,
                      image:item.image.imgUrl_500,
                      data:{
                        area:`${item.dimension} - ${item.plotArea} house design in ${currentLocation}`,
                        location:currentLocation,
                      }, 
                      extraText:false,text:''    
                    }]); 
                } 
              })
            }else{
              setcurrentLocation('delhi');   
            }
          })
          .catch(error=>{
            console.log(error);
            setcurrentLocation('delhi'); 
          }) 
      }else{
        console.log('Get By Location 1'); 
        setcurrentLocation('delhi'); 
      }
    }  
    // end: by location 
     
    // renderItem component 
    const renderItemData = ({ item,index }) => (
      
        <TouchableOpacity key={index}  activeOpacity={0.91} style={[styles.container]} onPress={()=>{
            // navigation.navigate("ArchitectList",{data:{}})
            if(filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-area'){

              AsyncStorage.setItem("ShareUrlFilters", `&min_area=${item.data.area.split('-')[0].replace(/[^0-9]/g, '')}&max_area=${item.data.area.split('-')[1].replace(/[^0-9]/g, '')}&direction=&floors=&bedroom=&kitchen=&bathroom=&living_room=`); 
              navigation.navigate('ArchitectDesign', { screen: 'ArchitectList', params:{data:{
                see_all:false,
                seeAllType:'byArea',
                min_area:item.data.area.split('-')[0].replace(/[^0-9]/g, ''),
                max_area:item.data.area.split('-')[1].replace(/[^0-9]/g, '')
              }}})
            }

            if(filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-bhk'){
              AsyncStorage.setItem("ShareUrlFilters",`&bedroom=${parseInt(item.data.area.split(' ')[0].replace(/[^0-9]/g, ''))}`);
              navigation.navigate('ArchitectDesign', { screen: 'ArchitectList', params:{data:{
                see_all:false,
                seeAllType:'byBHK',
                bedroom:parseInt(item.data.area.split(' ')[0].replace(/[^0-9]/g, ''))
              }}})
            }


            if(filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-location'){
              // navigation.navigate('ArchitectDesign', { screen: 'ArchitectList', params:{data:{
              //   see_all:false,
              //   seeAllType:'bylocation',
              //   location:item.data.location
              // }}})
              AsyncStorage.setItem("ShareUrlFilters",`&location=${item.data.location}`);
              navigation.navigate('ArchitectDesign', { screen: 'Architectdetaillist', params:{projectId:item.id, cityFilter:item.data.location}});  
              //navigation.navigate('Architectdetaillist', { projectId: item.data.id })
            }

            if(filtersSelected.trim().toLowerCase().replace(' ','-') == 'by-direction'){
              AsyncStorage.setItem("ShareUrlFilters",`&direction=${item.data.direction}`);
              navigation.navigate('ArchitectDesign', { screen: 'ArchitectList', params:{data:{
                see_all:false,
                seeAllType:'bydirection',
                direction:item.data.direction
              }}})
            }

           
          }}
        >
            <View style={{width:windowWidth/2, maxHeight:168, backgroundColor:'#eee',borderTopLeftRadius:12,borderTopRightRadius:12, overflow:'hidden'}}> 
                {
                  item.imageType == 1 ? 
                  <ImageBackground source={item.image} blurRadius={50}  resizeMode="cover" style={{width:'100%',height:'100%'}}>
                    <Image 
                      resizeMode="contain"
                      source={item.image}
                      style={{width:'100%', height:'100%'}}  
                    />
                  </ImageBackground>
                  : 
                  <ImageBackground source={{uri:`${item.image}`}} blurRadius={10}  resizeMode="cover" style={{width:'100%',height:'100%'}}>
                  <Image
                    resizeMode="contain"
                    source={{uri:`${item.image}`}}
                    //source={{uri: 'https://reactjs.org/logo-og.png'}}
                    style={{width:'100%', height:'100%'}}  
                  />
                  </ImageBackground>
                }
            </View>
            {/* <AutoHeightImage
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
            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>{t('trendinghousedesign')}</Text>
          </View>
          <View style={{flexDirection:'row',flexWrap:'wrap',padding:0,marginLeft:10,marginBottom:12}}> 
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={props.filters}
                renderItem={renderItem}
                keyExtractor={(item) => item}
              />
              <FlatList
                style={{marginTop:18}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={trendingData}
                renderItem={renderItemData}
                keyExtractor={(item) => item.id}
                bounces={false}
              /> 
            </View>  
        </View>     
    )
} 
export default TrendingHouseDesign; 