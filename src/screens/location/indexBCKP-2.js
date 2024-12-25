import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'

// header 
import ScndHeader from '../../components/headers/scndHeader'
import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'

// components 
import CTMTextInput from '../../components/textInput'; 
import CTMButton from '../../components/button'

import Colors from '../../utility/color'
import FontSize,{FontWeight} from '../../utility/fonts'  
import Images from '../../utility/images'

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

import FiltersDataDesign from '../../components/carousels/filtersDataDesign';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

import DesignPlanning from '../../components/designAndPlanning'

import AccordionItem from '../../components/faqAccordian';

import {actuatedNormalizeVertical} from '../../utility/scaling';

import Banner from '../../components/carousels/banner'
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// maps 
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import GlobalData from '../../utility/config';
// below is MMH api-key which gives an error: to active billing on the google map 
 
// thatswhy i use the plot-khreadoo google-map api key to make my work done 
 

Geocoder.init(GlobalData.GOOGLE_API_KEY);
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//main screen 
const DetectLocation = ()=>{

    const  navigation = useNavigation();   

    // start: map 
    const mapRef = useRef(null); 
    const [maptypeval, setmaptypeval] = useState('standard');  

    const [region, setRegion] = useState(null);

    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [defaultLocationMarker,setDefaultLocationMarker] = useState(true);

    const [getAddressBoolen,setGetAddressBoolen] = useState(false);
    const [getAddressData,setGetAddressData] = useState(null);

    const getCurrentLocationHandler = ()=>{
        Geolocation.getCurrentPosition(info =>{
            console.log("info:--", info.coords);
            setRegion({
                latitude:info.coords.latitude,
                longitude:info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
            mapRef.current?.animateToRegion({
                latitude:info.coords.latitude,
                longitude:info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            gteAddress(info.coords.latitude,info.coords.longitude);
            setMarkerCoordinate(''); 
            setDefaultLocationMarker(true);
        });
    } 
    useEffect(() => {
        // Get current location
        getCurrentLocationHandler();
    }, []);

    const gteAddress = (latitude,longitude)=>{
        Geocoder.from(latitude,longitude)
        .then(json => {
            let addtitle = '';
            let addtitle1 = '';
            let addtitle2 = '';
            if(json.results[0].address_components[0].long_name){
                addtitle1 = json.results[0].address_components[0].long_name;
            }
            if(json.results[0].address_components[1].long_name){
                addtitle2 = json.results[0].address_components[1].long_name;
            }
            addtitle = addtitle1+','+addtitle2;
            var fulladdress = json.results[0].formatted_address;
            console.log(fulladdress);
            setGetAddressData(fulladdress);
            // get the full address
            AsyncStorage.setItem('location',fulladdress);
            setTimeout(()=>{ 
                setGetAddressBoolen(true);
            },400);
        }).catch(error => console.warn(error));
    }
    
    const chnageMarkerToMyLocation = (e)=>{
        setMarkerCoordinate(e.nativeEvent.coordinate); 
        setDefaultLocationMarker(false);
        gteAddress(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)
    }
    

    const onRegionChange = ()=>{
        console.log("on region change");
    } 


    // auth-complete textInput 
    const placesRef = useRef();

    const getAddress = () => {
        console.log(placesRef.current?.getAddressText());
    };

    // end: map 
    
    
    const [isLoading,setIsLoading] = useState(false); 
   
    // signIN 
    const getTheLocationGoFurtherHandler = ()=>{
      console.log("get The Location Go Further Handler");
      setIsLoading(true); 
      setTimeout(()=>{
        setIsLoading(false); 
        navigation.navigate('AddNewSiteFillDetails')
      },1200);
    } 
    

    const [isFocused, setIsFocused] = useState(false);
    useEffect(()=>{
        console.log("isFocused:",isFocused);
    },[isFocused]);


    return(
        <ScreenWrapper>
            {/* Start: Header */}
            <ScndHeader 
                Title="Add New Site" 
                Search={false} 
                Profile={false}  
                Back={false}
                BackScreen="" 
                Skip={false} 
                SkipScreen=""  
            />
            {/* End: Header */} 
            <View></View>
            <GooglePlacesAutocomplete
                placeholder="Type a place"
                onPress={(data, details = null) => {
                    console.log({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                    })
                    console.log(details.address_components)
                }}
                query={{key: GlobalData.GOOGLE_API_KEY}}
                fetchDetails={true}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                ref={placesRef} 
                textInputProps={{
                    style: {
                         color: 'red',
                         height:60
                    },
                    onFocus: () => setIsFocused(true),
                    onBlur: () => setIsFocused(false),
                }}
                styles={{
                    container: { 
                    flex:0,
                    backgroundColor:'yellow', 
                    borderRadius:9
                    },
                    // option container
                    description: {
                        color: '#000',
                        fontSize: FontSize.h4-2,
                        fontWeight:FontWeight.medium,
                        color:Colors.gray
                    },
                    predefinedPlacesDescription: {
                        color: '#3caf50', 
                    },
                    color:'red', 
                    fontSize: FontSize.h4-2,
                    fontWeight:FontWeight.medium,
                    backgroundColor:'green'
                }} 
            />
            <View style={[styles.container,{position:'relative'}]}>  
                {region ? (
                    <MapView
                        ref={mapRef} 
                        provider={PROVIDER_GOOGLE}
                        mapType={maptypeval} 
                        style={styles.map}
                        initialRegion={region}
                        // onRegionChange={onRegionChange}
                        onPress={(e) => {chnageMarkerToMyLocation(e)}}
                        showsUserLocation={true}
                        followsUserLocation= {true}
                        loadingEnabled={false}
                        showsMyLocationButton={false}
                    >
                        {markerCoordinate && <Marker coordinate={markerCoordinate}  image={Images.LocationMarker} />}

                        {defaultLocationMarker && <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude, }} image={Images.LocationMarker}/>}

                        {/* <Marker
                            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                            title="Your Location"
                        /> */}
                    </MapView>
                ) : (
                    <Text style={{color:'red',padding:12}}>Loading...</Text>
                )}

                <TouchableOpacity style={[styles.DetechLocation,getAddressBoolen == true?isFocused == false?{bottom:290}:{bottom:10}:{bottom:10}]} onPress={()=>getCurrentLocationHandler()}>
                    <AutoHeightImage
                        width={30}
                        source={Images.DetechLocation}
                    />
                </TouchableOpacity>
                {
                    !isFocused && 
                    
                    (
                        getAddressBoolen && ( 
                            <View style={styles.showAddressBar}>
                                    <Text style={{color:Colors.black,fontSize:FontSize.h3+2,fontWeight:FontWeight.medium,marginBottom:14}}>Select Location</Text>
                                    <Text style={{color:Colors.lightGray, fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Your Location</Text>
                                    <View style={{width:'100%',minHeight:60,marginVertical:12,flexDirection:'row',marginBottom:22}}>
                                            <View style={{width:'12%'}}>
                                                <AutoHeightImage
                                                    width={35}
                                                    source={Images.LocationIconWithCircle}
                                                />    
                                            </View>   
                                            <View style={{width:'88%'}}>
                                                <Text style={{color:'black',color:Colors.blackShadeTwo,fontSize:FontSize.h4,fontWeight:FontWeight.medium}}>{getAddressData}</Text> 
                                            </View>
                                    </View>    
                                    <CTMButton btnText="Continue" theme="default" marginBottom={true} functionType="createaccount" onPress={getTheLocationGoFurtherHandler} isLoading={isLoading} /> 
                            </View>
                        )                    
                    )
                }

            </View>
         </ScreenWrapper>       
    )
}


const styles = new StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:'100%'
      },
      map: {
        width: '100%',
        height: '100%',
      },
      DetechLocation:{
        width:60,
        height:60,
        backgroundColor:'red',
        position:'absolute',
        
        right:10,  
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(76,176,80,0.5)',
        borderRadius:32    
      },
      showAddressBar:{
        width:'100%',
        height:280,
        backgroundColor:'#ECF3FF',
        position:'absolute',
        bottom:0,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        padding:12,
        paddingVertical:32
      }
})

export default DetectLocation
