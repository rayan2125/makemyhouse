import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper/index.js';

// header 
import ScndHeader from '../../components/headers/scndHeader.js';

// components 

import CTMButton from '../../components/button'

import Colors from '../utility/color.js';


import FontSize, { FontWeight } from '../utility/fonts.js';
import Images from '../utility/images.js';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

import FiltersDataDesign from '../../components/carousels/filtersDataDesign.js';


import DesignPlanning from '../../components/designAndPlanning/index.js';
import LoadingPackageCard from '../../components/designAndPlanning/loadingCard.js';


import Banner from '../../components/carousels/banner.js';
import LoaingComponent from './loaingComponent.js';

import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import ApiService from '../../ApiServices/index.js';

import FAQ from './FAQ.js';

// notification 
import AnimatedMessage from '../../components/animatedNotification/index.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import ImageViewer from 'react-native-image-zoom-viewer';

import ArrowUP from '../../../assets/images/icons/arrowUpDark.svg'
import ArrowDown from '../../../assets/images/icons/arrowDownDark.svg'

import Vastu from '../../../assets/images/icons/vastu.svg';
import Experienced from '../../../assets/images/icons/Experienceddesign.svg';
import Quality from '../../../assets/images/icons/advantagesth.svg';
import ProjectTrack from '../../../assets/images/icons/advantagesfr.svg';


import AchivementOne from '../../../assets/images/icons/achivementOne.svg';
import AchivementTwo from '../../../assets/images/icons/achivementTwo.svg';
import AchivementThree from '../../../assets/images/icons/achivementThree.svg';
import AchivementFour from '../../../assets/images/icons/achivementFour.svg';



import Cards from '../../../assets/images/icons/cards.svg';
import SatisfactionGuarantee from '../../../assets/images/icons/satisfactionguarantee.svg'

import { RFValue } from 'react-native-responsive-fontsize';

import Addons from './addons.js';

import FastImage from 'react-native-fast-image';

import Testimonial from '../../components/testimonial/sndType.js';


//main screen 
const Package = () => {
    const images = useMemo(() => [
        { url: 'https://api.slingacademy.com/public/sample-photos/6.jpeg' },
        { url: 'https://api.slingacademy.com/public/sample-photos/12.jpeg' },
        { url: 'https://api.slingacademy.com/public/sample-photos/22.jpeg' },
    ], []);
    // aimate notification 
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        // setTimeout(()=>{
        //   setMessages([]);
        // },2000);
    }, [messages]);

    const navigation = useNavigation();
    const route = useRoute();

    const [planPackageDetails, setPlanPackageDetails] = useState();
    // start: get the project details 
    useEffect(() => {
        // api ../siteID/projectID
        const fetchProjectDetails = async () => {
            console.log("---------------------");
            console.log("-route.params:---", {
                siteID: route.params.params.siteID,
                projectid: route.params.params.projectid
            });
            console.log("---------------------");
            let url = `customer/productsv2/details/${route.params.params.projectid}/${route.params.params.siteID}`
            await ApiService.Getapiheader(url)
                .then(response => {
                    console.log("customer/productsv2/details/", url);
                    setPlanPackageDetails(response.data);
                })
                .catch(error => {
                    console.log("Error-- Fetch Project details: ", error)
                    setMessages(["Error while getting the project details."]);
                })
        }
        fetchProjectDetails();
    }, [route]);
    // end: get the project details 

    // start: get the project recommanded packages for you
    const [packageAndDesign, setpackageAndDesign] = useState([]);
    useEffect(() => {
        getPackageDesign();
        getBannerDetails(route.params.params.projectid);
        geTheSampleDelivery(route.params.params.projectid);
        getTheAddons(route.params.params.projectid);
    }, [route]);
    const getPackageDesign = async () => {

        // let url = `customer/ProductUpSells/${route.params.params.projectid}`;
        let url = `public/productsv2/recomondedPackages/${route.params.params.projectid}`;
        const aa = await ApiService.Getapiheader(url)
            .then(response => {
                if (response) {
                    setpackageAndDesign(response.data);
                    console.log("()()()()_____+++++++++_________setpackageAndDesign: ", packageAndDesign);
                } else {
                    setMessages(['Something went wrong while getting the package details.']);
                }
            })
            .catch(error => {
                console.log("get package Design error: ", error);
                setMessages([`Error while getting the package details. ${error}`]);
            })
    }
    // end: get the project recommanded packages for you

    // start: Sample delivery
    const [sampleDelivery, setSampleDelivery] = useState([]);
    const [sampleDeliveryType, setsampleDeliveryType] = useState('');
    const [openCloseImageModalData, setopenCloseImageModalData] = useState([]);
    const [openCloseImageModal, setopenCloseImageModal] = useState(false);
    const [showHideSampleDlivery, setshowHideSampleDlivery] = useState(false);
    const handleShowHideSampleDelivery = () => {
        setshowHideSampleDlivery(!showHideSampleDlivery);
    }

    const [isLoadingDataSampleDelivery, setIsLoadingDataSampleDelivery] = useState(false);
    // useEffect(()=>{
    //     setSampleDelivery([
    //         {id:1,image:Images.SampleDesign1},
    //         {id:2,image:Images.SampleDesign2}, 
    //         {id:3,image:Images.SampleDesign1},
    //         {id:4,image:Images.SampleDesign2}, 
    //         {id:5,image:Images.SampleDesign1}, 
    //     ])
    // },[route]);
    const geTheSampleDelivery = async (projectId) => {
        setopenCloseImageModalData([]);
        try {
            let url = `public/banners/projectSample/${projectId}`;
            await ApiService.Getapiheader(url)
                .then(response => {
                    if (response) {
                        console.log("get sample delivery url: ", url);
                        console.log("get sample delivery response: ", response);
                        response.map((item, index) => {
                            setSampleDelivery((prevs) => [...prevs, {
                                id: index,
                                image: item.imageUrl,
                                imageData: [],
                                type: item.type,
                                title: item.title
                            }])
                        });
                    } else {
                        setopenCloseImageModal(false);
                        setopenCloseImageModalData([]);
                    }
                })
                .catch(error => {
                    console.log("get sample delivery error: ", error);
                    setMessages(["Error getting the sample delivery details."]);
                    setopenCloseImageModal(false);
                    setopenCloseImageModalData([]);
                })
        }
        catch (error) {
            console.log("Error-- Fetch Project details: ", error)
            setMessages(["Error while getting the project details."]);
        }
    }
    const openCloseImageModalHandler = (data, type) => {
        console.log("opencloseModalHanler: ", data);
        setopenCloseImageModalData([{ url: `${data}` }])
        setsampleDeliveryType(type);
        setopenCloseImageModal(!openCloseImageModal);
    }
    // end: Sample delivery

    // end: Plot Entrance direction 
    const [isLoading, setIsLoading] = useState(false);
    const [readyForPayment, setReadyForPayment] = useState(false);
    const createPlotHandler = () => {
        console.log("plan package handler");
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false);
            setReadyForPayment(true);
        }, 1200);
    }
    // also we want to hide this when we leave the screen.. 
    useFocusEffect(
        useCallback(() => {
            console.log('Screen came into focus');
            setReadyForPayment(false);
            AsyncStorage.removeItem('fromPackageScreen');
            return () => {
                console.log('Screen went out of focus');
                setReadyForPayment(false);
            };
        }, [])
    );
    // End: Button function 

    // start: yes or no 
    const [yesno, setyesno] = useState('yes');
    const yesnoHanler = (data) => {
        setyesno(data);
    }
    // end: yes or no 

    // start: Banner data
    const [bannerData, setBannerData] = useState([]);
    const getBannerDetails = async (projectid) => {
        let url = `public/banners/product/${route.params.params.projectid}`;
        // console.log("banner url", url);
        await ApiService.Getapiheader(url)
            .then((response) => {
                console.log("banner response:", response);
                if (response && response.length > 0) {
                    response.map((item, index) => {
                        setBannerData(prevs => [...prevs, {
                            id: index + 1,
                            image: item.imageUrl,
                            title: item.title
                            // link: 'http://www.google.com'
                        }])
                    })
                }
            })
            .catch(error => {
                console.log("error while getting the banner details", error);
                setMessages(['Error while getting the banner dertails.']);
            });
    }
    // end: Banner data


    const NavigationHandler = () => {
        // navigation.navigate('SelectSite',{params:{fromPage:'package'} });
        // params:{fromPage:'home'}
        AsyncStorage.removeItem('fromPackageScreen');
        AsyncStorage.setItem('fromPackageScreen', 'package');
        navigation.navigate('SelectSite', { fromPage: 'package' });
    }

    const onPressNavigation = (data) => {
        // console.log('without any handler',data); 
        AsyncStorage.removeItem('projectId');
        AsyncStorage.getItem('SelectedSite', (err, credentials) => {
            console.log("++++++++++++++++++++++++", credentials);
            if (credentials != null) {
                AsyncStorage.setItem('projectId', `${data}`);
                console.log("from ------- solution screen ------------", { siteID: credentials, projectid: data });
                navigation.navigate('Package', { params: { siteID: credentials, projectid: data } });
            } else {
                setMessages(['Kindly select any site or create a new one.']);
            }
        });
    }

    // start: recommanded addons 
    const [addonsData, setaddonsData] = useState([]);
    const [showAddonsHide, setshowAddonsHide] = useState(false);
    const handleshowAddonsHide = () => {
        setshowAddonsHide(!showAddonsHide);
    }
    const getTheAddons = async (projectid) => {
        let url = `customer/ProductCrossSells/${projectid}`;
        await ApiService.Getapiheader(url)
            .then(response => {
                if (response) {
                    console.log("addons data: ", response.data)
                    setaddonsData(response.data);
                } else {
                    console.log("No data found.");
                }
            })
            .catch(error => {
                console.log("Error while getting the addons details");
                setMessages("Error while getting the addons details.")
            })
    }
    // end: recommanded addons 

    // START: Advantages
    const [advantageshowHide, setadvantageshowHide] = useState(true);
    const handleadvantageshowHide = () => {
        //  setadvantageshowHide(!advantageshowHide);
    }
    // end: Advantages

    // start: testomonials 
    const [testimonialData, setTestimonialData] = useState([]);
    const [isLoadingDataTestimonialData, setIsLoadingDataTestimonialData] = useState(false);
    useEffect(() => {
        setTestimonialData([
            { id: 1, name: 'Krishna Singh', stars: 5, comment: 'Ar. Rakshendra Solanki Er. Ajay Dangar Ar. Rakhi Gour are one of the best architects in makemyhouse. I am refering to take services from the make my house company to get proper design concept and timely completion of the project' },
            { id: 2, name: 'Piyush Raj', stars: 4, comment: 'Ar. Rakshendra Solanki Er. Ajay Dangar Ar. Rakhi Gour are one of the best architects in makemyhouse. I am refering to take services from the make my house company to get proper design concept and timely completion of the project' },
        ])
    }, []);
    // end: testomonials 

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
                Title={planPackageDetails ? planPackageDetails.name : "Presentation Plan Packages"}
                Search={false}
                Profile={false}
                Back={true}
                BackScreen=""
                Skip={false}
                SkipScreen=""
            />
            {/* End: Header */}
            <ScrollView bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{ padding: 0, paddingBottom: 10 }}>

                {/* start: Main view-port */}
                {
                    planPackageDetails ?

                        <View>
                            {/* Start: Full With carousels */}
                            {
                                bannerData.length > 0 && (
                                    <Banner type='full' bannerData={bannerData} />
                                )
                            }
                            {/* End: Full With carousels */}

                            {/* Start: Project Details */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10, marginBottom: 8 }}>
                                <Text style={[styles.HeaderBox, { fontSize: FontSize.h5, fontFamily: 'Inter-SemiBold', marginTop: 20 }]}>{planPackageDetails.name}</Text>
                                <View style={[styles.BoxContainerColumn, { paddingBottom: 16 }]}>
                                    <Text style={styles.textPara}>
                                        {planPackageDetails.description}
                                    </Text>
                                    <Text style={styles.sndHeader}>Delivery Time</Text>
                                    <Text style={styles.textPara}>{planPackageDetails.delivery_time}</Text>
                                    <Text style={styles.sndHeader}>Pricing (as per your site details)</Text>
                                    <Text style={[styles.HeaderBox]}>₹{planPackageDetails.pricing.price}/-</Text>
                                </View>
                            </View>
                            {/* End: Project Details */}

                            {/* Start: Sample delivery */}
                            {
                                (sampleDelivery && sampleDelivery.length > 0) && (
                                    <View style={{ padding: 0, marginBottom: 0 }}>
                                        <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', padding: 0, alignContent: 'center', alignItems: 'center', paddingRight: 16 }}>
                                            <Text style={[styles.HeaderBox, { padding: 10, marginBottom: 0, paddingBottom: 0 }]}>WHAT YOU GET</Text>
                                            <TouchableOpacity onPress={() => { handleShowHideSampleDelivery() }} style={{ marginTop: 12, height: RFValue(22), width: RFValue(22), justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                {
                                                    showHideSampleDlivery == true ?
                                                        <ArrowUP width={RFValue(12)} height={RFValue(12)} />
                                                        :
                                                        <ArrowDown width={RFValue(12)} height={RFValue(12)} />
                                                }

                                            </TouchableOpacity>
                                        </View>
                                        {
                                            showHideSampleDlivery == true ?
                                                <View style={[{ marginStart: 6, width: '100%', paddingBottom: 10, flexDirection: 'row', flexWrap: 'wrap' }]}>
                                                    <FiltersDataDesign data={sampleDelivery} type="4" isLoading={isLoadingDataSampleDelivery} showHideSampleDlivery={showHideSampleDlivery} openCloseImageModalHandler={openCloseImageModalHandler} />
                                                </View>
                                                :
                                                <View style={[{ marginStart: 6, width: '100%', paddingBottom: 10, flexDirection: 'row', flexWrap: 'wrap' }]}>
                                                </View>
                                        }
                                        <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'center', padding: 0, alignContent: 'center', alignItems: 'center', padding: 10, marginTop: 0 }}>
                                            <View style={{ height: 1, width: '100%', backgroundColor: Colors.lightGray, }}></View>
                                        </View>

                                    </View>
                                )
                            }
                            {/* Emd: Sample delivery */}

                            {/* start: Addonds  */}
                            {
                                (addonsData && addonsData.length > 0) &&
                                <View style={{ padding: 0, marginBottom: 0 }}>
                                    <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', padding: 0, alignContent: 'center', alignItems: 'center', paddingRight: 16 }}>
                                        <Text style={[styles.HeaderBox, { padding: 10, marginBottom: 0, paddingBottom: 0 }]}>ADD-ONS</Text>
                                        <TouchableOpacity onPress={() => { handleshowAddonsHide() }} style={{ marginTop: 12, height: RFValue(22), width: RFValue(22), justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            {
                                                showAddonsHide == true ?
                                                    <ArrowUP width={RFValue(12)} height={RFValue(12)} />
                                                    :
                                                    <ArrowDown width={RFValue(12)} height={RFValue(12)} />
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        showAddonsHide == true ?
                                            <View style={[{ marginStart: 6, width: '100%', paddingBottom: 10, flexDirection: 'row', flexWrap: 'wrap' }]}>
                                                <Addons data={addonsData} />
                                            </View>
                                            :
                                            <></>
                                    }
                                    <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'center', padding: 0, alignContent: 'center', alignItems: 'center', padding: 10, marginTop: 12 }}>
                                        <View style={{ height: 1, width: '100%', backgroundColor: Colors.lightGray, }}></View>
                                    </View>
                                </View>
                            }
                            {/* end: Addons */}


                            {/* Start: FAQ Accorian */}
                            <FAQ productID={route.params.params.projectid} showFaq={2} />
                            {/* End: FAQ Accorian */}


                            {/* start: Advantages */}
                            <View style={{ padding: 0, marginBottom: 8 }}>
                                <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', padding: 0, alignContent: 'center', alignItems: 'center', paddingRight: 16 }}>
                                    <Text style={[styles.HeaderBox, { padding: 10, marginBottom: 0, paddingBottom: 0 }]}>ADVANTAGES</Text>
                                    {/* <TouchableOpacity onPress={()=>{handleadvantageshowHide()}} style={{marginTop:12, height:RFValue(22), width:RFValue(22), justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                            {
                                                advantageshowHide == true ?  
                                                <ArrowUP width={RFValue(12)} height={RFValue(12)}/>
                                                :
                                                <ArrowDown width={RFValue(12)} height={RFValue(12)}/>
                                            } 
                                        </TouchableOpacity> */}
                                </View>
                                {/* {
                                        advantageshowHide == true ?
                                        <> */}
                                <View style={[{ width: '100%', flexDirection: 'column', padding: 12, paddingBottom: 0 }]}>
                                    <View style={{ width: '100%', height: 160, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: '49%', height: "100%", backgroundColor: '#EBEBEB', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '100%', height: "60%", flexDirection: "column", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginBottom: 6, }}>
                                                <Vastu width={RFValue(45)} height={RFValue(45)} />
                                            </View>
                                            <View style={{ height: '40%', width: '100%', justifyContent: 'flex-start', alignContent: 'center' }}>
                                                <Text style={{ marginTop: 6, color: '#000000', fontSize: FontSize.xp, fontWeight: '500', textTransform: 'uppercase', textAlign: 'center' }}>Vastu compliant</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '49%', height: "100%", backgroundColor: '#EBEBEB', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '100%', height: "60%", flexDirection: "column", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginBottom: 6, }}>
                                                <Experienced width={RFValue(45)} height={RFValue(45)} />
                                            </View>
                                            <View style={{ height: '40%', width: '100%', justifyContent: 'flex-start', alignContent: 'center' }}>
                                                <Text style={{ marginTop: 6, color: '#000000', fontSize: FontSize.xp, fontWeight: '500', textTransform: 'uppercase', textAlign: 'center' }}>Experienced design professionals</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: 160, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: '49%', height: "100%", backgroundColor: '#EBEBEB', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '100%', height: "60%", flexDirection: "column", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginBottom: 6, }}>
                                                <Quality width={RFValue(45)} height={RFValue(45)} />
                                            </View>
                                            <View style={{ height: '40%', width: '100%', justifyContent: 'flex-start', alignContent: 'center' }}>
                                                <Text style={{ marginTop: 6, color: '#000000', fontSize: FontSize.xp, fontWeight: '500', textTransform: 'uppercase', textAlign: 'center' }}>Vastu compliant</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '49%', height: "100%", backgroundColor: '#EBEBEB', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '100%', height: "60%", flexDirection: "column", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginBottom: 6, }}>
                                                <ProjectTrack width={RFValue(45)} height={RFValue(45)} />
                                            </View>
                                            <View style={{ height: '40%', width: '100%', justifyContent: 'flex-start', alignContent: 'center' }}>
                                                <Text style={{ marginTop: 6, color: '#000000', fontSize: FontSize.xp, fontWeight: '500', textTransform: 'uppercase', textAlign: 'center' }}>Experienced design
                                                    professionals</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {/* start: testomonials */}
                                <View style={{ width: '100%', height: 220, paddingVertical: 12, paddingBottom: 0 }}>
                                    <Testimonial data={testimonialData} isLoading={isLoadingDataTestimonialData} />
                                </View>
                                {/* end: testomonials */}

                                {/* start: Guarantee Safe Checkout */}
                                <View style={{ width: '100%', height: 190, padding: 12, paddingTop: 8 }}>
                                    <View style={{ width: '100%', height: '100%', backgroundColor: '#002F5B', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderRadius: 9 }}>
                                        <Text style={[styles.HeaderBox, { fontSize: FontSize.h5, marginBottom: 18, color: '#ffffff' }]}>Guarantee Safe Checkout</Text>
                                        <Cards width={RFValue(290)} height={RFValue(26)} />
                                        {/* <FastImage resizeMode='contain' source={Images.PaymentCard} style={{width:'90%', height:'40%'}}/> */}
                                    </View>
                                </View>
                                {/* end: Guarantee Safe Checkout */}
                                {/* </>
                                        :
                                        <></>   
                                    }  */}

                                <View style={{ width: '100%', height: 25, flexDirection: 'row', justifyContent: 'center', padding: 0, alignContent: 'center', alignItems: 'center', padding: 10, marginTop: 12 }}>
                                    <View style={{ height: 1, width: '100%', backgroundColor: Colors.lightGray, }}></View>
                                </View>

                            </View>
                            {/* end: Advantages */}


                            {/* Start: satisfaction Guarantee */}
                            <View style={{ width: '100%', height: 120, justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 12, marginBottom: 6 }}>
                                <View style={{ width: '100%', height: '100%', backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 12, elevation: 4 }}>
                                    <SatisfactionGuarantee width={RFValue(42)} height={RFValue(42)} />
                                    <Text style={{ marginLeft: 6, fontSize: FontSize.p, color: '#000000', fontWeight: FontWeight.medium }}>100% satisfaction Guarantee</Text>
                                </View>
                            </View>
                            {/* End: satisfaction Guarantee */}

                            {/* start: AS FEATURED IN */}
                            <View style={{ padding: 0, marginBottom: 8 }}>
                                <View style={{ width: '100%', height: 40, flexDirection: 'row', justifyContent: 'space-between', padding: 0, alignContent: 'center', alignItems: 'center', paddingRight: 16 }}>
                                    <Text style={[styles.HeaderBox, { padding: 10, marginBottom: 0, paddingBottom: 0, }]}>AS FEATURED IN</Text>
                                </View>
                                <View style={[{ width: '100%', height: 190, paddingBottom: 10, flexDirection: 'column', padding: 12, padding: 12 }]}>
                                    <View style={{ backgroundColor: '#EBEBEB', width: '100%', height: '100%', padding: 10, borderRadius: 12 }}>
                                        <FastImage resizeMode={FastImage.resizeMode.contain} source={Images.Fearutedin} style={{ width: '100%', height: '100%' }} />
                                    </View>
                                </View>
                            </View>
                            {/* end: AS FEATURED IN */}


                            {/* start: achivements */}
                            <View style={{ padding: 0, marginBottom: 8 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 0, alignContent: 'center', alignItems: 'center', paddingRight: 16 }}>
                                    <Text style={[styles.HeaderBox, { padding: 10, marginBottom: 0, paddingBottom: 0 }]}>AWARDS AND ACCOLADES </Text>
                                </View>
                                <View style={[{ width: '100%', paddingBottom: 10, flexDirection: 'column', padding: 12 }]}>
                                    <View style={{ width: '100%', height: 160, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: '49%', height: "100%", backgroundColor: '#EBEBEB', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '100%', height: "60%", flexDirection: "column", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginBottom: 6, }}>
                                                <AchivementOne width={RFValue(125)} height={RFValue(85)} />
                                            </View>
                                        </View>
                                        <View style={{ width: '49%', height: "100%", backgroundColor: '#EBEBEB', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '100%', height: "60%", flexDirection: "column", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginBottom: 6, }}>
                                                <AchivementTwo width={RFValue(65)} height={RFValue(65)} />
                                            </View>
                                            <View style={{ height: '40%', width: '100%', justifyContent: 'flex-start', alignContent: 'center', paddingHorizontal: 2 }}>
                                                <Text style={{ marginTop: 6, color: '#000000', fontSize: FontSize.xxxp + 2, fontWeight: '500', textTransform: 'uppercase', textAlign: 'center' }}>The Economic Times Real Estate Conclave & Awards 2022</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: 160, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: '49%', height: "100%", backgroundColor: '#EBEBEB', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '100%', height: "60%", flexDirection: "column", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginBottom: 6, }}>
                                                <AchivementThree width={RFValue(65)} height={RFValue(65)} />
                                            </View>
                                            <View style={{ height: '40%', width: '100%', justifyContent: 'flex-start', alignContent: 'center', paddingHorizontal: 22 }}>
                                                <Text style={{ marginTop: 6, color: '#000000', fontSize: FontSize.xxxp + 2, fontWeight: '500', textTransform: 'uppercase', textAlign: 'center' }}>Red Achievers Awards 2021</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '49%', height: "100%", backgroundColor: '#EBEBEB', borderRadius: 12, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ width: '100%', height: "60%", flexDirection: "column", justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center', marginBottom: 6, }}>
                                                <AchivementFour width={RFValue(65)} height={RFValue(65)} />
                                            </View>
                                            <View style={{ height: '40%', width: '100%', justifyContent: 'flex-start', alignContent: 'center', paddingHorizontal: 22 }}>
                                                <Text style={{ marginTop: 6, color: '#000000', fontSize: FontSize.xxxp + 2, fontWeight: '500', textTransform: 'uppercase', textAlign: 'center' }}>Best Startup 2022 By Govt Of India</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* end: achivement */}


                            {/* Start: Addons  */}
                            {/* {
                                planPackageDetails.addons.lenght > 0 ? 
                                    <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                            <Text style={styles.HeaderBox}>ADD-ONS</Text> 
                                            <View >  
                                                
                                                {
                                                    planPackageDetails.addons.map((item,index)=>{
                                                        return (
                                                            <View key={index+1} style={{position:'relative',marginBottom:18}}>
                                                                <View style={{width:'100%',height:actuatedNormalizeVertical(120),position:'absolute',top:-2,backgroundColor:Colors.SecondaryColor,borderRadius:12}}></View>
                                                                <TouchableOpacity activeOpacity={0.91} style={{width:'100%',height:actuatedNormalizeVertical(120),flexDirection:'row',position:'relative',borderRadius:12,backgroundColor:'#F1F1F1',elevation:4}}> 
                                                                    <View style={{width:'25%',height:'100%',backgroundColor:'transparent',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                                                        <AutoHeightImage
                                                                            width={82}
                                                                            maxHeight={82} 
                                                                            resizeMode="contain"
                                                                            source={Images.SampleDesign1} 
                                                                            style={{borderRadius:12}} 
                                                                        />   
                                                                    </View>
                                                                    <View style={{width:'75%',height:'100%',backgroundColor:'transparent',justifyContent:'center',alignContent:'center',alignItems:'flex-start',paddingRight:0}}>
                                                                        <Text style={styles.AddTextHeader}>{item.name}</Text>
                                                                        <Text style={styles.AddTextpara}>{item.description}.....</Text>
                                                                    </View>
                                                                </TouchableOpacity>   
                                                            </View> 
                                                            
                                                        )
                                                    })
                                                }
                                                

                                                <View style={{padding:0,marginTop:10}}>
                                                    <View style={{borderBottomWidth:1, borderBottomColor:Colors.lightGray, }}></View>  
                                                </View> 

                                            </View> 
                                    </View>    
                                :
                                null 
                            }  */}
                            {/* End: Addons */}


                            {/* Start: Recommended packages for you */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 0, marginBottom: 8 }}>
                                {
                                    packageAndDesign && packageAndDesign.length != 0 && (
                                        <Text style={[styles.HeaderBox, { padding: 10 }]}>
                                            Recommended Package For You
                                        </Text>
                                    )
                                }
                                <View style={[{ marginStart: 6, width: '100%', paddingBottom: 10, flexDirection: 'row', flexWrap: 'wrap' }]}>
                                    {/* {
                                        packageAndDesign.length > 0 ? 
                                        (
                                            packageAndDesign.map((item,index)=>{
                                                return <DesignPlanning key={index} BoxType={item.type=='BNDL'?'color':'gray'} Text={item.name} Image={Images.Package1} tag={item.type=="BNDL"?"PACKAGE":""} onPressNavigation={()=>onPressNavigation(item.id)}/>    
                                            })
                                        )
                                        :  
                                        <>
                                            <LoadingPackageCard/>
                                            <LoadingPackageCard/> 
                                            <LoadingPackageCard/>
                                            <LoadingPackageCard/>
                                            <LoadingPackageCard/>
                                        </>
                                    }   */}

                                    {
                                        packageAndDesign && (
                                            packageAndDesign.map((item, index) => {
                                                return <DesignPlanning key={index} BoxType={item.type == 'BNDL' ? 'color' : 'gray'} Text={item.name} Image={Images.Package1} tag={item.type == "BNDL" ? "PACKAGE" : ""} onPressNavigation={() => onPressNavigation(item.id)} />
                                            })
                                        )
                                    }

                                    {
                                        !packageAndDesign && (
                                            <>
                                                <LoadingPackageCard />
                                                <LoadingPackageCard />
                                                <LoadingPackageCard />
                                                <LoadingPackageCard />
                                                <LoadingPackageCard />
                                            </>
                                        )
                                    }

                                    {/* <DesignPlanning BoxType="color" Text="Presentation Plan Packages" Image={Images.Package1} tag=""/>
                                    <DesignPlanning BoxType="color" Text="Premium House Design Packages" Image={Images.Package2} tag=""/>
                                    <DesignPlanning BoxType="color" Text="Floor Plan With Structure Packages" Image={Images.Package3} tag=""/> */}
                                </View>
                            </View>
                            {/* End: Recommended packages for you */}

                            {/* Start: Button */}
                            {/* End: Button */}
                        </View>
                        :
                        <LoaingComponent />
                }
                {/* end: Main view-port */}

                {/* Start: Model to continue for payment -- readyForPayment */}
                <Modal animationType="slide" transparent={true} visible={readyForPayment}>
                    <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                        <TouchableOpacity activeOpacity={0.1} style={{ width: '100%', minHeight: '68%' }} onPress={() => setReadyForPayment(false)}></TouchableOpacity>
                        <View style={{ width: '100%', minHeight: '32%', }}>
                            <View style={{ width: '100%', height: '100%', backgroundColor: '#ECF3FF', borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingVertical: 32, paddingHorizontal: 22 }}>
                                <Text style={{ color: Colors.black, marginBottom: 14, fontSize: FontSize.h6, fontWeight: '400' }}>Is your house a new construction on this Plot?</Text>
                                <View style={{ width: '100%', height: 50, marginBottom: 14, flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItem: 'center' }}>

                                    <TouchableOpacity onPress={() => yesnoHanler('yes')} style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginRight: 12, }}>
                                        {
                                            yesno == 'yes' ?
                                                <AutoHeightImage
                                                    width={28}
                                                    maxHeight={28}
                                                    source={Images.CheckTickFill}
                                                /> :
                                                <AutoHeightImage
                                                    width={28}
                                                    maxHeight={28}
                                                    source={Images.CheckTickEmpty}
                                                />
                                        }
                                        <Text style={{ marginLeft: 8, color: Colors.black, fontSize: FontSize.h6, fontFamily: 'Inter-SemiBold' }}>Yes</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => yesnoHanler('no')} style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginRight: 12 }}>
                                        {
                                            yesno == 'no' ?
                                                <AutoHeightImage
                                                    width={28}
                                                    maxHeight={28}
                                                    source={Images.CheckTickFill}
                                                /> :
                                                <AutoHeightImage
                                                    width={28}
                                                    maxHeight={28}
                                                    source={Images.CheckTickEmpty}
                                                />
                                        }
                                        <Text style={{ marginLeft: 8, color: Colors.black, fontSize: FontSize.h6, fontFamily: 'Inter-SemiBold' }}>No</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ minHeight: 60 }}>
                                    {
                                        yesno == 'no' ?
                                            <View style={{ width: '100%', minHeight: 20, flexDirection: 'row' }}>
                                                <AutoHeightImage
                                                    width={30}
                                                    maxHeight={30}
                                                    source={Images.WarningIcon}
                                                />
                                                <View style={{ width: '80%', marginLeft: 6, minHeight: 60 }}>
                                                    <Text style={{ fontSize: FontSize.p, color: '#212121' }}>Sorry ! We might note accept your request because of this selection.</Text>
                                                    <Text style={{ fontSize: FontSize.p, color: '#212121' }}>Our team will get back to you shortly.</Text>
                                                </View>
                                            </View>
                                            :
                                            <CTMButton marginBottom={true} theme="default" btnText="Request Services" functionType="createaccount" onPress={NavigationHandler} isLoading={isLoading} />
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* End: Model to continue for payment  */}

                {/* Start: Modal for slide images -- images  */}
                <Modal animationType="slide" transparent={true} visible={openCloseImageModal}>
                    <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#000000', zIndex: 999999 }}>
                        <TouchableOpacity style={{ width: 45, height: 45, position: 'absolute', top: 22, left: 12, justifyContent: 'center', alignItems: 'center', alignContent: 'center', zIndex: 9999, backgroundColor: '#ffffff21', overflow: 'hidden', borderRadius: 66 }} onPress={() => setopenCloseImageModal(false)}>
                            <Text style={{ fontSize: 18, color: '#ffffff', fontWeight: '500', marginBottom: 0, paddingBottom: 0, width: '100%', height: '100%', textAlign: 'center', textAlignVertical: 'center' }}>X</Text>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: '100%' }}>
                            {
                                sampleDeliveryType != 'pdf' ?
                                    <ImageViewer imageUrls={openCloseImageModalData} />
                                    :
                                    <View style={{ width: '100%', height: '100%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                        <Text style={{ color: '#ffffff' }}>File format is not png or jpg.</Text>
                                    </View>
                            }
                        </View>
                    </View>
                </Modal>
                {/* End: Modal for slide images  */}

            </ScrollView>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10, backgroundColor: '#fff' }}>
                <CTMButton marginBottom={false} theme="default" btnText="Request Services" functionType="createaccount" onPress={createPlotHandler} isLoading={isLoading} />
            </View>

        </ScreenWrapper>
    )
}

const styles = new StyleSheet.create({
    HeaderBox: {
        color: Colors.SecondaryColor,
        fontSize: FontSize.h5, fontFamily: 'Inter-SemiBold',
        fontWeight: FontWeight.medium,
        marginBottom: 12
    },
    BoxContainerColumn: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
    },
    textPara: {
        color: Colors.blackShadeOne,
        fontSize: FontSize.p,
        marginBottom: 12,
        fontWeight: FontWeight.regular
    },
    sndHeader: {
        color: Colors.blackShadeTwo,
        fontWeight: FontWeight.regular,
        fontSize: FontSize.h6,
        marginBottom: 4
    },

    AddTextHeader: {
        fontSize: FontSize.h5, fontFamily: 'Inter-SemiBold',
        fontWeight: FontWeight.medium,
        color: Colors.SecondaryColor,
        marginBottom: 4
    },
    AddTextpara: {
        fontSize: FontSize.p,
        color: Colors.blackShadeTwo,
    }
});

export default Package;