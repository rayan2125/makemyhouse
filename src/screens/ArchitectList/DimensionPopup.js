import React, { useState,useEffect, useCallback } from 'react'
import {VirtualizedList, BackHandler, View, Text, Modal, Image,StyleSheet, SafeAreaView, TouchableOpacity, TextInput,Dimensions,ActivityIndicator, ScrollView  } from 'react-native'
 
import { Dropdown } from "react-native-element-dropdown"; 
import Images from '../../utility/images'
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
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
        props.ApplyDirectionFilter(dataObj);
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
        props.setPageHandler();
        setTimeout(()=>{  
            props.ResetDirectionFilter();
            props.notificationclosefunc();
        },10);
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
                                    data={props.data}
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
                                    data={props.NumberData}
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
                                    data={props.NumberData}
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
                                    data={props.NumberData}
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
                                    data={props.NumberData}
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

export default DimensionPopup;



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