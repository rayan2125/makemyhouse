import React, { useState,useEffect, useCallback } from 'react'
import {VirtualizedList, BackHandler, View, Text, Modal, Image,StyleSheet, SafeAreaView, TouchableOpacity, TextInput,Dimensions,ActivityIndicator, ScrollView  } from 'react-native'
import { Util } from '../../utility/scaling'
import { FlatList } from 'react-native'
import Colors from '../../utility/color';
import ArrowLeftLight from '../../../assets/images/icons/arrowLeftLight.svg'; 

import ApiService from '../../ApiServices'
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation,useNavigationState } from '@react-navigation/native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import axios from 'axios';

import ImageContainer from './ImageContainer'

import Images from '../../utility/images'

let token = ''; 
let project = new Array();

import {GlobalData} from '../../utility/config.js';
// let APIURL = GlobalData.APIURL;  
let APIURL = 'https://api.makemyhouse.com/'; 

import AsyncStorage from '@react-native-async-storage/async-storage';

import ScndHeader from '../../components/headers/scndHeader';
 
import Loader from './loader' 


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

import FilterPopup from './FilterPopup.js';
import DimensionPopup from './DimensionPopup.js';
import LocationPopup from './LocationPopup.js';

// export const keepQueryParams = (url, paramsToKeep) => {
//     // Create a URL object
//     const urlObj = new URL(url);
    
//     // Create a URLSearchParams object from the current query parameters
//     const queryParams = new URLSearchParams(urlObj.search);
    
//     // Create a new URLSearchParams object to store the parameters to keep
//     const filteredParams = new URLSearchParams();
    
//     // Iterate through the parameters to keep
//     paramsToKeep.forEach(param => {
//       if (queryParams.has(param)) {
//         filteredParams.set(param, queryParams.get(param));
//       }
//     });
    
//     // Construct the new query string
//     const newQueryString = filteredParams.toString();
    
//     // Return the new query string with the parameters
//     return newQueryString ? `?${newQueryString}` : '';
// }


const ArchitectList = ({navigation,route}) => {

    useEffect(()=>{
        AsyncStorage.removeItem("ShareUrlFilters");
    },[]);
    
    const [shareFilters,setShareFilters] = useState('');
    
    const ShareFiltersHandler = (url,type)=>{
        // before starting the filter clear its value 
        AsyncStorage.removeItem("ShareUrlFilters");
        // direction basically the dimension filters
        if(type=="direction" ){

            console.log("Direction filters share ", url.split(`https://api.makemyhouse.com/public/projects?page=1&mode=app`)[1]);

            let aa = url.split(`https://api.makemyhouse.com/public/projects?page=1&mode=app`)[1];

            setShareFilters(aa);
            AsyncStorage.setItem("ShareUrlFilters", aa);
        
            // Parameters to keep
        // const paramsToKeep = ['min_area', 'max_area', 'direction', 'floors', 'bedroom', 'kitchen', 'bathroom', 'living_room'];
            
        //  const resultQueryParams = keepQueryParams(url, paramsToKeep);

            // console.log("Filters---->>>>: ", resultQueryParams);
            // AsyncStorage.removeItem("ShaveFilters");
            // AsyncStorage.setItem("ShaveFilters",url);
        }

        if(type == 'location'){
            console.log("location Filters share ",  url);
            
            let aa = url.split(`https://api.makemyhouse.com/public/projects?page=1&mode=app`)[1];

            setShareFilters(aa);
            AsyncStorage.setItem("ShareUrlFilters", aa);
        
        }

        if(type == "othersFilters"){
            console.log("Others filters share :", url.split(`public/projects?page=1&mode=app`)[1]);
            
            let aa = url.split(`public/projects?page=1&mode=app`)[1];

            setShareFilters(aa);
            AsyncStorage.setItem("ShareUrlFilters", aa);
        
        }  
    }

    
  // function to create a query params...
  function createUrl(paramsArray) {
    // Map over the array and create key=value pairs
    const queryParams = paramsArray.map(param => {
        return `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`;
    }).join('&'); // Join them with &

    // Return the complete URL as a string
    return `${queryParams}`;
    }
  
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
      if(route && route.params){ 
          console.log("iF Condition: route.params",route.params);
          // here define different filters and get the data 
          if((route.params.data.see_all == false || route.params.data.See_all == false)){
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
                    AsyncStorage.setItem('appliedFilters',route.params.data.location);
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
                    AsyncStorage.removeItem('appliedFilters');
                    AsyncStorage.setItem('appliedFilters',dataObj);
                    ApplyDirectionFilter(dataObj);
                }

                if(route.params.data.seeAllType == 'othersFilters'){
                    let mainKey = route.params.data.mainKey;
                    let mainValue = route.params.data.mainValue; 
                    AsyncStorage.removeItem('appliedFilters');
                    AsyncStorage.setItem('appliedFilters',[mainKey,mainValue]);
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
              console.log("apply filters: ", url);

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
              let url = `${APIURL}public/projects?page=${page}&limit=9&mode=app&token=${tokenS}${shareFilters}`;
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
  const [urlQueryParams,seturlQueryParams] = useState([]);
  const [onlyValue,setonlyValue] = useState([]);
  const [onlyKeys,setOnlyKeys] = useState([]);
 // setonlyValue([]); seturlQueryParams([]);  setOnlyKeys([]);
  function updateArrays(key, newValue) {
    let keyFound = false;
    
    // Update array aa
    for (let i = 0; i < urlQueryParams.length; i++) {
        if (urlQueryParams[i].key === key) {
            // Replace the value if key is found
            let oldValue = urlQueryParams[i].value;
            urlQueryParams[i].value = newValue;
            keyFound = true;
            
            // Update array bb
            let index = onlyValue.indexOf(oldValue);
            if (index !== -1) {
                onlyValue[index] = newValue;
            }
            break;
        }
    }

    // If key not found, add the new key-value pair
    if (!keyFound) {
        seturlQueryParams((prev)=>[...prev,{key:key,value:newValue}]);   
    }
    
    // Update array bb for the new value if it wasn't updated above
    if (!onlyValue.includes(newValue)) {
        setonlyValue((prev)=>[...prev,newValue]);
    }
  }

  const urlQueryParamsHandler = (data)=>{
    console.log("urlQueryParamsHandler console data: ",data);

    // // check if the key value is already present then replace it with the new data 
    // seturlQueryParams((prev)=>[...prev,{key:data.key,value:data.value}]);   

    // // remove the previous key with the new one. -- previous data is get from the above function 
    // setonlyValue((prev)=>[...prev,data.value]);

    updateArrays(data.key, data.value)

    // working fine. 
    setOnlyKeys((prev)=>[...prev,data.key]);
  } 
  useEffect(()=>{
    console.log("only value: ", onlyValue)
  },[onlyValue]);

  const removeTheSpecificdata = (data)=>{
    console.log("remove this data from every array: ", data);
    let updatedArray = urlQueryParams.filter(item =>
        !(item.key === data.key && item.value === data.value)
    ); 
    seturlQueryParams(updatedArray); 

    let removedValued = onlyValue.filter(item => item !== data.value);
    setonlyValue(removedValued);

  }


  // main filterpop function for projects 
  const othersFiltersFunction = async (mainKey,mainValue)=>{
    console.log("other filters: ", urlQueryParams);
    setLoader(true);
    project = [];
    const urlWithParams = createUrl(urlQueryParams);
    try{
        if(urlWithParams != '' || urlWithParams != null || urlWithParams != undefined){
            let url = `public/projects?page=1&mode=app&${urlWithParams}`;
            console.log("othersFiltersFunction url -- filterPOPUP:", url);
            ShareFiltersHandler(url,'othersFilters') 
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
                console.log("error--Others filtersr 1:",error) 
                setLoader(false);  
            })
        }else{
            Trendingapicall();
        }
    } 
    catch (error) {
      console.log("error--Others filtersr 2:",error) 
      setLoader(false);
      Trendingapicall();
    } 
  } 

    const clearAll = (val) => {
        console.log(false,"000000000000000000000000000000000000000")
        setonlyValue([]); 
        seturlQueryParams([]);  
        setOnlyKeys([]);
        project = [];
        Trendingapicall();
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
      ShareFiltersHandler(url,"direction");
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
  const setPageHandler = ()=>{
    setPage(1);
  }
  // end: Reset Direction Filter
 
  

 
  // start: LocationPoPup
  // location api's data get 
  const ApplyLocationFilter = async (data)=>{  
      setLoader(true)
      project = []
      let url = `${APIURL}public/projects?page=1&mode=app&location=${data}`;  
      ShareFiltersHandler(url,'location')
      try { 
          const response = await axios.get(url); 
          response.data.map((item,index)=>{
              project.push(item);
              // console.log("Location filter:-------",item);
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
  const setLocationResultRecentHandler =(data)=>{
    setLocationResultRecent(data)
  }
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

  
    // remove dublication from 2 array 
    function getUniqueCombinedData(arr1, arr2) {
        const uniqueValues = new Set([...arr1, ...arr2]); // Combine and create a set for uniqueness
        return Array.from(uniqueValues); // Convert back to array
    } 
      
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
  // end: LocationPoPup 
 
  //start: main product show item
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
          <ImageContainer index={index} path={item.image.dirLoc} data={item.image.img} projectid={item.projectID} navigation={navigation}/>
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
  //end: main product show item

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
                {/* <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity style={{ width: 25, height: 25 }}>
                        <Image resizeMode={"contain"} source={Images.Notification} style={{ width: 25, height: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', }}>
                        <Image resizeMode={"contain"} source={Images.User_dash} style={{ width: 20 }} />
                    </TouchableOpacity>
                </View> */}
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
                <DimensionPopup data={data} NumberData={NumberData} notificationclosefunc={notificationclosefunc} navigation={navigation} ApplyDirectionFilter={ApplyDirectionFilter} ResetDirectionFilter={ResetDirectionFilter} setPageHandler={setPageHandler}/>
            </View>
        }
        {
            loactionpopup &&
            <View style={{  }}>
                <LocationPopup loactionpopupclosefunc={loactionpopupclosefunc} navigation={navigation} ApplyLocationFilter={ApplyLocationFilter} setLocationResultRecentHandler={setLocationResultRecentHandler} locationResultRecent={locationResultRecent}/>
            </View>
        }
        
        {
            filterpopup &&
            <View style={{  }}>
                <FilterPopup othersFiltersFunction={othersFiltersFunction} filterpopupclosefunc={filterpopupclosefunc} navigation={navigation} filtersData={filtersData} filtersMain={filtersMain} clearAll={clearAll} urlQueryParamsHandler={urlQueryParamsHandler} onlyValue={onlyValue} removeTheSpecificdata={removeTheSpecificdata}/>
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