import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StatusBar, ImageBackground, FlatList, ActivityIndicator, Modal, Dimensions } from 'react-native'
// import firestore from '@react-native-firebase/firestore';
 
import styles from './styles';
// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper';

// header 

  



import { useNavigation,useNavigationState  } from '@react-navigation/native';
  
import { useFocusEffect } from '@react-navigation/native'; 

import { addGlobalData } from '../../redux'; 

import Images from '../utility/images';
import Util from '../utility/utility';

import moment from 'moment';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormData from 'form-data';

import ApiService from '../../ApiServices';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Uploadimage from './uploadImages';

import FontSize,{FontWeight} from '../utility/fonts';

const MyProjectChat = (props)=>{
      // aimate notification 
   
     const navigation = useNavigation(); 
     
     
    const [code,setProjectId] = useState('');  
    useFocusEffect(
        useCallback(  () => {
            AsyncStorage.getItem('projectCode',(err,creds)=>{
                console.log("storage",creds);
                setProjectId(creds);
                getListData(creds);
            })
            return () => { 
                 console.log("Project iD fetched");
            }
        }, []),
    );
    
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [loading, setloading] = useState(false);
    const [imagebox, setimagebox] = useState(false);
    const [loader, setloader] = useState(true);
    const [imagezoommodal, setimagezoommodal] = useState(false)
    const [imagezoomvalue, setimagezoomvalue] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setloader(false)
        }, 2000)
    }, []);
     
    useEffect(() => {
        if(code!=""){
            let collection = `${GlobalData.FIRESTORE_KEY_NAME_ENV}/` + code + '/MESSAGES';
            console.log("---------------Collection:", collection);
            const subscriber = firestore().collection(collection).orderBy("createdDate");
            subscriber.onSnapshot(querysnapshot => {
                getListData(code);
                console.log("---useEffect collection: ",querysnapshot);
            })
        }  
    }, [code]);

    const [openImageConformation,setopenImageConformation] = useState(false);
    const [storeMessageImageBinary,setstoreMessageImageBinary] = useState('');
    const [storeMessageImageData,setstoreMessageImageData] = useState('');
    const closeimagepopup = (type, data, base64) => { 
        console.log({
            data,type,base64
        });
        setimagebox(false);
        if(type ==2){ 
            setstoreMessageImageBinary(base64);
            setstoreMessageImageData(data);
            setopenImageConformation(true);
        }
        
        // submitfun(data);
    }

    const imageConfomationHandlerSend = ()=>{ 
        setopenImageConformation(false);
        console.log(storeMessageImageData)
        submitfun(storeMessageImageData);
    }

    const imageConfomationHandlerCancel = ()=>{
        setstoreMessageImageBinary('')
        setopenImageConformation(false);
        setstoreMessageImageData('')
    }


    
    const getListData = async (codeD) => { 
            let collection = `${GlobalData.FIRESTORE_KEY_NAME_ENV}/` + codeD + '/MESSAGES'; 
            const timelineCollection = firestore()
            .collection(collection)
            .orderBy("createdDate")
            timelineCollection.get()
            .then(querySnapshot => {
                let msg = {}
                let dates = []
                let newdata = []
                querySnapshot.forEach(documentSnapshot => {
                    const date = new Date(documentSnapshot.data().createdDate).toDateString()
                    if (!dates.includes(date)) {
                        dates.push(date);
                    }
                });
                querySnapshot.forEach(documentSnapshot => {
                    const date = new Date(documentSnapshot.data().createdDate).toDateString()
                    if (Object.keys(msg).includes(date)) {
                        msg[date].push({ ...documentSnapshot.data() })
                    } else {
                        msg[date] = [{ ...documentSnapshot.data() }]
                    }
                });
                for (let x in msg) {
                    newdata.push({ type: 'date', data: x })
                    for (let i = 0; i < msg[x].length; i++) {
                        newdata.push({ type: 'chat', data: msg[x][i] })
                    }
                }
                setMessages(newdata)

            })
            .catch(error=>{
                console.log('get Kist data error', error);
            })  
    }

    const onSend = async (message) => {
        setloading(true)
        let body = {
            message: message,
            messageType: 'T',
        }
        setMessage('')
        let url = `customer/chat/${code}`
        ApiService.Post(url, body).then(response => { 
            console.log(response);
            getListData(code);
            setloading(false)
        }).catch(e => {
            console.log("error: onsend: ", e);
         });
    }

    const onSendimage = async (data) => { 
        setloading(true)
        let body = {
            mediaId: data,
            messageType: 'M',
        }
        let url = `customer/chat/${code}`
        ApiService.Post(url, body).then(response => {
            console.log(response);
            setloading(false)
            getListData(code);
        }).catch(e => {
        });
    }

    const submitfun = (source) => {
        console.log('source-----------', source);
        const data = new FormData();
        data.append('entityType', "order");
        data.append('acl', 'public');
        data.append('entityId', code);
        data.append('returnType', 'url');
        data.append('media', { name: 'camera-picture.jpg', type: 'image/jpeg', uri: source.path });
        console.log('formdata------------', data);
        ApiService.Uploadapi('customer/media/upload', data).then(response => {
            console.log(response);
            onSendimage(response.data);
            getListData(code);
        }).catch(e => {
            console.log("error: submit fun: ", e);
        });
    }

    const openzoomimagefunc = (img) => {
        const images = [{
            url: img,
            props: {}
        }]
        console.log("-----------images-----------", images);
        setimagezoomvalue(images)
        setimagezoommodal(true)
    }

    const renderchatsec = (item) => {
        return (item.type == 'date' ?
            <View >
                <View style={{
                    backgroundColor: '#012E58',
                    padding: 10,
                    margin: 10,
                    borderRadius: 10,
                    width: '30%',
                    alignSelf: 'center',
                    height: 35,
                }}>
                    <Text style={{ textAlign: 'center', fontSize: 10, color: "#ffffff" }}>{item.data}</Text>
                </View>
                <View style={{
                    width: "100%"
                }}>

                </View>
            </View>
            :
            item.data.messageType === "T" ?
                <View style={(item?.data?.userType == 'user') ? styles.msgInnerBlock1 : styles.msgInnerBlock2}>
                    <View style={{ flexDirection: 'row', width: "80%" }}>
                        <Text style={{
                            textAlign: item?.data?.userType === 'user' ? "right" : "left",
                            fontSize: 16, color: 'black',

                        }} >
                            {item?.data?.message}</Text>
                        <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                            <Text style={{
                                fontSize: 12,
                                color: 'grey'
                            }}>{moment(item?.data?.createdDate).format('hh:mma')}</Text>
                        </View>
                    </View>
                </View>
                :
                item.data.messageType === "RC" ?
                    
                        <View style={(item?.data?.userType == 'user') ? styles.msgInnerBlock1 : styles.msgInnerBlock2}>
                            <View style={{ flexDirection: 'row', width: "80%",marginBottom:8 }}>
                                <Text style={{
                                    textAlign: item?.data?.userType === 'user' ? "right" : "left",
                                    fontSize: 16, color: 'black', 
                                }} >
                                    {item?.data?.message}</Text> 
                                <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                                    <Text style={{
                                        fontSize: 12,
                                        color: 'grey'
                                    }}>{moment(item?.data?.createdDate).format('hh:mma')}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={()=>cancelCallHandler()}>
                                <Text style={{textAlign:'right',fontSize: 16, color: 'red' }}>Cancel Request</Text>
                            </TouchableOpacity>
                        </View> 
                    
                :
               <View >
                    <View style={(item?.data?.userType == 'user') ? styles.msgInnerBlock1 : styles.msgInnerBlock2}>
                        <TouchableOpacity onPress={() => openzoomimagefunc(item?.data?.mediaDetails?.url)}>
                            <Image
                                source={{ uri: item?.data?.mediaDetails?.url }}
                                style={{ height: Util.getHeight(30), width: Util.getWidth(35) }}
                            />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>

                            <View style={[{

                                alignSelf: item?.data?.userType === 'user' ? 'flex-end' : 'flex-start',
                            }]}
                            >
                                <Text style={{
                                    // textAlign: item?.data?.userType === 'user' ? "right" : "left",
                                    fontSize: 12,
                                    color: 'grey'
                                }}>
                                    {moment(item?.data?.createdDate).format('hh:mma')}</Text>
                            </View>
                        </View>
                    </View>
                </View>

        )
    }

    // start: call api states
    const [apicallsate,setapicallsate] = useState(false);
    const [messageCallRequest,setMessageCallRequest] = useState('');
    const [callRequestLoaing,setcallRequestLoaing] = useState(false);
    const callHandler = async ()=>{
        setcallRequestLoaing(true);
        console.log("call handler clicked:",code); 
        try{
            if(messageCallRequest != null || messageCallRequest != ''){
                let url = `${GlobalData.APIURL}customer/chat/requestCall/${code}`; 
                const Token = await AsyncStorage.getItem('UserToken');
                console.log('token------========',Token); 
                console.log("call request url", url);
                const config = {
                    headers: {
                    'X-API-KEY': Token,
                    'Content-Type': 'multipart/form-data',
                    },
                }; 
                const formData = new FormData();
                formData.append('message', `${messageCallRequest}`);

                axios.post(url,formData , config)
                .then(response=>{
                    console.log("call response=====",response);
                    setapicallsate(false);
                    setMessageCallRequest('');
                    setcallRequestLoaing(false);
                    getListData(code);
                })
                .catch(error=>{
                    setcallRequestLoaing(false);
                    console.log("error 2 ",error)
                })
            }else{
                setcallRequestLoaing(false);
                console.log("Kinly fill the box");
            } 
        }
        catch(error){
            setcallRequestLoaing(false);
            console.log("call hanler api catch2: ",error);
        }
    } 
    const cancelCallHandler = async ()=>{
        console.log('cancel handler ');
        try{
            let url = `${GlobalData.APIURL}customer/chat/cancelRequestCall/${code}`; 
            const Token = await AsyncStorage.getItem('UserToken');
             
            console.log('token----Cancle Call request--========',Token); 
            console.log("call request url", url);
            const config = {
                headers: {
                'X-API-KEY': Token, 
                },
            }; 
            await axios.post(url,{},config)
            .then(response=>{
                console.log("cancle call response=====",response); 
                getListData(code);
            })
            .catch(error=>{ 
                console.log("error 2 ",error)
            })
        }   
        catch(error){
            console.log("Cancel Call Handler Error", error);
        }

    }
    // end: call api states
 


    return (
        <ScreenWrapper>  
            
            <View style={styles.Vi}>
                <ImageBackground style={{ height: '100%', width: "100%" }} source={Images.Chat_bg} >
                    <StatusBar backgroundColor='#012E58' barStyle={'light-content'} />
                    <View style={{
                        backgroundColor: '#012E58',
                        height: Util.getHeight(7),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#D4D4D4"
                    }}>
                        <TouchableOpacity style={{ flex: 0.3 }} onPress={() => navigation.goBack()}>
                            <Image source={Images.BlackLeftArrow}
                                style={{ width: 18, height: 18, tintColor: "white" }} resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Image style={{ height: 30, width: 30, alignSelf: 'center' }} source={Images.profile} />
                        </View>
                        <View style={{ flex: 3 }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: "500", }}>{code}</Text>
                        </View>

                        <TouchableOpacity style={{ flex: 1, marginRight: 10 }} onPress={()=>setapicallsate(true)}>
                            <Image style={styles.Img2} source={Images.mobile} />
                        </TouchableOpacity>

                    </View>
                    <View>
                    </View>

                    <View style={[styles.Vi3]}>
                        <View style={{ paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                            <FlatList
                                inverted
                                contentContainerStyle={{ flexDirection: 'column-reverse' }}
                                keyExtractor={(item, index) => index}
                                data={messages}
                                style={{ marginBottom: 50, }}
                                renderItem={({ item }) => (renderchatsec(item))}
                            />
                        </View>
                        {
                            !openImageConformation&&(
                                <View style={{ position: "absolute", bottom: 0, flexDirection: "row", padding: 5, backgroundColor: "#ffffff", }}>
                                    <View style={{ flexDirection: "row", flex: 2, backgroundColor: "white", borderRadius: 25 }}>
                                        <View style={{ flex: 1.4 }}>
                                            <TextInput
                                                style={{ marginLeft: 12, color: "black", }}
                                                placeholder="Write your message here..."
                                                autoCorrect={true}
                                                value={message}
                                                onChangeText={text => setMessage(text)}
                                                placeholderTextColor={'grey'}
                                            />
                                        </View>
                                        <TouchableOpacity onPress={() => { setimagebox(true) }} style={{ marginRight: 20, alignSelf: "center" }}>
                                            <Image style={styles.Img5} source={Images.attachment} />
                                        </TouchableOpacity>

                                    </View>
                                    {
                                        loading ? <ActivityIndicator size={'small'} color="#012E58" style={{ marginRight: 10 }} /> :

                                            <TouchableOpacity style={{ justifyContent: "center", marginRight: 15, backgroundColor: "#0abc51", borderRadius: 50, padding: 10 }} onPress={() => {
                                                onSend(message)
                                            }}>
                                                <Image style={{ height: 30, width: 30, alignSelf: "center", }} source={Images.Share_msg} resizeMode='cover' />
                                            </TouchableOpacity>
                                    }
                                </View>
                            )
                        }
                        

                        {/* start: open image conformation modal */}
                        {
                            openImageConformation&&(
                                <View style={{ position: "absolute", bottom: 0,width:'100%', flexDirection: "column", padding: 5, backgroundColor: "#ffffff", }}>
                                    <Text style={{color:'#000000', fontSize:FontSize.h4, fontWeight:FontWeight.medium, paddingHorizontal:6,marginVertical:4}}>Are you sure?</Text>
                                    <View style={{width:'100%', height:300, backgroundColor:'#FAFAFA', padding:12, marginVertical:6,borderRadius: 12}}>
                                        <Image style={{width:'100%',height:'100%'}} resizeMode="contain" source={{ uri: `data:image/jpeg;base64,${storeMessageImageBinary}`}} />
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'space-around', alignContent:'center', alignItems:'center', marginBottom:8}}>
                                            <TouchableOpacity onPress={()=>imageConfomationHandlerCancel()} style={{width:'48%', height:45, backgroundColor:'red', justifyContent:'center', alignItems:'center', alignContent:'center', borderRadius:6}}>
                                                    <Text style={{color:'#ffffff', fontSize:14, fontWeight:'500'}}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>imageConfomationHandlerSend()} style={{width:'48%', height:45, backgroundColor:'#0abc51', justifyContent:'center', alignItems:'center', alignContent:'center', borderRadius:6}}>
                                                    <Text style={{color:'#ffffff', fontSize:14, fontWeight:'500'}}>Send</Text>
                                            </TouchableOpacity>
                                    </View> 
                                </View>
                            )
                        }   
                        {/* end: open image conformation modal */} 

                    </View>

                </ImageBackground>
                {
                    imagebox && (
                        <Uploadimage closeimagepopup={closeimagepopup} width={wp('100%')} height={400} cropperCircleOverlay={true} />
                    )
                }

                {/* start: imageZoom modal */}
                <Modal animationType="slide" transparent={true} visible={imagezoommodal}>
                    <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                        <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => {
                        }}>
                            <View  ></View>
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: '100%', backgroundColor: "#0e0e0e61",  }}>
                            <View style={{ marginTop: 10, flexDirection: "row",  }}>
                                <TouchableOpacity style={{ flex: 0.2, alignSelf: "center", marginLeft: 10 }} onPress={() => {
                                    setimagezoommodal(false)
                                }}>
                                    <Image style={{ height: 40, width: 40,tintColor:"white" }} source={Images.closemore} />
                                </TouchableOpacity>

                            </View>
                            <ImageViewer imageUrls={imagezoomvalue}/>
                        </View>
                    </View>
                </Modal>
                {/* end: imageZoom modal */}
                
                {/* Start: call request popup apicallsate */} 
                <Modal animationType="slide" transparent={true} visible={apicallsate}>
                    <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                        <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => {
                            setapicallsate(false);
                        }}>
                            <View  ></View>
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: '100%', backgroundColor: "#0e0e0e61",  }}>
                                
                                <View style={{with:'100%', height:'100%',
                                    justifyContent:'center',alignContent:'center',alignItems:'center',
                                }}>
                                    <View style={{width:'80%',minHeight:'20%',backgroundColor:'#fff',borderRadius:12,
                                        padding:32, position:'relative'
                                    }}> 
                                        <TouchableOpacity onPress={()=>setapicallsate(false)} style={{width:40, height:40, position:'absolute', right:10, top:10, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                            <Image style={{ height: 35, width: 35 }} source={Images.closemore} />
                                        </TouchableOpacity>
                                        <Text style={{fontSize:FontSize.p, fontWeight:'500', color:'#000000', marginBottom:2}}>Call Request</Text>
                                        <Text style={{marginBottom:12,fontSize:14, color:'#000000',fontWeight:'400'}}>Please Mention Reason for Call</Text>

                                        <TextInput
                                             style={{ height: 120,
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                padding: 10,
                                                borderRadius: 12,
                                                textAlignVertical: 'top',
                                                marginBottom:16,
                                                color:'#000000' 
                                            }}
                                            multiline
                                            numberOfLines={6}
                                            onChangeText={(text)=>setMessageCallRequest(text)}
                                            value={messageCallRequest}
                                            placeholder="Enter Call Request"
                                            placeholderTextColor={'#888888'}
                                        /> 
                                      
                                        {
                                            callRequestLoaing == true? 
                                                <View style={{
                                                    width:'100%',height:50,
                                                    justifyContent:'center',alignContent:'center',
                                                    alignItems:'center',backgroundColor:'#EAF6EA',
                                                    borderRadius:6, marginBottom:14, 
                                                }}>
                                                    <Text style={{color:'#141414',fontWeight:'500'}}>Loading...</Text>
                                                </View>
                                            : 
                                                <TouchableOpacity onPress={()=>callHandler()} style={{
                                                    width:'100%',height:50,
                                                    justifyContent:'center',alignContent:'center',
                                                    alignItems:'center',backgroundColor:'#3CAF4B',
                                                    borderRadius:6, marginBottom:14, 
                                                }}>
                                                    <Text style={{color:'#ffffff',fontWeight:'500'}}>Send Call Request</Text>
                                                </TouchableOpacity>
                                        }
                                        
                                    </View> 
                                </View>
                        </View>
                    </View>
                </Modal> 
                {/* end: call request popup */}
 
            </View>  
        </ScreenWrapper>
    )
}
 
export default MyProjectChat;