import { View, Text, ScrollView, StyleSheet ,Dimensions, Modal, TouchableOpacity, TextInput, FlatList} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper' 

// header 
import ScndHeader from '../../components/headers/scndHeader'
 
  
const {width, height} = Dimensions.get('window'); 
  
import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';
  
import { useRoute } from '@react-navigation/native';

import { useNavigation,useNavigationState  } from '@react-navigation/native';


import ApiService from '../../ApiServices';

// notification 
import AnimatedMessage from '../../components/animatedNotification';
 

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import MyProjectComponent from '../../components/myproject';

import Loader from './loader';

const MyProject = (props)=>{
      // aimate notification 
      const [messages, setMessages] = useState([]);
      useEffect(()=>{
          // setTimeout(()=>{
          //   setMessages([]);
          // },2000); 
      },[messages]);
     const navigation = useNavigation();
     const route = useRoute();
    
    const [data,setData] = useState([]);  
    const [isLoader,setisLoader] = useState(true);
    const [noDataFound,setNoDataFound] = useState(false); 
      
    const fetchDate = ()=>{
                setData([]); 
                setisLoader(true);
                setNoDataFound(false);
                AsyncStorage.removeItem('projectIdNewTimeline');
                let url = 'customer/mmhprojects?status=2'
                ApiService.Getapiheader(url)
                .then(response=>{ 
                    console.log("fetch data", response);
                    if(response && response.projects){
                        if(response.projects.length > 0 ) {  
                            
                            response.projects.map((item,index)=>{  
                                console.log("_+_+_+_+_+_:",{
                                    id:index+1,
                                    siteName:item.site.name,
                                    extrData:`${item.name} ${item.projectCode}`,
                                    shortName:item.name.trim().charAt(0),
                                    projectid:item.ID
                                });
                                setData(prevData => [...prevData,{
                                    id:index+1,
                                    siteName:item.site.name.trim(),
                                    extrData:`${item.name.trim()} ${item.projectCode}`,
                                    shortName:item.name.trim().charAt(0),
                                    projectid:item.ID
                                }])
                            })
                            setisLoader(false);
                            setNoDataFound(false);
                        }else{ 
                            setMessages([`No project found.`])
                            setNoDataFound(true);
                            setisLoader(false);
                        }
                    }else{ 
                        setMessages([`No project found.`])
                        setNoDataFound(true);
                        setisLoader(false);
                    }
                })
                .catch(error=>{
                    console.log("error in api", error) 
                    setMessages([`Someting went wrong,: ${error}`]) 
                    setNoDataFound(true);
                    setisLoader(false);
                })
    }

    useFocusEffect(
        useCallback(  () => {
            fetchDate();    
            return () => { 
                 console.log("data")
            }
        }, []),
    ); 

    const refreshingPagedata = ()=>{
        console.log("function refreshing");
        fetchDate();
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
             {/* Start: Header */}
             <ScndHeader 
                Title="My Project"
                Search={false} 
                Profile={false}  
                Back={false}
                BackScreen="" 
                Skip={false} 
                SkipScreen=""   
            /> 
            {/* End: Header */}
            
            {/* Start: Mian Page content*/}
            <View showsVerticalScrollIndicator={false} style={{flex:1,padding:0,paddingHorizontal:0,marginTop:0}}>
                <View style={{padding:0}}> 
                    <View style={{padding:10}}>  
                        <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>My Project</Text>
                    </View>  
                   
                    {
                        noDataFound == true ? 
                        <View style={{width:'100%', height:40, paddingHorizontal:8}}>
                            <Text style={{color:'#000000', padding:12, width:'100%', backgroundColor:Colors.lighteshGray,borderRadius:9, textAlign:'center'}}>No project Found.</Text>
                        </View>
                        :
                        null
                    }
                    <View style={{height:height - 190}}> 
                         
                        {
                            data&&(
                                <MyProjectComponent data={data} onRefreshing={refreshingPagedata}/>
                            )
                        }
                        {
                            !data&&(
                                <View style={{width:'100%', height:40, paddingHorizontal:8}}>
                                    <Text style={{color:'#000000', padding:12, width:'100%', backgroundColor:Colors.lighteshGray,borderRadius:9, textAlign:'center'}}>No project Found.</Text>
                                </View>
                            )
                        }
                        {
                            isLoader == true ?
                            <Loader/>
                            :
                            null
                        }  
                    </View>
                    
                </View>
            </View>    
            {/* End: Mian Page content*/}
            
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    loadingContainer:{
        width:'100%',height:220, backgroundColor:Colors.lighteshGray, marginBottom:16, borderRadius:6, 
    },
    bar:{
        width:'100%',
        height:22,
        backgroundColor:'#fff'
    }

});

export default MyProject;