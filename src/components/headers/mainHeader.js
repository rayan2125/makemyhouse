import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { actuatedNormalizeVertical ,actuatedNormalize} from '../../screens/utility/scaling';
import Colors from '../../screens/utility/color';


import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize from '../../screens/utility/fonts';


const {width, height} = Dimensions.get('window'); 
import { useNavigation,useNavigationState  } from '@react-navigation/native';


// Start: icons 
import Logo from '../../../assets/images/logo.svg'; 
import ArrowDownLight from '../../../assets/images/icons/arrowDownLight.svg';
import SearchIcon from '../../../assets/images/icons/searchIconLight.svg';
import UserIcon from '../../../assets/images/icons/userIcon.svg'
import LocationLight from '../../../assets/images/icons/locationLight.svg'

// end: icons
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import ApiService from '../../ApiServices';

const MainHeader = () => {
    const  navigation = useNavigation();  
    const [sitename,setSiteName] = useState('...'); 

    useFocusEffect(
        React.useCallback(() => {
            function shortenString(str) {
                if (str.length > 15) {
                  return str.substring(0, 15) + '...';
                }
                return str;
            }
            AsyncStorage.getItem('siteName',(err,creds)=>{
                if(creds != null){ 
                    console.log("siteName", creds); 
                    
                    setSiteName(shortenString(creds));  
                }else{
                    setSiteName('...');
                }
            });
            return;
        }, []),
    );  
    
   return ( 
        <View style={styles.container}>
            <View style={[styles.Box,{flexDirection:'row',justifyContent:'flex-start'}]}>
                <TouchableOpacity activeOpacity={0.91} style={{flexDirection:'row'}} onPress={()=>{ 
                AsyncStorage.removeItem('fromPackageScreen');
                //navigation.navigate('SelectSite'); 
                navigation.navigate('FirstTimeSser', { screen: 'SelectSite', params:{fromPage:'home'} });

                }}>
                    <View>
                        {/* <AutoHeightImage
                            width={16}
                            maxHeight={16}
                            resizeMode="contain"
                            source={Images.LocationIcon}
                        />         */}
                        <LocationLight width={actuatedNormalize(16)} height={actuatedNormalize(16)}/> 
                    </View>
                    <View style={{marginLeft:4}}>
                        <View style={{flexDirection:'row',justifyContent:'flex-start', alignContent:'center',alignItems:'center'}}>   
                            <Text style={{color:Colors.white, fontSize:FontSize.xxp}}>Site</Text> 
                            <ArrowDownLight width={actuatedNormalize(12)}  />
                        </View> 
                        <View style={{flexDirection:'row',justifyContent:'flex-start', alignContent:'center',alignItems:'center'}}>   
                            <Text style={{color:Colors.white, fontSize:FontSize.xxp}}>
                                {sitename}
                            </Text> 
                        </View> 
                    </View>
                </TouchableOpacity> 
            </View>
            <View style={styles.Box}> 
                <Logo  width={actuatedNormalize(110)} />
            </View>
            <View style={[styles.Box,{flexDirection:'row',justifyContent:'flex-end'}]}>
                {/* <TouchableOpacity activeOpacity={0.60}> 
                        <SearchIcon width={actuatedNormalize(18)} height={actuatedNormalize(18)}/>
                </TouchableOpacity> */}
                <TouchableOpacity activeOpacity={0.60} style={{marginLeft:12}} onPress={()=>{ navigation.navigate('MyProfile'); }}> 
                        <UserIcon width={actuatedNormalize(18)} height={actuatedNormalize(18)}/>
                </TouchableOpacity>
            </View>
        </View> 
   )
}
 
const styles = new StyleSheet.create({
    container:{
        width:width,
        height:actuatedNormalizeVertical(75),
        backgroundColor:Colors.SecondaryColor,
        flexDirection:'row',
        justifyContent:'center', 
        alignContent:'center',
        alignItems:'center'
    },
    Box:{
        width:width/3,
        height:'100%', 
        justifyContent:'center', 
        alignContent:'center',
        alignItems:'center',
        paddingHorizontal:8
    }
});

export default MainHeader