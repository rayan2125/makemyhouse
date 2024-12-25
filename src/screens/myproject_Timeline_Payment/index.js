import { View, Text, ScrollView, StyleSheet ,Dimensions, Modal, TouchableOpacity, TextInput, FlatList} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

import {GlobalData} from "../utility/config"

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper' 

// header 
import ScndHeader from '../../components/headers/scndHeader'
  
const {width, height} = Dimensions.get('window'); 
  
import Colors from '../utility/color'
import FontSize,{FontWeight} from '../utility/fonts'
  

import { useNavigation  } from '@react-navigation/native';

import ApiService from '../../ApiServices'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// Start: icons 
import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg'
import { RFValue } from 'react-native-responsive-fontsize'; 
import PaymentCard from '../../../assets/images/icons/paymentTwo.svg'
import PaymentUpi from '../../../assets/images/icons/paymentOne.svg'
// end: icons


// notification 
import AnimatedMessage from '../../components/animatedNotification'


import Loader from './loader'

const MyProjectPayment = ()=>{
      // aimate notification 
      const [messages, setMessages] = useState([]);
      useEffect(()=>{
          // setTimeout(()=>{
          //   setMessages([]);
          // },2000); 
      },[messages]);
     const navigation = useNavigation(); 
     
     
    // start: Pending orders 
    const [billingDetails,setBillingDetails] = useState([]);  
    const [projectId,setProjectId] = useState('');  
    const [projectCode,setProjectCode] = useState('');
    const [token,setToken] = useState('');
    const [orderCode,setorderCode] = useState('');
    useFocusEffect(
        useCallback(  () => {
            AsyncStorage.getItem('projectIdNewTimeline',(err,creds)=>{
                console.log("storage",creds);
                setProjectId(creds);
                AsyncStorage.getItem("projectCode",(error,projectCode)=>{
                    setProjectCode(projectCode);
                })
                AsyncStorage.getItem('UserToken',(err, crdToken)=>{ 
                    console.log("token",crdToken);
                    setToken(crdToken);
                }); 
                AsyncStorage.getItem('orderCodeMyProject',(err,crdCode)=>{
                    console.log("orderCode",crdCode);
                    setorderCode(crdCode);
                }) 
            })
            return () => { 
                console.log("Project iD fetched"); 
            }
        }, []),
    ); 
    
    useEffect(()=>{
        const getPaymentDetails =  async  ()=>{
            if(projectId != '' && orderCode != ""){
                const url  = `customer/mmhproject/billings/${projectId}?ordercode=${orderCode}`
                console.log("------------------", url);
                await ApiService.Getapiheader(url)
                .then(response=>{ 
                    if(response){
                        console.log("-+_+_+_+_+_+_+_+_+payment details_+_+_+_+_+_", response.data);
                        if(response.data.length > 0){ 
                            setBillingDetails(response.data);
                        }else{
                            setMessages([`Payment details is empty.`]); 
                        }
                    }else{
                        setMessages([`Something went wrong while getting the payment details.`]); 
                    }
                })
                .catch(error=>{
                    console.log('get customers orders error:', error);
                    setMessages([`Error while getting the site details.`]);
                })
            }
        }
        getPaymentDetails();
    },[orderCode]); 


    const handlePayment = (amount,orderid,token)=>{
        console.log("handle payment");
        let url = `${GlobalData.LINKURL}payment-flow/?amount=${amount}&orderid=${orderid}&token=${token}`
        console.log(url);
        AsyncStorage.setItem('myprojectPayment',url);
        navigation.navigate('MyProjectPaymentWebView')
    }

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
                Title="Billing Detail" 
                Search={false} 
                Profile={false}  
                Back={true}
                BackScreen="" 
                Skip={false} 
                SkipStack=""
                SkipScreen="" 
            /> 
               <View style={{padding:0, marginVertical:0,backgroundColor:'#ECF3FF',borderBottomColor:Colors.lightGray,borderBottomWidth:1}}> 
                    <View style={{width:'100%', padding:10}}>
                        <Text style={{fontSize:FontSize.p,textAlign:'center', fontWeight:FontWeight.medium, color:Colors.SecondaryColor}}>
                            {
                                projectCode?projectCode:"---"
                            }
                        </Text>
                    </View> 
                </View> 
            <ScrollView  bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                 
                    {
                        billingDetails.length > 0 ? 
                            (
                                billingDetails.map((item,index)=>{ 
                                return  <View key={item.orderID} style={{padding:0, marginVertical:12}}>  
                                            <View style={{padding:10}}>
                                                <View style={styles.container}>
                                                        <View style={[styles.totalAmount]}>
                                                                <Text style={[styles.totalAmountHeader,{color:Colors.SecondaryColor}]}>Order Code</Text>
                                                                <View style={{flexDirection:'row'}}> 
                                                                    <Text style={[styles.totalAmountHeader]}>{item.orderCode}</Text>
                                                                </View>
                                                        </View>
                                                        <View style={[styles.totalAmount]}>
                                                                <Text style={[styles.totalAmountHeader,{fontSize:FontSize.h5}]}>Total amount </Text>
                                                                <View style={{flexDirection:'row'}}>
                                                                    <RupeeBlack width={RFValue(13)} height={RFValue(13)} style={{marginTop:8}}/>
                                                                    <Text style={[styles.totalAmountHeader,{fontSize:FontSize.h5}]}>{item.total}</Text>
                                                                </View>
                                                        </View>
                                                        <View style={[styles.otherColumBased]}>
                                                            <Text style={[styles.totalAmountHeader,{color:Colors.SecondaryColor}]}>Instalment</Text> 
                                                             {
                                                                item.installments.map((itemx,indexx)=>{
                                                                    return <View key={itemx.no} style={[styles.otherColumBasedInner,{marginTop:8}]}>
                                                                        <View style={{width:'75%'}}>
                                                                            <Text style={[styles.totalAmountHeader]}>{itemx.services}</Text>
                                                                        </View>
                                                                        <View style={{flexDirection:'row'}}>
                                                                            <RupeeBlack width={RFValue(11)} height={RFValue(11)} style={{marginTop:7}}/>   
                                                                            <Text style={[styles.totalAmountHeader]}>{itemx.installment}</Text>
                                                                        </View>
                                                                    </View>
                                                                })
                                                             } 
                                                        </View>
                                                        <View style={[styles.otherColumBased]}>
                                                            <Text style={[styles.totalAmountHeader,{marginBottom:12,color:Colors.SecondaryColor}]}>Payment</Text>
                                                                {
                                                                    item.payments.map((itemx,indexx)=>{
                                                                        if(itemx.paid_via == 'razorpay'){
                                                                            return  <View key={indexx} style={[styles.paymentbox]}>
                                                                                <View style={{width:'70%',height:'100%' ,justifyContent:'flex-start', flexDirection:'row', alignItems:'flex-start', alignContent:'flex-start'}}>
                                                                                    <View>
                                                                                        <PaymentCard width={RFValue(22)} height={RFValue(22)}/>   
                                                                                    </View>
                                                                                    <View style={{marginLeft:6}}> 
                                                                                        <Text style={[styles.totalAmountHeader]}>Paid To MMH</Text>
                                                                                        <Text style={[styles.totalAmountHeader,{color:Colors.gray,fontSize:FontSize.xxp,fontWeight:FontWeight.regular}]}>{itemx.date}</Text>
                                                                                        <TouchableOpacity>
                                                                                            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.xxp,fontWeight:FontWeight.regular}}>Download invoice</Text>
                                                                                        </TouchableOpacity> 
                                                                                    </View> 
                                                                                </View>   
                                                                                <View style={{width:'30%',height:'100%', flexDirection:'row',justifyContent:'flex-end',alignContent:'center', alignItems:'center'}}>
                                                                                    <RupeeBlack width={RFValue(11)} height={RFValue(11)} style={{marginTop:6}}/>
                                                                                    <Text style={[styles.totalAmountHeader]}>{itemx.amount}</Text>
                                                                                </View>
                                                                            </View> 
                                                                             
                                                                        }
                                                                        if(itemx.paid_via != 'razorpay'){
                                                                            return <View key={indexx} style={[styles.paymentbox]}> 
                                                                                <View style={{width:'70%',height:'100%' ,justifyContent:'flex-start', flexDirection:'row'}}>
                                                                                    <View>
                                                                                        <PaymentUpi width={RFValue(22)} height={RFValue(22)}/>
                                                                                    </View>
                                                                                    <View style={{marginLeft:6}}>  
                                                                                        <Text style={[styles.totalAmountHeader]}>Paid To MMH</Text>
                                                                                        <Text style={[styles.totalAmountHeader,{fontSize:FontSize.xxp,fontWeight:FontWeight.regular}]}>{itemx.date}</Text>
                                                                                        <TouchableOpacity>
                                                                                            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.xxp,fontWeight:FontWeight.regular}}>Download invoice</Text>
                                                                                        </TouchableOpacity> 
                                                                                    </View>
                                                                                </View>   
                                                                                <View style={{width:'30%',height:'100%',flexDirection:'row',justifyContent:'flex-end',alignContent:'center', alignItems:'center'}}>
                                                                                    <RupeeBlack width={RFValue(11)} height={RFValue(11)} style={{marginTop:6}}/>
                                                                                    <Text style={[styles.totalAmountHeader]}>{itemx.amount}</Text>
                                                                                </View>
                                                                            </View> 
                                                                        }
                                                                    })
                                                                } 
                                                        </View> 
                                                        <View style={[styles.totalAmount,{borderBottomWidth:0}]}>
                                                                <Text style={[styles.totalAmountHeader,{fontSize:FontSize.h5}]}>Amount Due</Text>
                                                                <View style={{flexDirection:'row'}}>
                                                                    <RupeeBlack width={RFValue(13)} height={RFValue(13)} style={{marginTop:8}}/>
                                                                    <Text style={[styles.totalAmountHeader,{fontSize:FontSize.h5}]}>{item.amountDue}</Text>
                                                                </View>
                                                        </View>
                                                        {
                                                            item.amountDue != 0 &&(
                                                                <View style={[styles.totalAmount,{borderBottomWidth:0, justifyContent:'center', alignContent:'center', alignItems:'center'}]}>
                                                                    <TouchableOpacity onPress={()=>handlePayment(item.amountDue,item.orderCode,token)} style={{width:'50%',height:'70%',backgroundColor:Colors.PrimaryColor, justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:9 }}>
                                                                        <Text style={{fontSize:FontSize.p, color:'#ffffff'}}>Pay Now</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            )
                                                        }
                                                       
                                                </View>
                                            </View>
                                        </View> 
                                })
                            )
                        :
                        <>
                            <Loader/>
                        </>
                    }  
           </ScrollView> 
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        minHeight:300,
        backgroundColor:'#ffffff',
        borderRadius:9,
        elevation:3,
        padding:10
    },
    totalAmount:{
        width:'100%',
        height:70, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        alignContent:'center',
        borderBottomWidth:2,
        borderBottomColor:'#eee'
    },
    totalAmountHeader:{
        color:Colors.black,
        fontSize:FontSize.p,
        fontWeight:FontWeight.medium
    },
    otherColumBased:{
        width:'100%',
        minHeight:70,  
        flexDirection:'column',
        paddingTop:22,
        borderBottomWidth:2,
        borderBottomColor:'#eee'
    },
    otherColumBasedInner:{
        width:'100%',
        minHeight:60, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'flex-start',
        alignContent:'center', 
        paddingBottom:18
    },
    paymentbox:{
        width:'100%',
        height:90, 
        flexDirection:"row",
        justifyContent:'space-around',
        alignContent:'center',
        alignItems:'center'
    }
});

export default MyProjectPayment;