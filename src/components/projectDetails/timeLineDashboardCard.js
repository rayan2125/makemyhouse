import { View, Text, StyleSheet,Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState, } from 'react'


import FastImage from 'react-native-fast-image';

import Colors from '../../screens/utility/color';
import Images from '../../screens/utility/images';
 
import FontSize,{FontWeight} from '../../screens/utility/fonts';

import ArrowRightHalfDark from '../../../assets/images/icons/arrowRightHalfDark.svg'; 
import Calander from '../../../assets/images/icons/calander.svg';
import Download from '../../../assets/images/icons/download.svg'


import RNFetchBlob from 'rn-fetch-blob';

import {actuatedNormalize} from '../../screens/utility/scaling'
import { useNavigation} from '@react-navigation/native';

import Swiper from 'react-native-swiper';

const  ApprovelCard = (props) => {
  const navigation = useNavigation();

  const [files,setFiles] = useState(false);
  function hasSpecificKey(obj, key) {
    return obj.hasOwnProperty(key);
  }
  useEffect(()=>{  
    if(props.data.doc){
      console.log("check for files key is present or not ",hasSpecificKey(props.data.doc,"files"));
      if(hasSpecificKey(props.data.doc,"files") == true){
        console.log("timeline files: ", props.data.doc.files)
       return  setFiles(props.data.doc.files);  
      }
      return setFiles([]);  
      // setFiles(hasSpecificKey(hasSpecificKey(props.data.doc,"files")));
    }
  },[]);

  // to download the pdf file 
  const handleDownload = async (url,name,) => {
    alert('Downloading', 'PDF download is in progress...', [], { cancelable: false });
    try {
      const { config, fs } = RNFetchBlob;
      const { DownloadDir } = fs.dirs;

      const response = await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'Downloaded PDF File',  
          description: 'Downloading PDF file...',
          path: `${DownloadDir}/${name}.pdf`,
        },
      }).fetch('GET', url);

      console.log('Success', 'PDF downloaded successfully!');
      alert('Success', 'PDF downloaded successfully!', [], { cancelable: false });
    } catch (error) {
      console.log('Error', 'Failed to download PDF. Please try again later.', error);
    }
  };

  const actionHandler = (state,docID)=>{
    props.firebaseDocIdHandler(docID)
    props.selectedStateHandler(state)
  }

  let dateString =  props.data.doc.date;   

  // Create a new Date object from the string
  let dateObject = new Date(dateString);
  
  // Extract the date components
  let day = dateObject.getDate();
  let month = dateObject.toLocaleString("en-US", { month: "short" }); // Get month as abbreviation (e.g., Feb)
  let year = dateObject.getFullYear();

  // Format the date as a string
  let formattedDate = `${padZero(day)} ${month} ${year}`;

  // Extract the time components
  let hours = dateObject.getHours();
  let minutes = dateObject.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Format the time as a string
  let formattedTime = `${padZero(hours)}:${padZero(minutes)} ${ampm}`; 
 
  // Helper function to pad zero to single-digit numbers
  function padZero(num) {
    return (num < 10 ? "0" : "") + num;
  }

  console.log(formattedDate); // Output: "08 Feb 2024"
  console.log(formattedTime); // Output: "06:04 AM"


  return (
    // <Text>{props.data.doc.title}</Text>

    <View style={styles.container}>
         <View style={styles.upperBorderBox}></View>
         <View style={styles.containerBox}>  

            <View style={styles.headerBox}>
                <Text style={styles.headerBoxText}>Timeline</Text>
                <TouchableOpacity style={styles.headerBoxButton} onPress={()=>navigation.navigate('Timeline')}> 
                  <ArrowRightHalfDark width={actuatedNormalize(14)} height={actuatedNormalize(14)}   />
                </TouchableOpacity>
            </View> 
            <View style={styles.sndHeaderBox}>
                <TouchableOpacity>
                  <Calander width={actuatedNormalize(22)} height={actuatedNormalize(22)}  />  
                </TouchableOpacity>
                <Text style={[styles.headerBoxText,{fontSize:FontSize.h6-2}]}>
                  {props.data.doc.title}  
                </Text>
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:FontSize.xxp,fontWeight:FontWeight.medium}}>{formattedDate}</Text>
                    <Text style={{fontSize:FontSize.xxxp,fontWeight:FontWeight.medium}}>{formattedTime}</Text> 
                </View>  
            </View>

            <View style={styles.contentBox}> 
                <Text style={[styles.contentBoxtext,{marginBottom:4,color:'#000000'}]}>
                  {props.data.doc.description}
                </Text> 
                
                
                {
                  files && files.length > 0 ? (
                    <Swiper
                      showsPagination={false}
                      pagingEnabled
                      bounces
                      removeClippedSubviews
                     //  onIndexChanged={setActiveIndex}
                      loadMinimal
                      loadMinimalLoader={<Text>Loading...</Text>}
                      loop={false}
                      useNativeDriver={false}
                      style={[{ pointerEvents: "box-none",width:'100%',},files[0].extension != 'pdf'?{maxHeight:300 }:{height:240 }]}
                    >
                     {files.map((item, index) =>
                      item.extension != 'pdf' ? 
                          <ImageBackground
                            key={index}
                            blurRadius={120}
                            resizeMode="cover"
                            source={{ uri: item.url }}
                            style={{
                              width: '100%',
                              minHeight: 300,
                              backgroundColor: '#ffffff',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignContent: 'center',
                              alignItems: 'center',
                              borderTopLeftRadius: 16,
                              borderTopRightRadius: 16,
                              overflow: 'hidden',
                            }}
                          >
                          <FastImage
                             resizeMode={FastImage.resizeMode.contain} 
                            source={{ uri: item.url }}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </ImageBackground>
                       :  <TouchableOpacity style={{
                        width: '100%',
                        height: 240,
                        backgroundColor: '#ffffff',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        overflow: 'hidden', 
                        backgroundColor:'#ABABAB'
                      }} onPress={()=>{handleDownload(files[0].url,files[0].name)}}>
                        <FastImage resizeMode={FastImage.resizeMode.contain} style={{ width: '100%', height: '80%' }}  source={Images.pdfthumb}/>
                      </TouchableOpacity>
                    )}
                    </Swiper>
                  ) : null
                }

                {(files&& files.length > 0)  &&( 
                      <View style={{width:'100%',height:50,backgroundColor:'#ECF3FF', flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:6}}>
                        <View style={{width:'90%'}}>   
                          <Text style={{color:'#000000',}}>File Name: {files[0].name}</Text>
                        </View>
                        <View style={{width:'10%',justifyContent:'flex-end',flexDirection:'row'}}>  
                          <TouchableOpacity onPress={()=>{handleDownload(files[0].url,files[0].name)}}>
                          {/* <TouchableOpacity> */}
                            <Download width={actuatedNormalize(18)} height={actuatedNormalize(18)}/>
                          </TouchableOpacity> 
                        </View>
                      </View>  
                  )
                }

                {
                  (props.data.doc.type == 'approval' && props.data.doc.isApproval == "pending") &&  (
                    <>
                    <View style={{width:'100%', height:2 }}></View>
                    <View style={styles.ButtonContainer}>
                      <TouchableOpacity style={[styles.button,styles.NeedChangesButton]} onPress={()=>actionHandler('3',props.data.id)}>
                          <Text style={[styles.buttonText,{color:'#000000'}]}>Need Changes</Text>
                          {/* <NeedChanges width={actuatedNormalize(18)} height={actuatedNormalize(18)}/> */}
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.button,styles.ApproverlButton]} onPress={()=>actionHandler('1',props.data.id)}>
                          <Text style={styles.buttonText}>Mark As Approved</Text>
                          {/* <ApprovelTick width={actuatedNormalize(18)} height={actuatedNormalize(18)}/> */}
                      </TouchableOpacity>
                    </View>
                    <View style={{width:'100%', height:6}}></View>
                  </>
                )}

                 
                  {/* <View style={{marginVertical:4, flexDirection:'row'}}>
                    <Text>Status: </Text>
                    <Text style={
                      props.data.doc.isApproval == 'approved'? 
                      {color:Colors.PrimaryColor}: props.data.doc.isApproval == "declined" ?  {color:'red'} :{color:'#000'}}>
                        {props.data.doc.isApproval != 'pending'? props.data.doc.isApproval : props.data.doc.isApproval }
                      </Text>
                  </View> */}
                  
                 
                {/* {props.data.doc.type == 'declined' &&(
                  <View style={styles.ButtonContainer}>
                        <TouchableOpacity style={[styles.button,styles.NeedChangesButton]} onPress={()=>actionHandler('3',props.data.id)}>
                            <Text style={[styles.buttonText,{color:'#000'}]}>Need Changes</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button,styles.DeclinedButton]} onPress={()=>actionHandler('2',props.data.id)}>
                            <Text style={styles.buttonText}>Declined</Text> 
                        </TouchableOpacity>
                  </View> 
                )} */}

          </View>
         </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',   
    position: 'relative', 
    flexDirection:'column' 
  },
  upperBorderBox:{
    width:'100%',
    height:300,  
    zIndex:-1,
    position:'absolute',
    top:-3,
    backgroundColor:Colors.SecondaryColor, 
    borderRadius:14
  },
  containerBox:{
    width:'100%',
    minHeight:300,
    backgroundColor:"#ffffff", 
    zIndex:99,
    borderRadius:14,
    elevation:3
  },
  headerBox:{
    width:'100%',
    height:65, 
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    borderBottomWidth:2,
    borderBottomColor:Colors.SecondaryColor
  },
  headerBoxText:{
    fontSize:FontSize.h6,
    fontWeight:FontWeight.medium,
    color:Colors.SecondaryColor
  },
  headerBoxButton:{
    width:50,
    height:50,
    backgroundColor:'#ffffff',
    borderRadius:9,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    elevation:3
  },
  sndHeaderBox:{
    width:'100%',
    height:65, 
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    alignContent:'center'
  },
  contentBox:{
    width:'100%',
    minHeight:60,
    padding:10,
    paddingVertical:0,
    marginVertical:12
  },
  contentBoxtext:{
    fontSize:FontSize.xp,
    fontWeight:FontWeight.regular, 
    color:Colors.gray
  },
  ButtonContainer:{
    width:'100%',
    height:60, 
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    alignContent:'center', 
    marginTop:4,
    marginBottom:0
  },
  button:{
    backgroundColor:Colors.SecondaryColor,
    paddingHorizontal:22,
    paddingVertical:16,
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:9
  },
  NeedChangesButton:{
    backgroundColor:'#FFCE00',
    color:"#000"
  },
  ApproverlButton:{
    backgroundColor:Colors.PrimaryColor
  },
  DeclinedButton:{
    backgroundColor:'#FA0606'
  },
  buttonText:{
    fontSize:FontSize.xp,
    fontWeight:FontWeight.medium, 
    marginRight:6,
    color:"#ffffff"
  }
});

export default ApprovelCard