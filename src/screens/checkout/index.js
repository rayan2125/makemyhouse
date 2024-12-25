import { View, Text, ScrollView,  Dimensions, Modal, TouchableOpacity, TextInput} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

import Styles from './styles';
const {width, height} = Dimensions.get('window'); 

// screen 
import ScreenWrapper from '../../components/screenWrapper'

// header 
import ScndHeader from '../../components/headers/scndHeader' 
 
// footer 
import MainFooter from '../../components/footer/mainFooter'

// images


// others components
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import RupeeLight from '../../../assets/images/icons/rupeeWhite.svg';
import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg';
import RupeeColor from '../../../assets/images/icons/rupeeColor.svg';
import ArrowRightHalfDark from '../../../assets/images/icons/arrowRightHalfDark.svg'
import Caution from '../../../assets/images/icons/caution.svg';
import AppliedCoupon from '../../../assets/images/icons/appliedCoupon.svg'
import AppliedCouponSecondaray from '../../../assets/images/icons/appliedCouponSecondaray.svg'

import ApiService from '../../ApiServices';


import { useNavigation,useNavigationState  } from '@react-navigation/native';
 
// notification 
import AnimatedMessage from '../../components/animatedNotification';

import CloseIcon from '../../../assets/images/icons/closeIcon.svg';

import LoaderCircle from './LoaderCircle';


import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
 
import { useDispatch, useSelector } from 'react-redux';
import { addGlobalData, addOrRemoveCoupons } from '../../redux';

const CheckOut = () => {

    const dispatch = useDispatch(); 

    // aimate notification 
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
    // setTimeout(()=>{
    //   setMessages([]);
    // },2000);
    },[messages]);
    const  navigation = useNavigation(); 
    // is loading 
    const [isLoading,setIsLoading] = useState(false); 

    // start: show all coupon codes
    const [showHideCoupone,setshowHideCoupone] = useState(false);
    const showHideCouponeHandler = ()=>{
        setshowHideCoupone(!showHideCoupone);
    }
    // end: show all coupon codes

    const [couponsCode,setCouponsCode] = useState([]);
    const [firstCouponCode,setfirstCouponCode] = useState({});
    // start: open price 
    const [openClosePrice , setOpenClosePrice]=useState(false);
    const openClosePriceHandler = (data)=>{
        console.log("open close price handler clicked");
        setOpenClosePrice(data);  
    }
    // end: open price 

     // start: Accept terms and condition
     const [acceptTerms,setAcceptTerms] = useState(true);
     const acceptTermsHandler = ()=>{
         setAcceptTerms(!acceptTerms);
     }
     // end: Accept terms and condition

         // start: get data from addons page 
    const [recentAddedSite,setRecentAddedSite] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0); 
    const [selectedAddonData,setSelectedAddonData] = useState([]);
    const [token,setToken] = useState('');

    const [orderId,setOrderID] = useState(null);

    const [orderData,setOrderData] = useState(null);
    const [orderPricing,setOrderPricing] = useState(null); 

    // coupons 
    const [couponCodeLoading,setcouponCodeLoading] = useState(false);
    const [couponCodeApplyed,setcouponCodeApplyed] = useState(false);
    const [applyCoupon,setApplyCoupon] = useState(''); 

    const [storeAllproductIds,setstoreAllproductIds] = useState([]);

    const [wholePageLoader,setwholePageLoader] = useState(true);
     
    useFocusEffect(
        useCallback(() => {
            
            // AsyncStorage.getItem('Addons',(err,addons)=>{ 
            //     // console.log("___________^_^__________addons", addons)
            //     setSelectedAddonData(JSON.parse(addons)); 
            // });
            // AsyncStorage.getItem('TotalPrice',(err,totalPrice)=>{
            //     // console.log("___________^_^__________totalPrice", totalPrice)
            //     setTotalPrice(JSON.parse(totalPrice));
            // });
    
            AsyncStorage.getItem("globalData",(err,creds)=>{ 
            let aa = JSON.parse(creds)  
            if(aa && aa != null){ 
                if(aa && aa.totalPrice != 0){ 
                    console.log("checkout screen -- globale data: ", aa);
                        setTotalPrice(aa.totalPrice); 
                        setSelectedAddonData(aa.addons); 
                        setRecentAddedSite(aa.recentAddedSite);

                        setstoreAllproductIds(aa.storeAllproductIds)
                         
                        console.log("storedAppProductsids: ",aa.storeAllproductIds);
                        
                        setOrderID(aa.orderId); 

                         
                        

                        if(aa.couponCode != ""){ 
                            setcouponCodeApplyed(true);
                            setApplyCoupon(aa.couponCode);
                            setOrderPricing(aa.couponeUpdatedPrice); 
                            AddOrRemoveAddons(aa.storeAllproductIds,aa.orderId, aa.couponCode); 
                        }else{
                            setcouponCodeApplyed(false);
                            setApplyCoupon('');
                            setOrderPricing(aa.couponeUpdatedPrice);
                            AddOrRemoveAddons(aa.storeAllproductIds,aa.orderId,null); 
                        }
                } 
            }
            });     

            AsyncStorage.removeItem("couponcodedata");
            
            // AsyncStorage.getItem("couponcodedata",(err,cred)=>{
            //     // console.log("coupon code data from storage",cred);
            //     let data = JSON.parse(cred);
            //     if(data && data.couponCode != null){ 
            //         setApplyCoupon(data.couponCode);
            //         setOrderPricing(data.couponeUpdatedPrice);
            //         setcouponCodeApplyed(true); 
            //     }
            // }); 

            // AsyncStorage.getItem('RecentAddedSite',(err,recentAddedSite)=>{
            //     // console.log("___________^_^__________recentAddedSite", recentAddedSite)
            //     setRecentAddedSite(JSON.parse(recentAddedSite));
            // });

            AsyncStorage.getItem('UserToken', (err,token)=>{
                setToken(token);
            }); 

            return ()=>{
               //  console.log('-------checkout-------: useFocusEffect :-------checkout-------');
            //    setOrderPricing(null);
            //    setOrderData(null);  
            };
        }, []),
    );  
    
    

    const AddOrRemoveAddons = (projectIds,orderId,couponCode)=>{
        let url = `customer/orderv2/products/${orderId}`; 

        console.log("request body of addones: ", {
            projectIds,
            orderId,
            url
        })
        ApiService.Post(url,{
            "products":projectIds
        })
        .then(response=>{ 
            if(response && response.status ==200){
                console.log("Addons are added as productId: ",{
                    pricing:response.data.pricing,
                    data:response.data
                });   
                getOrderDetailsv1(orderId);
                getAllCoupons(orderId);
                if(couponCode != null){
                    appltCouponCodeHandler(orderId,couponCode);
                }else{
                    setwholePageLoader(false);
                }
            }else{
                setMessages([`Something went wrong please restart the app.`]);
            } 
        })
        .catch(error=>{ 
            // console.log("error while Addons are added as productId: ", error);  
            setMessages([`Something went wrong: ${error}`]);
        }) 
    }

    // start: get order details  
     const getOrderDetailsv1 = (orderID)=>{
         let url = `customer/orderv2/?orderID=${orderID}` 
         ApiService.Getapiheader(url)
         .then(response=>{
             if(response){ 
                console.log("()()()())----------------", {
                    products:response.orders[0].products,
                    productsLength:response.orders[0].products.length,
                    pricing:[]
                });
                console.log("get order details: ", response.orders[0].pricing);
                 setOrderData(response.orders[0]); 
                 setOrderPricing(response.orders[0].pricing);


                // 
                if (selectedAddonData.length === 0) {
                    // console.log("selectedAddonData is empty: this will run", {
                    //     MainPrice: response.orders[0].pricing,
                    //     data: response.orders[0].products
                    // });
                    // console.log("-=-=-=-===-=-= mixed data: ",{
                    //     recentAddedSite,
                    //     selectedAddonData
                    // });
                    // if (response.orders[0].products.length !== 0) {
                    //     response.orders[0].products.map((item) => {
                    //         if(selectedAddonData.titke != item.name){
                    //             console.log("internal data:----", item);
                    //             setSelectedAddonData((prev) => [
                    //             ...prev,
                    //                 {
                    //                     id: item.id,
                    //                     titke: item.name,
                    //                     price: item.pricing.basePrice
                    //                 }
                    //             ]); 
                    //         } 
                    //     });
                    // }
                }

             }else{
                 setMessages([`Something went wrong while getting the order details.`]);    
             }
         })  
         .catch(error=>{
             console.log("Error in getting order details: ",error);
             setMessages([`Error in getting order details: ${error}`,]);
         });
     }
     // end: get order details

    // start: get all coupons
    const getAllCoupons =  (orderID)=>{
        let url = `public/coupon/?orderID=${orderID}`;
        //  let url = 'https://api.makemyhouse.com/public/coupon';
        // ApiService.Testing(url)
        ApiService.Getapiheader(url)
        .then(response=>{ 
            if(response){ 
                // console.log("get all coupons codes: ", response);
                setfirstCouponCode(response[0]);
                setCouponsCode(response);
            }else{
                setMessages([`Something went wrong while loading the coupons.`]);    
            }
        })
        .catch(error=>{
            console.log("error while gettieng all the coupons: ", error);
            setMessages([`error while gettieng all the coupons: ${error}`,]);
        })
    }
    // end: get all coupons 
    function findObjectByCode(arr, code) {
        return arr.find(obj => obj.code === code);
    }

    // Start: apply coupon code
   
    const appltCouponCodeHandler = (orderId,code)=>{
        setApplyCoupon(code);
        setcouponCodeApplyed(false);
        setcouponCodeLoading(true);
 
        let getTheCode = findObjectByCode(couponsCode, code);
        setfirstCouponCode(getTheCode);
        if(orderId){
            let url = `customer/orderv2/coupon/${orderId}`;
            let data = {
                promocode:code
            }
            console.log({
                data,
                "orderID":orderId
            })
            ApiService.Post(url,data)
            .then(response=>{
                // console.log("Apply coupon code response: ",response.data);
                // console.log(response.ok)
                if(response.data){
                    if(response.data.couponCode && response.data.couponCode != ''){ 
                        setcouponCodeLoading(false); 
                        setOrderPricing(response.data.pricing);
                        setcouponCodeLoading(false);
                        setcouponCodeApplyed(true); 
                        
                        // AsyncStorage.setItem("couponcodedata",JSON.stringify({
                        //     couponCode:code,
                        //     couponeData:response.data,
                        //     couponeUpdatedPrice:response.data.pricing
                        // }));
                        dispatch(addOrRemoveCoupons({
                            couponCode:code,
                            couponeData:JSON.stringify(response.data),
                            couponeUpdatedPrice:JSON.stringify(response.data.pricing)
                        }));
                        setwholePageLoader(false); 
                    }else{
                        setcouponCodeLoading(false);
                        setcouponCodeApplyed(false);
                        setMessages([`${response.data.message}`]);
                        setwholePageLoader(false); 
                    }
                } 
            })
            .catch(error=>{
                setcouponCodeLoading(false);
                setcouponCodeApplyed(false); 
                console.log("Apply Coupon code error: ",error);
                setMessages([`Apply Coupon code error: ${error}`,]);
                setwholePageLoader(false); 
            })
        } 
    }
    // End: apply coupon code 

      // start: remove coupon code 
      const [removeCouponStatus,setremoveCouponStatus] = useState(false);
      const removeCouponCode = (orderId,applyCoupon)=>{ 
          setremoveCouponStatus(true);
          setcouponCodeLoading(true); 
          let getTheCode = findObjectByCode(couponsCode, applyCoupon);
          setfirstCouponCode(getTheCode);
          if(orderId){
                let url = `customer/orderv2/coupon/${orderId}?remove=true`;
                let data = {
                    promocode:applyCoupon
                }
                // console.log({
                //     data,
                //     "orderID":orderData.id
                // })
                ApiService.Post(url,data)
                .then(response=>{
                    // console.log("remove coupon code response: ",response.data);
                    // console.log(response.ok)
                    if(response.data){
                        //if(response.data.couponCode && response.data.couponCode != ''){ 
                        if(response.data.pricing && response.data){
                            setApplyCoupon('');
                           // console.log("remove coupon code: ",response.data);
                            setcouponCodeLoading(false); 
                            setOrderPricing(response.data.pricing); 
                            setcouponCodeApplyed(false); 
                            setremoveCouponStatus(false);

                            // AsyncStorage.setItem("couponcodedata",JSON.stringify({
                            //     couponCode:"",
                            //     couponeData:response.data,
                            //     couponeUpdatedPrice:response.data.pricing
                            // }));
                            dispatch(addOrRemoveCoupons({
                                couponCode:"",
                                couponeData:JSON.stringify(response.data),
                                couponeUpdatedPrice:JSON.stringify(response.data.pricing)
                            }));

                        }else{
                            setcouponCodeLoading(false);
                            setcouponCodeApplyed(true);
                            // setMessages([`${response.data.message}`]);
                            setremoveCouponStatus(false);
                        }
                    } 
                })
                .catch(error=>{
                    setcouponCodeLoading(false);
                    setcouponCodeApplyed(false); 
                    setremoveCouponStatus(false);
                    console.log("Remove Coupon code error: ",error);
                    setMessages([`Remove Coupon code error: ${error}`,]);
                })
          } 
      }
      // end: remove coupon code 
    

    // Start: CTMButton 
    const [isLoadingCutton,setIsLoadingCutton] = useState(false); 
    const ContinueButton = ()=>{
        setIsLoadingCutton(true); 
        setTimeout(()=>{ 
            paymentProcess(orderData.id);
        },10);
    }  
    // End: CTMButton


     // start: payment
     const [processforPayment,setprocessforPayment] = useState(true);
     const [isPaymentProcess,setIsPaymentProcess] = useState(false);

    
      
    useFocusEffect(
        useCallback(() => { 
            setIsLoadingCutton(false)
            setIsPaymentProcess(false);
          return () => { 
           // console.log('Screen went out of focus');  
            setIsLoadingCutton(false);
            setIsPaymentProcess(false);  
          };
        }, [])
    ); 

     const paymentProcess = async (orderid)=>{
         setIsLoadingCutton(true)
         setIsPaymentProcess(true);
         let url = `customer/orderv2/create/${orderid}`; 
         //console.log('url____________url__________url_______::', url)
         let data = {};
         await ApiService.Post(url,data)
         .then(response=>{
            console.log("--------payment processing:: ", response.status);
             if(response && response.status == 200){  
                // console.log("payment process response: ", response.data);
                 AsyncStorage.setItem("PaymentLink",`${response.data.paymentLink}${token}`);  
                 setprocessforPayment(true);
                 navigation.navigate('CheckOutWebView')
             }
             else if(response.status == 400){
         
                setIsLoadingCutton(false);
                setIsPaymentProcess(false);
                setMessages([`${response.data.order}.`]);
             }
             else{
                 setMessages([`Something went wrong while payment process.`,]);
                 setIsPaymentProcess(false);
             }
         })
         .catch(error=>{
             setIsLoadingCutton(false);
             setprocessforPayment(false);
             setIsPaymentProcess(false);
            //  console.log("payment process error: ", error);
             setMessages([`Payment process error: ${error}`,]);
         })
        .finally(()=>{
            // AsyncStorage.removeItem("Addons");
            // AsyncStorage.removeItem("RecentAddedSite");
            // AsyncStorage.removeItem("TotalPrice");  
        }) 
     }
     // end: payments


    const openDialScreen = () => {
        let number = '';
        if (Platform.OS === 'ios') {
          number = 'telprompt:${+917316803999}';
        } else {
          number = 'tel:${+917316803999}';
        }
        // Linking.openURL(number);
    };   

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

             {/* Start: Header */}
            <ScndHeader 
                    Title="CheckOut" 
                    Search={false} 
                    Profile={false}  
                    Back={true}
                    BackScreen="" 
                    Skip={false} 
                    SkipScreen=""  
            />
            {/* End: Header */} 
            <ScrollView style={{flex:1,padding:0,paddingHorizontal:0,marginTop:0, backgroundColor:'#F5F9FC'}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}> 
                
                {/* start skelton */} 
                {
                    wholePageLoader && (
                        <View style={{width:'100%', height:height}}> 
                            {/* Start: first box */}
                            <View style={[Styles.BoxContainer,{backgroundColor:'transparent'}]}>
                                <ShimmerPlaceholder 
                                style={{width:125, height:15, borderRadius:55 , marginBottom:8}}
                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                > 
                                </ShimmerPlaceholder>
                                <View style={[Styles.InnerBoxContainer,{}]}>
                                    <View  style={Styles.InnerBoxContainerItem}> 
                                    
                                        <View style={Styles.ItemUpperTextBox}>
                                            <View></View>
                                            <View style={{flexDirection:'row'}}>
                                                {/* <RupeeBlack width={9} height={9} style={{marginTop:5}}/> */}
                                                {/* <Text style={Styles.itemsmallTextPrice}>₹2121</Text>  */}
                                            </View> 
                                        </View>    
        
                                        <View style={[Styles.ItemUpperTextBox,{marginBottom:12}]}>
                                            <View style={{width:'70%'}}> 
                                                <ShimmerPlaceholder 
                                                style={{width:125, height:15, borderRadius:55 , marginBottom:0}}
                                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                > 
                                                </ShimmerPlaceholder>
                                            </View>
                                            <View style={{flexDirection:'row'}}> 
                                                <ShimmerPlaceholder 
                                                style={{width:100, height:15, borderRadius:55 , marginBottom:0}}
                                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                > 
                                                </ShimmerPlaceholder>
                                            </View>  
                                        </View>    
        
                                        <View style={Styles.ItemUpperTextBox}>
                                            <TouchableOpacity style={{width:'70%'}} onPress={()=>navigation.goBack()}> 
                                                <ShimmerPlaceholder 
                                                style={{width:45, height:15, borderRadius:55 , marginBottom:0}}
                                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                > 
                                                </ShimmerPlaceholder>
                                            </TouchableOpacity>
                                            <View style={{flexDirection:'row'}}></View>  
                                        </View> 
        
                                        <View style={[Styles.ItemUpperTextBox,{marginTop:12}]}>
                                            <View style={{width:'70%'}}> 
                                                <ShimmerPlaceholder 
                                                style={{width:190, height:15, borderRadius:55 ,  }}
                                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                > 
                                                </ShimmerPlaceholder>
                                            </View>
                                            <View style={{flexDirection:'row'}}> 
                                                <ShimmerPlaceholder 
                                                style={{width:100, height:15, borderRadius:55 , }}
                                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                > 
                                                </ShimmerPlaceholder>
                                            </View>  
                                        </View>  
        
                                        
                                    </View>
                                </View>
                            </View>
                            {/* End: first box */}
        
                            {/* Start: Sand box  */}
                            <View style={[Styles.BoxContainer,{backgroundColor:'transparent'},{paddingTop:0}]}>
                                <ShimmerPlaceholder 
                                style={{width:125, height:15, borderRadius:55 , marginBottom:8}}
                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                > 
                                </ShimmerPlaceholder>
                                <View style={Styles.OfferInnerItems}>
                                    <View style={Styles.UpperSection}> 
                                        <View style={{width:'100%',height:30,flexDirection:'row'}}>
                                            <View style={{width:'60%',flexDirection:'row'}}>
                                                <View style={{alignContent:'center', alignItems:'center'}}>
                                                    <ShimmerPlaceholder 
                                                    style={{width:125, height:15, borderRadius:55 , marginBottom:8}}
                                                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                    > 
                                                    </ShimmerPlaceholder>
                                                </View>
                                                <View style={{alignContent:'center', alignItems:'center', marginLeft:4, flexDirection:'row', marginTop:-8}}>
                                                        <ShimmerPlaceholder 
                                                        style={{width:45, height:15, borderRadius:55 , marginBottom:8}}
                                                        shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                        > 
                                                        </ShimmerPlaceholder>
                                                </View>
                                            </View>
                                            <View style={{width:'40%',flexDirection:'row', justifyContent:'flex-end',  alignContent:'center', alignItems:'center'}}>
                                                        <ShimmerPlaceholder 
                                                        style={{width:35, height:15, borderRadius:55 , marginBottom:8}}
                                                        shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                        > 
                                                        </ShimmerPlaceholder> 
                                            </View>  
                                        </View>  
                                        <View style={{width:'100%',marginVertical:4}}>
                                            <ShimmerPlaceholder 
                                            style={{width:90, height:15, borderRadius:55 , marginBottom:8}}
                                            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                            > 
                                            </ShimmerPlaceholder>
                                        </View>   
                                    </View>
                                    <View style={Styles.LowwerSection}>
                                        <View style={{width:'80%'}}>
                                            <ShimmerPlaceholder 
                                            style={{width:90, height:15, borderRadius:55 , marginBottom:8}}
                                            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                            > 
                                            </ShimmerPlaceholder>
                                        </View> 
                                        <ShimmerPlaceholder 
                                            style={{width:20, height:15, borderRadius:55 , marginBottom:8}}
                                            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                            > 
                                        </ShimmerPlaceholder>
                                    </View>
                                </View>
                            </View>
                            {/* End: Sand box  */}
        
                            {/* Start: thied box  */}
                            <View style={[Styles.BoxContainer,{paddingTop:0}]}>
                                <ShimmerPlaceholder 
                                style={{width:125, height:15, borderRadius:55 , marginBottom:8}}
                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                > 
                                </ShimmerPlaceholder>
                                <View style={Styles.InnerBoxContainer}>
                                
                                        <View style={Styles.BillingDetails}>
                                                
                                                <View style={{flexDirection:'row', justifyContent:'space-between', height:40, alignContent:'center', alignItem:'center',}}>
                                                    <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                        <ShimmerPlaceholder 
                                                        style={{width:125, height:15, borderRadius:55 , marginBottom:8}}
                                                        shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                        > 
                                                        </ShimmerPlaceholder>
                                                    </View>
                                                    <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}> 
                                                        <View style={{flexDirection:'row', marginLeft:10}}> 
                                                            <ShimmerPlaceholder 
                                                            style={{width:100, height:15, borderRadius:55 , marginBottom:8}}
                                                            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                            > 
                                                            </ShimmerPlaceholder>
                                                        </View>  
                                                    </View>
                                                </View>
        
                                                <View style={{flexDirection:'row', justifyContent:'space-between', height:40, alignContent:'center', alignItem:'center',}}>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                    <ShimmerPlaceholder 
                                                        style={{width:155, height:15, borderRadius:55 , marginBottom:8}}
                                                        shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                        > 
                                                        </ShimmerPlaceholder>
                                                </View>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}> 
                                                    <View style={{flexDirection:'row', marginLeft:10}}>
                                                        <ShimmerPlaceholder 
                                                            style={{width:100, height:15, borderRadius:55 , marginBottom:8}}
                                                            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                            > 
                                                            </ShimmerPlaceholder>
                                                    </View>  
                                                </View>
                                                </View>
                                            
                                        
        
                                            <View style={{height:1, width:'100%', backgroundColor:'#0237BE26', marginVertical:8}}></View>
        
                                            <View style={{flexDirection:'row', justifyContent:'space-between', height:40, alignContent:'center', alignItem:'center',}}>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                    <ShimmerPlaceholder 
                                                    style={{width:100, height:15, borderRadius:55 , marginBottom:8}}
                                                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                    > 
                                                    </ShimmerPlaceholder>
                                                </View>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}> 
                                                    <View style={{flexDirection:'row', marginLeft:10}}>
                                                        <ShimmerPlaceholder 
                                                                style={{width:100, height:15, borderRadius:55 , marginBottom:8}}
                                                                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                                                > 
                                                                </ShimmerPlaceholder>  
                                                    </View>  
                                                </View>
                                            </View> 
        
                                        </View>
                                </View> 
                            </View>      
                            {/* End: third box  */}
        
                            <View style={[Styles.BoxContainer,{ paddingTop:0, paddingBottom:4, backgroundColor:'transparent'}]}>
                                <TouchableOpacity style={Styles.InnerHelpBox}>
                                    <ShimmerPlaceholder 
                                    style={{width:125, height:15, borderRadius:55 , marginBottom:8}}
                                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder>
                                    <ShimmerPlaceholder 
                                    style={{width:125, height:15, borderRadius:55 , marginBottom:8}}
                                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder>
                                </TouchableOpacity>
                            </View>
        
                            <View style={{height:40, backgroundColor:'#F5F9FC', }}></View> 
                        </View>    
                    )
                }    
                {/* End: skelton */}


                {
                    (recentAddedSite && recentAddedSite.length > 0 && orderPricing) ?  (
                        <View style={[Styles.BoxContainer]}>
                            <Text style={Styles.BoxTitle}>Services added</Text>
                            <View style={Styles.InnerBoxContainer}>
                                
                                {/* Start Loop */}
                                {
                                    recentAddedSite[0].name != null ?
                                                <View  style={Styles.InnerBoxContainerItem}> 
                                                    <View style={Styles.ItemUpperTextBox}>
                                                        <View></View>
                                                        <View style={{flexDirection:'row'}}>
                                                            {/* <RupeeBlack width={9} height={9} style={{marginTop:5}}/> */}
                                                            {/* <Text style={Styles.itemsmallTextPrice}>₹2121</Text>  */}
                                                        </View> 
                                                    </View>        
                                                    <View style={[Styles.ItemUpperTextBox,{marginBottom:12}]}>
                                                        <View style={{width:'70%'}}>
                                                            <Text style={[Styles.itemMainTextPrice,{fontSize:FontSize.p}]} >{recentAddedSite[0].name}</Text> 
                                                        </View>
                                                        <View style={{flexDirection:'row'}}>
                                                            {/* <RupeeBlack width={13} height={13} style={{marginTop:8}}/> */}
                                                            <Text style={Styles.itemMainTextPrice} >₹{recentAddedSite[0].totalPrice}</Text> 
                                                        </View>  
                                                    </View>     
                                                    {
                                                        selectedAddonData.length > 0 ?
                                                        <View style={Styles.ItemUpperTextBox}>
                                                            <TouchableOpacity style={{width:'70%'}} onPress={()=>navigation.goBack()}>
                                                                <Text style={[Styles.itemMainTextPrice,{fontSize:FontSize.xxp,color:Colors.SecondaryColor}]} >Add-ons Plus</Text> 
                                                            </TouchableOpacity>
                                                            <View style={{flexDirection:'row'}}></View>  
                                                        </View>
                                                        :
                                                        <></>
                                                    }

                                                    {selectedAddonData.map((item,index)=> (
                                                            <View key={index} style={[Styles.ItemUpperTextBox,{marginBottom:12}]}>
                                                                <View style={{width:'70%'}}>
                                                                    <Text style={[Styles.itemMainTextPrice,{fontSize:FontSize.p}]} >{item.titke}</Text> 
                                                                </View>
                                                                <View style={{flexDirection:'row'}}>
                                                                    {/* <RupeeBlack width={13} height={13} style={{marginTop:8}}/> */}
                                                                    <Text style={Styles.itemMainTextPrice} >₹{item.price}</Text> 
                                                                </View>  
                                                            </View>
                                                    ))}
                                                </View>
                                    :
                                    null
                                } 
                                
                                {/* End Loop */}

                            </View>
                        </View> 
                    ):
                    <View style={[{height:30}]}>  
                    </View>        
                }
                  
                
                {
                    (orderPricing && orderPricing.discount != 0 && orderPricing) ? 
                    <View style={Styles.BoxContainerStrip}>
                        <Text style={Styles.BoxContainerStripText}>Yay! You are saving ₹{orderPricing.discount} on this order</Text>
                    </View>
                    :
                    <></> 
                } 

                {/* Start: offers */}
                {
                    (firstCouponCode && orderPricing ) && (
                        <View style={[Styles.BoxContainer, orderPricing ? orderPricing.discount == 0 ? {paddingTop:0}:{paddingTop:22}:{paddingTop:0}]}>
                            <Text style={Styles.BoxTitle}>Offers</Text>
                            <View style={Styles.InnerBoxContainer}>
        
                                {/* Start : item */}
                                <View style={Styles.OfferInnerItems}>
        
                                    {/*start: show firsts coupone code*/} 
                                    {
                                        firstCouponCode&&(
                                            <View style={Styles.UpperSection}> 
                                                                <View style={{width:'100%',height:30,flexDirection:'row'}}>
                                                                    <View style={{width:'60%',flexDirection:'row'}}>
                                                                        <View style={{alignContent:'center', alignItems:'center'}}>
                                                                            <Text style={{fontSize:FontSize.h5, fontWeight:FontWeight.medium, color:Colors.SecondaryColor}}>{firstCouponCode.code}</Text> 
                                                                        </View>
                                                                        {
                                                                            couponCodeApplyed == true ? 
                                                                                <View style={{alignContent:'center', alignItems:'center', marginLeft:4, flexDirection:'row', marginTop:-8}}>
                                                                                    <Text style={{fontSize:FontSize.h5, fontWeight:FontWeight.medium, color:Colors.SecondaryColor}}>applied</Text> 
                                                                                    <AppliedCouponSecondaray width={22} height={16} style={{marginTop:2}}/>
                                                                                </View>
                                                                                :
                                                                                null
                                                                        }
                                                                    </View>
                                                                    <View style={{width:'40%',flexDirection:'row', justifyContent:'flex-end',  alignContent:'center', alignItems:'center'}}>
                                                                        {
                                                                            couponCodeApplyed == true ? 
                                                                            <TouchableOpacity onPress={()=>{removeCouponCode(orderId,firstCouponCode.code)}}>
                                                                                <Text style={{fontSize:FontSize.xp, fontWeight:FontWeight.medium, color:Colors.SecondaryColor}}>Remove</Text>
                                                                            </TouchableOpacity>
                                                                            :
                                                                            <TouchableOpacity onPress={()=>appltCouponCodeHandler(orderId,firstCouponCode.code)}>
                                                                                <Text style={{color:Colors.SecondaryColor, fontSize:FontSize.xxp, fontWeight:'500', borderWidth:1, borderColor:Colors.SecondaryColor, padding:4, paddingHorizontal:8, borderRadius:12}}>Apply</Text>
                                                                            </TouchableOpacity>   
                                                                        }
                                                                    </View>
                                                                </View>
                                                                <View style={{width:'100%',marginVertical:4}}>
                                                                    <Text style={{fontSize:FontSize.xp, color:'#434343', fontWeight:'300'}}>“{firstCouponCode.description} </Text>
                                                                </View> 
                                                            </View> 
                                        )
                                    }                            
                                    {/*end: show firsts coupone code*/}
        
                                    <View style={Styles.LowwerSection}>
                                        <View style={{width:'80%'}}>
                                            <Text style={[Styles.itemMainTextPrice,{fontSize:FontSize.xp,color:Colors.SecondaryColor}]} >View Other Offer</Text> 
                                        </View>
                                        <TouchableOpacity style={{width:'20%', justifyContent:'center',alignContent:'center', alignItems:'center'}} onPress={()=>showHideCouponeHandler()}>
                                            <ArrowRightHalfDark width={12} height={12} style={{fontWeight:'700'}}/> 
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {/* End : item */} 
        
                            </View>
                        </View>  
                    )
                } 
                {/* End: offers */}

                {/* Start: Billine details */}
                {
                    orderPricing && ( 
                        <View style={[Styles.BoxContainer,{paddingTop:0}]}>
                            <Text style={Styles.BoxTitle}>Bill Details</Text>
                            <View style={Styles.InnerBoxContainer}>
                                {/* Start: Items */}
                                    <View style={Styles.BillingDetails}>
                                            
                                            <View style={{flexDirection:'row', justifyContent:'space-between', height:40, alignContent:'center', alignItem:'center',}}>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                    <Text style={Styles.PricingText}>Item Total</Text> 
                                                </View>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                    
                                                    <View style={{flexDirection:'row', marginLeft:10}}> 
                                                        {
                                                            orderPricing ? 
                                                                <Text  style={Styles.PricingTextPrice}>₹{orderPricing.grossAmount}</Text> 
                                                            :
                                                                <Text  style={Styles.PricingTextPrice}>₹0</Text> 
                                                        }
                                                    </View>  
                                                </View>
                                            </View>

                                            <View style={{flexDirection:'row', justifyContent:'space-between', height:40, alignContent:'center', alignItem:'center',}}>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                    <Text style={Styles.PricingText}>GST Amount</Text> 
                                                </View>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}> 
                                                    <View style={{flexDirection:'row', marginLeft:10}}>
                                                        {/* <RupeeBlack width={11} height={11} style={{marginTop:5}}/> */}
                                                        {
                                                            orderPricing ? 
                                                            <Text  style={Styles.PricingTextPrice}>₹{orderPricing.gstAmount}</Text> 
                                                            :
                                                            <Text  style={Styles.PricingTextPrice}>₹0</Text> 
                                                        }
                                                    </View>  
                                                </View>
                                            </View>
                                            
                                            {
                                                orderPricing && orderPricing.discount != 0 ?
                                                    <View style={{flexDirection:'row', justifyContent:'space-between', height:40, alignContent:'center', alignItem:'center',}}> 
                                                        <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                            <Text style={[Styles.PricingText,{color:Colors.PrimaryColor,fontWeight:'600'}]}>Offer Applied ({applyCoupon})</Text> 
                                                        </View> 
                                                        <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}> 
                                                            <View style={{flexDirection:'row', marginLeft:10}}>
                                                                {/* <Text  style={[Styles.PricingTextPrice,{color:Colors.PrimaryColor,fontWeight:'600',fontSize:FontSize.p, marginRight:4}]}>-</Text>  */}
                                                                {/* <RupeeBlack width={12} height={12} style={{marginTop:8}}/> */}
                                                                {
                                                                    orderPricing.discount ? 
                                                                    <Text  style={[Styles.PricingTextPrice,{color:Colors.PrimaryColor,fontWeight:'600',fontSize:FontSize.p}]}>₹{orderPricing.discount}</Text> 
                                                                    :
                                                                    <Text  style={[Styles.PricingTextPrice,{color:Colors.PrimaryColor,fontWeight:'600',fontSize:FontSize.p}]}>₹0</Text>
                                                                } 
                                                            </View>  
                                                        </View>
                                                    </View>
                                                :
                                                <></>
                                            }    
                                                
                                        

                                            <View style={{height:1, width:'100%', backgroundColor:'#0237BE26', marginVertical:8}}></View>

                                            <View style={{flexDirection:'row', justifyContent:'space-between', height:40, alignContent:'center', alignItem:'center',}}>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                    <Text style={[Styles.PricingText,{color:Colors.SecondaryColor,fontWeight:'600'}]}>Total Amount</Text> 
                                                </View>
                                                <View style={{flexDirection:'row', height:'100%', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}> 
                                                    <View style={{flexDirection:'row', marginLeft:10}}>
                                                        {/* <Text  style={[Styles.PricingTextPrice,{color:Colors.SecondaryColor,fontWeight:'700',fontSize:FontSize.p,marginRight:4}]}>-</Text>  */}
                                                        {/* <RupeeBlack width={12} height={12} style={{marginTop:8}}/> */}
                                                        {
                                                            orderPricing ? 
                                                                    <Text  style={[Styles.PricingTextPrice,{color:Colors.SecondaryColor,fontWeight:'700',fontSize:FontSize.p}]}>₹{orderPricing.netAmount}</Text> 
                                                            :
                                                            <Text  style={[Styles.PricingTextPrice,{color:Colors.SecondaryColor,fontWeight:'700',fontSize:FontSize.p}]}>₹0</Text> 
                                                        }   
                                                    </View>  
                                                </View>
                                            </View> 
                                    </View>
                                {/* End: Items */}
                            </View>
                        </View> 
                    )
                }   
                {/* End: Billig details */} 

                {/* Start: Help */}
                {
                    orderPricing && (
                        <>
                        <View style={[Styles.BoxContainer,{ paddingTop:0, paddingBottom:4}]}>
                            <TouchableOpacity style={Styles.InnerHelpBox} onPress={openDialScreen}>
                                <Text style={{fontSize:FontSize.p - 1, fontWeight:FontWeight.medium, color:Colors.SecondaryColor}}>Having a trouble ordring?</Text>
                                <Text style={{fontSize:FontSize.p - 2, fontWeight:FontWeight.medium, color:Colors.PrimaryColor}}>Contact Support</Text>
                            </TouchableOpacity>
                        </View> 
                        <View style={{height:40, backgroundColor:'#F5F9FC', }}></View>
                        </>
                    )
                }
                {/* End: Help */}  

                {/* start: View all couponsCode  showHideCoupone*/}
                <Modal animationType="slide"  transparent={true} visible={showHideCoupone}>
                    <View style={{ height: '100%', marginTop: 'auto', position: "relative",backgroundColor: '#0e0e0e61',zIndex: 999999 }}>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={()=>showHideCouponeHandler()}>
                    <View></View>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: '80%', backgroundColor: "#ffffff", borderTopRightRadius: 15, borderTopLeftRadius: 15, overflow:'hidden' }}>
                        
                        <View style={{width:'100%',height:80,flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:12,}}>
                            <Text style={{fontSize:FontSize.h4,color:Colors.SecondaryColor,fontWeight:FontWeight.medium}}>Apply Coupon</Text>
                            <TouchableOpacity style={{height:'100%', width:40, justifyContent:'center', alignContent:'center', alignItems:'center'}} onPress={()=>showHideCouponeHandler()}> 
                                <CloseIcon width={24} height={24}/>
                            </TouchableOpacity>
                        </View>


                        <View style={{width:'100%',height:80,flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:12,}}>
                            <TextInput placeholder='Enter coupon code' placeholderTextColor="#D1D1D1" style={{width:'100%', height:'70%', borderWidth:2, borderColor:'#D1D1D1', borderRadius:6, paddingHorizontal:14, fontSize:FontSize.p,color:'#000000', fontWeight:'500'}}/>
                        </View>


                        <View style={{width:'100%',height:70,flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:12, backgroundColor:'#F5F9FC', marginVertical:7}}>
                            <Text style={{fontSize:FontSize.h5,color:Colors.SecondaryColor,fontWeight:'600'}}>Available offers</Text>  
                        </View>


                        <ScrollView style={{width:'100%', paddingVertical:14, paddingHorizontal:12}}>

                                {/* Start: Items 3 types of items card*/}
                                {
                                 couponsCode ? 
                                    (
                                        couponsCode.map((item,index)=>{
                                          return ( <View key={index} style={Styles.couponCodeBox}>
                                                <View style={{flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', height:30,}}>
                                                    <Text style={{color:Colors.SecondaryColor, fontSize:FontSize.xp, fontWeight:FontWeight.bold}}>{item.code}</Text>
                                                    <View style={{flexDirection:'row'}}>
                                                        {
                                                            applyCoupon == item.code ? 
                                                            <>
                                                                <AppliedCoupon width={15} height={15} style={{marginRight:3,marginTop:4}}/>
                                                                <Text style={{color:Colors.PrimaryColor, fontSize:FontSize.xp, fontWeight:'500'}}>Applied</Text>
                                                            </>
                                                        :
                                                        <TouchableOpacity onPress={()=>appltCouponCodeHandler(orderId,item.code)}>
                                                            <Text style={{color:Colors.SecondaryColor, fontSize:FontSize.xxp, fontWeight:'500', borderWidth:1, borderColor:Colors.SecondaryColor, padding:4, paddingHorizontal:8, borderRadius:12}}>Apply</Text>
                                                        </TouchableOpacity>
                                                        }
                                                        
                                                        
                                                    </View>
                                                </View> 

                                                <View style={{width:'100%',flexDirection:"row",flexWrap:'wrap', marginBottom:8}}>
                                                    <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.regular, color:'#000'}}>{item.description}</Text>
                                                    <TouchableOpacity style={{padding:0, margin:0}}><Text style={{ color:'#666666',fontSize:FontSize.xp,fontWeight:FontWeight.regular}}>T&C</Text></TouchableOpacity>  
                                                </View>

                                                <View style={{width:'100%',marginVertical:6, justifyContent:'flex-start', alignContent:'center', alignItems:'flex-start'}}>
                                                    <Text style={{backgroundColor:'#F5F9FC',borderWidth:1,borderColor:'#ADADAD',borderStyle: 'dashed', padding:3, paddingHorizontal:8,fontSize:FontSize.xxp, color:Colors.SecondaryColor, fontWeight:'500'}}>{item.code}</Text>
                                                </View>
                                            </View> )         
                                        })
                                    )
                                 :
                                 <></>
                                } 
                                
                                {/* <View style={Styles.couponCodeBox}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', height:30,}}>
                                        <Text style={{color:'#979797', fontSize:FontSize.xp, fontWeight:FontWeight.bold}}>Discount Worth ₹70</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{color:Colors.PrimaryColor, fontSize:FontSize.xp, fontWeight:'500'}}>Applied</Text>
                                            <TouchableOpacity>
                                                <Text style={{color:'#727272', fontSize:FontSize.xxp, fontWeight:'500', borderWidth:1, borderColor:'#BBBBBB', padding:4, paddingHorizontal:8, borderRadius:12}}>Apply</Text>
                                            </TouchableOpacity> 
                                        </View>
                                    </View> 
                                    <View style={{width:'100%',flexDirection:"row", marginBottom:8}}>
                                        <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.regular, color:'#000'}}>Flat ₹500 off on order above ₹599. </Text>
                                        <TouchableOpacity style={{padding:0, margin:0}}><Text style={{ color:'#666666',fontSize:FontSize.xp,fontWeight:FontWeight.regular}}>T&C</Text></TouchableOpacity>  
                                    </View>
                                    <View style={{width:'100%',marginVertical:6, justifyContent:'flex-start', alignContent:'center', alignItems:'flex-start'}}>
                                        <Text style={{backgroundColor:'#F5F9FC',borderWidth:1,borderColor:'#ADADAD',borderStyle: 'dashed', padding:3, paddingHorizontal:8,fontSize:FontSize.xxp, color:Colors.SecondaryColor, fontWeight:'500'}}>GET500</Text>
                                    </View>
                                    <View style={{width:'100%', height:1, backgroundColor:"#0237BE44",marginVertical:8}}></View>
                                    <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', alignContent:'center', width:'100%'}}>
                                        <Caution width={15} height={15} />
                                        <Text style={{color:'#DDA037', fontSize:FontSize.xxp, fontWeight:FontWeight.bold}}>Promocode is not applicable on this merchant.</Text>
                                    </View> 
                                </View> */}

                                 
                                {/* End: Items 3 types of items card */}
                            <View style={{width:'100%', height:30}}></View>
                        </ScrollView>  


                    </View>    

                </View>
                </Modal> 
                {/* end: View all couponsCode */}

            </ScrollView>

                {/* Start: Footer */}
                {
                    orderPricing ?
                        <MainFooter themeType={2} theme="dark" onPress={openClosePriceHandler}  CheckOut={processforPayment} checkoutFnc={ContinueButton} isLoadingCutton={isPaymentProcess} termsAccept={acceptTerms} totalPriceP={orderPricing.netAmount}/>
                    :
                    <></>
                }                
                {/* End: Footer */}                 

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
                                                                {/* <Text style={{color:'#5B5C5B',fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500',marginLeft:4}}>{totalPrice}</Text> */}
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500',marginLeft:4}}>{orderPricing?orderPricing.netAmount:totalPrice}</Text> 
                                                        </View>
                                                </View>

                                                <View style={{height:20,borderBottomWidth:2, borderBottomColor:Colors.lightGray,marginBottom:12}}></View>

                                                <View style={{width:'100%',height:50, flexDirection:'column',marginBottom:12}}> 
                                                {
                                                    recentAddedSite[0].name != null ?
                                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                                            <View style={{width:'70%'}}>
                                                                <Text  style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500'}}>{recentAddedSite[0].name}</Text>       
                                                            </View> 
                                                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}> 
                                                                <RupeeBlack width={15} height={15} style={{marginTop:2}}/>
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:'500',marginLeft:4}}>{recentAddedSite[0].totalPrice}</Text>
                                                            </View>
                                                    </View>
                                                    :
                                                    null
                                                }
                                                    

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
                                                        return <View key={item.id} style={{width:'100%',minHeight:20,flexDirection:'column',marginBottom:14}}>  
                                                            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                                                    {/* <View style={{width:'70%'}}> 
                                                                    </View>      */}
                                                                    <Text  style={{color:Colors.gray,fontSize:FontSize.h6, fontWeight:'500'}}>{item.titke}</Text>    
                                                                    <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}> 
                                                                        <RupeeBlack width={14} height={14} style={{marginTop:2}}/>
                                                                        <Text  style={{color:Colors.gray,fontSize:FontSize.h6 , fontWeight:'500',marginLeft:4}}>{item.price}</Text> 
                                                                    </View>
                                                            </View>
                                                        </View>   
                                                    })
                                                }                                                  
                                                
                                                {/* End: Loop  */} 


                                                {/* Start: Buton */}
                                                {/* <CTMButton btnText="Continue" theme="default" marginBottom={false} functionType="navigate to next screen" onPress={ContinueButton} isLoading={isLoadingCutton} />  */}
                                                {/* End: Button */}
                                                

                                        </View>
                                    </View>
                                </View>
                        </Modal>                
                    :
                    <></>
                }                 
                {/* End: Modal */} 

                <Modal animationType="slide" transparent={true} visible={couponCodeLoading} >
                    <View style={{width:'100%', height:'100%', backgroundColor:'#13131399', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <LoaderCircle/>
                    </View>
                </Modal>


        </ScreenWrapper>
    )
}

export default CheckOut
 