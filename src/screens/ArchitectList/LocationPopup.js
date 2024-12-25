
import React, { useState,useEffect, useCallback } from 'react'
import {VirtualizedList, BackHandler, View, Text, Modal, Image,StyleSheet, SafeAreaView, TouchableOpacity, TextInput,Dimensions,ActivityIndicator, ScrollView  } from 'react-native'

import { FlatList } from 'react-native'
 
import ApiService from '../../ApiServices'

import Images from '../../utility/images'
 
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
     

    // location -- function 
    const locationFunction = (data)=>{
        props.ApplyLocationFilter(data);   
        // setLocationResultRecent([...locationResultRecent,data]); 
        props.setLocationResultRecentHandler(removeDuplicatesParams(props.locationResultRecent,data)); 
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
                        props.locationResultRecent && (
                            <>
                                <View style={{ marginTop: 20, marginLeft: 5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "700", color: "#000000" }}>
                                        Recent Search
                                    </Text>
                                </View>
                                <View style={{ marginTop: 20, marginLeft: 10 }}>
                                    {props.locationResultRecent.map((item,index)=>{
                                        return  <TouchableOpacity key={index+1} onPress={()=>locationFunction(props.locationResultRecent[index])}  style={{ fontSize: 14, fontWeight: "400", color: "#000000",lineHeight:35 }}>
                                                <Text style={{color:'#000000',fontSize: 14,}}># {props.locationResultRecent[index]}</Text>
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


export default LocationPopup;



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