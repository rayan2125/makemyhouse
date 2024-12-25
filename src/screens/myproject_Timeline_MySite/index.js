import { View, Text, ScrollView, StyleSheet ,Dimensions, Modal, TouchableOpacity, TextInput} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native';

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper';


// header 
import ScndHeader from '../../components/headers/scndHeader';
 //AutoHeightImage component
import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';
 
import { useNavigation,useNavigationState  } from '@react-navigation/native';

// notification 
import AnimatedMessage from '../../components/animatedNotification';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../../ApiServices';

import FormIcon from '../../../assets/images/icons/formIcon.svg';
import { actuatedNormalize } from '../utility/scaling';

import Loader from './loader';

const MyProjectMySite = (props)=>{
      // aimate notification 
      const [messages, setMessages] = useState([]);
      useEffect(()=>{
          // setTimeout(()=>{
          //   setMessages([]);
          // },2000); 
      },[messages]);
     const navigation = useNavigation(); 
     
    // start: Pending orders 
    const [myProjectDeails,setMyProjectDeails] = useState([]); 

    const [projectId,setProjectId] = useState(''); 
    const [siteId,setSiteId] = useState('');
    const [siteDetails,setSiteDetails] = useState(''); 

    const [plotId,setPlotId] = useState('');
    const [plotDetails,setPlotDetails] = useState(); 
     
    useFocusEffect(
        useCallback(  () => {
            AsyncStorage.getItem('projectIdNewTimeline',(err,creds)=>{
                console.log("storage",creds);
                setProjectId(creds);
                AsyncStorage.getItem('SelectedSite',(error,cre)=>{
                    setSiteId(cre)
                    getSiteDetails(cre);
                });
            })
            return () => { 
                 console.log("Project iD fetched");
            }
        }, []),
    ); 


    const getSiteDetails = (id)=>{ 
        let url = `customer/ConstructionSite?siteId=${parseInt(id)}`; 
        ApiService.Getapiheader(url)
        .then(response=>{
            if(response){
                console.log("----------------------", response.data.sites);  
                let responseData = response.data.sites[0];
                setSiteDetails(responseData);  
            }else{
                setMessages(['Something went wrong while getting the site details.']);
            }
        })
        .catch(error=>{
            console.log("----------------------",error);
            setMessages([`Error while getting the site details. ${error}`]);
        })
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
                Title="My Site" 
                Search={false} 
                Profile={false}  
                Back={true}
                BackScreen="" 
                Skip={false} 
                SkipStack=""
                SkipScreen="" 
            /> 
            <ScrollView style={{flex:1,padding:0,paddingHorizontal:0,marginTop:0}}>
                {/* Start: Site Details */}
                <View>
                    {/* <View style={[styles.DarkHeder,{marginTop:0}]}>
                        <Text style={{fontSize:FontSize.h4-1,color:Colors.SecondaryColor,fontWeight:FontWeight.medium}}>Apply Coupon Code </Text>
                    </View>     */}
                    {
                        siteDetails?
                    
                            <View style={{padding:10,marginTop:20,justifyContent:'center',alignContent:'center'}}>
                                <View style={[styles.boxFull,{marginBottom:10}]}>
                                    <View>
                                            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Site Address:</Text>
                                            <Text style={styles.uppertext}>{siteDetails.name}</Text>
                                    </View> 
                                </View>  
                                <Text style={{color:Colors.black,fontSize:FontSize.p,marginBottom:10}}>
                                    {siteDetails.address}
                                </Text>
                            </View> 
                        :
                        <Loader type="sitedetais" /> 
                    }
                    {/* Start: Site Address */}
                
                    {/* End: Site Address */}

                    <View style={{width:'100%',height:20,backgroundColor:'#E5E5E5'}}></View>

                    {/* Start: Site Specification:  */}
                    {
                        siteDetails?
                    
                        <View style={{padding:10, minHeight:10, marginTop:20, justifyContent:'center', alignContent:'center'}}>
                            <View style={[styles.boxFull,{marginBottom:24}]}>
                                <View>
                                        <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Site Specification:</Text>
                                        <Text style={styles.uppertext}>Edit Side Details by Clicking On edit button</Text>
                                </View> 
                            </View> 
                            {/* Start: Loop */}
                            <View style={styles.loop}>
                                <View style={styles.innerLoop}>
                                    <Text style={styles.uppertext}>Plot Shape:</Text>
                                    <Text style={styles.lowwertext}>{siteDetails.type}</Text>
                                </View>
                                <View style={styles.innerLoop}>
                                    <Text style={styles.uppertext}>Plot Area:</Text>
                                    <Text style={styles.lowwertext}>{siteDetails.plot_area} sq.ft</Text>
                                </View>
                            </View>  
                            <View style={styles.loop}>
                                <View style={styles.innerLoop}>
                                    <Text style={styles.uppertext}>Plot Width:</Text>
                                    <Text style={styles.lowwertext}>{siteDetails.width} feet</Text>
                                </View>
                                <View style={styles.innerLoop}>
                                    <Text style={styles.uppertext}>Number of Floor:</Text>
                                    <Text style={styles.lowwertext}>
                                        {
                                            siteDetails.floors == 1 ? "Ground Floor" : 
                                            siteDetails.floors == 2 ? "Ground Floor + 1 Floor" :
                                            siteDetails.floors == 3 ? "Ground Floor + 2 Floor" :
                                            siteDetails.floors == 4 ? "Ground Floor + 3 Floor" :
                                            siteDetails.floors == 5 ? "Ground Floor + 4 Floor" :
                                            siteDetails.floors == 6 ? "Ground Floor + 5 Floor" :  "Gound Floor"

                                        }
                                    </Text>
                                </View>
                            </View>  
                            <View style={styles.loop}>
                                <View style={styles.innerLoop}>
                                    <Text style={styles.uppertext}>Plot Depth:</Text>
                                    <Text style={styles.lowwertext}>{ Number((siteDetails.plot_area / siteDetails.width).toFixed(2)) } feet</Text>
                                </View>
                                <View style={styles.innerLoop}>
                                    <Text style={styles.uppertext}>Plot Entrance direction:</Text>
                                    <Text style={styles.lowwertext}>{
                                        siteDetails.direction == 'NN' ? 'North': 
                                        siteDetails.direction == 'SS' ? 'South': 
                                        siteDetails.direction == 'EE' ? 'East': 
                                        siteDetails.direction == 'WW' ? 'West': 

                                        siteDetails.direction == 'NE' ? 'North East': 
                                        siteDetails.direction == 'NW' ? 'North West': 
                                        siteDetails.direction == 'SE' ? 'South East': 
                                        siteDetails.direction == 'SW' ? 'South West': 
                                        "North"
                                    }</Text>
                                </View>
                            </View>  
                            {/* End: Loop */}
                        </View>
                    :
                    <Loader type = "plotdetails"/>
                    }

                    {/* End: Site Specification: */}

                    <View style={{padding:0, marginVertical:0}}> 
                        <View style={{padding:10}}>
                            <TouchableOpacity style={[styles.container,{height:70, justifyContent:'space-between',paddingHorizontal:12}]} onPress={()=>navigation.navigate('RequestFormWebView')}>
                                <Text style={{fontSize:FontSize.h6, fontWeight:FontWeight.medium,color:Colors.SecondaryColor}}>Please Fill Requirement Form</Text> 
                                <FormIcon width={actuatedNormalize(21)} height={actuatedNormalize(21)} />
                            </TouchableOpacity>
                        </View>
                    </View> 
                    
                    {/* <Loader type="requestform"/> */}

                </View>        
                {/* End: Site Details */}  
            </ScrollView> 
        </ScreenWrapper>
    )
}
 
const styles = new StyleSheet.create({
    container:{
        width:'100%',
        height:120,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius:9,
        elevation:3,
        position: 'relative',
        padding:10,
        marginVertical:12
    },
    box:{
        width:'33%', 
        height:'100%', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    DarkHeder:{
        width:'100%',
        height:60, 
        backgroundColor:'#E5E5E5',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center',
        paddingHorizontal:10
    },
    boxFull:{
        width:'100%',
        minHeight:35, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'flex-start',
        alignItems:'flex-start', 
    },
    loop:{
        width:'100%',
        minHeight:60, 
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:12
    },
    innerLoop:{
        width:'50%',
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    uppertext:{
        color:Colors.graySnd,
        fontSize:FontSize.p,
        fontWeight:FontWeight.regular
    },
    lowwertext:{
        color:'#2C2C2C',
        fontSize:FontSize.h6,
        fontWeight:FontWeight.medium
    }

});
export default MyProjectMySite;