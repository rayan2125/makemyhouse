import { View, Text, ScrollView, BackHandler, Dimensions, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'


// header 
import ScndHeader from '../../components/headers/scndHeader'

import Images from '../utility/images'
import Colors from '../utility/color'
import FontSize, { FontWeight } from '../utility/fonts'

import CTMButton from "../../components/button"


import DesignPlanning from '../../components/designAndPlanning'
import Aifloreplan from '../../components/designAndPlanning/Aifloreplan'
import LoadingPackageCard from '../../components/designAndPlanning/loadingCard'
import { useRoute } from '@react-navigation/native';

import { useNavigation, } from '@react-navigation/native';

// Start: icons 
// import OffersIcon from "../../../assets/images/icons/offer.svg"

import ApiService from '../../ApiServices'
// end: icons

// notification 
import AnimatedMessage from '../../components/animatedNotification'


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { actuatedNormalize } from '../utility/scaling'

//main screen 
const Solutions = () => {



    // aimate notification 
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        // setTimeout(()=>{
        //   setMessages([]);
        // },2000); 
    }, [messages]);
    const navigation = useNavigation();
    const route = useRoute();

    const { SkipScreenParams, Back } = route.params; // Accessing the 'name' parameter 
    // const SkipScreenParams = false;// temp value  for testing purposes

    const [onSkipPress, setOnSkipPress] = useState(false);
    const onSkipHandler = () => {
        console.log("setOnSkipPress Clicked")
        setOnSkipPress(true);
    }
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            console.log('Screen came into focus');
            AsyncStorage.removeItem('projectId');
            return () => {
                console.log('Screen went out of focus');
                setOnSkipPress(false);
            };
        }, [])
    );

    // signIN 
    const showMoreOffers = () => {
        setOnSkipPress(false);
    }

    // start: onPressNavigation
    const onPressNavigation = (data) => {
        // AsyncStorage.setItem('SelectedSite',`${res.data.data.ID}`);
        AsyncStorage.removeItem('projectId');
        AsyncStorage.getItem('SelectedSite', (err, credentials) => {
            console.log("++++++++++++++++++++++++", credentials);
            if (credentials) {
                AsyncStorage.setItem('projectId', `${data}`);
                console.log("from ------- solution screen ------------", { siteID: credentials, projectid: data });
                navigation.navigate('Package', { params: { siteID: credentials, projectid: data } });
            } else {
                setMessages(['Something went wrong, Please try again in sometime.']);
            }
        });
        // console.log("on Press Navigation:", data); 

        // navigation.navigate('Package')
    }
    // end: onPressNavigation 

    // start: Package and design 
    const [packageAndDesign, setpackageAndDesign] = useState([]);
    useEffect(() => {
        getPackageDesign();
    }, []);
    const getPackageDesign = async () => {
        let url = 'public/productsv2/list';
        await ApiService.Getapiheader(url)
            .then(response => {
               
                if (response && response.data) {
                    if (response.data.length > 0) {
                        setpackageAndDesign(response.data);
                    } else {
                        console.log("get package  Design response-- status code is not 200ok");
                        setMessages(['Something went wrong while getting the package details.']);
                    }
                } else {
                    setMessages(['Something went wrong while getting the package details.']);
                }
            })
            .catch(error => {
                console.log("get package Design error: ", error);
                setMessages(['Internal server error, Please try again later.']);
            })
    }
    // end: Package and design 

    return (
        <ScreenWrapper>
            {/* Start: Notification Bar  */}
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    top: '0%',
                    width: '100%',
                    zIndex: 999,
                    padding: 12
                }}
            >
                {messages.map((message) => (
                    <AnimatedMessage
                        key={message}
                        message={message}
                        onHide={() => {
                            setMessages((messages) =>
                                messages.filter(
                                    (currentMessage) =>
                                        currentMessage !== message
                                )
                            );
                        }}
                    />
                ))}
            </View>
            {/* End: Notification Bar  */}
            {/* Start: Header */}
            <ScndHeader
                Title="Solutions"
                Search={false}
                Profile={false}
                Back={!Back ? false : true}
                BackScreen=""
                Skip={SkipScreenParams == false ? false : true}
                // Skip={true}
                SkipScreen=""
                SkipFunction={onSkipHandler}
            />
            {/* End: Header */}

            {/* Start: Main Body */}
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, padding: 0, paddingHorizontal: 0, marginTop: 0 }}>
                <View style={{ padding: 0 }}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ color: Colors.SecondaryColor, fontSize: FontSize.h5, fontFamily: 'Inter-SemiBold', fontWeight: FontWeight.medium }}>Design & Planning</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 8 }}>

                        {
                            packageAndDesign.length > 0 ?
                                (
                                    packageAndDesign.map((item, index) => {
                                        return <DesignPlanning key={index} BoxType={item.type == 'BNDL' ? 'color' : 'gray'} Text={item.name} Image={Images.Package1} apiImageB={true} apiImage={item.icon} tag={item.type == "BNDL" ? "PACKAGE" : ""} onPressNavigation={() => onPressNavigation(item.id)} />
                                    })
                                )
                                :
                                <>
                                    <LoadingPackageCard />
                                    <LoadingPackageCard />
                                    <LoadingPackageCard />
                                    <LoadingPackageCard />
                                    <LoadingPackageCard />
                                </>
                        }

                        {/* <DesignPlanning BoxType="color" Text="Premium House Design Packages" Image={Images.Package2}  tag="PACKAGE" onPressNavigation={onPressNavigation}/>
                        <DesignPlanning BoxType="color" Text="Floor Plan With Structure Packages" Image={Images.Package3}  tag="PACKAGE" onPressNavigation={onPressNavigation}/>
                        <DesignPlanning BoxType="gray"  Text="2D Layout" Image={Images.Package4}  tag="" onPressNavigation={onPressNavigation}/> 
                        <DesignPlanning BoxType="gray"  Text="2D Layout" Image={Images.Package4}  tag="" onPressNavigation={onPressNavigation} /> 
                        <DesignPlanning BoxType="gray"  Text="2D Layout" Image={Images.Package4}  tag="" onPressNavigation={onPressNavigation} /> 
                        <DesignPlanning BoxType="gray"  Text="2D Layout" Image={Images.Package4}  tag="" onPressNavigation={onPressNavigation} /> 
                        <DesignPlanning BoxType="gray"  Text="2D Layout" Image={Images.Package4}  tag="" onPressNavigation={onPressNavigation}/>   */}
                        <Aifloreplan BoxType="gray" Text="AI" SndText="Floor Plan" Image={Images.Aifloreplan} tag="" onPressNavigation={onPressNavigation} />
                    </View>
                </View>

                {/* Start: Modal */}
                <Modal animationType="slide" transparent={true} visible={onSkipPress}>
                    <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                        <TouchableOpacity activeOpacity={0.1} style={{ width: '100%', minHeight: '30%' }} onPress={() => setOnSkipPress(false)}></TouchableOpacity>
                        <View style={{ width: '100%', height: '30%', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <View style={{ width: '80%', height: '100%', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center', position: 'relative', paddingVertical: 32 }}>
                                <View style={{ width: 100, height: 100, backgroundColor: '#ffffff', borderWidth: 2, borderColor: Colors.SecondaryColor, justifyContent: 'center', alignItems: 'center', alignContent: 'center', position: 'absolute', top: -50, borderRadius: 50 }}>
                                    {/* <OffersIcon width={actuatedNormalize(60)} height={actuatedNormalize(60)} /> */}
                                </View>
                                <View style={{ height: 40, width: '100%' }}></View>
                                <Text style={{ fontSize: FontSize.h5, color: Colors.black, textAlign: 'center', fontWeight: FontWeight.medium, paddingHorizontal: 34 }}>Are you sure you want to skip?</Text>
                                <View style={{ width: '60%', marginVertical: 16 }}>
                                    <CTMButton btnText="No, Let's continue!" theme="default" marginBottom={false} functionType="createaccount" onPress={showMoreOffers} isLoading={isLoading} />
                                </View>
                                <TouchableOpacity onPress={() => { navigation.navigate('MainStack', { screen: "Home" }) }}>
                                    <Text style={{ color: '#9A9898', fontSize: FontSize.xxp, fontWeight: FontWeight.medium }}>Skip, Go to Dashboard.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.1} style={{ width: '100%', minHeight: '40%' }} onPress={() => setOnSkipPress(false)}></TouchableOpacity>
                    </View>
                </Modal>
                {/* End: Modal */}

            </ScrollView>
        </ScreenWrapper>
    )
}


export default Solutions;