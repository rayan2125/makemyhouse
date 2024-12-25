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

// maps 
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';

//main screen 
const DetectLocation = ()=>{

    const  navigation = useNavigation();   


    const mapRef = useRef(null);

    const [maptypeval, setmaptypeval] = useState('standard');  

    const latitudeDelta =0.000415;
    const longitudeDelta = 0.00295; 
    const [currentlat, setcurrentlat] = useState('');
    const [currentlong, setcurrentlong] = useState('');
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 22.7435732,
        longitude: 75.8964607,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
    });

    const [region,setRegion] = useState(currentLocation);
    const [markerCoordinate, setMarkerCoordinate] = useState(null);
    const [defaultLocationMarker,setDefaultLocationMarker] = useState(true);

    useEffect(()=>{
        console.log(markerCoordinate);
    },[markerCoordinate]);

    useEffect(()=>{
        Geolocation.getCurrentPosition(
            (position) => { 
                let currentdata ={
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                } 
                setcurrentlat(position.coords.latitude);
                setcurrentlong(position.coords.longitude);
                let currentLatitude= Number(position.coords.latitude);
                let currentLongitude= Number(position.coords.longitude);
                setCurrentLocation({
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                });
                mapRef.current?.animateToRegion({
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                });
                setRegion({
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                });
               
            },
            (error) => {
                console.log(error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        ); 
    },[]);
   
    const onRegionChange = (region) => {
        // this will show all the region as we move over the map...
        // console.log(region);
    }
     
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
            <View style={styles.container}> 
                <MapView
                    ref={mapRef} 
                    mapType={maptypeval} 
                    options={{ gestureHandling: 'none'}} 
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={currentLocation}  
                    onRegionChange={onRegionChange}
                    onPress={(e) => {setMarkerCoordinate(e.nativeEvent.coordinate); setDefaultLocationMarker(false);}}
                >
                    {markerCoordinate && <Marker coordinate={markerCoordinate} />}

                    {defaultLocationMarker && <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude, }}/>}
                    
                </MapView>
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
})

export default DetectLocation
