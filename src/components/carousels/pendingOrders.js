import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React,{memo, useState, useRef, useCallback, useEffect} from 'react';
 
const { width, height} = Dimensions.get("window");


import CTMButton from '../../components/button';
import Colors from '../../screens/utility/color';


import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize from '../../screens/utility/fonts';

// Start: icons
import PendingOrder from '../../../assets/images/icons/pendingOrder.svg'
import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg'
import { actuatedNormalize } from '../../screens/utility/scaling'; 

import { RFValue } from 'react-native-responsive-fontsize'; 
import Swiper from 'react-native-swiper';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
 
import GlobalData from '../../screens/utility/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useNavigationState  } from '@react-navigation/native';

// End: Icons
const PendingOrdersCarousel = (props) => {
  const  navigation = useNavigation(); 
  // active index 
  const [activeIndex, setActiveIndex] = useState(0);
 
  const flatListRef = useRef(null);
 
  const [isSignIN,setIsSignIN] = useState(false);
  const [isLoading,setIsLoading] = useState(false);  
   
  // signIN 
  const pendingOrderHandler = async (orderid,dueAmount)=>{
    console.log("pending order Handler start",{
      orderid,
      dueAmount,
      token:props.token
    });
    AsyncStorage.removeItem("PaymentLink");
    setIsLoading(true);
    setIsSignIN(true)
    AsyncStorage.setItem("PaymentLink",`${GlobalData.LINKURL}payment-flow/?amount=${dueAmount}&orderid=${orderid}&token=${props.token}&source=app`);  
    console.log("data",`${GlobalData.LINKURL}payment-flow/?amount=${dueAmount}&orderid=${orderid}&token=${props.token}`); 
    setTimeout(()=>{ 
      navigation.navigate('CheckOutWebView'); 
      setIsLoading(false);
      setIsSignIN(false); 
    },100);  

  }    

  return ( 
    <Swiper style={{ height:320, marginBottom:0, pointerEvents: "box-none"}} 
      loop={false}
      useNativeDriver={false}
      animated={true}  showsPagination={true} pagingEnabled={true}
      bounces={true} removeClippedSubviews={true}  
      onIndexChanged={(index) => setActiveIndex(index)}
      dot={<View style={{backgroundColor:Colors.lightGray, width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, }} />}
      activeDot={<View style={{backgroundColor:Colors.PrimaryColor, width: 12, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3,}} />}
    >
          {
              props.data&&
              (props.data.length > 0? 
                (
                  props.data.map((item,index)=>{
                    return(
                      <View key={item.orderID} style={styles.slide}> 
                          <View style={styles.InnerSlide}>

                            <View style={{flexDirection:'row',padding:10, paddingTop:0,justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}> 
                                <PendingOrder width={actuatedNormalize(38)} height={actuatedNormalize(38)}/>
                                <Text style={{marginLeft:12,color:Colors.SecondaryColor, fontSize:FontSize.h6,fontFamily: 'Inter-SemiBold'}}>{item.serviceTitle}</Text>
                            </View>
                            <View style={[styles.whiteSlip]}>
                                <View style={{width:'70%',paddingHorizontal:10}}>
                                      <Text style={{color:Colors.gray,paddingVertical:6, fontSize:FontSize.p,fontFamily: 'Inter-Regular'}}>Request ID - {item.orderID}</Text>
                                </View>
                                <View style={{width:'30%', flexDirection:'row', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                      <RupeeBlack width={RFValue(11)} height={RFValue(11)}/>
                                      <Text style={{color:Colors.gray,marginLeft:2, fontSize:FontSize.p}}>{item.projectCost}</Text>
                                </View>
                            </View>
                            <View style={[styles.whiteSlip,{backgroundColor:'transparent',marginBottom:16}]}>
                                <View style={{width:'70%',paddingHorizontal:10}}>
                                      <Text style={{color:Colors.gray,paddingVertical:6, fontSize:FontSize.xp}}>Status</Text>
                                      <Text style={{color:Colors.gray,paddingVertical:6, fontSize:FontSize.xp}}>{item.paymentStatus}</Text> 
                                </View>
                                <View style={{width:'30%'}}>
                                      <Text style={{color:Colors.gray,paddingVertical:6, fontSize:FontSize.xp}}>Request Date</Text>
                                      <Text style={{color:Colors.gray,paddingVertical:6, fontSize:FontSize.xp}}>{item.createdAt}</Text>
                                </View>
                            </View>
                            <View style={[styles.whiteSlip,{backgroundColor:'transparent',paddingHorizontal:12}]}>
                                <CTMButton btnText="Continue & Pay Now" theme="default" marginBottom={true} functionType="createaccount" onPress={()=>pendingOrderHandler(item.orderID,item.dueAmount)} isLoading={isLoading} /> 
                            </View>  
                          </View> 
                      </View>  
                    ) 
                  })
                ) 
                :<Text>No data</Text>)
          }  
    </Swiper> 
         
  )
}

const styles = new StyleSheet.create({  
  
  slide:{
      width:width / 1, 
      height:300,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      padding:4,
      paddingTop:0    
  },
  InnerSlide:{ 
    width:'96%',
    minHeight:160,
    backgroundColor:'#ECF3FF',
    borderRadius:12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    paddingVertical:12 , 
  },
  whiteSlip:{
    width:'100%', 
    backgroundColor:"#ffffff",
    flexDirection:'row',
    justifyContent:'flex-start', 
  },

  carousel: { 
    marginTop:20, 
    height:160, 
  }, 
 
  slideImage: { 
      width: windowWidth * 0.9, 
      height: 130, 
      borderRadius:12
  }, 
  slideFull: {
    height:250,
    width: windowWidth, 
    margin:0,
    padding:0, 
    justifyContent: "center",
    alignItems: "center",   
    position:'relative',
  },
  slideImageFull: { 
      width: windowWidth, 
      height: '100%', 
      borderRadius:0,
  },  
  pagination: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row", 
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: Colors.PrimaryColor,width:12 },
  paginationDotInactive: { backgroundColor: Colors.lightGray }  
})
export default PendingOrdersCarousel