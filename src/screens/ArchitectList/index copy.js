import React, { useState,useEffect, useCallback } from 'react'
import {VirtualizedList, BackHandler, View, Text, Modal, Image,StyleSheet, SafeAreaView, TouchableOpacity, TextInput,Dimensions,ActivityIndicator, ScrollView  } from 'react-native'
import { Util } from '../utility/scaling.js';
import { FlatList } from 'react-native'
import Colors from '../utility/color.js';
import ArrowLeftLight from '../../../assets/images/icons/arrowLeftLight.svg'; 

import ApiService from '../../ApiServices/index.js';
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation,useNavigationState } from '@react-navigation/native';

import axios from 'axios';

import ImageContainer from './ImageContainer.js';

import Images from '../utility/images.js';

let token = ''; 
let project = new Array();

import {GlobalData} from '../../utility/config.js';
// let APIURL = GlobalData.APIURL;  
let APIURL = 'https://api.makemyhouse.com/'; 

import AsyncStorage from '@react-native-async-storage/async-storage';


 
import Loader from './loader.js';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");



const ArchitectList = ({navigation,route}) => {
  
  let useNavigationInit = useNavigation();
  const routeName = useNavigationState(state => state.routes[state.index].name); 
  useEffect(() => {  
      const handleBackPress = () => {  
          console.log("routeName:",routeName); 
          // You can also check conditions before navigating
          if ( routeName == 'ArchitectList' ) {
          //   navigation.navigate('StartTab');
              navigation.goBack();
              return true;
          } 
          return false;

      };  
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
       BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      }
  }, []);

  const [tokenS,setToken] = useState('');
  const [goesWell,setGoesWell] = useState(false);

  useEffect(()=>{ 
      function getToken(){
          setPage(1);
          AsyncStorage.getItem('UserToken')
          .then(response=>{
              setToken(response);
              token = response.trim(); 

              project = [];
              AsyncStorage.removeItem('ApplyDirectionFilter'); // remove the direction filters 
              setGoesWell(true);
          })
          .catch(error=>{
              console.log(error)
          }) 
      }
      getToken();
  },[useNavigation]);

  const [loader, setLoader] = useState(true);
  const [Dimensionpopup, setDimensionpopup] = useState(false);
  const [loactionpopup, setloactionpopup] = useState(false);
  const [filterpopup, setfilterpopup] = useState(false);

  const [page,setPage] = useState(1);
  const [continueLoading,setContinuesLoading] = useState(false);
  
  useEffect(()=>{   
      if(route.params){ 
          console.log("iF Condition: route.params",route.params);
          // here define different filters and get the data 
          if(route.params.data.see_all == false || route.params.data.See_all == false){
              // by Area filter 
              if(route.params.data.seeAllType == 'byArea'){ 
                  let url = `${APIURL}public/projects?page=1&mode=app&min_area=${route.params.data.min_area}&max_area=${route.params.data.max_area}`;
                  console.log('ByArea URL:---',url);
                  let dataObj = {
                      width:`${route.params.data.min_area}`,
                      length:`${route.params.data.max_area}`, 
                      floors:'',
                      direction:'',
                      bathroom:'',
                      kitchen:'',
                      bedroom:'',
                      livingroom:''
                  }
                  ApplyFilters(url,dataObj); 
              } 
                if(route.params.data.seeAllType == 'byBHK'){
                  // bedroom=
                  let url = `${APIURL}public/projects?page=1&mode=app&bedroom=${route.params.data.bedroom}`;
                  console.log('byBHK URL:---',url);
                  let dataObj = {
                      width:'',
                      length:'', 
                      floors:'',
                      direction:'',
                      bathroom:'',
                      kitchen:'',
                      bedroom:`${route.params.data.bedroom}`,
                      livingroom:''
                  }
                  ApplyFilters(url,dataObj);
                } 


                if(route.params.data.seeAllType == 'bylocation'){
                    console.log("00000------", route.params.data.location);
                    ApplyLocationFilter(route.params.data.location);
                } 

                if(route.params.data.seeAllType == 'bydirection'){
                    console.log("00000------", route.params.data.direction); 
                    let dataObj = {
                        width:'',
                        length:'',
                        floors:'',
                        direction:'NN',
                        bathroom:'',
                        kitchen:'',
                        bedroom:'',
                        livingroom:''
                    }
                    ApplyDirectionFilter(dataObj);
                }

                if(route.params.data.seeAllType == 'othersFilters'){
                    let mainKey = route.params.data.mainKey;
                    let mainValue = route.params.data.mainValue;
                    othersFiltersFunction(mainKey,mainValue); 
                }  
              
          }else{ 
              console.log("Else Condition: only print");
              Trendingapicall();  
          }

      }else{
          console.log("Else Condition: only print");
          Trendingapicall();
      } 
  },[goesWell]); 

  const ApplyFilters =  async (url,data)=>{
      setPage(1);
      setLoader(true);
      project = [];  
      try {
          await AsyncStorage.setItem('ApplyDirectionFilter',JSON.stringify(data))
          .then( async response =>{
              const responsed = await axios.get(url);  
              responsed.data.map((item,index)=>{
                  project.push(item)
              });
              // console.log(response);
              // console.log("Apply filters :--------------AsyncStorage.setItem('ApplyDirectionFilter',JSON.stringify(data))")
          })
          .catch(error=>{
              console.log('error -- ')
          }) 
           
      } catch (error) {
          console.log("error--ApplyDirection Filter:",error)
      }finally{
          setLoader(false);
          setPage(page+1);
      }
       
  }  

  // filters 
  const loactionpopupclosefunc = (val) => {
      setloactionpopup(false)
  }
  const notificationclosefunc = (val) => {
      setDimensionpopup(false)
  }
  const filterpopupclosefunc = (val) => {
      setfilterpopup(false)
  } 
  

  const Trendingapicall = async () => {
      setPage(1);
      setLoader(true);
      // let url = `public/projects?min_area=500&max_area=1000&limit=4`;
      // let url = `/public/projects?page=${page}&limit=9&mode=app`;
     //  let url = `${APIURL}public/projects?page=${page}&limit=9&mode=app&token= 549a41a70b1036ab93eeaaf92e139544`
     if(tokenS){ 
        // let url = `public/projects?page=1&limit=9&mode=app&token=${tokenS}`;
        // console.log("Trendingapicall::------::------",url);   
        let url = `${APIURL}public/projects?page=1&limit=9&mode=app&token=${tokenS}`; 
          try {
              await axios.get(url)
              .then(response=>{ 
                if(response.data.length > 0){
                response.data.map((item,index)=>{
                    project.push(item) 
                    if((index+1) == response.data.length){
                        setLoader(false)
                    }
                });}else{
                    project = [];
                    setLoader(false)
                }
              }) 
              .catch(error=>{
                console.log(error);
                setLoader(false);
              })
          } catch (error) { 
              console.log(error);
          }finally{
              setPage(page+1); 
              setLoader(false); 
          }
     }else{
      console.log("nothing");
     }
      
  };

 
  const infiniteScrolling = async ()=>{ 
      if(continueLoading){
          return;
      } 
      else{
          if(tokenS){ 
              let url = `${APIURL}public/projects?page=${page}&limit=9&mode=app&token=${tokenS}`;
              console.log("infinite scrolling:-------------",url);
              try {
                  setContinuesLoading(true);
                  const response = await axios.get(url); 
                 
                  response.data.map((item,index)=>{
                      project.push(item)
                  });
              } catch (error) {
                  console.log("ContinueLoading...",error.message);
              }
              finally{
                  setPage(page+1);
                  setContinuesLoading(false);
              }
          }else{
              console.log("nothing from Archtechlist view");
          }
      } 
     
  }

  // VirtualizedList
  const getItemCount = (data,index) => data.length;
  const getItem  = (data,index)=>{ 
      return data[index];
  }

  // redner footer element 
  const renderFooter = () => {
      return continueLoading ? (
        <View style={{ padding: 10, justifyContent:'center', alignContent:'center', alignItems:'center',height:260,  }}>
              <View style={{width:'100%',height:'100%',backgroundColor:'#ddd'}}> 
              </View>                
        </View>
      ) : null;
  };
  
  // start: other filters --FILTERSPOPUP
  // filters object
  const [filtersData,setfiltersData] = useState(
      {
          "image_category":[
              { "interior-design":'Interior Design' },
              { "exterior-design":'Exterior Design' },
              { "landscape-design":"Landscape Design" },
              { "floorplan":"Floorplan" },
              { "3d-floorplan":"3D Floorplan" },
              { "architectural-drawings":"Architectural Drawings" },
              { "walkthrough":"Walkthrough"},
              { "engineering-drawing":"Engineering Drawing"}
          ],
          "design_style":[
              { "contemporary":'Contemporary', },
              { "eclectic":'Eclectic', },
              { "modern":"Modern"},
              { "traditional":"Traditional"},
              { "asian":"Asian"},
              { "beach-style":"Beach Style"},
              { "craftsman":"Craftsman"},
              { "farmhouse":"Farmhouse"},
              { "industrial":"Industrial"},
              { "mediterranean":"Mediterranean"},
              { "midcentury":"Midcentury"}, 
              { "rustic":"Rustic"},
              { "scandinavian":"Scandinavian"},
              { "southwestern":"Southwestern"},
              { "transitional":"Transitional"},
              { "tropical":"Tropical"},
              { "victorian":"Victorian" }
          ],
          "design_category":[
              {"residential":"Residential"},
              {"commercial":"Commercial"},
              {"residential-cum-commercial":"Residential Cum Commercial"},
              {"institutional":"Institutional"},
              {"agricultural":"Agricultural"},
              {"government":"Government (Like city house, Courthouse)"},
              {"military":"Military"},
              {"transport":"Transport"},
              {"religious":"Religious"},
              {"other":"Other"},
              {"office":"Office"}
          ]
      }
  );   
  const [filtersMain,setFiltersMain] = useState(['image_category','design_category','design_style']); 
  
  // main filterpop function for projects 
  const othersFiltersFunction = async (mainKey,mainValue)=>{
      console.log("other filters: ",{
        mainKey,
        mainValue
      })
      setLoader(true);
      project = []; 
      try { 
          let url = `public/projects?${mainKey}=${mainValue}`;
          console.log(url);
          await ApiService.Getapiheader(url)
          .then(response=>{
            console.log("response--Others filtersr:",response.length);    
              if(response.length > 0){
                response.map((item,index)=>{ 
                    project.push(item);  
                    if((index+1) == response.length){
                        setLoader(false);
                    }
                });
              }else{
                setLoader(false);
                project= []; 
              } 
          })
          .catch(error=>{
            console.log("error--Others filtersr:",error) 
            setLoader(false);  
          })
          
        
      } catch (error) {
          console.log("error--Others filtersr:",error) 
          setLoader(false);
      }
  } 

    const clearAll = (val) => {
        console.log(false,"000000000000000000000000000000000000000")
        Trendingapicall();
    } 
  
  const FilterPopup = (props, { onPress }) => {
      const [selectedOption, setSelectedOption] = useState(null);
      const [type, settype] = useState(1);
      const [selectimage, setselectimage] = useState('');
      useEffect(()=>{
          async function temp(){
              let aa = await AsyncStorage.getItem('othersFilters')
              setselectimage(aa);
             //  let currentFilter = await AsyncStorage.getItem('currentFilterFun');
             await AsyncStorage.getItem('currentFilterFun')
             .then((response)=>{
               console.log("print the response");
               if(response){
                  console.log('repsonse == null ')
                  currentFilterFun(response);
               }else{
                  console.log('repsonse != null ')
                  currentFilterFun(props.filtersMain[0]);
               }
             })
             .catch(error=>{
              console.log("error:",error);
             }) 
          }
          temp();    
      },[]);
      const handleOptionSelect = (option) => {
          setSelectedOption(option);
          props.filterpopupclosefunc(option)
      };
      const [currentFilter,setCurrentFilter] = useState('');
      const [filtersTempData,setFiltersTeampData] = useState(props.filtersData);
      const [filters,setFilters] = useState(props.filtersMain);
      const [filterIntenalData,setFilterInternalData] = useState();

      function getCategoryArray(categoryName) {
          // Check if the specified category name exists in the data object
          if (filtersTempData.hasOwnProperty(categoryName)) {
            return filtersTempData[categoryName];
          } 
          // If the specified category name is not found
          return null;
      }

      const currentFilterFun = async (data)=>{
          await AsyncStorage.setItem('currentFilterFun',data);
          setCurrentFilter(data); 
          const imageCategoryArray = getCategoryArray(data);
          // console.log(imageCategoryArray)
          setFilterInternalData(imageCategoryArray)
      } 
      
      // filters inner data 
      const renderItem = ({ item,index }) => {
          const key = Object.keys(item)[0];
          const label = item[key];
          // console.log("keys",key);
          // console.log("lable",label);
          return ( 
          <TouchableOpacity key={key} style={{ flexDirection: "row", marginTop: 15, }} onPress={async () => {
                if(key != selectimage){ 
                    setselectimage(key);  
                    await AsyncStorage.setItem("othersFilters",key.toLowerCase());
                    console.log("------------------------------",await AsyncStorage.getItem('othersFilters'))
                }else{
                    setselectimage('');  
                    await AsyncStorage.removeItem("othersFilters");
                }
              }}> 
              {
                  selectimage == key.toLowerCase() ? <Image source={Images.FilterSelect} style={{ height: 20, width: 20.5 }} /> : <Image source={Images.FilterUnselect} style={{ height: 20, width: 20.5 }} />
              }
              <View style={{ marginLeft: 20 }}>
                  <Text style={{ fontSize: 15, fontWeight: "500", color: "#000000", }}>
                      {label}
                  </Text> 
              </View>
          </TouchableOpacity>
          );
      };

        // apply filters 
        const applyFilters = ()=>{  
            if(currentFilter == 'design_style'){
                // subcategory 
                othersFiltersFunction('subcategory',selectimage);
                props.filterpopupclosefunc()     
            }else if(currentFilter == "design_category"){
                // categorytype 
                othersFiltersFunction('categorytype',selectimage); 
                props.filterpopupclosefunc() 
            }else{
                othersFiltersFunction(currentFilter,selectimage);
                props.filterpopupclosefunc()     
            }   
        }
  
      return <View>
          <Modal animationType="slide" transparent={true} visible={true}>
              <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, backgroundColor: "#ffffff", flex: 1, height: "100%" }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20, }}>
                          <Text style={{ fontSize: 20, fontWeight: "700", color: "#585662" }}>
                              Filters 
                              {/* {currentFilter}:
                              {selectimage} */}
                          </Text>
                          <TouchableOpacity style={{alignSelf: "center"}} onPress={async ()=>{setselectimage(0); await AsyncStorage.removeItem('othersFilters'); props.filterpopupclosefunc(); props.clearAll(); }}>
                              <Text style={{ fontSize: 16, fontWeight: "700", color: "#FF0000"}}>
                                  CLEAR ALL
                              </Text>
                          </TouchableOpacity> 
                      </View>
                      <View style={{ flexDirection: "row", flex: 1 }}>
                          <View style={{ flex: 1, backgroundColor: "#F6F6F6", }}>
                              <View>
                                  {
                                      filters.map((item,index)=>{
                                          return (    
                                              <TouchableOpacity key={index} style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: "#D6D6D6", backgroundColor: type == 1 ? '#ffffff' : "#F6F6F6" }} onPress={  () => { currentFilterFun(item); }}> 
                                                  <Text style={{ fontSize: 18, fontWeight: "400", color: "#000000", textAlign: "center",textTransform:'capitalize' }}>
                                                      {item.split("_")[0]} 
                                                  </Text>
                                                  <Text style={{ fontSize: 18, fontWeight: "400", color: "#000000", textAlign: "center",textTransform:'capitalize'  }}>
                                                      {item.split("_")[1]}
                                                  </Text> 
                                              </TouchableOpacity>
                                          )
                                      })
                                  }  

                              </View>
                          </View>
                          <View style={{ flex: 1.5, backgroundColor: "#ffffff" }}>
                              <View style={{ marginLeft: 10 }}>    
                                  <FlatList
                                      data={filterIntenalData}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={renderItem}
                                  /> 
                              </View>
                          </View>
                      </View>
                      <View style={{backgroundColor:"#ffffff",elevation:5,flexDirection:"row",padding:20}}>
                          <TouchableOpacity style={{flex:1,borderRightWidth:1,borderRightColor:"#848484"}} onPress={()=>props.filterpopupclosefunc()}>
                              <Text style={{color:"#000000",fontSize:14,fontWeight:"700",textAlign:"center"}}>CLOSE</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{flex:1}} onPress={applyFilters}>
                              <Text style={{color:"#4DB051",fontSize:14,fontWeight:"700",textAlign:"center"}}>APPLY</Text> 
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>
      </View>
  }
  // end: other filters --FILTERSPOPUP


   // Start: Direction  -- data 
   const data = [
      { label: "South", value: "SS" },
      { label: "North", value: "NN" },
      { label: "East", value: "EE" },
      { label: "West", value: "WW" },
      { label: "North East", value: "NE" }, 
      { label: "North West", value: "NW" },
      { label: "South East", value: "SE" },
      { label: "South West", value: "SW" },
  ]; 
  // end: Direction  -- data
  // start: number --date
  const NumberData = [ 
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },  
      { label: "4", value: "4" }, 
      { label: "5", value: "5" },
  ]
  // end: number --date
  

  // Start: Apply Direction Filter
  const ApplyDirectionFilter = async (data)=>{
      await AsyncStorage.setItem('ApplyDirectionFilter',JSON.stringify(data));
      project = []; 
      console.log(data);
      setLoader(true);
      setPage(1);
      // let url = `public/projects?min_area=500&max_area=1000&limit=4`;
      // projects?page=1&min_area=500&max_area=1000&direction=SS&floors=1&bedroom=1&kitchen=1&bathroom=1&livingroom=1
      let url = `${APIURL}public/projects?page=1&mode=app&min_area=${data.width}&max_area=${data.length}&direction=${data.direction}&floors=${data.floors}&bedroom=${data.bedroom}&kitchen=${data.kitchen}&bathroom=${data.bathroom}&living_room=${data.livingroom}`;
      // console.log("applt filter url:----------",url);
      try {
          const response = await axios.get(url); 
          response.data.map((item,index)=>{
              project.push(item)
          });
          console.log("Direction filter:--------",url);
          // apis is not working-------------
      } catch (error) {
          console.log("error--ApplyDirection Filter:",error)
      }finally{
          setLoader(false);
          setPage(page+1);
      }
  }
  // end: Apply Direction Filter
  // start: Reset Direction Filter
  const ResetDirectionFilter = async ()=>{  
      setLoader(true);
      await AsyncStorage.removeItem('ApplyDirectionFilter'); 
      await AsyncStorage.removeItem('propsWebView');
      Trendingapicall();              
  }
  // end: Reset Direction Filter
  
  

  // start: DimenstionPOPUP 
  const DimensionPopup = (props, { onPress }) => {
      const [selectedOption, setSelectedOption] = useState("");
      const handleOptionSelect = (option) => {
          setSelectedOption(option);
          props.notificationclosefunc(option)
      };
      
      // start: Dimensions state
      const [areaWidth,setAreaWidth]= useState(""); 
      const [areaHeight,setAreaHeight]= useState("");
      const [floors,setFloors] = useState("");  
      const [value, setValue] = useState("");  
      const [valueBedroom, setValueBedroom] = useState(""); 
      const [valueKitchen, setValueKitchen] = useState(""); 
      const [valueBathroom, setValueBathroom] = useState(""); 
      const [valueLivingRoom, setValueLivingRoom] = useState(""); 
      // start: Dimensions state  

      // start: get the current store filters 
      useEffect(()=>{
          async function getDimentionFilter(){
              // AsyncStorage.setItem('ApplyDirectionFilter',data)
              AsyncStorage.getItem('ApplyDirectionFilter')
              .then(req => JSON.parse(req))
              .then(json =>{
                  if(json){
                      console.log("json.data getDimentionFilter inside -----------:---- ",json);
                      setAreaWidth(json.width);
                      setAreaHeight(json.length);
                      setFloors(json.floors);
                      setValueBedroom(json.bedroom);
                      setValueKitchen(json.kitchen);
                      setValueBathroom(json.bathroom);
                      setValueLivingRoom(json.livingroom);
                      setValue(json.direction);
                  }
              })
              .catch(error => console.log('error!'));
          }
          getDimentionFilter();
      },[]);
      // useEffect(()=>{
      //     AsyncStorage.getItem('ApplyDirectionFilter')
      //     .then(req => JSON.parse(req))
      //     .then(json=>{
      //         console.log("json################################",json.length)
      //         setAreaHeight(123);
      //     })
      //     .catch(error=>{
      //         console.log("error");
      //     })
      // },[areaHeight]);
      // end: get the current store filters  
      
      // Start: Internal  functions
      const ApplyDirectionFilterInternal = ()=>{
          let dataObj = {
              width:areaWidth,
              length:areaHeight,
              floors,
              direction:value,
              bathroom:valueBathroom,
              kitchen:valueKitchen,
              bedroom:valueBedroom,
              livingroom:valueLivingRoom
          }
          ApplyDirectionFilter(dataObj);
          props.notificationclosefunc();
      }
      const ResetDirectionFilterInternal = ()=>{
          setAreaWidth("");
          setAreaHeight("");
          setFloors("");
          setValue("");
          setValueBedroom("");
          setValueKitchen("");
          setValueBathroom("");
          setValueLivingRoom("");
          setPage(1);
          ResetDirectionFilter();
          props.notificationclosefunc();
      }
      // end Internal  functions
      
      
      return <View>
          <Modal animationType="slide" transparent={true} visible={true}>
              <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                  <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => {
                      props.notificationclosefunc()
                  }}>
                      <View  ></View>
                  </TouchableOpacity>
                  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: 'auto', backgroundColor: "#ffffff", padding: 20 }}>
                      <TouchableOpacity style={{ borderRadius: 10, alignSelf: "flex-end" }} onPress={() => {
                          props.notificationclosefunc()
                      }}>
                          <Image source={Images.Cancel} />
                      </TouchableOpacity>
                      <View style={{ flexDirection: "row", marginTop: 30 }}>
                          <View style={{ flex: 1.5, alignSelf: "center" }}>
                              <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
                                  Area  
                              </Text> 
                          </View>
                          <View style={{ flex: 3, flexDirection: "row" }}>
                              <View style={{ flex: 1 }}>
                                  <TextInput
                                      defaultValue={areaWidth}
                                      value={areaWidth}
                                      placeholder='00'
                                      keyboardType="phone-pad"
                                      placeholderTextColor={'#000000'}
                                      style={{ height: 40, width: "100%", borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 5,color:'#000000' }} 
                                      onChangeText={(text) => setAreaWidth(text)}
                                  />
                              </View>
                              <View style={{ flex: 0.5, alignSelf: "center" }}>
                                  <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000", textAlign: "center" }}>
                                      to
                                  </Text>
                              </View>
                              <View style={{ flex: 1 }}>
                                  <TextInput
                                      value={areaHeight}
                                      placeholder='00'
                                      keyboardType="phone-pad"
                                      placeholderTextColor={'#000000'}
                                      style={{ height: 40, width: "100%", borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 5 ,color:'#000000'}}
                                      onChangeText={(text) => setAreaHeight(text)}
                                  />
                              </View>
  
                          </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <View style={{ flex: 1.5, alignSelf: "center" }}>
                              <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
                                  Floors 
                              </Text>
                          </View>
                          <View style={{ flex: 3, }}>
                              <TextInput
                                  value={floors}
                                  placeholder='0'
                                  placeholderTextColor={'#000000'}
                                  keyboardType="phone-pad"
                                  style={{ height: 40, width: "100%", borderWidth: 1, borderColor: "#D1D1D1", borderRadius: 5,color:'#000000' }}
                                  onChangeText={(text) => setFloors(text)}
                              />
                          </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <View style={{ flex: 1.5, alignSelf: "center" }}>
                              <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
                                  Direction
                              </Text>
                          </View>
                          <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 5, borderColor: "#D1D1D1", flex: 3, justifyContent: 'space-between',color:'#000000' }}>  
                              <Dropdown
                                      style={[styles.dropdown,{width:'100%'}]}
                                      placeholderStyle={styles.placeholderStyle}
                                      selectedTextStyle={styles.selectedTextStyle}
                                      inputSearchStyle={styles.inputSearchStyle}
                                      iconStyle={styles.iconStyle}
                                      data={data}
                                      search
                                      maxHeight={300}
                                      labelField="label" 
                                      itemTextStyle={{textColor:"black", color:'#000000',fontSize:14}} 
                                      valueField="value"
                                      placeholder="Select"
                                      searchPlaceholder="Search..."
                                      value={value}
                                      onChange={(item) => {
                                          setValue(item.value);
                                      }}
                               />
                               
                          </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <View style={{ flex: 1.5, alignSelf: "center" }}>
                              <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
                              Bedroom
                              </Text>
                          </View>
                          <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 5, borderColor: "#D1D1D1", flex: 3, justifyContent: 'space-between' }}>
        
                              <Dropdown
                                      style={[styles.dropdown,{width:'100%'}]}
                                      placeholderStyle={styles.placeholderStyle}
                                      selectedTextStyle={styles.selectedTextStyle}
                                      inputSearchStyle={styles.inputSearchStyle}
                                      iconStyle={styles.iconStyle}
                                      data={NumberData}
                                      search
                                      maxHeight={300}
                                      labelField="label" 
                                      itemTextStyle={{textColor:"black", color:'#000000',fontSize:14}} 
                                      valueField="value"
                                      placeholder="Select"
                                      searchPlaceholder="Search..."
                                      value={valueBedroom}
                                      onChange={(item) => {
                                          setValueBedroom(item.value);
                                      }}
                               />
                          </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <View style={{ flex: 1.5, alignSelf: "center" }}>
                              <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
                              Kitchen
                              </Text>
                          </View>
                          <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 5, borderColor: "#D1D1D1", flex: 3, justifyContent: 'space-between' }}>
                 
                               <Dropdown
                                      style={[styles.dropdown,{width:'100%'}]}
                                      placeholderStyle={styles.placeholderStyle}
                                      selectedTextStyle={styles.selectedTextStyle}
                                      inputSearchStyle={styles.inputSearchStyle}
                                      iconStyle={styles.iconStyle}
                                      data={NumberData}
                                      search
                                      maxHeight={300}
                                      labelField="label" 
                                      itemTextStyle={{textColor:"black", color:'#000000',fontSize:14}} 
                                      valueField="value"
                                      placeholder="Select"
                                      searchPlaceholder="Search..."
                                      value={valueKitchen}
                                      onChange={(item) => {
                                          setValueKitchen(item.value);
                                      }}
                               />
                          </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <View style={{ flex: 1.5, alignSelf: "center" }}>
                              <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
                              Bathroom
                              </Text>
                          </View>
                          <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 5, borderColor: "#D1D1D1", flex: 3, justifyContent: 'space-between' }}>
   
                               <Dropdown
                                      style={[styles.dropdown,{width:'100%'}]}
                                      placeholderStyle={styles.placeholderStyle}
                                      selectedTextStyle={styles.selectedTextStyle}
                                      inputSearchStyle={styles.inputSearchStyle}
                                      iconStyle={styles.iconStyle}
                                      data={NumberData}
                                      search
                                      maxHeight={300}
                                      labelField="label" 
                                      itemTextStyle={{textColor:"black", color:'#000000',fontSize:14}} 
                                      valueField="value"
                                      placeholder="Select"
                                      searchPlaceholder="Search..."
                                      value={valueBathroom}
                                      onChange={(item) => {
                                          setValueBathroom(item.value);
                                      }}
                               />
                          </View>
                      </View>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                          <View style={{ flex: 1.5, alignSelf: "center" }}>
                              <Text style={{ fontSize: 16, fontWeight: "400", color: "#000000" }}>
                              Livingroom
                              </Text>
                          </View>
                          <View style={{ flexDirection: "row", borderWidth: 1, borderRadius: 5, borderColor: "#D1D1D1", flex: 3, justifyContent: 'space-between' }}>
                  
                              <Dropdown
                                      style={[styles.dropdown,{width:'100%'}]}
                                      placeholderStyle={styles.placeholderStyle}
                                      selectedTextStyle={styles.selectedTextStyle}
                                      inputSearchStyle={styles.inputSearchStyle}
                                      iconStyle={styles.iconStyle}
                                      data={NumberData}
                                      search
                                      maxHeight={300}
                                      labelField="label" 
                                      itemTextStyle={{textColor:"black", color:'#000000',fontSize:14}} 
                                      valueField="value"
                                      placeholder="Select"
                                      searchPlaceholder="Search..."
                                      value={valueLivingRoom}
                                      onChange={(item) => {
                                          setValueLivingRoom(item.value);
                                      }}
                              />
                          </View>
                      </View>
                      <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-around'}}>
                          <TouchableOpacity style={{backgroundColor:"#3CAF4B",padding:10,width:150,borderRadius:10}} onPress={ApplyDirectionFilterInternal}>
                              <Text style={{color:"black",fontSize:16,textAlign:"center"}}>APPLY</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{backgroundColor:"#FFBD00",padding:10,width:150,borderRadius:10}} onPress={ResetDirectionFilterInternal}>
                              <Text style={{color:"black",fontSize:16,textAlign:"center"}}>RESET</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>
      </View>
  }
  // end: DimenstionPOPUP
  
  // start: removeDuplicates
  // remove dublication only array 
  function removeDuplicates(arr) {
      return [...new Set(arr)];
  }
  // remove dublication array with new data 
  function removeDuplicatesParams(array, newData) {
      const seenValues = new Set(array); // Use a Set for efficient lookups 
      // Check if the new data is already in the array
      if (!seenValues.has(newData)) {
        seenValues.add(newData); // Add it to the Set if it's unique
        array.push(newData); // Add it to the array
      } 
      return [...seenValues]; // Convert Set back to array for consistency
  }
  // remove dublication from 2 array 
  function getUniqueCombinedData(arr1, arr2) {
      const uniqueValues = new Set([...arr1, ...arr2]); // Combine and create a set for uniqueness
      return Array.from(uniqueValues); // Convert back to array
  }
  // end: removeDuplicates

 
  // start: LocationPoPup
  // location api's data get 
  const ApplyLocationFilter = async (data)=>{  
      setLoader(true)
      project = []
      let url = `${APIURL}public/projects?location=${data}&mode=app`;  
      try { 
          const response = await axios.get(url); 
          response.data.map((item,index)=>{
              project.push(item);
              console.log("Location filter:-------",item);
          }); 
          
      } catch (error) {
          console.log("error--ApplyLocation Filter:",error)
      }
      finally{
          setLoader(false);
      }
  }
  // here we store the filters  
  const [locationResultRecent,setLocationResultRecent] = useState([]); 
  // get data from storage 
  useEffect(()=>{ 
    async function getLocationFilters(){
      AsyncStorage.getItem('LocationRecent')
      .then(req => JSON.parse(req))
      .then(json =>{
          if(json.length > 0){ 
              console.log("json.length:---- ",json);
              setLocationResultRecent(getUniqueCombinedData(locationResultRecent,json)); 
          }
      })
      .catch(error => console.log('error!'));
    } 
    getLocationFilters();
  },[]);
      
  // this will set the storage 
  useEffect(()=>{ 
      //  AsyncStorage.removeItem('LocationRecent');
      async function LocationRecent(){
          console.log("removeDuplicates(locationResultRecent)",locationResultRecent);
          
          await AsyncStorage.setItem('LocationRecent',JSON.stringify(locationResultRecent))
          .then(response=>{
              console.log('successfully save');
          })
          .catch(error=>{
              console.log('error while saving data');
          })
      }
      LocationRecent();
  },[locationResultRecent]);
  
  const LocationPopup = (props, { onPress }) => {
      const [selectedOption, setSelectedOption] = useState(null);
      const handleOptionSelect = (option) => {
          setSelectedOption(option);
          props.loactionpopupclosefunc(option)
      };
      // location -- start
      const [locationResult,setLocationResult] = useState([]);  
      const [value, setValue] = useState("");   
      const [searchLoading,setSearchLoading] = useState(false);
     
       

      // location -- function 
      const locationFunction = (data)=>{
          ApplyLocationFilter(data);   
          // setLocationResultRecent([...locationResultRecent,data]); 
          setLocationResultRecent(removeDuplicatesParams(locationResultRecent,data)); 
          props.loactionpopupclosefunc();
      } 
      useEffect(()=>{ 
          if (value.trim() !== '') {
              fetchSearchResults(value); 
            } else {
              setLocationResult([]); 
            }
      },[value]);

      // search function 
      const fetchSearchResults = async (text)=>{
          try{
              setSearchLoading(true); 
              let url = `public/geolist/cities/IN?q=${text}&limit=5`;
              // console.log("()()()()*********()()()()",{
              //   text, value,
              //   url 
              // })
              const response = await ApiService.Getapiheader(url);
              console.log(response);
              setLocationResult(response.cities); 
          }   
          catch(error){
              console.error("Error search data: ",error);
          }   
          finally{
              setSearchLoading(false);
          } 
      }
      const renderItem = ({ item }) => (
          <TouchableOpacity onPress={()=>{locationFunction(`${item.name}`); }}  style={{ fontSize: 14, fontWeight: "400", color: "#000000",lineHeight:35 }}>
              <Text style={{color:'#000000'}}># {item.name}</Text>
          </TouchableOpacity>
        );

      return <View>
          <Modal animationType="slide" transparent={true} visible={true}>
              <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                  <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => {
                       props.loactionpopupclosefunc()
                  }}>
                      <View  ></View>
                  </TouchableOpacity>
                  <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: 'auto', backgroundColor: "#ffffff", padding: 20 }}>
                      <TouchableOpacity style={{borderRadius:10,alignSelf:"flex-end"}} onPress={() => {
                      props.loactionpopupclosefunc()
                  }}>
                          <Image source={Images.Cancel}/>
                      </TouchableOpacity>
                       
                      <View style={{ flexDirection: "row", borderWidth: 1, justifyContent: "space-between", paddingLeft: 10, paddingRight: 10, borderRadius: 5, borderColor: "#D1D1D1",marginTop:20 }}>
                          
                          <TextInput
                              placeholder='Search Location'
                              placeholderTextColor={'#000000'}
                              style={{ height: 40, width: "80%",color:'#000000' }}
                              onChangeText={setValue}
                              value={value}
                          />
                          <Image source={Images.Arrow} style={{ height: 15, width: 15, alignSelf: "center" }} /> 
                      </View>
                      <View style={{width:'100%'}}>
                              <View style={{ marginTop: 20, marginLeft: 10,marginBottom:10 }}>
                                 
                                  {searchLoading ? (
                                      <ActivityIndicator size="large" color="blue" />
                                  ) : (
                                      <FlatList
                                      data={locationResult}
                                      keyExtractor={(item) => item.name.toString()}
                                      renderItem={renderItem}
                                      ListEmptyComponent={() => (
                                          <Text style={{ textAlign: 'center', marginTop: 10 }}>
                                          No results found.
                                          </Text>
                                      )}
                                      />
                                  )}
                              </View>
                      </View>  
                    
                      {
                          locationResultRecent && (
                              <>
                                  <View style={{ marginTop: 20, marginLeft: 5 }}>
                                      <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000" }}>
                                          Recent Search
                                      </Text>
                                  </View>
                                  <View style={{ marginTop: 20, marginLeft: 10 }}>
                                      {locationResultRecent.map((item,index)=>{
                                          return  <TouchableOpacity key={index+1} onPress={()=>locationFunction(locationResultRecent[index])}  style={{ fontSize: 14, fontWeight: "400", color: "#000000",lineHeight:35 }}>
                                                  <Text style={{color:'#000000',fontSize: 14,}}># {locationResultRecent[index]}</Text>
                                                  </TouchableOpacity>
                                      })} 
                                  </View>  
                              </>
                          )
                      }

                      <View style={{ marginTop: 20, marginLeft: 5 }}>
                          <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000" }}>
                              Most View Location
                          </Text>
                      </View>
                      <View style={{ marginTop: 20, marginLeft: 10 }}>
                          <TouchableOpacity onPress={()=>{locationFunction('indore'); }}  style={{ fontSize: 14, fontWeight: "400", color: "#000000",lineHeight:35 }}>
                             <Text style={{color:'#000000'}}># Indore</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>locationFunction('ujjain')} style={{ fontSize: 14, fontWeight: "400", color: "#000000",lineHeight:35 }}>
                              <Text style={{color:'#000000'}}># Ujjain</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>locationFunction('dewas')} style={{ fontSize: 14, fontWeight: "400", color: "#000000",lineHeight:35 }}>
                              <Text style={{color:'#000000'}}># Dewas</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>locationFunction('nagda')} style={{ fontSize: 14, fontWeight: "400", color: "#000000",lineHeight:35 }}>
                              <Text style={{color:'#000000'}}># Nagda</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>locationFunction('bhopal')} style={{ fontSize: 14, fontWeight: "400", color: "#000000",lineHeight:35 }}>
                              <Text style={{color:'#000000'}}># Bhopal</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
  
              </View>
          </Modal>
      </View>
  }
  // end: LocationPoPup 

  // calculate percentage discount
  const calculateDiscount = (basePrice, salePrice)=> {
      var percentage = (1 - (salePrice / basePrice)) * 100;
      return percentage;
  }   

  const renderItem = useCallback(({item,index}) => (
      <View key={index+1} style={{width:'100%',minHeight:90,backgroundColor:'#f1f1f1',borderRadius:9,overflow:'hidden', borderWidth:1,
      borderColor:'#eeeee4',
      shadowColor: '#ddd',  
      elevation: 11, 
      shadowOffset:{width:8,height:8},
      shadowOpacity:0.34,
      shadowRadius:3,
      marginBottom:12
      }}>          
      <View style={{width:'100%',minHeight:10,backgroundColor:'#fec107',padding:6,flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}> 
          <Text style={{fontSize:12, color:'#131313'}}>  {item.plotArea} {item.status} </Text>
      </View>
      <View style={{padding:0}}> 
          <ImageContainer index={index} data={item.image.img} projectid={item.projectID} navigation={navigation}/>
          <Text style={{position:'absolute',bottom:6,right:4,padding:8,backgroundColor:'#27a343',color:'#fff',borderRadius:6}}>{item.designStyleTitle}</Text>
      </View>
      <View style={{width:'100%',minHeight:10,backgroundColor:'#fec107'}}> 
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{padding:6,width:'25%',backgroundColor:'#002551',justifyContent:'center',alignContent:'center',alignItems:'center',borderTopWidth:1,borderColor:"#dee3e0"}}>
                  <Text style={{fontSize:13, color:'#ffff'}}>SQFT</Text>   
              </View>
              <View style={{padding:6,width:'25%',backgroundColor:'#002551',justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1,borderBottomWidth:0,borderColor:"#dee3e0",borderEndWidth:0}}>
                  <Text style={{fontSize:13, color:'#fff'}}>FLOORS</Text>  
              </View>
              <View style={{padding:6,width:'25%',backgroundColor:'#002551',justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1,borderBottomWidth:0,borderColor:"#dee3e0"}}>
                  <Text style={{fontSize:13, color:'#fff'}}>DIRECTION</Text>  
              </View>
              <View style={{padding:6, width:'25%',backgroundColor:'#002551',justifyContent:'center',alignContent:'center',alignItems:'center',borderTopWidth:1,borderColor:"#dee3e0"}}>
                  <Text style={{fontSize:13, color:'#fff'}}>BEDROOM</Text>  
              </View> 
          </View>
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{padding:10, width:'25%',backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:14, color:'#131313'}}>{item.carpet_area}</Text>   
              </View>
              <View style={{padding:10,width:'25%',backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1,borderTopWidth:0,borderBottomWidth:0,borderColor:"#dee3e0",borderEndWidth:0}}>
                  <Text style={{fontSize:14, color:'#131313'}}>{item.floors}</Text>  
              </View>
              <View style={{padding:10,width:'25%',backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1,borderTopWidth:0,borderBottomWidth:0,borderColor:"#dee3e0",}}>
                    {
                        item.direction == 'WW'? 
                        <Text style={{fontSize:14, color:'#131313'}}>West</Text>  
                        :
                        item.direction == 'NN'? 
                        <Text style={{fontSize:14, color:'#131313'}}>North</Text>  
                        :
                        item.direction == 'SS'? 
                        <Text style={{fontSize:14, color:'#131313'}}>South</Text>  
                        :
                        item.direction == 'EE'? 
                        <Text style={{fontSize:14, color:'#131313'}}>East</Text>  
                        :
                        item.direction == 'NW'? 
                        <Text style={{fontSize:14, color:'#131313'}}>North West</Text>  
                        :
                        item.direction == 'NE'? 
                        <Text style={{fontSize:14, color:'#131313'}}>North East</Text>  
                        :
                        item.direction == 'SW'? 
                        <Text style={{fontSize:14, color:'#131313'}}>South West</Text>  
                        :
                        item.direction == 'SE'? 
                        <Text style={{fontSize:14, color:'#131313'}}>South East</Text>  
                        :
                        null
                    }
                  
              </View>
              <View style={{padding:10, width:'25%',backgroundColor:'#fff',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:14, color:'#131313'}}>{item.bedroom}</Text>  
              </View> 
          </View>
      </View>
      </View>
  ), []); 

  return (
    <SafeAreaView style={{  }}>
    {/* Start: SearchBox */}
    <View style={{ backgroundColor: Colors.SecondaryColor, height: Util.getHeight(7), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#D4D4D4" }}>
                <TouchableOpacity style={{ flex: 0.8 }} onPress={() => navigation.goBack()}> 
                     <ArrowLeftLight  width={18} height={18} />
                </TouchableOpacity>
                <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-start",  }}>
                
                    <Text style={{  alignSelf: "center", color: '#ffffff', fontSize: 18, fontWeight: "400" }}>
                        Architectural Design
                    </Text>
                </View>
                <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={{ width: 25, height: 25 }}>
                        <Image resizeMode={"contain"} source={Images.Notification} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', }}>
                        <Image resizeMode={"contain"} source={Images.User_dash} style={{ width: 20 }} />
                    </TouchableOpacity>
                </View>
    </View>
    {/* End: SearchBox */}

    {/* Start: Filters */}
    {/* <View style={{maxWidth:windowWidth, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#ffffff" ,padding:10, borderBottomWidth:1, borderColor:'#D1D1D1'}}> */}
    <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:'#ffffff', height:60, width:windowWidth, borderBottomWidth:1, borderColor:'#D1D1D1', paddingVertical:10}}>
        <TouchableOpacity style={{ minWidth: windowWidth/3+20 , flexDirection: "row", borderWidth: 1, padding: 5, borderColor: "#D1D1D1", borderRadius: 8, paddingLeft: 5, paddingRight: 5 , marginHorizontal:6, marginLeft:8 }} onPress={() => setDimensionpopup(true)}>
            <Image resizeMode={"contain"} source={Images.Search} style={{ width: 25, height: 25, alignSelf: "center" }} />
            <Text style={{ paddingLeft: 10, alignSelf: "center", color: '#000000', fontSize: 14, fontWeight: "500" }}>
                By Dimensions
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{minWidth: windowWidth/3, flexDirection: "row", borderWidth: 1, padding: 5, borderColor: "#D1D1D1", borderRadius: 8, paddingLeft: 5, paddingRight: 5, marginHorizontal:6 }} onPress={()=>setloactionpopup(true)}>
            <Image resizeMode={"contain"} source={Images.Search} style={{ width: 25, height: 25, alignSelf: "center" }} />
            <Text style={{ paddingLeft: 10, alignSelf: "center", color: '#000000', fontSize: 14, fontWeight: "500" }}>
                By Location
            </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={{ minWidth: windowWidth/4, flexDirection: "row", borderWidth: 1, padding: 5, borderColor: "#D1D1D1", borderRadius: 8, paddingLeft: 5, paddingRight: 5, marginHorizontal:6 }} onPress={()=>setfilterpopup(true)}>
            <Image resizeMode={"contain"} source={Images.Slider} style={{ width: 25, height: 25, alignSelf: "center" }} />
            <Text style={{ paddingLeft: 10, alignSelf: "center", color: '#000000', fontSize: 14, fontWeight: "500" }}>
                Filter
            </Text>
        </TouchableOpacity>
            <View style={{minWidth: 20}}></View>
        </ScrollView>
    {/* </View> */}
    {/* End: Filters  */}
    
    {/* Start: show products  */}
    <View style={{backgroundColor:'#fff'}}>  
        {/* start: Show prodcuts here */}
        {
            loader?<>
                <View
                style={{ 
                    height: windowHeight-60,
                    width: '100%',
                    padding:10  
                  }}
                >
                  <Loader/>
                  <Loader/>
                  <Loader/> 
                </View>
            </>: 
            (
                project.length > 0 ? <>
                    <VirtualizedList
                        windowSize={6}
                        data={project}
                        initialNumToRender={6}
                        style={{
                            width: "100%", alignSelf: 'center', height:windowHeight- 60,
                            marginBottom: 100,padding:8, paddingTop:12,paddingBottom: 50, 
                        }} 
                        renderItem={renderItem}
                        keyExtractor={(item,index) => index}
                        getItemCount={getItemCount}
                       
                        getItem={getItem}
                        onEndReached={infiniteScrolling}
                        onEndReachedThreshold={0.7}
                        ListFooterComponent={renderFooter}

                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false} 
                    />
                </>:<View style={{padding:12}}>
                        <Text style={{color:"#212121"}}>No Product Found.</Text>
                </View>
            ) 
        } 
        {/* end: Show prodcuts here */}

        {
            Dimensionpopup &&
            <View style={{  }}>
                <DimensionPopup notificationclosefunc={notificationclosefunc} navigation={navigation} />
            </View>
        }
        {
            loactionpopup &&
            <View style={{  }}>
                <LocationPopup loactionpopupclosefunc={loactionpopupclosefunc} navigation={navigation} />
            </View>
        }
        
        {
            filterpopup &&
            <View style={{  }}>
                <FilterPopup filterpopupclosefunc={filterpopupclosefunc} navigation={navigation} filtersData={filtersData} filtersMain={filtersMain} clearAll={clearAll}/>
            </View>
        } 
        

    </View>
    {/* end: show products  */} 

    </SafeAreaView> 
  )
}

export default ArchitectList

const styles = StyleSheet.create({
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
  },
  modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 25,
      shadowColor: '#000000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: 160,
      width: 220

  },
  button: {
      borderRadius: 15,
      padding: 5,
      elevation: 2,
  },
  buttonOpen: {
      backgroundColor: '#F194FF',
  },
  buttonClose: {
      backgroundColor: '#2196F3',
  },
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  modalText: {
      color: "#000000",
      fontSize: 17,
      lineHeight: 35,
      fontWeight: "600"
  },
  modalText2: {
      color: "#000000",
      fontSize: 13,
      lineHeight: 15
  },
  // start: dropdoen
    dropdown: { 
      color:'#000000', 
      width:'100%',
      padding:6 
    },
    icon: {
      marginRight: 5,
      color:'#000000'
    },
    placeholderStyle: {
      fontSize: 14,
      color:'#000000',
    },
    selectedTextStyle: {
      fontSize: 14,
      color:'#000000',
    },
    iconStyle: {
      width: 20,
      height: 20,
      color:'#000000'
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      color:'#000000',
    },
  // end: dropdoen
});