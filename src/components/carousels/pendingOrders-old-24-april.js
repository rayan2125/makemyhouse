import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import React,{memo, useState, useRef} from 'react';
 
const { width, height} = Dimensions.get("window");


import CTMButton from '../button';
import Colors from '../../utility/color';
import Images from '../../screens/utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize , { FontWeight } from '../../screens/utility/fonts';


// Start: icons
import PendingOrder from '../../../assets/images/icons/pendingOrder.svg'
import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg'
import {actuatedNormalize} from '../../utility/scaling';

import { RFValue } from 'react-native-responsive-fontsize';
// End: Icons
const PendingOrdersCarousel = (props) => {

  // active index 
  const [activeIndex, setActiveIndex] = useState(0);
 
  const flatListRef = useRef(null);
 
  const [isSignIN,setIsSignIN] = useState(false);
  const [isLoading,setIsLoading] = useState(false); 
   
  // signIN 
  const CreateAccountHandler = ()=>{
    console.log("SignINOTP Handler");
    setIsLoading(true);
    setIsSignIN(true)
    setTimeout(()=>{
      setIsLoading(false);
      setIsSignIN(false);
    },1200);
  } 
  

  return ( 
        <FlatList
        ref={flatListRef}
        data={props.data}
        keyExtractor={(item) => item.orderID}
        renderItem={({ item,index }) => (  
                <View key={item.orderID} style={styles.slide}> 
                    <View style={styles.InnerSlide}>

                      <View style={{flexDirection:'row',padding:10, paddingTop:0,justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}> 
                          <PendingOrder width={actuatedNormalize(38)} height={actuatedNormalize(38)}/>
                          <Text style={{marginLeft:12,color:Colors.SecondaryColor, fontSize:FontSize.h6, fontWeight:FontWeight.medium}}>{item.serviceTitle}</Text>
                      </View>
                      <View style={[styles.whiteSlip]}>
                          <View style={{width:'70%',paddingHorizontal:10}}>
                                <Text style={{color:Colors.gray,paddingVertical:6, fontSize:FontSize.p}}>Request ID - {item.orderID}</Text>
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
                          <CTMButton btnText="Continue & Pay Now" theme="default" marginBottom={true} functionType="createaccount" onPress={CreateAccountHandler} isLoading={isLoading} /> 
                      </View>  
                    </View> 
                </View>   
        )}
        horizontal
        showsHorizontalScrollIndicator={false}  
        />
    
  )
}

const styles = new StyleSheet.create({  
  slide:{
      width:width/1, 
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      padding:4, 
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
    paddingVertical:12 
  },
  whiteSlip:{
    width:'100%', 
    backgroundColor:"#ffffff",
    flexDirection:'row',
    justifyContent:'flex-start', 
  }
})
export default PendingOrdersCarousel