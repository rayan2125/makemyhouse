import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React,{memo, useState, useRef, useCallback} from 'react';
 
const { width, height} = Dimensions.get("window");


import CTMButton from '../../components/button';
import Colors from '../../utility/color';


import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize , { FontWeight } from '../../screens/utility/fonts';

// Start: icons
import PendingOrder from '../../../assets/images/icons/pendingOrder.svg'; 
import {actuatedNormalize} from '../../utility/scaling';
 
import Swiper from 'react-native-swiper';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import RupeeLight from '../../../assets/images/icons/rupeeWhite.svg';
import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg';
import RupeeColor from '../../../assets/images/icons/rupeeColor.svg';
// pendingPayment
import PendingPayment from '../../../assets/images/icons/pendingPayment.svg';

import ProgressBar from '../ProgressBar';

// End: Icons
const PendingPaymentCarousel = (props) => {

  // active index 
  const [activeIndex, setActiveIndex] = useState(0);
  

  return ( 
    <Swiper style={{ height:330, marginBottom:0, pointerEvents: "box-none"}} 
      loop={false}
      useNativeDriver={false}
      animated={true}  showsPagination={true} pagingEnabled={true}
      bounces={true} removeClippedSubviews={true}  
      onIndexChanged={(index) => setActiveIndex(index)}
      dot={<View style={{backgroundColor:Colors.lightGray, width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 22, marginBottom: 3,}} />}
      activeDot={<View style={{backgroundColor:Colors.PrimaryColor, width: 12, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 22, marginBottom: 3,}} />}
    >
          {
              props.data&&
              (props.data.length > 0? 
                (
                  props.data.map((item,index)=>{
                    return(
                      <View key={index} style={styles.slide}> 
                            <View style={styles.InnerSlide}>
                              <View style={styles.upperSection}>
                                  <Text style={[styles.upperSText]}>V20202205020004 </Text>
                                  <Text style={[styles.upperSText]}>05 Feb 2024</Text>
                              </View>
                              <Text style={styles.SiteNAme}>Architectural Designing Services</Text>
                              <View style={styles.PricingSection}>
                                  <View style={styles.pricingIconsSection}>
                                      <View style={[styles.iconBox,{justifyContent:'center', alignContent:'center',alignItems:'center'}]}>
                                          <PendingPayment width={55} height={55}/>
                                      </View>
                                  </View>
                                  <View style={styles.pricingTextSection}>
                                    <Text style={{color:Colors.lightGray, fontSize:FontSize.xp, fontWeight:'500',}}>Received</Text>        

                                    <View style={styles.pricingBoxWithBar}> 
                                          <View style={{flexDirection:'row', justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                            <RupeeColor width={24} height={24} style={{marginTop:4,fontWeight:FontWeight.medium}}/>
                                            <Text style={{fontSize:FontSize.h1, fontWeight:FontWeight.medium,color:Colors.SecondaryColor}}>18,000</Text>
                                          </View>
                                          {/* <View style={{width:"100%", height:40,  justifyContent:'center', alignItems: 'flex-start',alignContent:'center', position: 'relative',}}>
                                              <View style={[styles.barActive,{width:'70%'}]}></View>
                                              <View style={styles.bar}></View>
                                          </View> */}
                                          <View style={{width:"100%", height:40,  justifyContent:'center', alignItems: 'flex-start',alignContent:'center', position: 'relative',}}>
                                              <ProgressBar totalAmount={1200} progressAmount={1100} />
                                          </View> 
                                    </View> 

                                    <View style={styles.totalPricing}>
                                      <Text style={{color:Colors.gray, fontSize:FontSize.p, fontWeight:'500',}}>Total</Text>      
                                      <View  style={{flexDirection:'row', justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>   
                                        <RupeeBlack width={14} height={14} style={{marginTop:4,fontWeight:FontWeight.medium, marginRight:4}}/>
                                        <Text style={{color:Colors.gray, fontSize:FontSize.p, fontWeight:'500',}}>20,000</Text>     
                                      </View> 
                                    </View> 
                                  </View> 
                              </View>
                              <Text style={{color:Colors.lightGray, fontSize:FontSize.xxp, fontWeight:'500', textAlign:'center'}}>This Services is Partially Paid</Text>
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
      padding:4
  },
  InnerSlide:{ 
    width:'96%',
    height:260,
    backgroundColor:'#ffffff',
    borderRadius:12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    padding:12,
    elevation:3,
    position:'relative'  
  },
  upperSection:{
    width:'100%',
    height:"15%", 
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center'
  },
  upperSText:{
    fontSize:FontSize.xxp,
    fontWeight:FontWeight.medium,
    color:Colors.TextColor
  }, 
  SiteNAme:{
    fontSize:FontSize.h6,
    fontWeight:FontWeight.medium,
    color:Colors.SecondaryColor,
    marginBottom:9
  },  
  PricingSection:{
    width:'100%',
    height:'60%', 
    marginBottom:6,
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  pricingIconsSection:{
    width:'30%',
    height:'100%', 
    justifyContent:'center',
    alignItems: 'center',
    alignContent:'center'
  },
  iconBox:{
    width:'85%',
    height:'85%',
    backgroundColor:'#fff',
    borderRadius:9,
    elevation:3
  },
  pricingTextSection:{
    width:'70%',
    height:'100%', 
    paddingHorizontal:8,
  },
  totalPricing:{
    width:'100%',
    height:30, 
    position:'relative' ,
    flexDirection:'row',
    justifyContent:"space-between",
    alignContent:'center',
    alignItems:'center' 
  },
  pricingBoxWithBar:{
    width:"100%",
    height:80, 
    flexDirection:'column',
    marginVertical:6
  },
  bar:{
    width:'100%',
    height:20,
    backgroundColor:'#eee',
    borderRadius:12
  },
  barActive:{ 
    height:20,
    backgroundColor:Colors.SecondaryColor,
    position:'absolute',
    zIndex:99,
    borderRadius:12
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
export default PendingPaymentCarousel