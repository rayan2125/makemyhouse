import { View, Text, ScrollView, StyleSheet ,Dimensions, Modal, TouchableOpacity, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'

import { useFocusEffect } from '@react-navigation/native';

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper';


// header 
import ScndHeader from '../../components/headers/scndHeader';



import Images from '../utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';

import CTMButton from "../../components/button/index"
import { useNavigation,} from '@react-navigation/native';

// notification 
import AnimatedMessage from '../../components/animatedNotification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../../ApiServices';

import { useDispatch,} from 'react-redux';
import { clearAllTheData,addGlobalData } from '../../redux';


//main screen 
const SiteDetails = ()=>{

    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        // setTimeout(()=>{
        //   setMessages([]);
        // },2000); 
    },[messages]);

    const  navigation = useNavigation();  
    // is loading  
    const [isLoading,setIsLoading] = useState(false);
    const [readyForPayment,setReadyForPayment]  = useState(false);

    const createPlotHandler = ()=>{
        console.log("create Plot Handler");
        setIsLoading(true);
        setTimeout(()=>{ 
            setReadyForPayment(true);  
            // here I have to run the draft order and 
            // and add product api to get the details 
            // then check for the addons
            // if addons then navigate to addons 
            // otherwise  directly go to checkout page 
            createDraftOrder(); 
        },1200);
    }
 

    // start: site details 
    const [siteId,setSiteId] = useState('');
    const [siteDetails,setSiteDetails] = useState('');
    const [projectId,setProjectId] = useState('');

    const [plotId,setPlotId] = useState('');
    const [plotDetails,setPlotDetails] = useState(); 

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem('SelectedSite',(error,cre)=>{
                
                AsyncStorage.getItem('projectId',(err, projectId)=>{
                    setProjectId(projectId);
                    AsyncStorage.removeItem("Addons");  
                    AsyncStorage.removeItem("RecentAddedSite");  
                    AsyncStorage.removeItem("TotalPrice"); 
                    AsyncStorage.removeItem("DraftedOrder"); 
                    AsyncStorage.removeItem("OrderDetails"); 

                    AsyncStorage.removeItem('updatescreenLAT');
                    AsyncStorage.removeItem('updatescreenLONG');

                    AsyncStorage.removeItem('updatescreenlocation');
                    AsyncStorage.removeItem('UpdateCreateSite');
                }); 
                setSiteId(cre)
                getSiteDetails(cre);
            }); 
            return;
        }, []),
    );  

    const getSiteDetails = (id)=>{
        AsyncStorage.removeItem('UpdateCreateSite');
        let url = `customer/ConstructionSite?siteId=${parseInt(id)}`; 
        ApiService.Getapiheader(url)
        .then(response=>{
            // console.log("----------------------getSiteDetails: ", response.data.sites);
            
            let responseData = response.data.sites[0];

            setSiteDetails(responseData);
            // console.log("selectedd site detail screen: ", responseData);
            AsyncStorage.setItem('updatescreenlocation',JSON.stringify(
                {
                    lat:responseData.lattitude,
                    long:responseData.longitude
                }
            ));  
            AsyncStorage.setItem('UpdateCreateSite',JSON.stringify({
                "id":id,
                "name":responseData.name,
                "houseNumber":responseData.address.split(",")[0].trim(),
                "addressLineOne":responseData.address.split(",")[1].trim(),
                "addressLineTwo":responseData.address.split(",")[2].trim(),
                "pincode":responseData.pincode,
                "city":responseData.city,
                "state":responseData.state,
                "stage":responseData.stage,
                "lat":responseData.lattitude,
                "long":responseData.longitude,

                // plot details
                "purpose":responseData.purpose,
                "direction":responseData.direction, 
                "type":responseData.type, // plot shape (rectangle/non-rectangle) 
                "width":responseData.width, // width 
                "depth":responseData.depth, // height 
                "plot_area":responseData.plot_area, // area  
                "floors":responseData.floors, // floors  
            }))

        })
        .catch(error=>{
            console.log("----------------------",error);
        })
    }
    // end: site details 

    // start: create a draft order 
    const createDraftOrder = async ()=>{
        AsyncStorage.removeItem('DraftedOrder');
        let url = 'customer/orderv2';
        if (siteDetails.depth != 0 || siteDetails.width != 0 || siteDetails.plot_area != 0){
            let data ={
                "builtUpArea":siteDetails.plot_area,
                "width":siteDetails.width,
                "length": siteDetails.depth,
                "floors": siteDetails.floors,
                "direction":siteDetails.direction,
                "type": siteDetails.purpose == 'residential'? 'RESD': siteDetails.purpose == 'commercial' ? 'COMM': siteDetails.purpose == 'residence-With-Commercial'?'RSCM':'RSED'  , 
                "siteID": siteId
            }
            console.log("draft Order Request : ", data);
            await ApiService.Post(url,data)
            .then(response=>{
                console.log("draft Order Response : ", response.data);
                // here get the orderId
                // save into the local storage 
                // then create a order 
                AsyncStorage.setItem('DraftedOrder', JSON.stringify(response.data)); 
                let thedata = [
                    {
                        "id":projectId,
                        "instantDelivery":false,
                        "additionalOption":false
                    }
                ]; 
                addProductToOrder(thedata,response.data.id);
            })
            .catch(error=>{
                setIsLoading(false);
                console.log("error while creating a draft order: ", error);
            })
        }else{
            console.log("-----...--- >> : depth, area and width is zero");
            setIsLoading(false);
            setMessages(['Kindly edit your site. Plot Depth, Plot Area and Plot Width can not we zero.']);
        } 
    }
    // end: create a draft order   

    // start: add product which means create an actual order
    const addProductToOrder= async (data,draftOrderId)=>{ 
        if(draftOrderId != null || draftOrderId != undefined){
            AsyncStorage.removeItem('OrderDetails');
            let url = `customer/orderv2/products/${draftOrderId}`;  
            console.log({
                url:url,
                data
            });
            await ApiService.Post(url,{
                "products":data
            })
            .then(response=>{
                if(response){
                    console.log("Drafted Order___add products: ", response.data);
                    AsyncStorage.setItem('OrderDetails', JSON.stringify(response.data)); 
                    if(response && response.data){
                        checkForAddonns(draftOrderId);
                    }else{
                        console.log('Something went wrong while adding products');
                        setMessages(['Something went wrong while adding products']);
                    } 
                }
                else{
                    console.log('Something went wrong while adding products');
                    setMessages(['Something went wrong while adding products']);
                }
            })
            .catch(error=>{
                setIsLoading(false);
                console.log("error while creating a order", error); 
                setMessages(['Something went wrong while adding products']);
            })
        }else{
            setMessages(['Something went wrong while creating draft order. Product id not defined.']);
        }
        
    }
    // end: add product which means create an actual order

    // start: check for addons
    const checkForAddonns = (orderId)=>{
        AsyncStorage.getItem('projectId',(error, projectIdA)=>{ 
            AsyncStorage.getItem('SelectedSite',(error,siteIdA)=>{
                   
                // FetchApi(projectIdA,siteIdA);
                // FetchApi(projectIdA,siteIdA);
                if(projectIdA != null || projectIdA != undefined || siteIdA != null || siteIdA!= undefined){
                    let url = `customer/productsv2/details/${projectIdA}/${siteIdA}`;
                    ApiService.Getapiheader(url)
                    .then(response=>{


                        dispatch(clearAllTheData({
                            addons: [],
                            totalPrice: 0,
                            couponCode: "",
                            couponeData: [],
                            couponeUpdatedPrice: ""
                        }));
                        
                        // console.log("0000000000000000000000000000000000000", response.data);
                        // console.log("-------------Fetch api for addons----------:",response.data); 
                        if(response && response.data){
                            if(response.data.addons.length > 0){
                                setIsLoading(false);
                                navigation.navigate('SelectAddOn');
                            }else{
                                setIsLoading(false);
                                let addonsData =[];
                                AsyncStorage.setItem("Addons",  JSON.stringify(addonsData));  
                                let aa = [
                                    {
                                        totalPrice:response.data.pricing.price, 
                                        innerElements:[],
                                        name:response.data.name,
                                        id:response.data.id
                                    }
                                ]
                                AsyncStorage.setItem("RecentAddedSite", JSON.stringify(aa)); 
                                AsyncStorage.setItem("TotalPrice", `${response.data.pricing.price}`);
                                
                                dispatch(addGlobalData({
                                    orderId:orderId,
                                    storeAllproductIds:JSON.stringify(aa),
                                    totalPrice:`${response.data.pricing.price}`,
                                    addons:JSON.stringify([]),
                                    recentAddedSite:JSON.stringify(aa), 
                                    changes:false
                                }));

                                setTimeout(()=>{
                                    navigation.navigate('CheckOut'); 
                                },100);  
                            } 
                        }else{
                            setMessages(['Something went wrong while checking for addons']);
                        }
                    })
                    .catch(error=>{
                        setIsLoading(false);
                        console.log("Check for addons:ERROR", error)
                        setMessages(['Something went wrong while checking for addons']);
                    })
                }else{
                    setMessages(['Something went wrong while checking for addons']);
                } 
            })
        });       
    }
    // end: check for addons

    const [fromScreen,setFromScreen] = useState('')
    useEffect(()=>{
        AsyncStorage.getItem('fromPackageScreen', (err,creds)=>{
            console.log("site details from package screem:", creds);
            setFromScreen(creds);
        });
    },[]);

    // now when user click on hard back button only if comming from the package screem
    // navigate the user to select site page.
    return(
        <ScreenWrapper>
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
                {/* Start: Header */}
                <ScndHeader 
                    Title="Site Details" 
                    Search={false} 
                    Profile={false}  
                    Back={true}
                    BackScreen={fromScreen == 'package'?'SelectSite':''} 
                    BackToPackage={true}
                    Skip={false} 
                    SkipScreen=""  
                />
                {/* End: Header */}
                
                {/* Start: Main Body */}
                <ScrollView style={{flex:1,padding:0,paddingHorizontal:0,marginTop:0}}>

                        {/* Start: Site Details */}
                        <View>
                            {/* <View style={[styles.DarkHeder,{marginTop:0}]}>
                                <Text style={{fontSize:FontSize.h4-1,color:Colors.SecondaryColor,fontWeight:FontWeight.medium}}>Apply Coupon Code </Text>
                            </View>     */}
                            {
                                siteDetails?
                               
                                     <View style={{padding:10,marginTop:20,justifyContent:'center',alignContent:'center'}}>
                                        <View style={[styles.boxFull,{marginBottom:10}]}>
                                            <View style={{width:'90%'}}>
                                                    <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Site Address:</Text>
                                                    <Text style={styles.uppertext}>{siteDetails.name}</Text> 
                                            </View>
                                            {/*  UpdateAddNewSiteFillDetails */}
                                            <TouchableOpacity onPress={()=>navigation.navigate('DetectLocationUpdate')}>
                                                <AutoHeightImage
                                                    width={26}
                                                    source={Images.Edit} 
                                                    style={{marginTop:4}}
                                                />
                                            </TouchableOpacity>
                                        </View>  
                                        <Text style={{color:Colors.black,fontSize:FontSize.p,marginBottom:10}}>
                                            {siteDetails.address}
                                        </Text>
                                    </View> 
                                :
                                <View style={{padding:8}}>
                                    <View style={{width:'100%',height:140, backgroundColor:Colors.lighteshGray, marginBottom:20, padding:6, borderRadius:6}}>
                                        <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>         
                                        <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View> 
                                        <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>                 
                                            
                                    </View>
                                    <View style={{width:'100%',height:140, backgroundColor:Colors.lighteshGray, marginBottom:20, padding:6, borderRadius:6}}>
                                    <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>         
                                        <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View> 
                                        <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>                 
                                    </View> 
                                </View>  
                            }
                            {/* Start: Site Address */}
                           
                            {/* End: Site Address */}

                            <View style={{width:'100%',height:20,backgroundColor:'#E5E5E5'}}></View>

                            {/* Start: Site Specification:  */}
                            {
                                siteDetails?
                            
                                <View style={{padding:10, minHeight:10, marginTop:20, justifyContent:'center', alignContent:'center'}}>
                                    <View style={[styles.boxFull,{marginBottom:24}]}>
                                        <View style={{width:'90%'}}>
                                                <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Site Specification:</Text>
                                                <Text style={styles.uppertext}>Edit Side Details by Clicking On edit button</Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>navigation.navigate('UpdateCreatePlot')}>
                                            <AutoHeightImage
                                                width={26}
                                                source={Images.Edit} 
                                                style={{marginTop:4}}
                                            />
                                        </TouchableOpacity>
                                    </View> 
                                    {/* Start: Loop */}
                                    <View style={styles.loop}>
                                        <View style={styles.innerLoop}>
                                            <Text style={styles.uppertext}>Plot Shape:</Text>
                                            <Text style={styles.lowwertext}>{siteDetails.type}</Text>
                                        </View>
                                        <View style={styles.innerLoop}>
                                            <Text style={styles.uppertext}>Plot Area:</Text>
                                            <Text style={styles.lowwertext}>{siteDetails.plot_area} sq.ft</Text>
                                        </View>
                                    </View>  
                                    <View style={styles.loop}>
                                        <View style={styles.innerLoop}>
                                            <Text style={styles.uppertext}>Plot Width:</Text>
                                            <Text style={styles.lowwertext}>{siteDetails.width} feet</Text>
                                        </View>
                                        <View style={styles.innerLoop}>
                                            <Text style={styles.uppertext}>Number of Floor:</Text>
                                            <Text style={styles.lowwertext}>
                                                {
                                                    siteDetails.floors == 1 ? "Ground Floor" : 
                                                    siteDetails.floors == 2 ? "Ground Floor + 1 Floor" :
                                                    siteDetails.floors == 3 ? "Ground Floor + 2 Floor" :
                                                    siteDetails.floors == 4 ? "Ground Floor + 3 Floor" :
                                                    siteDetails.floors == 5 ? "Ground Floor + 4 Floor" :
                                                    siteDetails.floors == 6 ? "Ground Floor + 5 Floor" :  "Gound Floor"

                                                }
                                            </Text>
                                        </View>
                                    </View>  
                                    <View style={styles.loop}>
                                        <View style={styles.innerLoop}>
                                            <Text style={styles.uppertext}>Plot Depth:</Text>
                                            <Text style={styles.lowwertext}>{ Number((siteDetails.plot_area / siteDetails.width).toFixed(2)) } feet</Text>
                                        </View>
                                        <View style={styles.innerLoop}>
                                            <Text style={styles.uppertext}>Plot Entrance direction:</Text>
                                            <Text style={styles.lowwertext}>{
                                                siteDetails.direction == 'NN' ? 'North': 
                                                siteDetails.direction == 'SS' ? 'South': 
                                                siteDetails.direction == 'EE' ? 'East': 
                                                siteDetails.direction == 'WW' ? 'West': 

                                                siteDetails.direction == 'NE' ? 'North East': 
                                                siteDetails.direction == 'NW' ? 'North West': 
                                                siteDetails.direction == 'SE' ? 'South East': 
                                                siteDetails.direction == 'SW' ? 'South West': 
                                                "North"
                                            }</Text>
                                        </View>
                                    </View>  
                                    {/* End: Loop */}
                                </View>
                            :
                                <View style={{padding:8}}>
                                    <View style={{width:'100%',height:140, backgroundColor:Colors.lighteshGray, marginBottom:20, padding:6, borderRadius:6}}>
                                        <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>         
                                        <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View> 
                                        <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>                 
                                            
                                    </View>
                                    <View style={{width:'100%',height:140, backgroundColor:Colors.lighteshGray, marginBottom:20, padding:6, borderRadius:6}}>
                                    <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>         
                                        <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View> 
                                        <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>                 
                                    </View> 
                                </View>  
                            }

                            {/* End: Site Specification: */}

                        </View>        
                        {/* End: Site Details */} 
                        {
                            siteDetails?
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMButton marginBottom={true} theme="default" btnText="Continue" functionType="createaccount" onPress={createPlotHandler} isLoading={isLoading} />    
                            </View>
                            :
                            <></>
                        }    
                        

                </ScrollView>
                {/* Start: Main Body */}
        </ScreenWrapper>            
    )
}

const styles = new StyleSheet.create({
    DarkHeder:{
        width:'100%',
        height:60, 
        backgroundColor:'#E5E5E5',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center',
        paddingHorizontal:10
    },
    boxFull:{
        width:'100%',
        minHeight:35, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'flex-start',
        alignItems:'flex-start', 
    },
    loop:{
        width:'100%',
        minHeight:60, 
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:12
    },
    innerLoop:{
        width:'50%',
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    uppertext:{
        color:Colors.graySnd,
        fontSize:FontSize.p,
        fontWeight:FontWeight.regular
    },
    lowwertext:{
        color:'#2C2C2C',
        fontSize:FontSize.h6,
        fontWeight:FontWeight.medium
    }

});

export default SiteDetails;
