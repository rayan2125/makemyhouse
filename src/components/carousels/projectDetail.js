import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React,{memo, useState, useRef, useCallback, useEffect} from 'react';

 
import Colors from '../../screens/utility/color';
import FontSize,{FontWeight} from '../../screens/utility/fonts';
import Swiper from 'react-native-swiper'; 
 
import RupeeBlack from '../../../assets/images/icons/rupeeBlack.svg';
import RupeeColor from '../../../assets/images/icons/rupeeColor.svg';
// pendingPayment
import PendingPayment from '../../../assets/images/icons/pendingPayment.svg';

import ProgressBar from '../ProgressBar';
 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PendingPaymentCarousel = (props) => {
  const navigation = useNavigation(); 
  // active index 
  const [activeIndex, setActiveIndex] = useState(0);
 
  const flatListRef = useRef(null);   

  const navigationHander = async (data)=>{ 
    // AsyncStorage.removeItem('orderCodeMyProject');
    if(data && data.orderCode){
      console.log("navigationHander: ", data.orderCode); 
      AsyncStorage.setItem('orderCodeMyProject', data.orderCode); 

      setTimeout(() => {
        navigation.navigate('MyProjectPayment');
      },12); 
      // let url = `customer/mmhproject/billings/${projectId}?ordercode=${data.orderCode}`
      // await ApiService.Getapiheader(url)
      // .then(response=>{
      //   console.log(response);
      // })
      // .catch(error=>{
      //   console.log(error);
      // })
    }else{
      console.log("data not found.");
    }
  }
  // // props.data.map((item,index)=>{
  if(props.data&& props.data.length >0 ){
    return (
      <Swiper style={{ height: props.data.length == 1 ? 290 : 330 , marginBottom:0, pointerEvents: "box-none",  padding:0, marginTop:0}} 
        loop={false}
        useNativeDriver={false}
        animated={true}  showsPagination={true} pagingEnabled={true}
        bounces={true} removeClippedSubviews={true}  
        onIndexChanged={(index) => {setActiveIndex(index); console.log(index)}}
        dot={<View style={{backgroundColor:Colors.lightGray, width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 22, marginBottom: 3,}} />}
        activeDot={<View style={{backgroundColor:Colors.PrimaryColor, width: 12, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 22, marginBottom: 3,}} />}
      >   
       {
        props.data.map((item,index)=>{
          return ( 
            <TouchableOpacity activeOpacity={0.96} key={index} style={{height:280, width:'100%', padding:12, position:'relative'}} onPress={()=>navigationHander(item)}> 
                <View style={{width:'100%',height:40,backgroundColor:Colors.SecondaryColor,borderRadius:12,top:8 , position:'absolute', left:12}}></View>
                <View style={{width:'100%', height:'100%', backgroundColor:'#ffffff', borderRadius:12, shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,elevation: 3,padding:12,elevation:3}}>  
                      <View style={styles.upperSection}>
                          <Text style={[styles.upperSText]}>{item.orderCode}</Text>
                          <Text style={[styles.upperSText]}>{item.createdAt}</Text>
                      </View>
                      <Text style={styles.SiteNAme}>{item.serviceTitle}</Text>
                      <View style={styles.PricingSection}>
                            <View style={styles.pricingIconsSection}>
                                  <View style={[styles.iconBox,{justifyContent:'center', alignContent:'center',alignItems:'center'}]}>
                                      <PendingPayment width={55} height={55}/>
                                  </View>
                            </View>
                            <View style={[styles.pricingTextSection,{ paddingVertical:4}]}>
                                <Text style={{color:'#00000072', fontSize:FontSize.xp, fontWeight:'400',}}>Received</Text>        
                                <View style={[styles.pricingBoxWithBar]}> 
                                          <View style={{flexDirection:'row', justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                                            <RupeeColor width={24} height={24} style={{marginTop:4,fontWeight:FontWeight.medium}}/>
                                            <Text style={{fontSize:FontSize.h1, fontWeight:FontWeight.medium,color:Colors.SecondaryColor}}>{item.totalReceivedAmount}</Text>
                                          </View> 
                                          <View style={{width:"100%", height:40,  justifyContent:'center', alignItems: 'flex-start',alignContent:'center', position: 'relative',}}>
                                              <ProgressBar totalAmount={item.totalPayableAmount} progressAmount={item.totalReceivedAmount} />
                                          </View> 
                                          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                            <Text style={{color:'#00000072', fontSize:FontSize.p, fontWeight:'400',}}>Total Amount</Text>      
                                            <View  style={{flexDirection:'row', justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>   
                                              <RupeeBlack width={14} height={14} style={{marginTop:4,fontWeight:FontWeight.medium, marginRight:4}}/>
                                              <Text style={{color:'#00000072', fontSize:FontSize.p, fontWeight:'400',}}>{item.totalPayableAmount}</Text>     
                                            </View> 
                                          </View> 
                                          
                                  </View> 
                            </View>
                      </View> 
                      
                      {
                        item.paymentStatus != item.totalPayableAmount && ( 
                          <View style={{width:'100%', height:30, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <Text style={{color:Colors.black, fontSize:FontSize.xp, fontWeight:'400', textAlign:'center'}}>This Services is {item.paymentStatus}</Text>
                          </View>
                        )
                      } 

                </View>
            </TouchableOpacity> 
          )
        })
       } 
    </Swiper>  
    )
  }
  return(
    <View style={styles.slide}>
        <View style={{ width:'100%',height:290, backgroundColor:Colors.lighteshGray, borderRadius:12, }}></View>
    </View>  
  )
}

const styles = new StyleSheet.create({  
  slide:{ 
    width:'100%',
    height:300,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    padding:4,
    position:'relative',  
},
InnerSlideShadonw:{ 
  width:'96%',
  height:50,
  position:'absolute',
  top:18,
  backgroundColor:Colors.SecondaryColor,
  borderRadius:12,   
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
},
upperSection:{
  width:'100%',
  height:"10%", 
  flexDirection:'row',
  justifyContent:'space-between',
  alignContent:'center',
  alignItems:'center', 
},
upperSText:{
  fontSize:FontSize.xxp,
  fontWeight:FontWeight.medium,
  color:Colors.TextColor,
  color:'#767272' 
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
  alignItems:'center', 
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