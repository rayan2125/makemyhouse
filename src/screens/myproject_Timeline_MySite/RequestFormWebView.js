import { View, Text, Dimensions, TouchableOpacity,BackHandler,ScrollView } from 'react-native';
import React,{useEffect, useCallback, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '../../components/screenWrapper';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,  } from '@react-navigation/native';
import Colors from '../utility/color';
import {GlobalData} from "../utility/config"


const RequestFormWebView = () => {
  const  navigation = useNavigation();  
   // start: prevent the user to press back button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress ); 
    return () => {
      backHandler.remove();
    };
  }, []);
  const handleBackPress = () => {
    return false
  };
 // end: prevent the user to press back button
 const [projectId,setProjectId] = useState(''); 
 const [siteId,setSiteId] = useState('');
 const [siteDetails,setSiteDetails] = useState(''); 
 const [webviewS,setwebViewS] = useState(null); 
 
 useFocusEffect(
  useCallback(  () => {
      AsyncStorage.getItem('projectCode',(err,projectid)=>{
          console.log("storage",projectid);
          setProjectId(projectid);
          AsyncStorage.getItem('SelectedSite',(error,cre)=>{
              setSiteId(cre) 
              AsyncStorage.getItem('UserToken', (err,token)=>{
                  
                  console.log("token",token);
                  setwebViewS(`${GlobalData.LINKURL}rs-form/${projectid}/?token=${token}`);
              });
          }); 
      })
      return () => { 
           console.log("Project iD fetched");
      }
  }, []),
);



return (
    <ScreenWrapper> 
        <View style={{width:'100%', height:45,backgroundColor:Colors.SecondaryColor, justifyContent:'center',}}>
            <TouchableOpacity onPress={()=>navigation.navigate('MyProjectMySite')} style={{paddingHorizontal:12}}>
                <Text style={{fontSize:16,color:'#fff', fontWeight:'500'}}>
                    Back
                </Text>
            </TouchableOpacity>
        </View>
        <View style={{padding:0, height:'100%', width:'100%', backgroundColor:"#fff" }}> 

        {
          webviewS != null?
          <WebView
            source={{ uri:webviewS}} 
            style={{with:'100%',height:'100%'}}
            loading={false}
            description="web page" 
          />   
          :
          <View style={{width:'100%', height:'100%', backgroundColor:Colors.lighteshGray, padding:12, justifyContent:'center', alignItems:'center', alignContent:'center'}}>
            <Text style={{color:'red', }}>Link not found..</Text>
          </View>   
        }   
          
        </View>
    </ScreenWrapper>
  )
}
export default RequestFormWebView;
 