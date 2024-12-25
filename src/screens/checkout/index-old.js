import { View, Text, ScrollView, StyleSheet ,Dimensions, Modal, TouchableOpacity, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'


// header 
import ScndHeader from '../../components/headers/scndHeader'

// footer 
import MainFooter from '../../components/footer/mainFooter'


import Images from '../utility/images'

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import Colors from '../utility/color'
import FontSize ,{FontWeight} from '../utility/fonts'


import AsyncStorage from '@react-native-async-storage/async-storage';

import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg';

import ApiService from '../../ApiServices'

import { useNavigation,  } from '@react-navigation/native';
 
// notification 
import AnimatedMessage from '../../components/animatedNotification'
 
import styles from './styles'

//main screen 
const CheckOut = ()=>{
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

    const [couponsCode,setCouponsCode] = useState([]);
    // useEffect(()=>{
    //     getAllCoupons();
    // },[]);
    
    // start: open price 
    const [openClosePrice , setOpenClosePrice]=useState(false);
    const openClosePriceHandler = (data)=>{
        console.log("open close price handler clicked");
        setOpenClosePrice(data);  
    }
    // end: open price 

   

    // Start: TextInput
    const [isFocused,setIsFocused] = useState(false);
    const [applyCoupon,setApplyCoupon] = useState('');
    const handleFocus = () => {
        setIsFocused(true);
      };
    
    const handleBlur = () => {
    setIsFocused(false);
    };
    // End: textInput

    // start: Accept terms and condition
    const [acceptTerms,setAcceptTerms] = useState(false);
    const acceptTermsHandler = ()=>{
        setAcceptTerms(!acceptTerms);
    }
    // end: Accept terms and condition

    
    // start: get data from addons page 
    const [recentAddedSite,setRecentAddedSite] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0); 
    const [selectedAddonData,setSelectedAddonData] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem('Addons',(err,addons)=>{ 
            console.log("___________^_^__________addons", addons)
            setSelectedAddonData(JSON.parse(addons)); 
        });
        AsyncStorage.getItem('TotalPrice',(err,totalPrice)=>{
            console.log("___________^_^__________totalPrice", totalPrice)
            setTotalPrice(JSON.parse(totalPrice));
        })
        AsyncStorage.getItem('RecentAddedSite',(err,recentAddedSite)=>{
            console.log("___________^_^__________recentAddedSite", recentAddedSite)
            setRecentAddedSite(JSON.parse(recentAddedSite));
        });
    },[]); 
    // end: get data from addons page 

    // start: get order details  
    const [orderData,setOrderData] = useState(null);
    const [orderPricing,setOrderPricing] = useState(null);

    useEffect(()=>{
        AsyncStorage.getItem('OrderDetails',(err,cres)=>{
            console.log("_______________^-^___________ Order Details: ",JSON.parse(cres));
            let aa = JSON.parse(cres) 
            getOrderDetailsv1(aa.id);
            getAllCoupons(aa.id);
            // also can pass the orderCode
            // getOrderDetailsv2(aa.id);
        });
    },[]);  
     
    const getOrderDetailsv1 = (orderID)=>{
        let url = `customer/orderv2/${orderID}` 
        ApiService.Getapiheader(url)
        .then(response=>{
            if(response){ 
                console.log("()()()())----------------", response);
                console.log("get order details: ", response.pricing);
                setOrderData(response); 
                setOrderPricing(response.pricing); 
            }else{
                setMessages([`Something went wrong while getting the order details.`]);    
            }
        })  
        .catch(error=>{
            console.log("Error in getting order details: ",error);
            setMessages([`Error in getting order details: ${error}`,]);
        });
    }
    // const getOrderDetailsv2 = (orderIdCode)=>{
    //     let url = `customer/orders/${orderIdCode}?version=2.0`;
    //     ApiService.Getapiheader(url)
    //     .then(response=>{
    //         console.log('getOrderDetailsv2 response: ', response.data);
    //         // setOrderPricing({

    //         // })
    //     })
    //     .catch(error=>{
    //         console.log("getOrderDetailsv2 error: ", error);
    //     })

    // }
    // end: get order details 
    const [couponCodeLoading,setcouponCodeLoading] = useState(false);
    const [couponCodeApplyed,setcouponCodeApplyed] = useState(false);
    // Start: apply coupon code
    const appltCouponCodeHandler = (code)=>{
        setApplyCoupon(code);
        setcouponCodeApplyed(false);
        setcouponCodeLoading(true);
        let url = `customer/orderv2/coupon/${orderData.id}`;
        let data = {
            promocode:code
        }
        console.log({
            data,
            "orderID":orderData.id
        })
        ApiService.Post(url,data)
        .then(response=>{
            console.log("Apply coupon code response: ",response.data);
            console.log(response.ok)
            if(response.data){
                if(response.data.couponCode && response.data.couponCode != ''){ 
                    setcouponCodeLoading(false); 
                    setOrderPricing(response.data.pricing);
                    setcouponCodeLoading(false);
                    setcouponCodeApplyed(true);
                }else{
                    setcouponCodeLoading(false);
                    setcouponCodeApplyed(false);
                    setMessages([`${response.data.message}`]);
                }
            } 
        })
        .catch(error=>{
            setcouponCodeLoading(false);
            setcouponCodeApplyed(false); 
            console.log("Apply Coupon code error: ",error);
            setMessages([`Apply Coupon code error: ${error}`,]);
        })
    }
    // End: apply coupon code 

    // start: remove coupon code 
    const [removeCouponStatus,setremoveCouponStatus] = useState(false);
    const removeCouponCode = (applyCoupon)=>{ 
        setremoveCouponStatus(true);
        let url = `customer/orderv2/coupon/${orderData.id}?remove=true`;
        let data = {
            promocode:applyCoupon
        }
        console.log({
            data,
            "orderID":orderData.id
        })
        ApiService.Post(url,data)
        .then(response=>{
            console.log("remove coupon code response: ",response.data);
            console.log(response.ok)
            if(response.data){
                //if(response.data.couponCode && response.data.couponCode != ''){ 
                if(response.data.pricing && response.data){
                    setApplyCoupon('');
                    console.log("remove coupon code: ",response.data);
                    setcouponCodeLoading(false); 
                    setOrderPricing(response.data.pricing); 
                    setcouponCodeApplyed(false); 
                    setremoveCouponStatus(false);
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
            console.log("Apply Coupon code error: ",error);
            setMessages([`Apply Coupon code error: ${error}`,]);
        })
    }
    // end: remove coupon code 

    // start: get all coupons
    const getAllCoupons =  (orderID)=>{
        let url = `public/coupon/?orderID=${orderID}`;
        //  let url = 'https://api.makemyhouse.com/public/coupon';
        // ApiService.Testing(url)
        ApiService.Getapiheader(url)
        .then(response=>{
            if(response){ 
                console.log("get all coupons codes: ", response);
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
    const paymentProcess = async (orderid)=>{
        setIsLoadingCutton(true)
        setIsPaymentProcess(true);
        let url = `customer/orderv2/create/${orderid}`; 
        console.log('url____________url__________url_______::', url)
        let data = {};
        await ApiService.Post(url,data)
        .then(response=>{
            if(response){
                console.log("payment process response: ", response.data);
                AsyncStorage.setItem("PaymentLink",response.data.paymentLink);  
                setprocessforPayment(true);
                navigation.navigate('CheckOutWebView')
            }else{
                setMessages([`Something went wrong while payment process.`,]);
            }
        })
        .catch(error=>{
            setIsLoadingCutton(false);
            setprocessforPayment(false);
            setIsPaymentProcess(false);
            console.log("payment process error: ", error);
            setMessages([`Payment process error: ${error}`,]);
        }) 
    }
    // end: payments
    
    return(
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
                
                {/* Start: Main Body */}
                <ScrollView 
                    style={{flex:1,padding:0,paddingHorizontal:0,marginTop:0}} 
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}> 
 
 
                     <View style={[styles.couponConformContainer,couponCodeApplyed==true?{display:'flex',marginVertical:12}:{display:'none'}]}> 
                      {/* <View style={[styles.couponConformContainer]}>  */}
                        <View style={styles.couponCodeInner}>
                            <View style={[styles.couponCodeLeft,{width:'80%'}]}> 
                                <Text style={styles.couponCodeInnerText}>Yay! your coupon code {applyCoupon} applied successfully.</Text>
                            </View>
                            <View style={{width:'20%'}}> 
                                {
                                    removeCouponStatus != true ?
                                        <TouchableOpacity style={{backgroundColor:'red',justifyContent:'center',alignContent:'center', alignItems:'center', borderRadius:3, padding:4}} onPress={()=>removeCouponCode(applyCoupon)}>
                                            <Text style={[styles.couponCodeInnerText,{color:'#ffffff',fontSize:FontSize.xxxp,}]}>Remove</Text>
                                        </TouchableOpacity> 
                                    :
                                        <TouchableOpacity style={{backgroundColor:'red',justifyContent:'center',alignContent:'center', alignItems:'center', borderRadius:3, padding:4}}>
                                            <Text style={[styles.couponCodeInnerText,{color:'#ffffff',fontSize:FontSize.xxxp,}]}>Loading...</Text>
                                        </TouchableOpacity> 
                                }
                            </View> 
                        </View>
                    </View>
                    

                    {/* Start: Apply coupon code */} 
                    <View style={couponCodeApplyed == true?{display:'none'}:{display:'block'}}>
                            <View style={[styles.DarkHeder,{marginTop:18}]}>
                                <Text style={{fontSize:FontSize.h6,color:'#000000',fontWeight:FontWeight.regular, padding:10, paddingHorizontal:0}}>Apply Coupon Code </Text>
                            </View>    
                            <View style={{padding:10,height:120,justifyContent:'center',alignContent:'center'}}>
                                <View style={[styles.textInputContiner,
                                            {
                                                borderColor: isFocused? Colors.PrimaryColor: Colors.lightGray
                                            }
                                        ]}> 
                                    <TextInput 
                                        placeholder="Apply Coupon Coder"
                                        placeholderTextColor={Colors.lightGray}
                                        defaultValue={applyCoupon} 
                                        onChangeText={(text) => setApplyCoupon(text)}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        autoCapitalize = {"characters"}
                                        style={styles.textInput}
                                    />
                                    {
                                        couponCodeLoading == false ?
                                            <TouchableOpacity style={{width:'30%',height:'100%',backgroundColor:Colors.PrimaryColor,justifyContent:'center',alignContent:'center',alignItems:'center',borderTopRightRadius:10,borderBottomRightRadius:10}} 
                                                onPress={()=>{appltCouponCodeHandler(applyCoupon)}}
                                            >
                                                    <Text style={{color:Colors.width,fontSize:FontSize.p,fontWeight:'500',fontWeight:FontWeight.regular,color:'#ffffff'}}>Apply</Text>  
                                            </TouchableOpacity> 
                                        :
                                        <TouchableOpacity style={{width:'30%',height:'100%',backgroundColor:Colors.PrimaryColor,justifyContent:'center',alignContent:'center',alignItems:'center',borderTopRightRadius:10,borderBottomRightRadius:10}} >
                                                <Text style={{color:Colors.width,fontSize:FontSize.p,fontWeight:'500',color:'#ffffff'}}>Loading...</Text>  
                                        </TouchableOpacity>  
                                    }
                                </View>  
                            </View>
                    </View>    
                    {/* End: Apply coupon code */} 

                   {/* Start: Select a Promo Code */} 
                   <View style={applyCoupon != ''?{display:'none'}:{display:'flex'}}>
                   {
                    couponsCode&&(
                        <View>
                            <View style={styles.DarkHeder}>
                                <Text style={{fontSize:FontSize.h6,color:Colors.SecondaryColor,fontWeight:FontWeight.regular, padding:10, paddingHorizontal:0}}>Select A Promo Code</Text>
                            </View>  
                            <View style={{padding:10,minHeight:120,justifyContent:'center',alignContent:'center'}}>
                                {
                                    couponsCode.map((item,index)=>{
                                       // return <CouponCard item={item} couponCode={applyCoupon} onPress={()=>appltCouponCodeHandler(item.code)}/>
                                       return  <View key={index} style={[styles.Container,{marginTop:12}]}  > 
                                                    <View style={styles.InnerBoxShadow}></View>
                                                    <View activeOpacity={0.9} style={[styles.InnerBox,{padding:16,paddingTop:8}]}>
                                                        <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center',marginBottom:0}}>
                                                                <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5,fontWeight:'500'}}>{item.code}</Text> 
                                                                {
                                                                    applyCoupon == item.code ?
                                                                     <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor,paddingHorizontal:15,paddingVertical:8,borderRadius:6}}>
                                                                        <Text style={{color:Colors.white}}>Applied</Text>
                                                                    </TouchableOpacity>
                                                                    :
                                                                    <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor,paddingHorizontal:15,paddingVertical:8,borderRadius:6}} onPress={()=>appltCouponCodeHandler(item.code)}>
                                                                        <Text style={{color:Colors.white}}>Apply</Text>
                                                                    </TouchableOpacity>
                                                                   
                                                                }
                                                        </View>
                                                        <Text style={{color:Colors.gray,fontSize:FontSize.xp}}>{item.description}</Text>
                                                    </View>
                                                </View>
                                    })
                                }
                            </View>
                        </View>
                    )
                   } 
                   </View>
                    {/* End: Select  a Promo Code */}
                    
                    {/* Start: Payment Detail */}
                    {
                         orderPricing?
                        <View>
                            <View style={[styles.DarkHeder,{marginTop:0}]}>
                                <Text style={{fontSize:FontSize.h6,color:Colors.SecondaryColor,fontWeight:FontWeight.regular, padding:10, paddingHorizontal:0}}>Payment Detail</Text> 
                            </View>    
                            <View style={{padding:10,minHeight:120,justifyContent:'center',alignContent:'center'}}>
                                    
                                <View  style={[styles.Container,{marginTop:22}]}  > 
                                        <View style={[styles.InnerBoxShadow,{backgroundColor:Colors.SecondaryColor}]}></View>
                                        <View activeOpacity={0.9} style={[styles.InnerBox,{padding:16,paddingVertical:22}]}>
    
                                            <View style={styles.PaymentDetails}>
                                                    <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:4}}>Subtotal</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                                            <RupeeBlack width={16} height={16} style={{marginTop:2}}/>
                                                            {
                                                                orderPricing ? 
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:2}}>{orderPricing.grossAmount}</Text>
                                                                :
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:2}}>0</Text>
                                                            }
                                                    </View>
                                            </View>
                                            <View style={styles.PaymentDetails}>
                                                    <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:4}}>GST Amount</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                                            <RupeeBlack width={16} height={16} style={{marginTop:2}}/>
                                                            
                                                            {
                                                                orderPricing ? 
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:2}}>{orderPricing.gstAmount}</Text>        
                                                                :
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:2}}>0</Text>
                                                            }
                                                            
                                                            {/* {orderData.pricing.gstAmount ?orderData.pricing.gstAmount:0} */}
                                                    </View>
                                            </View>
                                            <View style={styles.PaymentDetails}>
                                                    <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:4}}>Promo Discount</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                                            <RupeeBlack width={16} height={16} style={{marginTop:2}}/>
                                                            {
                                                                orderPricing ? 
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:2}}>{orderPricing.discount}</Text>        
                                                                :
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:2}}>0</Text>
                                                            }
                                                    </View>
                                            </View>

                                            <View style={{height:25}}></View>

                                            <View style={[styles.PaymentDetails,{borderLeftWidth:0,borderRightWidth:0}]}>
                                                    <Text style={{color:Colors.PrimaryColor,fontSize:FontSize.h6, fontWeight:'400',marginLeft:4}}>Total Due</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                                            
                                                            <RupeeBlack width={16} height={16} style={{marginTop:2}}/>
                                                            {
                                                                orderPricing ? 
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:2}}>{orderPricing.netAmount}</Text>       
                                                                :
                                                                <Text style={{color:'#5B5C5B',fontSize:FontSize.h6, fontWeight:'400',marginLeft:2}}>0</Text>
                                                            }
                                                    </View>
                                            </View>

                                            
                                            <View style={[styles.PaymentDetails,{borderWidth:0,justifyContent:'flex-start'}]}> 
                                                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                                            <TouchableOpacity onPress={acceptTermsHandler}>
                                                            {
                                                                acceptTerms == false ?
                                                                <AutoHeightImage  
                                                                    width={18}
                                                                    height={18}
                                                                    source={Images.CheckTickEmpty}
                                                                    style={{marginTop:2}}
                                                                />
                                                                :
                                                                <AutoHeightImage
                                                                    width={18}
                                                                    height={18}
                                                                    source={Images.CheckTickFill}
                                                                    style={{marginTop:2}}
                                                                /> 
                                                            }
                                                                
                                                            </TouchableOpacity>
                                                            <View style={{flexDirection:'row',marginLeft:6}}>
                                                                    <TouchableOpacity activeOpacity={0.9} onPress={acceptTermsHandler}>
                                                                        <Text style={{color:'#5B5C5B',fontSize:FontSize.p, fontWeight:'400',marginLeft:4}}>I accept</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity>
                                                                        <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.p, fontWeight:'400',marginLeft:4}}>Contract,</Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity>
                                                                        <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.p, fontWeight:'400',marginLeft:4}}>Terms & Conditions</Text>
                                                                    </TouchableOpacity>
                                                            </View>
                                                            
                                                    </View>
                                            </View>  
                                        </View>   
                                </View>   
                            </View> 
                        </View>
                    :
                        <View style={{padding:12}}>
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
                            <View style={{width:'100%',height:140, backgroundColor:Colors.lighteshGray, marginBottom:20, padding:6, borderRadius:6}}>
                                    <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>         
                                    <View style={{width:'100%',height:40,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View> 
                                    <View style={{width:'100%',height:20,backgroundColor:Colors.lightGray, marginBottom:10,borderRadius:3}}></View>                 
                            </View>
                        </View> 
                    } 
                    {/* End: Payment Detail */} 

                </ScrollView> 
                
                {/* End: Main Body {orderPricing.netAmount} */} 
                {
                            orderPricing ?
                                <MainFooter themeType={2} theme="dark" onPress={openClosePriceHandler}  CheckOut={processforPayment} checkoutFnc={ContinueButton} isLoadingCutton={isPaymentProcess} termsAccept={acceptTerms} totalPriceP={orderPricing.netAmount}/>
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
                                                               return <View key={item.id} style={{width:'100%',height:30,flexDirection:'column',marginBottom:14}}>  
                                                                    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignContent:'center',alignItems:'center'}}>
                                                                            <View style={{width:'70%'}}>
                                                                                <Text  style={{color:Colors.gray,fontSize:FontSize.h6, fontWeight:'500'}}>{item.titke}</Text>    
                                                                            </View>     
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
            </ScreenWrapper>
    )
}         



export default CheckOut;
