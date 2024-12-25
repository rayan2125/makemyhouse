import React, { useEffect, useState, useCallback } from 'react';

import {View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, Image, FlatList, ScrollView} from 'react-native';
import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation  } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { clearallinit } from '../../redux';
import Images from '../utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

const {width, height} = Dimensions.get('window'); 

// auth firebase 
// import auth from '@react-native-firebase/auth';

import ApiService from '../../ApiServices'; 

import { useFocusEffect } from '@react-navigation/native';

const More = ()=>{

    const  navigation = useNavigation();  
    const dispatch = useDispatch(); 

    const [logoutState,setlogoutState] = useState(false);

    const logoutHandler = ()=>{
        setlogoutState(logoutState==true?false:true);   
    }
    const logout = ()=>{  
        dispatch(clearallinit({
            isLoggedIn:false,
            token:""
        }));
        AsyncStorage.removeItem('UserToken');
        AsyncStorage.clear();
        navigation.navigate('AuthStack',{screen:"SignIn"});
        setlogoutState(false);
        // auth().signOut().then(function() {
        //     // Sign-out successful.
        //     AsyncStorage.clear();
        //     console.log("----------_-------------------------------------------------")
        //     console.log("----------_-------------------------------------------------")
        //     console.log("----------_-------------------------------------------------")
        //     dispatch(clearallinit({
        //         isLoggedIn:false,
        //         token:""
        //     }));
        //     navigation.navigate('AuthStack',{screen:"SignIn"});
        //   }).catch(function(error) {
        //     // An error happened.
        //     console.log("when press on signout screen.",error)
        //   });
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

    useFocusEffect(
        useCallback(() => { 
            const profileDetailsFunc = async()=>{
                let url = '/customer/me';
                await ApiService.Getapiheader(url)
                .then(response=>{
                    if(response ){
                        // console.log("profile details: ",{
                        //     firstname:response.firstname ,
                        //     response
                        // });
                        setProfileDetails(response);
                    }else{
                        console.log("profile details: error")
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            }
            profileDetailsFunc(); 
          return () => { 
            console.log('Screen went out of focus');  
          };
        }, [])
    ); 

    // useEffect(()=>{
    //     const profileDetailsFunc = async()=>{
    //         let url = '/customer/me';
    //         await ApiService.Getapiheader(url)
    //         .then(response=>{
    //             if(response ){
    //                 console.log("profile details: ",{
    //                     firstname:response.firstname ,
    //                     response
    //                 });
    //                 setProfileDetails(response);
    //             }else{
    //                 console.log("profile details: error")
    //             }
    //         })
    //         .catch(error=>{
    //             console.log(error);
    //         })
    //     }
    //     profileDetailsFunc(); 
    // },[navigation]);



    return (
        <View style={styles.container}>
            {/* <Text style={{color:'#000'}}>More</Text>
            <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor, padding:12,justifyContent:'center',alignContent:'center', alignItems:'center',marginVertical:12}}
                onPress={logout}
            >
                <Text style={{color:Colors.white,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:FontWeight.medium}}>Logout</Text>
            </TouchableOpacity> */}
          
           <View style={styles.backgroundImage}>
                <View style={{width:width, height:70, backgroundColor:'red', justifyContent:'center', alignItems:'center',alignContent:'center', backgroundColor:Colors.SecondaryColor}}>
                    <Text style={{fontSize:FontSize.h4, fontWeight:FontWeight.medium, color:"#ffffff"}}>Menu</Text>
                </View>
                <View style={styles.profileSectionName}>
                            <View style={{width:120, height:120, justifyContent:'center',alignContent:'center',alignItems:'center',  marginBottom:8,}}>
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

                <View style={{width:'100%', height:'70%', backgroundColor:'#ffffff', padding:12, borderTopLeftRadius:66}}>
                    <View style={{width:'100%', height:50, backgroundColor:'transparent'}}></View>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={[styles.MoreButtons,{marginTop:0}]} onPress={()=>navigation.navigate('MyProject')}>
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
                                    <TouchableOpacity style={[styles.MoreButtons]} onPress={logoutHandler}>
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
                                    <View style={{height:110, backgroundColor:'transparent'}}>
                                        </View>
                    </ScrollView>
                </View>

                <Modal animationType="slide" transparent={true} visible={logoutState}>     
                        <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                            <TouchableOpacity style={{ backgroundColor:'transparent', width: '100%', height: "30%" }}  onPress={()=>setlogoutState(false)}>
                            <View  ></View>
                            </TouchableOpacity>
                            <View style={{width:'100%', maxHeight:360, backgroundColor:'transparent', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                                <View style={{width:'90%', height:"88%", backgroundColor:'#ffffff', borderRadius:12,padding:12, elevation:4, flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:FontSize.h3, fontWeight:'600', color:'#000000'}}>Are you sure?</Text>
                                    <Text style={{fontSize:FontSize.p, fontWeight:'400',color:'#141414', marginTop:6}}>Are you sure you want to logout</Text>
                                    <Text style={{fontSize:FontSize.xp, fontWeight:'400', color:'#141414',marginTop:1,marginBottom:15}}>This action cannot be undone</Text>
                                    <TouchableOpacity onPress={logout} style={{marginVertical:12, backgroundColor:"#EF4444", width:'70%', height:40, justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:12, borderWidth:2,borderColor:'#EF4444'}}>
                                        <Text style={{color:'#ffffff', fontSize:FontSize.xxp, fontWeight:FontWeight.medium, }}>Logout</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={logoutHandler} style={{ backgroundColor:"#ffffff", width:'70%', height:40, justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:12, borderWidth:2,borderColor:Colors.lightGray}}>
                                        <Text style={{color:Colors.gray, fontSize:FontSize.xxp, fontWeight:FontWeight.medium, }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View> 
                            </View>
                        </View>      
                </Modal>
 
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    contentBlock:{
        width:'100%',
        height:'70%',
        backgroundColor:'#ffffff',
        borderTopLeftRadius:90, 
    },
    profileSectionName:{
        width:'100%',
        height:'30%', 
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },

	container: { 
        flex:1, 
        backgroundColor:'#ffffff',
        padding:0,
        margin:0 ,
        flexDirection:'column'
	},
    backgroundImage:{ 
        width:width ,
        height:height-70,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center',
        // paddingLeft:12,
        // paddingRight:12,
        backgroundColor:'#D3EDD7'
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