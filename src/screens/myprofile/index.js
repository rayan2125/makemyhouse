import { View, Text, ScrollView, StyleSheet ,Dimensions, Image, TouchableOpacity, TextInput, FlatList} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'


// header 
import ScndHeader from '../../components/headers/scndHeader';
 

const {width, height} = Dimensions.get('window'); 
 
import Colors from '../utility/color';

import FontSize from '../utility/fonts';
 
import { useRoute } from '@react-navigation/native';

import { useNavigation,useNavigationState  } from '@react-navigation/native';

 

// notification 
import AnimatedMessage from '../../components/animatedNotification';

const STORE_LANGUAGE_KEY = "settings.lang";
 
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// components 
import CTMTextInput from '../../components/textInput';
import CTMButton from "../../components/button/index"


import ApiService from '../../ApiServices';



const MyProfile = () => {
  const { t, i18n } = useTranslation();
  // aimate notification 
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
      // setTimeout(()=>{
      //   setMessages([]);
      // },2000); 
  },[messages]);
const navigation = useNavigation(); 
const route = useRoute();

const [isLoading,setIsLoading] = useState(false); 
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phonenumber: '',

  location:'',
  state:'',
  city:'', 

  lat:'',
  long:''
});

// start: TextInput
const onChangeTextHander = (key, value)=>{
  console.log('text Intered: ',{
      [key]:value
  })
  if(key == "addressLineTwo"){
      setFormData({ ...formData, [key]: '' });
  }else{
      setFormData({ ...formData, [key]: value });
  }
  
}
useEffect(()=>{
  console.log("formData updated", formData);
},[formData]);
// End: TextInput



useEffect(()=>{
  const getProfileDetials = async ()=>{
    let url = '/customer/me';
    await ApiService.Getapiheader(url)
    .then(response=>{
        if(response){
            console.log("profile details: ",response); 
            
              setFormData({
                name: response.firstname,
                email: response.email,
                phonenumber: response.contact,
              
                location:response.locationaddress,
                state:response.state,
                city:response.city, 
              
                lat:response.latitude,
                long:response.longitude     
              }); 
        } 
        else{
          setMessages(['Profile data fetched unsuccessfully.']);         
        }
    })
    .catch(error=>{
        console.log(error);
        setMessages(['Something went wrong while fetching profile details.']);         
    })
  }
  getProfileDetials();
},[navigation]);

const UpdateProfileHandler = async () =>{
  setIsLoading(true);
  let url = '/customer/me';
  const data = {
    // phoneNumber:`${parseInt(formData.phonenumber)}`,
    firstName:formData.name,
    // email:formData.email,
    address:formData.location,
    // lat:formData.lat,
    // long:formData.long,
    // state:formData.state,
    city:formData.city
  } 
  console.log("data: ",data);
  await ApiService.Post(url,data)
  .then(response=>{
    if(response && response.status == 200){
   
      setIsLoading(false);
      setMessages(['Profile updated successfully.']); 
    }else{
      setIsLoading(false);
      setMessages(['Profile updated unsuccessfully.']); 
    }
  })
  .catch(error=>{
    console.log("error", error);
    setIsLoading(false);
    setMessages([`Profile updated unsuccessfully: ${error}`]);
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

        {/* Start: Header */}
        <ScndHeader 
          Title="Profile"
          Search={false} 
          Profile={false}  
          Back={true}
          BackScreen="Dashboard" 
          Skip={false} 
          SkipScreen=""   
        /> 
        {/* End: Header */} 
        <View showsVerticalScrollIndicator={false} style={{flex:1,padding:0,paddingHorizontal:0,marginTop:0}}>
            <View style={{backgroundColor:'#F4F4F4', width:'100%', height:height / 6,padding:10, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                  <Text style={{color:'#1C232E', fontSize:FontSize.h2, fontFamily:'Inter-SemiBold'}}>{formData.name}</Text>
                  
            </View>
            <ScrollView style={{backgroundColor:'#ffffff', width:'100%', height:height,padding:10, paddingTop:22}}> 
              <View style={{with:'100%', height:40, flexirection:'column'}}> 
                  <Text style={{color:Colors.black,fontSize:FontSize.h6 ,fontFamily: 'Inter-SemiBold'}}>Contact Info</Text>
                  <View style={{width:60, height:1, backgroundColor:"#161616", borderRadius:12}}></View>
              </View> 
              <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                  <CTMTextInput defaultValue={formData.name} title="Full Name" mandatory={true} placeholder="Full Name" onChangeText={(value)=>onChangeTextHander("name",value)} keyboard="default"/> 
              </View>
              <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                  <CTMTextInput constant={true} defaultValue={formData.phonenumber} title="Number" mandatory={true} placeholder="Number" onChangeText={(value)=>onChangeTextHander("phonenumber",value)} keyboard="phone-pad"/> 
              </View>
              <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                <CTMTextInput constant={true} defaultValue={formData.email} title="Email" mandatory={true} placeholder="Email" onChangeText={(value)=>onChangeTextHander("email",value)} keyboard="default"/> 
              </View>
              <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                <CTMTextInput defaultValue={formData.location} title="Location" mandatory={true} placeholder="Location" onChangeText={(value)=>onChangeTextHander("location",value)} keyboard="default"/> 
              </View>
              
              <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                <CTMTextInput constant={true} defaultValue={formData.state} title="State" mandatory={true} placeholder="State" onChangeText={(value)=>onChangeTextHander("state",value)} keyboard="default"/> 
              </View>
              <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                <CTMTextInput defaultValue={formData.city} title="City" mandatory={true} placeholder="City Name" onChangeText={(value)=>onChangeTextHander("city",value)} keyboard="default"/> 
              </View>
              <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                  <CTMButton marginBottom={true} theme="default" btnText="Update Profile" functionType="updateprofile" onPress={UpdateProfileHandler} isLoading={isLoading} /> 
              </View>  
            </ScrollView>
        </View>
    </ScreenWrapper>          
  )
}

export default MyProfile

const styles = StyleSheet.create({})