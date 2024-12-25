import { View, Text, ScrollView, StyleSheet ,Dimensions, Modal, TouchableOpacity} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'


// header 
import ScndHeader from '../../components/headers/scndHeader'

// footer 
import MainFooter from '../../components/footer/mainFooter'

// components 
import SelectAddOnsComponent from '../../components/selectAddOns'
 //AutoHeightImage component
import Colors from '../utility/color'
import FontSize from '../utility/fonts'

import CTMButton from "../../components/button/index"
import { useNavigation,useNavigationState  } from '@react-navigation/native';

import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg';

import ApiService from '../../ApiServices'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


import LoadingAddons from './Loading'
import AnimatedMessage from '../../components/animatedNotification'
 
import { useDispatch, useSelector } from 'react-redux';
import { addGlobalData } from '../../redux'

//main screen 
const SelectAddOn = ()=>{
    const  navigation = useNavigation();  
    const dispatch = useDispatch();
    const checkoutState = useSelector((state) => state.checkout);
     

    // aimate notification 
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
    // setTimeout(()=>{
    //   setMessages([]);
    // },2000);
    },[messages]); 

    // is loading 
    const [isLoading,setIsLoading] = useState(false); 

    // recented created sitedata 
    const [recentAddedSite,setRecentAddedSite] = useState([]);
    const [totalPrice,setTotalPrice] = useState(parseFloat(useSelector(state => state.checkout.totalPrice)));
    // const [totalPrice,setTotalPrice] = useState(0);

    const [projectId,setProjetId] = useState('');
    const [siteId,setSiteId] = useState('');

    const [orderId,setOrderId] = useState('');

    const [selectedAddonIds,setselectedAddonIds] = useState([]);
    const [selectedAddonData,setSelectedAddonData] = useState(useSelector(state=>state.checkout.addons));

    const [storeAllproductIds,setStoreAllproductIds] = useState([])

    const [apiTrigger,setapiTrigger] = useState(false);

    const selectedAddonIdsHandler = (data)=>{
        setselectedAddonIds(data);
       // console.log("........................... data:", data);
        // here i have to run the producy add api again with the orderId
        // and then pass all the selected addons in body as projectId 
        // and the run the get api to get all the details  
        createValidBody(data);
    }

    // start: create a valid body
    const createValidBody = (data) => {
        let ids = [];
        if (data.length > 0) {
            data.forEach((item) => {
                ids.push({
                    id: item,
                    instantDelivery: false,
                    additionalOption: false,
                });
            });
            ids.push({
                id: projectId,
                instantDelivery: false,
                additionalOption: false,
            });
            setStoreAllproductIds(ids);
        } else {
            setStoreAllproductIds([
                {
                    id: projectId,
                    instantDelivery: false,
                    additionalOption: false,
                },
            ]);
        }
    };
    // end: create a valid body

    // start: add addons in order
    useEffect(()=>{
        if(storeAllproductIds.length > 0 ){  
            console.log("storeAllproductIds: ---:---", storeAllproductIds);
            handlerFunc();
        }
    },[storeAllproductIds]);
    // end: add addons in order
    const [tempPrice,setTempPrice] = useState(0);
    useFocusEffect(
        useCallback(() => {
            setapiTrigger(false);
            setselectedAddonIds([]);
            // AsyncStorage.removeItem("Addons");
            // AsyncStorage.removeItem("RecentAddedSite");
            // AsyncStorage.removeItem("TotalPrice");   
             

            AsyncStorage.getItem('globalData', (err,creds)=>{
                if(creds){
                    console.log("checkoutState---->>>: ", JSON.parse(creds).addons);
                  //   setOrderId(JSON.parse(creds.orderId)); 
                    setapiTrigger(true);
                    setTotalPrice(JSON.parse(creds).totalPrice); 
                    setTempPrice(JSON.parse(creds).totalPrice); 
                    setSelectedAddonData(JSON.parse(creds).addons); 
                } 
            }) 
            

            // setselectedAddonIds(JSON.parse(checkoutState).selectedAddonIds);

            
            
            AsyncStorage.getItem("OrderDetails",(error,creds)=>{ 
                let data = JSON.parse(creds)  
                // console.log("got the creaded order details: ", data);  
                setOrderId(data.id); 
            })
            
            AsyncStorage.getItem('projectId',(error, projectIdA)=>{
                console.log('----------------project Id---:',projectIdA);
                setProjetId(parseInt(projectIdA))
                AsyncStorage.getItem('SelectedSite',(error,siteIdA)=>{
                   // console.log('----------------selected site---:', siteIdA);
                    setSiteId(parseInt(siteIdA));  
                    FetchApi(projectIdA,siteIdA);
                })
            });  
           
            return ()=>{
                console.log('-------------------useFocusEffect-----select-Add-ons------'); 

            };
        }, []),
    );  

    const handlerFunc = ()=>{
        if(recentAddedSite.length > 0){ 
            const matchingObjects = recentAddedSite[0].innerElements.filter(obj => selectedAddonIds.includes(obj.id)); 
            // console.log("-------------matchingObjects---------",matchingObjects); 
            setSelectedAddonData(matchingObjects);
            const totalPriceSum = matchingObjects.reduce((total, current) => {
                return total + current.price;
            }, 0);
            // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",totalPriceSum);
            setTotalPrice(totalPriceSum != 0?parseFloat(totalPriceSum+recentAddedSite[0].totalPrice):recentAddedSite[0].totalPrice);
             
        }else{
            setTotalPrice(0);
             
        }
    } 

    const dispatchHandler = ()=>{
        if(storeAllproductIds.length>0){
            if(tempPrice == totalPrice){
                dispatch(addGlobalData({
                    orderId:orderId,
                    storeAllproductIds:JSON.stringify(storeAllproductIds),
    
                    totalPrice:`${totalPrice}`,
                    addons:JSON.stringify(selectedAddonData),
                    recentAddedSite:JSON.stringify(recentAddedSite), 
                    changes:false, 
                }));
            }else{
                dispatch(addGlobalData({
                    orderId:orderId,
                    storeAllproductIds:JSON.stringify(storeAllproductIds),
    
                    totalPrice:`${totalPrice}`,
                    addons:JSON.stringify(selectedAddonData),
                    recentAddedSite:JSON.stringify(recentAddedSite), 
                    changes:true
                }));
            }
        }else{
            console.log("nothing will happened.");
        }
    }

    useEffect(()=>{
        // console.log("------------------------------------selectedAddonData:",selectedAddonData)
        // AsyncStorage.setItem("Addons", JSON.stringify(selectedAddonData));
        // AsyncStorage.setItem("RecentAddedSite", JSON.stringify(recentAddedSite));
        // AsyncStorage.setItem("TotalPrice", `${totalPrice}`); 
        dispatchHandler(); 
    },[selectedAddonData]);
       

    // Start: Fetch api for add-ons 
    // this api will only get the data from the apis 
    // nothing more or special in it.
    const FetchApi = async (projectIdA,siteIdA)=>{
        
        let url = `customer/productsv2/details/${projectIdA}/${siteIdA}`
        // console.log("Select addons screen: ", url);
        await ApiService.Getapiheader(url)
        .then(response=>{
            // console.log("-------------Fetch api for addons----------:",response.data.addons); 
            if(response.data.addons.length != 0){
                let arrData = new Array(); 
                let dataForAddons = response.data.addons;
                dataForAddons.map((item,index)=>{ 
                    arrData.push(
                        {
                            id:item.id,
                            image:item.icon?.trim() ? item.icon.includes('svg')? item.icon : item.featured_image: item.featured_image,
                            icon:item.icon?.trim() ? item.icon.includes('svg')? true : false: false,
                            titke:item.name,
                            content:item.description,
                            price:item.pricing.price
                        }
                    )
                    if(dataForAddons.length == (index+1)){
                        // this recentAddedSites means 
                        // store all the response in manner 
                        // we dont need to modify this section 
                        setRecentAddedSite([
                            {
                                totalPrice:response.data.pricing.price, 
                                innerElements:arrData,
                                name:response.data.name,
                                id:response.data.id
                            }
                        ]);

                        // this handler used to show the total price 
                        // console.log("response.data.pricing.price 1",response.data.pricing.price)
                        if(apiTrigger == false){
                            // setTotalPrice(parseFloat(response.data.pricing.price));
                        } 
                        // setTotalPrice(0);
                    }
                })
            } 
            else if(response.data.inclusions.length != 0 )  {
                // do nothing just skip to next page 
                setRecentAddedSite([
                    {
                        totalPrice:response.data.pricing.price, 
                        innerElements:[],
                        name:response.data.name,
                        id:response.data.id
                    }
                ])
               //  console.log("response.data.pricing.price 2",response.data.pricing.price)
                // setTotalPrice(parseFloat(response.data.pricing.price));
                ContinueButton()
            }
            else{
               // do nothing just skip to next page     
               setRecentAddedSite([
                    {
                        totalPrice:response.data.pricing.price, 
                        innerElements:[],
                        name:response.data.name,
                        id:response.data.id
                    }
                ])
                // console.log("response.data.pricing.price 3",response.data.pricing.price)
                // setTotalPrice(parseFloat(response.data.pricing.price));
                ContinueButton();
            } 
        })  
        .catch(error=>{
            // console.log("Error: Addonns error ", error);
            setMessages([`Something went wrong: ${error}`]);
        })
       
    }
    // end: Fetch api for add-ons 


    // start: app producy apis 
    const AddOrRemoveAddons = (projectIds,orderId)=>{
        //  AsyncStorage.removeItem('OrderDetails'); 
        // console.log("-----()()()()()()()()()()()()()-----", { 
        //     projectIds,
        //     orderId
        // });
        let url = `customer/orderv2/products/${orderId}`;
         ApiService.Post(url,{
            "products":projectIds
        })
        .then(response=>{
            
        })
        .catch(error=>{ 
            // console.log("error while Addons are added as productId: ", error);  
            setMessages([`Something went wrong: ${error}`]);
        })
    }
    // end: app producy apis  
     
    // start: open price 
    const [openClosePrice , setOpenClosePrice]=useState(false);
    const openClosePriceHandler = (data)=>{
        setOpenClosePrice(data);  
      //  navigation.navigate('CheckOut')
    }
    // end: open price 

    // Start: CTMButton 
    const [isLoadingCutton,setIsLoadingCutton] = useState(false); 
    const ContinueButton = ()=>{  
        setIsLoadingCutton(true); 
        setTimeout(()=>{
            setIsLoadingCutton(false);   
            // console.log("navigate to check out")
            AsyncStorage.setItem("Addons", JSON.stringify(selectedAddonData));
            AsyncStorage.setItem("RecentAddedSite", JSON.stringify(recentAddedSite));
            AsyncStorage.setItem("TotalPrice", `${totalPrice}`);
           
            // console.log("JSON.stringify(selectedAddonData) -- Addons ",JSON.stringify(selectedAddonData));
            // console.log("JSON.stringify(recentAddedSite)-- recent added sites", JSON.stringify(recentAddedSite));
            // console.log("JSON.stringify(TotalPrice)--total price",totalPrice);
            navigation.navigate('CheckOut');
        },1200);
    }  
    // End: CTMButton
 

    
    return(
            <ScreenWrapper>
                {/* Start: Header */}
                <ScndHeader 
                    Title="Select Addons" 
                    Search={false} 
                    Profile={false}  
                    Back={true}
                    BackScreen="" 
                    Skip={false} 
                    SkipScreen=""  
                />
                {/* End: Header */}
                
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

                    <View style={{flex:1,padding:0,paddingHorizontal:10,marginTop:0}}>
                        {/* <Text style={{color:'red',fontSize:22}}>{selectedAddonIds.length}</Text> */}
                        {
                            recentAddedSite.length > 0 ?
                                <SelectAddOnsComponent data={recentAddedSite} isLoading={isLoading} onPress={selectedAddonIdsHandler} />
                            :
                            <View > 
                                <LoadingAddons />
                                <LoadingAddons />
                                <LoadingAddons />
                            </View>
                        }
                    </View> 
                    
                    {
                            recentAddedSite.length > 0 ? 
                                <MainFooter themeType={2} theme="dark" onPress={openClosePriceHandler} totalPriceP={totalPrice} termsAccept={true}  CheckOut={false} isLoadingCutton={isLoadingCutton} />
                            :
                            <></>
                    }       
                    

                {/* Start: Modal */}
                {
                            recentAddedSite.length > 0 ? 
                                <Modal animationType="slide" transparent={true} visible={openClosePrice}>
                                        <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999,flexDirection:'column', justifyContent:'flex-end', alignItems:'flex-end'  }}>
                                            <TouchableOpacity activeOpacity={0.1} style={{width:'100%',minHeight:'80%'}} onPress={()=>setOpenClosePrice(false)}></TouchableOpacity>
                                            <View style={{width:'100%',minHeight:'20%'}}>
                                                <View style={{width:'100%',backgroundColor:Colors.PrimaryColorLight,borderTopLeftRadius:12,borderTopRightRadius:12,paddingVertical:32,paddingHorizontal:22}}> 
                                                        <View style={{width:'100%',height:40,flexDirection:'row',justifyContent:'space-between',alignItems: 'center',alignContent:'center'}}>
                                                                <Text style={{color:Colors.black,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500'}}>Total Amount</Text>
                                                                <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                                                      
                                                                        <RupeeBlack width={18} height={18} style={{marginTop:2}}/>
                                                                        <Text style={{color:'#5B5C5B',fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500',marginLeft:4}}>{totalPrice}</Text>
                                                                </View>
                                                        </View>

                                                        <View style={{height:20,borderBottomWidth:2, borderBottomColor:Colors.lightGray,marginBottom:12}}></View>

                                                        <View style={{width:'100%',height:50, flexDirection:'column',marginBottom:12}}> 
                                                            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                                                    <Text  style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500'}}>{recentAddedSite[0].name}</Text>   
                                                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}> 
                                                                        <RupeeBlack width={15} height={15} style={{marginTop:2}}/>
                                                                        <Text style={{color:'#5B5C5B',fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500',marginLeft:4}}>{recentAddedSite[0].totalPrice}</Text>
                                                                    </View>
                                                            </View>
                                                            {
                                                                selectedAddonData.length > 0 ?
                                                                <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                                                    <Text  style={{color:Colors.lightGray, fontSize:FontSize.p, fontWeight:'500'}}>Add Ons</Text>    
                                                                </View>
                                                                :
                                                                <></> 
                                                            }
                                                            
                                                        </View>
                    
                                                        {/* Start: Loop  */} 

                                                        {
                                                            selectedAddonData.map((item,index)=>{
                                                               return <View key={item.id} style={{width:'100%',minHeight:30,flexDirection:'column',marginBottom:14}}>  
                                                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                                                            <Text  style={{color:Colors.gray,fontSize:FontSize.h6, fontWeight:'500'}}>{item.titke}</Text>    
                                                                            <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}> 
                                                                                <RupeeBlack width={14} height={14} style={{marginTop:2}}/>
                                                                                <Text  style={{color:Colors.gray,fontSize:FontSize.h6, fontWeight:'500',marginLeft:4}}>{item.price}</Text> 
                                                                            </View>
                                                                    </View>
                                                                </View>   
                                                            })
                                                        }                    
                                                        
                                                        {/* End: Loop  */}  

                                                        {/* Start: Buton */}
                                                        <CTMButton btnText="Continue" theme="default" marginBottom={false} functionType="navigate to next screen" onPress={ContinueButton} isLoading={isLoadingCutton} /> 
                                                        {/* End: Button */}
                                                        

                                                </View>
                                            </View>
                                        </View>
                                </Modal>                
                            :
                            <></>
                }            

                {/* End: Modal */}

            </ScreenWrapper> 
    )
}

export default SelectAddOn;