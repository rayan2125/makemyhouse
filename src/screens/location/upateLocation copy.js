import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions, Image } from 'react-native'
import React, { useState, useEffect, useRef, useCallback} from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper';

// header 
import ScndHeader from '../../components/headers/scndHeader';


// components 

import CTMButton from "../../components/button/index"

import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts'; 


import { actuatedNormalizeVertical } from '../utility/scaling';

import { useNavigation  } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// maps 
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import GlobalData from '../utility/config';
// below is MMH api-key which gives an error: to active billing on the google map 
 
// thatswhy i use the plot-khreadoo google-map api key to make my work done 

// locatino 
Geocoder.init(GlobalData.GOOGLE_API_KEY);
 
// Start: icons 

import DetechLocation from '../../../assets/images/icons/locationDetect.svg'
import LocationMarker from '../../../assets/images/icons/locationMarker.svg'
import LocationWithCircle from '../../../assets/images/icons/locationCircle.svg';
 
import { actuatedNormalize } from '../utility/scaling';
// end: icons

import { useFocusEffect } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//main screen 
const DetectLocationUpdate = ()=>{

    const  navigation = useNavigation();   

    // start: map 
    const mapRef = useRef(null); 
    const [maptypeval, setmaptypeval] = useState('standard');  
 
    // let updateddLocation = {};
    const [updateddLocation,setUpdateddLocation] = useState({});

    const [region, setRegion] = useState({});

    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [defaultLocationMarker,setDefaultLocationMarker] = useState(true);

    const [getAddressBoolen,setGetAddressBoolen] = useState(false);
    const [getAddressData,setGetAddressData] = useState(null); 
 
    useFocusEffect(
        useCallback( () => { 
            AsyncStorage.getItem('updatescreenlocation',(err,creds)=>{
                console.log("update location creds from details screen:",JSON.parse(creds));
                let aa = JSON.parse(creds);
                setUpdateddLocation({
                    latitude:parseFloat(aa.lat),
                    longitude:parseFloat(aa.long),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
                setRegion({
                    latitude:parseFloat(aa.lat),
                    longitude:parseFloat(aa.long),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
                mapRef.current?.animateToRegion({
                    latitude:parseFloat(aa.lat),
                    longitude:parseFloat(aa.long),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
                gteAddress(parseFloat(aa.lat),parseFloat(aa.long));
                setMarkerCoordinate(''); 
                setDefaultLocationMarker(true);
            }); 
          return () => { 
            console.log('signin screen ');  
          };
        }, [])
    );

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

    const gteAddress = (latitude,longitude)=>{
        Geocoder.from(latitude,longitude)
        .then(json => {
            // let addtitle = '';
            // let addtitle1 = '';
            // let addtitle2 = '';
            // if(json.results[0].address_components[0].long_name){
            //     addtitle1 = json.results[0].address_components[0].long_name;
            // }
            // if(json.results[0].address_components[1].long_name){
            //     addtitle2 = json.results[0].address_components[1].long_name;
            // }
            // addtitle = addtitle1+','+addtitle2;
            let city = null;
            let state = null;
            let short_State = null
            let addressComponents = json.results[0].address_components;
            for (let i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].types.includes("locality")) { 
                    city = addressComponents[i].long_name;
                }
                if (addressComponents[i].types.includes("administrative_area_level_1")) {
                    console.log("-------------------", addressComponents[i])
                    state = addressComponents[i].long_name;
                    short_State = addressComponents[i].short_name;
                }
            }
            var fulladdress = json.results[0].formatted_address;  
            console.log(fulladdress);
            setGetAddressData(fulladdress);
            // get the full address
            AsyncStorage.removeItem('location'); 
            AsyncStorage.setItem('location',JSON.stringify({
                fulladdress,
                latitude,
                longitude,
                city,
                state,
                short_State
            }));
            setTimeout(()=>{ 
                setGetAddressBoolen(true);
            },400);
        }).catch(error => 
            console.warn(error)
            
        );
    }
    
    const chnageMarkerToMyLocation = (e)=>{
        console.log(e.nativeEvent.coordinate);
        setMarkerCoordinate(e.nativeEvent.coordinate); 
        setDefaultLocationMarker(false);
        gteAddress(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude); 
        AsyncStorage.setItem('updatescreenlocation',JSON.stringify(
            {
                lat:e.nativeEvent.coordinate.latitude,
                long:e.nativeEvent.coordinate.longitude
            }
        ));  
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
   
    // location detection handler
    const getTheLocationGoFurtherHandler = ()=>{
      //   console.log("got The Location Go Further Handler"); 
      setIsLoading(true); 
      setTimeout(()=>{
        setIsLoading(false); 
        navigation.navigate('UpdateAddNewSiteFillDetails')
      },1200);
    } 
    
    const [isFocused, setIsFocused] = useState(false);
    useEffect(()=>{
        console.log("isFocused:",isFocused);
    },[isFocused]);
    
    // start: clean the  storage 
    useEffect(()=>{ 
        AsyncStorage.removeItem('createSite');
        AsyncStorage.removeItem('location'); 
    },[]);
    // end: clean the  storage 


    return(
        <ScreenWrapper>
            {/* Start: Header */}
            <ScndHeader 
                Title="Update Site Details" 
                Search={false} 
                Profile={false}  
                Back={false}
                BackScreen="" 
                Skip={false} 
                SkipScreen=""  
            />
            {/* End: Header */} 

             <GooglePlacesAutocomplete
                    placeholder="Search Your Site" 
                    onPress={(data, details = null) => {
                        setGetAddressData(data.description);
                        // console.log( details)
                        console.log('Coordinates:', details.geometry.location);
                        // lat
                        // lng
                        setRegion({
                            latitude:details.geometry.location.lat,
                            longitude:details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })
                        mapRef.current?.animateToRegion({
                            latitude:details.geometry.location.lat,
                            longitude:details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }); 
                        setMarkerCoordinate(''); 
                        setDefaultLocationMarker(true);
                    }}
                    query={{key: GlobalData.GOOGLE_API_KEY}}
                    fetchDetails={true}
                    onFail={error => console.log(error)}
                    onNotFound={() => console.log('no results')} 
                    Search={true}
                    textInputProps={{
                        placeholderTextColor:Colors.lightGray,
                        returnKeyType: "search",
                        style: {
                            color: Colors.gray,
                            height:60,
                            fontWeight:FontWeight.medium, 
                            width:'100%',
                            paddingHorizontal:12,  
                            borderRadius:9,
                            borderWidth:2,
                            borderColor:isFocused == true ? Colors.PrimaryColor:Colors.lightGray,
                            marginBottom:10,
                            backgroundColor:'#ffffff',
                        },
                        onFocus: () => {setIsFocused(true)},
                        onBlur: () => setIsFocused(false),
                    }}
                     
                    styles={{
                        container:{
                            flex:0, // set container width to 90%
                           //  marginTop: 10, // add margin top of 10
                            backgroundColor: "transparent",
                            borderTopWidth: 0,
                            borderBottomWidth: 0, 
                            paddingHorizontal:0,
                            position:'absolute',
                           //  marginBottom:12,
                            fontSize:12,
                            width:'96%',
                            top:actuatedNormalizeVertical(85),
                            left:8,
                            zIndex:999,
                            borderRadius:9
                        },
                        listView: {
                            flex:0, 
                            color:'green'
                        },
                        flexList:{
                            backgroundColor:'red'
                        },
                        textInput: { 
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ccc",
                            width: '100%', 
                        },
                        description:{
                            color:Colors.gray, 
                        }
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
                        showsUserLocation={true} // enable this in production....
                        followsUserLocation= {true}
                        loadingEnabled={false}
                        showsMyLocationButton={false}
                    >
                        {markerCoordinate && 
                            <Marker coordinate={markerCoordinate}  >
                                <LocationMarker width={actuatedNormalize(25)} height={actuatedNormalize(35)} />
                            </Marker>
                            // <Marker coordinate={markerCoordinate}  image={Images.LocationMarker} />
                        }

                        {defaultLocationMarker && 
                            
                            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                                <LocationMarker width={actuatedNormalize(25)}  height={actuatedNormalize(35)} />
                            </Marker>
                            // <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude, }} image={Images.LocationMarker}/>
                            
                        }

                        {/* <Marker
                            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                            title="Your Location"
                        /> */}
                    </MapView>
                ) : (
                    <Text style={{color:'red',padding:12}}>Loading...</Text>
                )}

                <TouchableOpacity style={[styles.DetechLocation,getAddressBoolen == true?isFocused == false?{bottom:290}:{bottom:10}:{bottom:10}]} onPress={()=>getCurrentLocationHandler()}> 
                    <DetechLocation width={actuatedNormalize(30)} height={actuatedNormalize(30)}/> 
                </TouchableOpacity>
                {
                    !isFocused && 
                    
                    (
                        getAddressBoolen && ( 
                            <View style={styles.showAddressBar}>
                                    <Text style={{color:Colors.black,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium,marginBottom:4}}>Select Location</Text>
                                    <Text style={{color:Colors.lightGray, fontSize:FontSize.p,fontWeight:FontWeight.medium}}>Your Location</Text>
                                    <View style={{width:'100%',minHeight:60,flexDirection:'row',marginTop:12,marginBottom:22}}>
                                            <View style={{width:'12%'}}>
                                                {/* <AutoHeightImage
                                                    width={35}
                                                    source={Images.LocationIconWithCircle}
                                                />     */}
                                                <LocationWithCircle  width={actuatedNormalize(35)} height={actuatedNormalize(35)} />
                                                
                                            </View>   
                                            <View style={{width:'88%'}}>
                                                <Text style={{color:'black',color:Colors.blackShadeTwo,fontSize:FontSize.xp,fontWeight:FontWeight.medium}}>{getAddressData}</Text> 
                                            </View>
                                    </View>    
                                    <CTMButton btnText="Continue" theme="default" marginBottom={false} functionType="createaccount" onPress={getTheLocationGoFurtherHandler} isLoading={isLoading} /> 
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
        backgroundColor:'rgba(76,176,80,0.25)',
        borderRadius:32,    
        zIndex:999
      },
      showAddressBar:{
        width:'100%', 
        minHeight:180,
        backgroundColor:'#ECF3FF',
        position:'absolute',
        bottom:0,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        padding:12,
        paddingVertical:32, 
      }
})

export default DetectLocationUpdate
