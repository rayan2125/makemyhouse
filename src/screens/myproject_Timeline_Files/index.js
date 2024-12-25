import { View, Text, ScrollView, StyleSheet ,Dimensions, Modal, TouchableOpacity, TextInput, FlatList} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper' 

// header 
import ScndHeader from '../../components/headers/scndHeader' 
  

  

import { useNavigation } from '@react-navigation/native';

import ApiService from '../../ApiServices' 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// Start: icons 
 
// end: icons
import Files from '../../components/projectDetails/timeLineFiles';

import FilesLoading from './loading';
 
// notification 
import AnimatedMessage from '../../components/animatedNotification';
 
const MyProjectFiles = (props)=>{
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
    
    useFocusEffect(
        useCallback(  () => {
            AsyncStorage.getItem('projectCode',(err,creds)=>{
                if(creds != null ){ 
                    console.log("storage",creds);
                    setProjectId(creds);

                    setdataLoading(true);
                    getDetails(creds)
                }
            })
            return () => { 
                setdataLoading(false);
                 console.log("Project iD fetched");
            }
        }, []),
    ); 

    const [data,setData] = useState([]);
    const [dataLoading,setdataLoading] = useState(false);
    useEffect(()=>{
         console.log("project id:", projectId);
    },[projectId]);
   
    const getDetails = async (projectId)=>{
        
        console.log("project id: ", projectId);
        let url = `customer/mmhproject/files/${projectId}`
        await ApiService.Getapiheader(url)
        .then(response=>{
            console.log("get files details: ", response.data);
            if(response && response.data){
                setdataLoading(false);
                setData(response.data);
            }else{
                setMessages(['No data found.']);
                setdataLoading(false);
            }
        })
        .catch(error=>{
            setdataLoading(false);
            console.log("error while getting the data: ", error);
            setMessages([`Error while getting the files: ${error}`]);
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
                Title="File" 
                Search={false} 
                Profile={false}  
                Back={false}
                BackScreen="" 
                Skip={false} 
                SkipStack=""
                SkipScreen="" 
            /> 
            <View  >
                
                <View style={{padding:0}}> 
                        <View style={{padding:10, marginTop:4}}> 
                            {
                                data && (
                                    <Files data={data}/>
                                )
                            } 
                            {
                                dataLoading ? (
                                    <>
                                        <FilesLoading />
                                        <FilesLoading />
                                        <FilesLoading />
                                        <FilesLoading />
                                    </>
                                ) : data.length === 0 ? (
                                    <Text style={{fontSize: 14, color: '#000000'}}>No data found.</Text>
                                ) : null
                            }
                        </View>
                </View>

           </View>
              
        </ScreenWrapper>
    )
}
 
export default MyProjectFiles;