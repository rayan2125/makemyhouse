import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { actuatedNormalizeVertical } from '../../screens/utility/scaling';
import Colors from '../../screens/utility/color';
import Images from '../../screens/utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component



const {width, } = Dimensions.get('window'); 

import ButtonNotActive from '../button/ButtonNotActive';


import RupeeLight from '../../../assets/images/icons/rupeeWhite.svg';



// CTM Button 
import CTMButton from "../button/index"
import { useNavigation,} from '@react-navigation/native';
const MainFooter = (props) => {
    const  navigation = useNavigation();  
   // 
   const [isLoadingAddNewSite,setIsLoadingAddNewSite] = useState(false);

   const NavigateToAddNewSite = ()=>{
    console.log("navigate to add new site");
    setIsLoadingAddNewSite(true); 
    setTimeout(()=>{
      setIsLoadingAddNewSite(false); 
    },1200);
   }

   // continue btn 
   const [isLoadingContinue,setIsLoadingContinue] = useState(false);
   // navigation Hander 
   const NavigationHander = ()=>{ 
        setIsLoadingContinue(true); 
        setTimeout(()=>{
            setIsLoadingContinue(false); 
        },1200);
   }

   // open close handler 
   const  OpenCloseHandler = ()=>{
        props.onPress(true);
   }
 
  return ( 
    <View style={[
            styles.container,
            props.theme == 'light'&&{backgroundColor:Colors.white},
            props.theme == 'dark'&&{backgroundColor:Colors.SecondaryColor},
            props.themeType ==1 ? {height:actuatedNormalizeVertical(80) }:{}
        ]}
    >

        {/* themeType == 1 // have two button */}
        {
            props.themeType == 1?
                <>
                    <View style={[styles.box]}>
                        <CTMButton btnText="Add New Site" marginBottom={false} theme="default" functionType="Add New Site" onPress={()=>{ props.isContinuetoHome == true? navigation.navigate('DetectLocation',{fromPage:"home"}) :  navigation.navigate('DetectLocation',{fromPage:"package"})}} isLoading={isLoadingAddNewSite} />
                    </View> 
                    <View style={[styles.box]}>
                        {
                            props.isContinueActive == true ? 
                                <CTMButton btnText="Continue" marginBottom={false} theme="dark" functionType="Continue" onPress={()=>{  props.isContinuetoHome == true?navigation.navigate('Home'): navigation.navigate('SiteDetails') }} isLoading={isLoadingContinue} />
                            :
                            <>
                                <ButtonNotActive btnText="Continue" marginBottom={false} theme="dark"   functionType="Continue" />
                            </>
                        }
                        
                    </View>
                </> 
            :null
        }

        {/* themeType == 2 // have some text with button */}
        {
            props.themeType == 2?
            <>
                <View style={{width:"100%",height:'100%' ,flexDirection:'row'}}>
                    <View style={{width:'50%',flexDirection:'row',justifyContent:'flex-start',alignContent:'center',alignItems:'center'}}>
                        
                        
                        <RupeeLight width={16} height={16} style={{marginTop:4}}/> 
                        <Text style={{fontSize:22,fontWeight:'600',marginHorizontal:6,color:"#ffffff"}}>{props.totalPriceP}</Text>
                        
                        <TouchableOpacity style={{marginLeft:2,marginTop:4}} onPress={()=>OpenCloseHandler()}  >
                            <AutoHeightImage
                                width={16}
                                maxHeight={16}
                                resizeMode="contain"
                                source={Images.iIconLight}
                            /> 
                        </TouchableOpacity>
                    </View>
                    {/* <View style={[styles.box,{width:'50%'}]}>
                        <CTMButton btnText="Continue" marginBottom={false} theme="default" functionType="Continue" onPress={()=>{ props.CheckOut == true?navigation.navigate('CheckOutWebView'):navigation.navigate('CheckOut')}} isLoading={isLoadingContinue} />
                    </View> */}

                    {
                        props.termsAccept == true?
                        <View style={[styles.box,{width:'50%'}]}> 
                            
                            <CTMButton btnText="Continue" marginBottom={false} theme="default" functionType="Continue" onPress={()=>{ props.CheckOut == true? props.checkoutFnc() : navigation.navigate('CheckOut')}} isLoading={props.isLoadingCutton} />

                        </View>
                        :
                        <View style={[styles.box,{width:'50%'}]}>
                            <ButtonNotActive btnText="Continue" marginBottom={false} theme="dark" functionType="Continue"/>
                        </View>
                    }

                </View>
            </>
            :
            <></>
        }
        
    </View> 
  )
}
 
const styles = new StyleSheet.create({
    container:{
        width:width,
        height:actuatedNormalizeVertical(65), 
        flexDirection:'row',
        justifyContent:'space-between', 
        alignContent:'center',
        alignItems:'center', 
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        paddingHorizontal:10, 
    }, 
    box:{
        width:'49%',height:'100%',
        justifyContent:'center',alignContent:'center',alignItems:'center'
    }
});

export default MainFooter;