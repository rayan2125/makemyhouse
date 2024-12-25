import React, { useEffect, useState } from 'react';

import {View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, Image} from 'react-native';
import Colors from '../../utility/color';
import FontSize, { FontWeight } from '../../utility/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearallinit } from '../../redux';

import Images from '../../utility/images'; 
import {actuatedNormalizeVertical} from '../../utility/scaling';
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

const {width, height} = Dimensions.get('window'); 

// auth firebase 
// import auth from '@react-native-firebase/auth';

import ApiService from '../../ApiServices';

const More = ()=>{

    const  navigation = useNavigation();  
    const dispatch = useDispatch(); 

    const logout = ()=>{  
        auth().signOut().then(function() {
            // Sign-out successful.
            AsyncStorage.clear();
            console.log("----------_-------------------------------------------------")
            console.log("----------_-------------------------------------------------")
            console.log("----------_-------------------------------------------------")
            dispatch(clearallinit({
                isLoggedIn:false,
                token:""
            }));
            navigation.navigate('AuthStack',{screen:"SignIn"});
          }).catch(function(error) {
            // An error happened.
            console.log("when press on signout screen.",error)
          });
        // navigation.navigate('AuthStack',{screen:"SignIn"});
        // auth().signOut()
        // .then(()=>{
        //     console.log("auth().signOut()");
        //     AsyncStorage.clear();
        //     dispatch(clearallinit({
        //         isLoggedIn:false,
        //         token:""
        //     }));
        //     // navigation.navigate('AuthStack',{screen:"SignIn"});
        //     // navigation.navigate('FirstTimeSser', { screen: 'SelectSite', params:{fromPage:'home'} });
        // })
        // .catch(error=>{
        //     console.log("Firebase logout error: ", error);
        // }) 
    }   

    // start: get user details 
    const [userDetails,setUserDetails] = useState('');  
    useEffect(()=>{
        const userDetailsFunc = ()=>{

        } 
        userDetailsFunc();  
    },[]);
    // end: get user details

    const [profileDetails,setProfileDetails] = useState(''); 
    useEffect(()=>{
        const profileDetailsFunc = async()=>{
            let url = '/customer/me';
            await ApiService.Getapiheader(url)
            .then(response=>{
                if(response){
                    console.log("profile details: ",{
                        firstname:response.firstname ,
                        response
                    });
                    setProfileDetails(response);
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }
        profileDetailsFunc();
    },[]);


    return (
        <View style={styles.container}>
            {/* <Text style={{color:'#000'}}>More</Text>
            <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor, padding:12,justifyContent:'center',alignContent:'center', alignItems:'center',marginVertical:12}}
                onPress={logout}
            >
                <Text style={{color:Colors.white,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:FontWeight.medium}}>Logout</Text>
            </TouchableOpacity> */}
          
           <ImageBackground style={styles.backgroundImage}  source={Images.BackgroundMore}>
           <View style={{width:width, height:70, backgroundColor:'red', justifyContent:'center', alignItems:'center',alignContent:'center', backgroundColor:Colors.SecondaryColor}}>
                <Text style={{fontSize:FontSize.h4, fontWeight:FontWeight.medium, color:"#ffffff"}}>Menu</Text>
            </View>
                <View>
                    <View style={[styles.usersection]}>
                            <View style={{width:120, height:120, justifyContent:'center',alignContent:'center',alignItems:'center',  marginBottom:12}}>
                                    <AutoHeightImage
                                        width={100}  
                                        resizeMode="contain"
                                        source={Images.Moreuser}
                                    /> 
                            </View>
                            
                            {
                                profileDetails != ''?
                                <Text style={{fontSize:FontSize.h4, fontWeight:FontWeight.medium, color:"#000000"}}>{profileDetails.firstname}</Text>
                                :
                                <Text style={{fontSize:FontSize.h4, fontWeight:FontWeight.medium, color:"#000000"}}>...</Text>
                            }
                    </View>
                    <View style={[styles.buttons_section]}>
                            <TouchableOpacity style={[styles.MoreButtons]} onPress={()=>navigation.navigate('MyProject')}>
                                <View style={[styles.MoreButtonSection]}>   
                                    <AutoHeightImage
                                        width={28}  
                                        resizeMode="contain"
                                        source={Images.MoreMyProject}
                                    />
                                </View>
                                <View style={[styles.MoreButtonSectionMiddle]}> 
                                    <Text style={[styles.MoreText]}>My project</Text>
                                </View>
                                <View style={[styles.MoreButtonSection]}> 
                                    <AutoHeightImage
                                        width={28}  
                                        resizeMode="contain"
                                        source={Images.MoreRightArrow}
                                    />
                                </View> 
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.MoreButtons]}>
                                <View style={[styles.MoreButtonSection]}>   
                                    <AutoHeightImage
                                        width={26}  
                                        resizeMode="contain"
                                        source={Images.MoreSupport}
                                    />
                                </View>
                                <View style={[styles.MoreButtonSectionMiddle]}> 
                                    <Text style={[styles.MoreText]}>Support</Text>
                                </View>
                                <View style={[styles.MoreButtonSection]}> 
                                    <AutoHeightImage
                                        width={26}  
                                        resizeMode="contain"
                                        source={Images.MoreRightArrow}
                                    />
                                </View> 
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.MoreButtons]}  onPress={()=>navigation.navigate('LanguageScreen')}>
                                <View style={[styles.MoreButtonSection]}>   
                                    <AutoHeightImage
                                        width={26}  
                                        resizeMode="contain"
                                        source={Images.MoreLanguage}
                                    />
                                </View>
                                <View style={[styles.MoreButtonSectionMiddle]}> 
                                    <Text style={[styles.MoreText]}>Language</Text>
                                </View>
                                <View style={[styles.MoreButtonSection]}> 
                                    <AutoHeightImage
                                        width={26}  
                                        resizeMode="contain"
                                        source={Images.MoreRightArrow}
                                    />
                                </View> 
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.MoreButtons]} >
                                <View style={[styles.MoreButtonSection]}>   
                                    <AutoHeightImage
                                        width={24}  
                                        resizeMode="contain"
                                        source={Images.MoreAbout}
                                    />
                                </View>
                                <View style={[styles.MoreButtonSectionMiddle]}> 
                                    <Text style={[styles.MoreText]}>About</Text>
                                </View>
                                <View style={[styles.MoreButtonSection]}> 
                                    <AutoHeightImage
                                        width={24}  
                                        resizeMode="contain"
                                        source={Images.MoreRightArrow}
                                    />
                                </View> 
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.MoreButtons]} onPress={logout}>
                                <View style={[styles.MoreButtonSection]}>   
                                    <AutoHeightImage
                                        width={24}  
                                        resizeMode="contain"
                                        source={Images.MoreLogout}
                                    />
                                </View>
                                <View style={[styles.MoreButtonSectionMiddle]}> 
                                    <Text style={[styles.MoreText]}>Log Out</Text>
                                </View>
                                <View style={[styles.MoreButtonSection]}> 
                                    <AutoHeightImage
                                        width={24}  
                                        resizeMode="contain"
                                        source={Images.MoreRightArrow}
                                    />
                                </View> 
                            </TouchableOpacity>
                            
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
	container: { 
        flex:1, 
        backgroundColor:'#ffffff',
        padding:0,
        margin:0 ,
        flexDirection:'column'
	},
    backgroundImage:{ 
        width:width ,
        height:height,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center',
        paddingLeft:14,
        paddingRight:14
    }, 
    usersection:{
        width:width,
        height:height/4, 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',  
    }, 
    buttons_section:{
        width:width,
        height:height, 
        padding:12, 
        paddingTop:110,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center'
    }, 
    MoreButtons:{
        width:'100%',
        height:60,
        backgroundColor:'#ffffff',
        borderRadius:3,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        elevation:6, 
        marginBottom:18
    },
    MoreButtonSection:{
        width:'20%',
        height:60, 
        borderRadius:3,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },  
    MoreButtonSectionMiddle:{
        width:'60%',
        height:60, 
        borderRadius:3,  
        padding:12,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'flex-start'
    }, 
    MoreText:{
        fontSize:FontSize.h6,
        fontWeight:FontWeight.medium,
        color:Colors.SecondaryColor,
        margin:0
    } 
});
export default More;