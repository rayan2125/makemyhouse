import React, { useState,useEffect, useCallback } from 'react'
import {VirtualizedList, BackHandler, View, Text, Modal, Image,StyleSheet, SafeAreaView, TouchableOpacity, TextInput,Dimensions,ActivityIndicator, ScrollView  } from 'react-native'
import { FlatList } from 'react-native'
 
import Images from '../../utility/images'
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const FilterPopup = (props, { onPress }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [type, settype] = useState(1);
    const [selectimage, setselectimage] = useState(''); 
 
    useEffect(()=>{
        async function temp(){
            currentFilterFun(props.filtersMain[0]);
        
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
        // await AsyncStorage.setItem('currentFilterFun',data);
        setCurrentFilter(data); 
        const imageCategoryArray = getCategoryArray(data);
        // console.log("imageCategoryArray: ",{imageCategoryArray,data})
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
              if(props.onlyValue.includes(key.toLowerCase()) != true ){ 
                   setselectimage(key);  
                   // await AsyncStorage.setItem("othersFilters",key.toLowerCase());
                   // console.log("------------------------------", await AsyncStorage.getItem('othersFilters'));
                    
                    props.urlQueryParamsHandler(
                        {
                            key:currentFilter == "design_style" ? "subcategory": currentFilter == "design_category" ? "categorytype" : currentFilter ,
                            value:key
                        }
                    )
              }else{
                setselectimage('');  
                // await AsyncStorage.removeItem("othersFilters");
                props.removeTheSpecificdata( {
                    key:currentFilter == "design_style" ? "subcategory": currentFilter == "design_category" ? "categorytype" : currentFilter ,
                    value:key
                });
              }
            }}> 

            {/* {  
                (selectimage === key.toLowerCase() &&  Array.isArray(allValuesData)&& allValuesData.includes(key.toLowerCase()) == true ) 
                ? 
                <Image source={Images.FilterSelect} style={{ height: 20, width: 20.5 }} />  
                : 
                <Image source={Images.FilterUnselect} style={{ height: 20, width: 20.5 }} /> 
            }   */}

            {
                Array.isArray(props.onlyValue) == true && props.onlyValue.includes(key.toLowerCase()) == true ?
                (
                    selectimage == key.toLowerCase() ?
                    <Image source={Images.FilterSelect} style={{ height: 20, width: 20.5 }} />  
                    :
                    <Image source={Images.FilterSelect} style={{ height: 20, width: 20.5 }} />  
                ):
                <Image source={Images.FilterUnselect} style={{ height: 20, width: 20.5 }} />  
            }
             
            <View style={{ marginLeft: 20 }}>
                <Text style={{ fontSize: 15, fontWeight: "500", color: "#000000", }}>
                    {label}
                    {/* {
                        Array.isArray(allValuesData) == true && allValuesData.includes(key.toLowerCase()) == true ?
                        "true" 
                        :
                        "false"
                    } */}
                </Text> 
            </View>
        </TouchableOpacity>
        );
    };

      // apply filters 
      const applyFilters = ()=>{
        //   if(currentFilter == 'design_style'){
        //       // subcategory 
        //       props.othersFiltersFunction('subcategory',selectimage);
        //       props.filterpopupclosefunc() 
        //   }else if(currentFilter == "design_category"){
        //       // categorytype 
        //       props.othersFiltersFunction('categorytype',selectimage); 
        //       props.filterpopupclosefunc() 
        //   }else{
        //       props.othersFiltersFunction(currentFilter,selectimage);
        //       props.filterpopupclosefunc()     
        //   }
        props.othersFiltersFunction();
        props.filterpopupclosefunc()
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
                        <TouchableOpacity style={{alignSelf: "center"}} onPress={async ()=>{
                                setselectimage(0);  setCurrentFilter('');  setFilterInternalData([]); 
                                // await AsyncStorage.removeItem('othersFilters');  
                                props.filterpopupclosefunc(); 
                                props.clearAll(); 
                        }}>
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
export default FilterPopup; 