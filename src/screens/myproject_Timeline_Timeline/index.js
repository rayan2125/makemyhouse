import { View, Text,  TouchableOpacity ,Dimensions, Modal, VirtualizedList, TextInput, FlatList} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper';

// header 
import ScndHeader from '../../components/headers/scndHeader';
  
const {width, height} = Dimensions.get('window'); 
  
import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';
  

import { useNavigation,useNavigationState  } from '@react-navigation/native';

import ApiService from '../../ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import AnimatedMessage from '../../components/animatedNotification';

import TimelineCard from '../../components/projectDetails/timeLineCard';

import Loader from './loader';
 
const MyProjectTimeLine = (props)=>{
    // aimate notification 
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        // setTimeout(()=>{
        //   setMessages([]);
        // },2000); 
    },[messages]);
    const navigation = useNavigation(); 
    
    const [refreshing,setRefreshing] = useState(false);
     
    // start: Pending orders 
    const [myProjectDeails,setMyProjectDeails] = useState([]); 

    const [projectId,setProjectId] = useState('');
 
    useFocusEffect(
        useCallback(  () => {
            AsyncStorage.getItem('projectCode',(err,creds)=>{
                console.log("storage",creds);
                setProjectId(creds);
                gettimeLineCard(creds);
            })
            return () => { 
                 console.log("Project iD fetched");
            }
        }, []),
    ); 


    // start: Timeline Approvel Card
    const [paymentCard,setPaymentCard] = useState([]);
    // useEffect(()=>{
    //     setPaymentCard([
    //         {
    //             "id": "2dcad5bfb58a49999101",
    //             "doc": {
    //                 "feedback": "",
    //                 "isApproval": "pending",
    //                 "date": "2023-06-22T05:55:20.403Z",
    //                 "approvalResult": 0,
    //                 "description": "Hello,\nFor Your Approval:\nDetails which are approved by the architects & designers of Makemyhouse.\nPlease review it, if any changes needed. Please reply to us with the needed changes.",
    //                 "files": [
    //                     {
    //                         "extension": "pdf",
    //                         "name": "98b369a2-3652-5d20-b226-a0022194ffe0-6493e0accd0b4",
    //                         "attachmentID": "6493e0ad4d5ca659fd0a9804",
    //                         "url": "https://api-uat.makemyhouse.com/public/storage/media/?orderID=PRJ202303070001&attachmentID=6493e0ad4d5ca659fd0a9804"
    //                     }
    //                 ],
    //                 "title": "Request for approval",
    //                 "type": "approval"
    //             }
    //         }
    //     ]);
    // },[]);  

    const gettimeLineCard = async (projectCode)=>{
        setRefreshing(true);
        const url = `customer/mmhproject/timeline/${projectCode}?all=1`;
        console.log('project timeLine url',url);
        await ApiService.Getapiheader(url)
        .then(response=>{  
            if(response){ 
                console.log("project timeLine Card:", response.data); 
                setPaymentCard(response.data); 
                setRefreshing(false);
            }else{ 
                setMessages([`Someting went wrong while getting the card details.`])      
            }
        })
        .catch(error=>{
            console.log("project timeLine Card:", error) 
            setMessages([`Someting went wrong,: ${error}`])  
            setRefreshing(false);
        })
    } 
    // end: Timeline Approvel Card


    // start: list refreshing  
    const handleRefreshing = ()=>{ 
        gettimeLineCard(projectId);  
    }
    // end: list refreshing 

    // start: virtualization
    const getItemCount = (data,index) => data.length;
    const getItem  = (data,index)=>{ 
        return data[index];
    }
    // end: virtualization

    
      //start:  timeline card 
      const [hideAndShowMsg,sethideAndShowMsg] = useState(false);
      const [selectedState,setselectedState] = useState(0);
      const [popUpmessage,setpopUpmessage] = useState('');
      const [firebaseDocID,setfirebaseDocID] = useState('');
  
      const [isLoadingPOPUP,setisLoadingPOPUP] = useState(false);
  
      // selected type 
      const selectedStateHandler = (state)=>{
          setselectedState(state);
          sethideAndShowMsg(true); 
      } 
  
      const firebaseDocIdHandler = (data)=>{
          setfirebaseDocID(data)

      } 
  
      const hideAndShowMsgHandler = ()=>{
          sethideAndShowMsg(false);
          setselectedState(0);
          setpopUpmessage('');
          setfirebaseDocID('');
      }
       
      // popup action button...
      const popUpHandler = async (projectCode,fireStoreDocId, message, action)=>{ 
          let data = { 
              fireStoreDocId,
              message,
              action:action == 3 ? 2 : action
          }
          console.log("popup data: ", data);
          let url =`customer/media/actionApproval_v2/${projectCode}`
          setisLoadingPOPUP(true);
          await ApiService.Post(url,data)
          .then(response=>{
              console.log("response timeline action button", response);
              sethideAndShowMsg(false);
              setisLoadingPOPUP(false);
              gettimeLineCard(projectId);
          })
          .catch(error=>{
              console.log('error timeline action button', error);
              setMessages([`Something went wrong: ${error}`]);
              sethideAndShowMsg(false);
              setisLoadingPOPUP(false);
              
              gettimeLineCard(projectId)
          })
      }
      //end:  timeline card
  


    const renderItem = useCallback(({item,index}) => (
        <TimelineCard data={item} selectedStateHandler={selectedStateHandler} firebaseDocIdHandler={firebaseDocIdHandler}/>
    ));

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
                Title={projectId == ''?"Timeline":projectId }
                Search={false} 
                Profile={false}  
                Back={false}
                BackScreen="" 
                Skip={false} 
                SkipStack=""
                SkipScreen="" 
            />   

                {/* <Text style={{backgroundColor:Colors.lighteshGray, color:'red'}}>length: {paymentCard.length}</Text>   */}
              
                {
                    refreshing == false ? 
                    (
                        paymentCard.length > 0  ? 
                        <VirtualizedList
                            windowSize={4}
                            data={paymentCard}
                            initialNumToRender={4}
                            keyExtractor={(item,index) => index}
                            getItemCount={getItemCount}
                            renderItem={renderItem}
                            getItem={getItem}  
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false} 
                            refreshing={refreshing}
                            onRefresh={handleRefreshing} 
                            style={{marginTop:16}}
                        />  
                        :
                        <Text>no data dound</Text> 
                    )
                    : 
                    <View style={{paddingTop:20}}>  
                        <Loader/>
                        <Loader/>
                        <Loader/>
                    </View>
                }  

            <Modal animationType="slide" transparent={true} visible={hideAndShowMsg}>     
                <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                    <TouchableOpacity style={{ backgroundColor:'transparent', width: '100%', height: "30%" }}  onPress={()=>hideAndShowMsgHandler()}>
                      <View  ></View>
                    </TouchableOpacity>
                    <View style={{width:'100%', maxHeight:360, backgroundColor:'transparent', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{width:'90%', height:"90%", backgroundColor:'#ffffff', borderRadius:12,padding:12, elevation:4, flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                            <View style={{width:'100%'}}>
                                <Text style={{fontSize:FontSize.p, fontWeight:'400', color:'#000000'}}>Please enter your message in the field provided below.</Text></View>
                            <View style={{width:'100%', marginVertical:12}}>
                                <TextInput
                                    style={{ 
                                        height: 120,
                                        borderColor: '#ccc',
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 12,
                                        textAlignVertical: 'top',
                                        color:'#000000'
                                    }}
                                    multiline
                                    numberOfLines={6}
                                    placeholder="Type your message here..."
                                    placeholderTextColor="#888888" 
                                    value={popUpmessage}
                                    onChangeText={setpopUpmessage}
                                />
                            </View>
                            <View style={{width:'100%', marginVertical:8, flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                <TouchableOpacity style={{backgroundColor:"#FA0606", paddingVertical:12, paddingHorizontal:22, borderRadius:9}} onPress={()=>hideAndShowMsgHandler()}>
                                    <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:"#ffffff"}}>Cancel</Text>
                                </TouchableOpacity>

                                 {
                                    selectedState == 1 && (
                                        
                                            isLoadingPOPUP == true ? 
                                            <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor, paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:9}}>
                                                <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#ffffff'}}>Loading</Text>
                                            </TouchableOpacity>
                                            :
                                            
                                            <TouchableOpacity style={{backgroundColor:Colors.PrimaryColor, paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:9}} onPress={()=>{popUpHandler(projectId,firebaseDocID,popUpmessage,selectedState)}}>
                                                <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#ffffff'}}>Mark As Approved</Text>
                                            </TouchableOpacity>
                                        
                                    ) 
                                }

                                {
                                    selectedState == 2 && (
                                        isLoadingPOPUP == true ?
                                        <TouchableOpacity style={{backgroundColor:'#FA0606', paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:9}} >
                                            <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#ffffff'}}>Loading</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={{backgroundColor:'#FA0606', paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:9}} onPress={()=>{popUpHandler(projectId,firebaseDocID,popUpmessage,selectedState)}}>
                                            <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#ffffff'}}>Declined</Text>
                                        </TouchableOpacity>
                                    ) 
                                }      
                                 
                                {
                                    selectedState == 3 && ( 
                                        isLoadingPOPUP == true ? 
                                        <TouchableOpacity style={{backgroundColor:'#FFCE00', paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:9}}>
                                            <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#fff'}}>Loading</Text>
                                        </TouchableOpacity>  
                                        :
                                        <TouchableOpacity style={{backgroundColor:'#FFCE00', paddingVertical:12, paddingHorizontal:22,marginLeft:8, borderRadius:9}} onPress={()=>{popUpHandler(projectId,firebaseDocID,popUpmessage,selectedState)}}>
                                            <Text style={{fontSize:FontSize.xp,fontWeight:FontWeight.medium, color:'#000000'}}>Need Changes</Text>
                                        </TouchableOpacity>  
                                    )
                                }
                                     
                            </View> 
                        </View>
                    </View>
                    <TouchableOpacity style={{ backgroundColor:'transparent', width: '100%', height: "40%" }}  onPress={()=>hideAndShowMsgHandler()}>
                      <View></View>
                    </TouchableOpacity>
                </View> 
            </Modal>
        </ScreenWrapper>
    )
}
 
export default MyProjectTimeLine;