import { View, Text, ScrollView, StyleSheet ,Dimensions, Animated, TouchableOpacity, Modal, TextInput, ActivityIndicator} from 'react-native'
import React, { useState, useEffect, useCallback, useRef } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper';

// header 
import ScndHeader from '../../components/headers/scndHeader';
  
const {width, height} = Dimensions.get('window'); 
  
import Colors from '../utility/color';
import FontSize,{FontWeight} from '../utility/fonts';
  

import { useNavigation,useNavigationState  } from '@react-navigation/native';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component



// Start: icons 
import RupeeLight from '../../../assets/images/icons/rupeeWhite.svg';
import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg';
// end: icons


import ApiService from '../../ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import ArrowRightHalfDark from '../../../assets/images/icons/arrowRightHalfDark.svg'; 
import {actuatedNormalize} from '../../utility/scaling';

// notification 
import AnimatedMessage from '../../components/animatedNotification';

import PendingPaymentCarousel from '../../components/carousels/projectDetail';


import ApprovelCard from '../../components/projectDetails/timeLineDashboardCard';

import DesignCard from '../../components/projectDetails/designCard';

import ServicesCard from '../../components/projectDetails/servicesCard';

import ManagerAssignTo from '../../components/projectDetails/managerAssignto';

import RelatedProjects from '../../components/projectDetails/relatedProjects';

import FlatListCarousel from '../../components/carousels/FlatLIstCarousel';

import LoaderAddons from './loaderAddons';

import TimelineCardLoader from '../myproject_Timeline_Timeline/loader';
import Images from '../utility/images';
import { actuatedNormalizeVertical } from '../utility/scaling';
const MyProjectDashboard = (props)=>{
     const scrollViewRef = useRef(null);
      // aimate notification 
      const [messages, setMessages] = useState([]);
      useEffect(()=>{
          // setTimeout(()=>{
          //   setMessages([]);
          // },2000); 
      },[messages]);
     const navigation = useNavigation(); 

    const slideAnim = useRef(new Animated.Value(height)).current;  // Initial position off-screen
    const [isVisible, setIsVisible] = useState(false);

    const [iscontinueToCheckOutStatus,setiscontinueToCheckOutStatus] = useState(true);

    const toggleSlide = () => {
        if(iscontinueToCheckOutStatus == true){
            Animated.timing(
            slideAnim,
            {
                toValue: isVisible ? height : 0,  // Slide to off-screen or on-screen
                duration: 300,  // Animation duration in milliseconds
                useNativeDriver: true,  // Use native driver for better performance
            }
            ).start(() => setIsVisible(!isVisible));  // Toggle visibility state
        } 
    };
     
    const FlatelistData = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']; 
     
    // start: Pending orders 
    const [myProjectDeails,setMyProjectDeails] = useState([]); 

    const [siteId,setSiteId] = useState('');
    const [projectId,setProjectId] = useState('');
    const [projectCode,setProjectCode] = useState('');

    useFocusEffect(
        useCallback(  () => {
            const dataFetched = async ()=>{
                try{
                    await AsyncStorage.removeItem('projectid');
                    const creds = await AsyncStorage.getItem('projectIdNewTimeline');
                   // console.log("storage", creds);
                    await AsyncStorage.removeItem("dataStoreMyProject");
                    setProjectId(creds); 

                    getOrdersDetails(creds);
                    setTimeout(()=>{
                        getRecommendedAddons(creds);
                    },10);
                    setTimeout(()=>{
                        getupgrades(creds);
                    },12);
                    setTimeout(()=>{
                        getDetails(creds);
                    },14);
                    setTimeout(()=>{
                        getRelatedProject(creds);
                    },16);  
                    setTimeLineCard([]);
                    gettimeLineCard(creds);
 
                }  
                catch(error){
                    console.log("error in dataFetched function: ", error);
                    setMessages(['Something went wrong while running the data fetch.']);
                }
            } 

            dataFetched();

             
            return () => { 
                 console.log("Project iD fetched");
            }
        }, []),
    ); 



    // start: customers orders 
    const [data,setData] = useState([]); 
    const getOrdersDetails = async (projectId)=>{
        if(projectId != ''){
            const url = `customer/orders/?projectID=${projectId}`;
            console.log("get order details---+++++____++++____++___: ", url);
            await ApiService.Getapiheader(url)
            .then(response=>{
                if(response.orders){
                    console.log('get customers orders data:', response.orders);
                    setData(response.orders) 
                }else{
                    setMessages(['Something went wrong while getting the service card.']);
                }
            })
            .catch(error=>{
                console.log('get customers orders error:', error);
                setMessages(['Something went wrong while getting the service card.']);
            })
        }
    }
    // end: customers orders 

    
    // start: Services 
    const [servicesCardData,setServicesCardData] = useState([]);
    const [setServicesCardDataLoading,setsetServicesCardDataLoading] = useState(true);
    const [designCardData,setDesignCardData] = useState("");
      
    // start: manager ( assign to )
    const [managerAssignToData,setManagerAssignToData] = useState(''); 
    const [managerAssignToDataloading,setmanagerAssignToDataloading]  = useState(true);
    // Start: main api to get the project details 
    const getDetails = async (projectId)=>{
        setmanagerAssignToDataloading(true);
        setsetServicesCardDataLoading(true);
        if(projectId != ''){
            let url = `customer/mmhproject/${projectId}`
            await ApiService.Getapiheader(url)
            .then(response=>{  
                console.log("project time dashboard data:", url);
                AsyncStorage.setItem("projectCode", response.projectCode);
                setProjectCode(response.projectCode);
                setDesignCardData({
                    "currentService": response.currentService,
                    "dueDate": response.dueDate.split(' ')[0],
                    "currentStage":response.currentStage, 
                });
                if(response.assignedTo){  
                    // console.log(response.assignedTo)

                    // assign data
                    setManagerAssignToData(response.assignedTo);  
                    setmanagerAssignToDataloading(false);

                    // services  
                    // setServicesCardData(response); 
                    // console.log("%%%%%% ----services---- ", response.servicesV2);
                    setServicesCardData(response.servicesV2)
                    setsetServicesCardDataLoading(false);
                    console.log("response.servicesV2: ", response.servicesV2)   

                    // site id 
                    setSiteId(response.site.id);
                }
                // get the project timeline
                gettimeLineCard(response.projectCode)
            })
            .catch(error=>{
                console.log("project time dashboard:", error) 
                setMessages([`Someting went wrong,: ${error}`])  
                setServicesCardData([])
                setsetServicesCardDataLoading(false);
            }) 
        }
    }
    // End: main api to get the project details 

    // start: recommended addons and upgrades   
    const [listOfAddonsUpgrades,setlistOfAddonsUpgrades] = useState([]); 
    const [readyArrayOfObjectForBody,setreadyArrayOfObjectForBody] = useState([]);

    const [toShowOnModel,settoShowOnModel] = useState([]);
    // useEffect(()=>{
    //     if(toShowOnModel || toShowOnModel.lenght > 0){
    //         console.log("toShowOnModel:", toShowOnModel);
    //     }
    //     
    // },[toShowOnModel]);
    useEffect(()=>{
        let objectData = [];
        settoShowOnModel([]);
        if(listOfAddonsUpgrades && (listOfAddonsUpgrades.length > 0)){
            listOfAddonsUpgrades.map((item,index)=>{ 
                objectData.push({
                    "id":item, 
                    "instantDelivery":false,
                    "additionalOption":false
                });
                getSlectedIdsDetails(item,siteId);
                if(listOfAddonsUpgrades.length == (index+1)){  
                    setTimeout(()=>{
                        setreadyArrayOfObjectForBody(objectData);
                        console.log("objectData: ",objectData);
                    },200); 
                } 
            });
        } 
    },[listOfAddonsUpgrades]);
    const [detailsOfSelected,setdetialsofSelected] = useState([]);  
    const [totalPrice,setTotalPrice] = useState(0);
    useEffect(()=>{
        if(totalPrice == NaN || totalPrice == undefined || totalPrice < 0 ){
            setTotalPrice(0);
        } 
    },[totalPrice]);

    useEffect(()=>{
        setlistOfAddonsUpgrades([]);
        setTotalPrice(0);
    },[]);
    
    const getAddonsUpgradesDetails = async (projectid,siteid,action)=>{
        const url = `customer/productsv2/details/${projectid}/${siteid}`;
        await ApiService.Getapiheader(url)
        .then(response=>{
            console.log('response---addons and upgrades response:', response.data.pricing);
            if(response && response.data){
              
                if(action == 'add'){
                    // if(totalPrice > 0){
                        if(response.data && response.data.pricing.baseprice){
                            setTotalPrice(parseFloat(totalPrice)+parseFloat(response.data.pricing.baseprice));
                             console.log("totalPrice: baseprice ",response.data.pricing.baseprice); 
                        }else{
                            setTotalPrice(parseFloat(totalPrice)+parseFloat(response.data.pricing.actualprice));
                            console.log("totalPrice: actualprice",response.data.pricing.actualprice); 
                        }
                    // }
                }

                if(action == 'sub'){
                    // if(totalPrice > 0){
                        if(response.data && response.data.pricing.baseprice){
                            setTotalPrice(parseFloat(totalPrice)-parseFloat(response.data.pricing.baseprice));
                            console.log("totalPrice: baseprice", response.data.pricing.baseprice);
                        }else{
                            setTotalPrice(parseFloat(totalPrice)-parseFloat(response.data.pricing.actualprice));
                            console.log("totalPrice: actualprice",response.data.pricing.actualprice); 
                        }
                    // }
                }
            }
        })
        .catch(error=>{
            console.log('response---addons and upgrades response error:', error);  
        })
        .finally(()=>{
            console.log('response---addons and upgrades response finally:', totalPrice);
        })
    } 

    const getSlectedIdsDetails = async (projectid,siteid)=>{
        const url = `customer/productsv2/details/${projectid}/${siteid}`;
        await ApiService.Getapiheader(url)
        .then(response=>{
            if(response && response.data){
                 
                settoShowOnModel(currentData=>[...currentData,{
                    id:projectid,
                    titke:response.data.name, 
                    price:response.data.pricing.actualprice || response.data.pricing.baseprice
                }]); 
            }
        })
        .catch(error=>{
            console.log("error: getSelectedIdsDetails: ", error); 
        }) 
    }
    // end: recommended addons and upgrades 

    // Start: Recommended Add on
    const [recommendedAddonsData,setRecommendedAddonsData] = useState([]); 
    const [recommendedAddonsDataLoader,setRecommendedAddonsDataLoader] = useState(true);  
    const recommendedAddonsHandler = (projectid)=>{
        // console.log('id--- details ------', {
        //     id:projectid.id,
        //     siteId, 
        // })
        const isPresentInArray = listOfAddonsUpgrades.includes(projectid.id);
        if(isPresentInArray == true){
          //  console.log("id already in array");    
            setlistOfAddonsUpgrades(() => listOfAddonsUpgrades.filter((item) => item != projectid.id));   
            getAddonsUpgradesDetails(projectid.id,siteId,"sub");
        }else{ 
           // console.log("id not in array")
            setlistOfAddonsUpgrades(()=>[...listOfAddonsUpgrades , projectid.id]);   
            getAddonsUpgradesDetails(projectid.id,siteId,"add");
        }
        // getAddonsUpgradesDetails(projectid.id,siteId); 
        // AsyncStorage.setItem('SelectedSite',`${projectid}`);
        // AsyncStorage.setItem('projectId',`${siteId}`);
        // navigation.navigate('Package',{ params: {siteID:siteId, projectid:projectid}});
    }

    const getRecommendedAddons = async (projectId)=>{
        setRecommendedAddonsDataLoader(true);
        setRecommendedAddonsData([]);
        if(projectId != ''){
            const url = `customer/mmhproject/recommended_addons/${projectId}`;
            await ApiService.Getapiheader(url)
            .then(response=>{  
                if(response.data){
                   // console.log("project Recommended Add on:", response.data);
                    setRecommendedAddonsData(response.data)
                    setRecommendedAddonsDataLoader(false)
                }else{
                    setRecommendedAddonsData([])
                    setRecommendedAddonsDataLoader(false)
                }
                // setRecommendedAddonsDataLoader(false)
            })
            .catch(error=>{
                // console.log("project Recommended Add on:", error) 
                setMessages([`Someting went wrong,: ${error}`])   
                setRecommendedAddonsData([])
                setRecommendedAddonsDataLoader(false)
            })
        }
    }
    // end: Recommended Add on 

    // start: Upgraes 
    const [upgrades,setUpgrades] = useState([]); 
    const [upgradeLoader,setupgradeLoader] = useState(true);
    const upgradesHandler = (projectid)=>{
       // console.log('id---- up grades ---------', projectid);
        // console.log('id--- details ------', {
        //     projectid,
        //     siteId
        // })
        const isPresentInArray = listOfAddonsUpgrades.includes(projectid.id);
        if(isPresentInArray == true){
           //  console.log("id already in array");    
            setlistOfAddonsUpgrades(() => listOfAddonsUpgrades.filter((item) => item != projectid.id));   
            getAddonsUpgradesDetails(projectid.id,siteId,"sub");
        }else{ 
            // console.log("id not in array")
            setlistOfAddonsUpgrades(()=>[...listOfAddonsUpgrades , projectid.id]);   
            getAddonsUpgradesDetails(projectid.id,siteId,"add");
        }
        // AsyncStorage.setItem('SelectedSite',`${projectid}`);
        // AsyncStorage.setItem('projectId',`${siteId}`);
        // navigation.navigate('Package',{ params: {siteID:siteId, projectid:projectid}}); 
    }
    const getupgrades = async (projectId)=>{
        setupgradeLoader(true);
        if(projectId != ''){
            const url = `customer/mmhproject/upgrades/${projectId}`;
            await ApiService.Getapiheader(url)
            .then(response=>{  
                // console.log("project getupgrades:", response.data);
                if(response.data){
                    setUpgrades(response.data)
                    setupgradeLoader(false);
                }else{
                    setUpgrades([])
                    setupgradeLoader(false);
                }
            })
            .catch(error=>{
                // console.log("project upgrades:", error) 
                setMessages([`Someting went wrong,: ${error}`])  
                setUpgrades([])
                setupgradeLoader(false);
            })
        }
    }
    // end: Upgraes 

    // start: Timeline Approvel Card
    const [timeLineCard,setTimeLineCard] = useState([]);  
    const [timelineLoader,settimelineLoader] = useState(true);
    const gettimeLineCard = async (projectCode)=>{
        settimelineLoader(true);
        if(projectCode){
            const url = `customer/mmhproject/timeline/${projectCode}`;
          //  console.log('project timeLine url',url);
            await ApiService.Getapiheader(url)
            .then(response=>{  
                // console.log("dashobard-timeLine Card:", response.data);
                if(response.data){
                    setTimeLineCard(response.data); 
                    settimelineLoader(false)
                }else{
                    setTimeLineCard([]);
                    settimelineLoader(false)
                }
            })
            .catch(error=>{
                console.log("project timeLine Card:", error) 
                setMessages([`Someting went wrong,: ${error}`])   
                setTimeLineCard([]);
                settimelineLoader(false)
            })
        }
    }
    // end: Timeline Approvel Card

    // start: relatedProjectsData
    const [relatedProjectsData,setRelatedProjectsData] = useState([]); 
    const getRelatedProject = async (projectId)=>{
        console.log(projectId)
        if(projectId != ''){
            const url = `customer/mmhproject/related_projects/${projectId}`;
            await ApiService.Getapiheader(url)
            .then(response=>{   
                if(response.data){

                    // setRelatedProjectsData(response.data);
                    response.data.map((item,index)=>{
                        // console.log("_+_+_+_+_+_:",{
                        //     id:index+1,
                        //     siteName:item.site.name,
                        //     extrData:`${item.name} ${item.projectCode}`,
                        //     shortName:item.name.trim().charAt(0),
                        //     projectid:item.ID
                        // });
                        setRelatedProjectsData(prevData => [...prevData,{
                            id:index+1,
                            siteName:item.site.name.trim(),
                            extrData:`${item.name.trim()} ${item.projectCode}`,
                            shortName:item.name.trim().charAt(0),
                            projectid:item.ID
                        }])
                    })
                }else{
                    console.log("-related projects data response: --------==================", response);
                } 
            })
            .catch(error=>{
                // console.log("related projects error:", error) 
                setMessages([`Someting went wrong,: ${error}`])  
            })
        }
    }

    // related project callback 
    const [getRelatedProjectiDModel,setgetRelatedProjectiDModel] = useState(false);
    const getRelatedProjectiD = (id)=>{
        console.log("clicked on related project: ", id);
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }

        setgetRelatedProjectiDModel(true);
        AsyncStorage.removeItem('projectIdNewTimeline');
        AsyncStorage.setItem('projectIdNewTimeline',`${id}`);
        // console.log("storage", creds);
         AsyncStorage.removeItem("dataStoreMyProject");
         setProjectId(id); 

         getOrdersDetails(id);
         setTimeout(()=>{
             getRecommendedAddons(id);
         },10);
         setTimeout(()=>{
             getupgrades(id);
         },12);
         setTimeout(()=>{
             getDetails(id);
         },14);
         setTimeout(()=>{
             getRelatedProject(id);
         },16);

        setTimeout(()=>{ 
            setgetRelatedProjectiDModel(false);
        },2000);

    }

    // end: relatedProjectsData

    // start: continue to checkoout
    const continueToCheckOut = async ()=>{ 
        setiscontinueToCheckOutStatus(false);
        toggleSlide();
        console.log("body object",{
            readyArrayOfObjectForBody,
            projectId,
            siteId
        });
        let url = 'customer/orderv2?isProject=true';
        let data = {
            projectID:projectId
        }
        await ApiService.Post(url,data)
        .then(response=>{
            console.log("draft order response:", response.data);
            if(response && response.data){
                console.log("readyArrayOfObjectForBody",readyArrayOfObjectForBody.length);
                setTimeout(()=>{
                    if(readyArrayOfObjectForBody.length > 0){
                        addProductsToOrder(readyArrayOfObjectForBody,response.data.id);    
                    }else{
                        setiscontinueToCheckOutStatus(true);
                        console.log("Error while creating a Draft Order. 1")
                        setMessages(['Error while creating a Draft Order.']);    
                    }    
                },100); 
            }else{
                setiscontinueToCheckOutStatus(true);
                console.log("Error while creating a Draft Order. 2")
                setMessages(['Error while creating a Draft Order. Server didn"t responsed.']);
            }
        })  
        .catch(error=>{
            setiscontinueToCheckOutStatus(true);
            console.log("error while creatig a draft order: ", error);
            setMessages(['Error while creating a Draft Order.']);
        }) 
    }
    // end: continue to checkoout

    // Start: Add Adddons and Upgrades to product 
    const addProductsToOrder =  async (data,draftOrderId)=>{
        AsyncStorage.removeItem('OrderDetails');
        AsyncStorage.removeItem("TotalPrice");
        let url = `customer/orderv2/products/${draftOrderId}`;  
        console.log({
            url:url,
            data
        });
        await ApiService.Post(url,{
            "products":data
        })
        .then(response=>{
            if(response && response.data){
                console.log("Drafted Order___add products: ", response.data);
                AsyncStorage.setItem('OrderDetails', JSON.stringify(response.data));  
                // here to navigate to the checkout page.
                // navigation.navigate('check');
                AsyncStorage.setItem("TotalPrice", `${totalPrice}`); 
                AsyncStorage.setItem("Addons", JSON.stringify(toShowOnModel));
                AsyncStorage.setItem("RecentAddedSite", JSON.stringify(
                    [
                        {
                            totalPrice:totalPrice, 
                            innerElements:[],
                            name:null,
                            id:null
                        }
                    ] 
                ));
                setTimeout(()=>{
                    setiscontinueToCheckOutStatus(true);
                    navigation.navigate('CheckOut');
                },100); 
            }
            else{
                console.log("Drafted order data ")
                setiscontinueToCheckOutStatus(true);
            }
        })
        .catch(error=>{
            console.log("add product to draft orders:", error);
            setiscontinueToCheckOutStatus(true);
        })
    }
    // end: Add Adddons and Upgrades to product

    //start:  timeline card 
    const [hideAndShowMsg,sethideAndShowMsg] = useState(false);
    const [selectedState,setselectedState] = useState(0);
    const [popUpmessage,setpopUpmessage] = useState('');
    const [firebaseDocID,setfirebaseDocID] = useState('');

    const [isLoadingPOPUP,setisLoadingPOPUP] = useState(false);

    // selected type 
    const selectedStateHandler = (state)=>{
        setselectedState(state);
        sethideAndShowMsg(true); 
    } 

    const firebaseDocIdHandler = (data)=>{
        setfirebaseDocID(data)
    } 

    const hideAndShowMsgHandler = ()=>{
        sethideAndShowMsg(false);
        setselectedState(0);
        setpopUpmessage('');
        setfirebaseDocID('');
    }
     
    // popup action button...
    const popUpHandler = async (projectCode,fireStoreDocId, message, action)=>{ 
        let data = { 
            fireStoreDocId,
            message,
            action:action == 3 ? 2 : action
        }
        console.log("popup data: ", data);
        let url =`customer/media/actionApproval_v2/${projectCode}`
        setisLoadingPOPUP(true);
        await ApiService.Post(url,data)
        .then(response=>{
            console.log("response timeline action button -- ", response.data);
            if(response.data.isCardMoved == true){ 
                sethideAndShowMsg(false);
                setisLoadingPOPUP(false); 
                setTimeLineCard([]);
                gettimeLineCard(projectCode);
            }
        })
        .catch(error=>{
            console.log('error timeline action button', error);
            setMessages([`Something went wrong: ${error}`]);
            sethideAndShowMsg(false);
            setisLoadingPOPUP(false);
            setTimeLineCard([]);
            gettimeLineCard(projectCode)
        })
    }
    //end:  timeline card

    
    return (
        <ScreenWrapper>
            {/* Start: Notification Bar  */}
            <View
                style={{
                position: 'absolute', 
                left: 0, 
                top:'0%',
                width:'100%',
                zIndex:999, 
                padding:12
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
            <ScndHeader
                Title={projectCode == '' ? "Project Details" : projectCode }
                Search={false} 
                Profile={false}  
                Back={true}
                BackScreen="" 
                Skip={false} 
                skipSnd={true}
                SkipStack=""
                SkipScreen="" 
            /> 
            <ScrollView ref={scrollViewRef} bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {/* Start: Carsouel */}
                <View style={{padding:0, marginTop:4, }}> 
                    <PendingPaymentCarousel data={data}/>
                </View>     
                {/* Start: Carsouel */}

                {/* Start: Recommended Add on */}
                    {
                        recommendedAddonsDataLoader ? (
                            <View style={{padding:0, }}>
                                <View style={{padding:10}}>
                                    <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Recommended Add on</Text>
                                </View> 
                                <View style={{padding:0,marginBottom:12}}> 

                                    <View style={{padding:12,  flexDirection:'row'}}>
                                        <LoaderAddons/>
                                        <LoaderAddons/>
                                        <LoaderAddons/>
                                    </View>

                                </View> 
                                </View>

                        )
                        :
                        recommendedAddonsData.length > 0 ? (
                            <View style={{padding:0, }}>
                                <View style={{padding:10}}>
                                    <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Recommended Add on</Text>
                                </View> 
                                <View style={{padding:0,marginBottom:12}}> 
                                    <FlatListCarousel data={recommendedAddonsData} listData={listOfAddonsUpgrades} onPress={recommendedAddonsHandler}/>   
                                </View> 
                            </View>
                        ):
                        null
                    } 
                {/* end: Recommended Add on */}

                {/* Start: Upgrades Add on */} 
                {
                    upgradeLoader ? (
                        <View style={{padding:0}}>
                            <View style={{padding:10}}>
                                <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Upgrades</Text>
                            </View> 
                            <View style={{padding:0,marginBottom:12}}>  
                                    <View style={{padding:12,  flexDirection:'row'}}>
                                        <LoaderAddons/>
                                        <LoaderAddons/>
                                        <LoaderAddons/>
                                    </View>   
                            </View>  
                        </View> 
                    )
                    :
                    upgrades.length> 0 ? (
                        <View style={{padding:0}}>
                            <View style={{padding:10}}>
                                <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Upgrades</Text>
                            </View> 
                            <View style={{padding:0,marginBottom:12}}>  
                                <FlatListCarousel data={upgrades} listData={listOfAddonsUpgrades} onPress={upgradesHandler}/>    
                            </View>  
                        </View> 
                    ):
                    null 
                }   
                {/* End: Upgrades Add on */}

                {/* Start: Timeline Approvel card */}
                {
                    timelineLoader ? (
                        <View style={{padding:0}}>
                            <View style={{padding:10, marginTop:10}}>
                                <TimelineCardLoader />
                            </View>
                        </View>        
                    ):
                    timeLineCard.length > 0 ?(
                        <View style={{padding:0}}>
                            <View style={{padding:10, marginTop:10}}> 
                                <ApprovelCard data={timeLineCard[0]} loader={timelineLoader} showHeader={true} selectedStateHandler={selectedStateHandler} firebaseDocIdHandler={firebaseDocIdHandler}/> 
                            </View>
                        </View>
                    ):
                    null
                }      
                {/* End: Timeline Approvel card */}  

                {/* Start: Design card */}
                <View style={{padding:0}}> 
                        <View style={{padding:10, marginTop:4}}> 
                        {
                            designCardData == "" ?
                                <View style={{ with:'100%',
                                    height:110,
                                    backgroundColor:Colors.lighteshGray, 
                                    borderRadius:9,}}>
                                </View>
                                :
                                <DesignCard data={designCardData}/>
                        }
                         
                        </View>
                </View>
                {/* End: Design card */}  

                {/* Start: Services */} 
                {
                    setServicesCardDataLoading ?  (
                        <View style={{padding:0}}>
                        <View style={{padding:10}}>
                            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Services</Text>
                        </View> 
                        <View style={{padding:0,marginBottom:12}}>  
                            <View style={{paddingHorizontal:12}}> 
                                <View style={{ with:'100%',
                                    height:120,
                                    backgroundColor:Colors.lighteshGray, 
                                    borderRadius:9,}}>
                                </View>
                            </View>  
                        </View>  
                        </View>
                    ) 
                    :
                    servicesCardData.length>0 ? (
                        <View style={{padding:0}}>
                        <View style={{padding:10}}>
                            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Services</Text>
                        </View> 
                        <View style={{padding:0,marginBottom:12}}>  
                            {
                                servicesCardData && (
                                    servicesCardData.length > 0 ? 
                                    <ServicesCard  data={servicesCardData}/>
                                    :
                                   null       
                                )
                            } 
                        </View>  
                        </View> 
                    ):
                    null 
                }   
                     
                {/* End: Services */}  

                {/* Start: Manager Assign to */}  
                <View style={{padding:0, marginVertical:12}}> 
                       <View style={{width:'100%', backgroundColor:'#E7EBEE', padding:10}}>
                            <Text style={{fontSize:FontSize.h6, fontWeight:FontWeight.medium, color:Colors.SecondaryColor}}>Customer Relationship Manager</Text>
                        </View> 
                        <View style={{padding:10}}>
                            {
                                managerAssignToDataloading == true ? 
                                <View style={{ with:'100%',
                                    height:120,
                                    backgroundColor:Colors.lighteshGray, 
                                    borderRadius:9,}}>
                                </View> 
                                :
                                (
                                    managerAssignToData != '' ?
                                        <ManagerAssignTo data={managerAssignToData}/>   
                                    :
                                    <></>
                                )
                            }    
                        </View>
                </View> 
                {/* End: Manager Assign to */}

               

                {/* Start: Related Projects */}
                {
                    relatedProjectsData&&(
                        relatedProjectsData.length > 0 ? 
                        <View style={{padding:0}}>
                            <View style={{padding:10}}>
                                <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Related Project</Text>
                            </View> 
                            <View style={{padding:0}}> 
                                <RelatedProjects data={relatedProjectsData} getRelatedProjectiD={getRelatedProjectiD}/>
                            </View>
                        </View>  
                        :
                        <></>
                    )
                }
               
                {/* End: Related Projects */} 


           </ScrollView> 

            {
                listOfAddonsUpgrades&&
                (
                    listOfAddonsUpgrades.length>0?
                    <>   
                        <Animated.View style={[styles.animatedView, { transform: [{ translateY: slideAnim }] }, isVisible == false?{display:'none'}:{display:'flex'}]}>
                                <TouchableOpacity style={{width:'100%', height:'80%', backgroundColor:'#00000045'}} onPress={toggleSlide}></TouchableOpacity>
                                <View style={{width:'100%',minHeight:'10%', backgroundColor:'#eee', padding:12}}>
                                    
                                    <View style={{width:'100%',minHeight:40,flexDirection:'row',justifyContent:'space-between',alignItems: 'center',alignContent:'center', marginTop:12}}>
                                            <Text style={{color:Colors.black,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500'}}>Total Amount</Text>
                                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}> 
                                                    <RupeeBlack width={18} height={18} style={{marginTop:2}}/>
                                                    <Text style={{color:'#5B5C5B',fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500',marginLeft:4}}>{totalPrice}</Text>
                                            </View>
                                    </View>
                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center',marginBottom:12}}>
                                        <Text  style={{color:Colors.lightGray, fontSize:FontSize.p, fontWeight:'500'}}>Recommended</Text>    
                                    </View>    
                                    {
                                        toShowOnModel && (
                                            (
                                                toShowOnModel.map((item,index)=>{
                                                   return <View key={item.id} style={{width:'100%',minHeight:40,flexDirection:'column',marginBottom:14,borderBottomWidth:2, borderColor:Colors.lightGray, paddingBottom:12, }}>  
                                                        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                                            <Text  style={{color:Colors.gray,fontSize:FontSize.h6, fontWeight:'500'}}>{item.titke}</Text>    
                                                            <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}> 
                                                                <RupeeBlack width={14} height={14} style={{marginTop:2}}/>
                                                                <Text  style={{color:Colors.gray,fontSize:FontSize.h6, fontWeight:'500',marginLeft:4}}>{item.price}</Text> 
                                                            </View>
                                                        </View>
                                                    </View>   
                                                })
                                            )
                                        )
                                    } 
                                </View> 
                        </Animated.View>
                        <View style={[{position:'absolute', bottom:0, height:actuatedNormalizeVertical(65), width:'100%',height:60,backgroundColor:Colors.SecondaryColor,flexDirection:'row', justifyContent:'space-between', borderTopLeftRadius:12, borderTopRightRadius:12, paddingHorizontal:10, }]}>
                                <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}> 
                                    <RupeeLight width={16} height={16} style={{marginTop:4}}/> 
                                    <Text style={{fontSize:22,fontWeight:'600',marginHorizontal:6,color:"#ffffff"}}>{totalPrice}</Text> 
                                    <TouchableOpacity style={{marginLeft:2,marginTop:4}}  onPress={toggleSlide} >
                                        <AutoHeightImage
                                            width={18}
                                            maxHeight={18}
                                            resizeMode="contain"
                                            source={Images.iIconLight}
                                        /> 
                                    </TouchableOpacity>
                                </View>
                                <View style={{  width:'50%',height:60, justifyContent:'center',alignContent:'center',alignItems:'center' }}>
                                    {
                                        iscontinueToCheckOutStatus == true ? 
                                        <TouchableOpacity style={{width:'90%', height:'70%', backgroundColor:Colors.PrimaryColor, justifyContent:'center', alignItems: 'center', alignContent:'center', borderRadius:6}} onPress={()=>continueToCheckOut()}>
                                            <Text style={{fontSize:FontSize.xp,color:Colors.white}}>Continue</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={{width:'90%', height:'70%', backgroundColor:Colors.PrimaryColor, justifyContent:'center', alignItems: 'center', alignContent:'center', borderRadius:6}}>
                                            <Text style={{fontSize:FontSize.xp,color:Colors.white}}>Loading...</Text>
                                        </View>
                                    }
                                </View>
                        </View>
                    </>
                    :
                    null
                )
            }


            <Modal animationType="slide" transparent={true} visible={hideAndShowMsg}>     
                <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                    <TouchableOpacity style={{ backgroundColor:'transparent', width: '100%', height: "30%" }}  onPress={()=>hideAndShowMsgHandler()}>
                      <View  ></View>
                    </TouchableOpacity>
                    <View style={{width:'100%', maxHeight:360, backgroundColor:'transparent', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{width:'90%', height:"90%", backgroundColor:'#ffffff', borderRadius:12,padding:12, elevation:4, flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <View style={{width:'100%'}}><Text style={{fontSize:FontSize.p, fontWeight:'400', color:'#000000'}}>Please enter your message in the field provided below.</Text></View>
                            <View style={{width:'100%', marginVertical:12}}>
                                <TextInput
                                    style={{ height: 120,
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 12,
                                        textAlignVertical: 'top',
                                        color:'#000000'
                                    }}
                                    multiline
                                    numberOfLines={6}
                                    placeholder="Type your message here..."
                                    placeholderTextColor={'#888888'}
                                    value={popUpmessage}
                                    onChangeText={setpopUpmessage}
                                />
                            </View>
                            <View style={{width:'100%', marginVertical:8, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                <TouchableOpacity style={{backgroundColor:"#FA0606", paddingVertical:12, paddingHorizontal:22, borderRadius:3}} onPress={()=>hideAndShowMsgHandler()}>
                                    <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:"#ffffff"}}>Cancel</Text>
                                </TouchableOpacity>

                                 {
                                    selectedState == 1 && (
                                        
                                            isLoadingPOPUP == true ? 
                                            <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor, paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:3}}>
                                                <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#ffffff'}}>Loading</Text>
                                            </TouchableOpacity>
                                            :
                                            
                                            <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor, paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:3}} onPress={()=>{popUpHandler(projectCode,firebaseDocID,popUpmessage,selectedState)}}>
                                                <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#ffffff'}}>Mark As Approved</Text>
                                            </TouchableOpacity>
                                        
                                    ) 
                                }

                                {
                                    selectedState == 2 && (
                                        isLoadingPOPUP == true ?
                                        <TouchableOpacity style={{backgroundColor:'#FA0606', paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:3}} >
                                            <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#ffffff'}}>Loading</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{backgroundColor:'#FA0606', paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:3}} onPress={()=>{popUpHandler(projectCode,firebaseDocID,popUpmessage,selectedState)}}>
                                            <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#ffffff'}}>Declined</Text>
                                        </TouchableOpacity>
                                    ) 
                                }         
                                
                                 
                                {
                                    selectedState == 3 && ( 
                                        isLoadingPOPUP == true ? 
                                        <TouchableOpacity style={{backgroundColor:'#FFCE00', paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:3}}>
                                            <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#fff'}}>Loading</Text>
                                        </TouchableOpacity>  
                                        :
                                        <TouchableOpacity style={{backgroundColor:'#FFCE00', paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:3}} onPress={()=>{popUpHandler(projectCode,firebaseDocID,popUpmessage,selectedState)}}>
                                            <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#fff'}}>Need Changes</Text>
                                        </TouchableOpacity>  
                                    )
                                }
                                     
                            </View> 
                        </View>
                    </View>
                    <TouchableOpacity style={{ backgroundColor:'transparent', width: '100%', height: "40%" }}  onPress={()=>hideAndShowMsgHandler()}>
                      <View></View>
                    </TouchableOpacity>
                </View> 
            </Modal>
            {/* getRelatedProjectiDModel */}
            <Modal animationType="slide" transparent={true} visible={getRelatedProjectiDModel} >
                <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                    <View style={{ backgroundColor:'transparent', width: '100%', height: "100%" }} >
                      <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                            <ActivityIndicator size="large" color="#3CAF4B" />    
                      </View>
                    </View> 
                </View>
            </Modal>

        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:120,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius:9,
        elevation:3,
        position: 'relative',
        padding:10,
        marginVertical:12
    },
    box:{
        width:'33%', 
        height:'100%', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    animatedView: {
        position: 'absolute',
        bottom: actuatedNormalizeVertical(55),
        width: '100%',
        height:'100%',   
        flexDirection:'column',
        justifyContent: 'flex-end', // Align children to the bottom
        alignItems: 'center',
        alignContent:'center',
        zIndex:0, 
        paddingBottom:actuatedNormalizeVertical(10), 
      }
})

export default MyProjectDashboard;