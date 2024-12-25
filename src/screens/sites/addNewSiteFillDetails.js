import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'

// header 

import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'

// components 
import CTMTextInput from '../../components/textInput'; 
import CTMButton from '../../components/button'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation,useNavigationState  } from '@react-navigation/native';

// notification 
import AnimatedMessage from '../../components/animatedNotification';
import ScndHeader from '../../components/headers/scndHeader';
 


//main screen 
const AddNewSiteFillDetails = ()=>{
    // aimate notification 
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        // setTimeout(()=>{
        //   setMessages([]);
        // },2000);
    },[messages]);

    const  navigation = useNavigation();  
    const [isLoading,setIsLoading] = useState(false); 
 
    
    const [formData, setFormData] = useState({
        name: '',
        stage: '',
        pincode: '',
        state:'',
        city:'',
        // combinatiob of house number, address line 1, address line 2
       //location:'',
        houseNumber:'',
        addressLineOne:'',
        addressLineTwo:'',

        lat:'',
        long:''
    });
    
 
    // button handler this will only store the input data for 
    // now then move to next page where plot data is added and 
    // a single site is created successfuly.
    const CreateSiteHandler = ()=>{
        console.log("create site Handler",formData);
        setIsLoading(true)  
        if(checkForEmptyValues(formData) == false){
            console.log("Kindly fill all details.");
            setMessages(['Kindly fill all details.']);
            setIsLoading(false); 
        }else{
            setTimeout(()=>{
                setIsLoading(false); 
                AsyncStorage.setItem('createSite',JSON.stringify(formData))
                navigation.navigate('CreatePlot')
            },1200);
        }  
    } 
    
    // checkForEmptyValues if any field in formdata object is empty it returns
    const  checkForEmptyValues = (obj)=> {
        for (let key in obj) {
            if (obj.hasOwnProperty('addressLineTwo') && obj["addressLineTwo"] === '') {
                return true;
            }
            if (obj.hasOwnProperty(key) && obj[key] === '') {
                return false;
            }
        }
        return true;
    }
    

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

    // start: get the zip fron storage
    useEffect(()=>{
        console.log("get the pincode, city, state.")
        AsyncStorage.getItem('location',(err,credentials)=>{
            if(credentials != null){
                let  obj= JSON.parse(credentials);
                const match = obj.fulladdress.match(/\d{6}/);
                let pincoded = match ? match[0] : null;   
                setFormData({ ...formData, "pincode": pincoded, "lat": obj.latitude, "long": obj.longitude, "city":obj.city, "state":obj.short_State, "short_State":obj.short_State  });   
            } 
        }); 
    },[]);
    // end: get the zip fron storage
     
    // Start: drop down data 
    const DropDownData = [
        { label: 'Plot Finalisation', value: 'Plot Finalisation' },
        { label: 'Home Planning', value: 'Home Planning' }, 

        { label: 'Foundation Work', value: 'Foundation Work' },
        { label: 'Plinth Level Work', value: 'Plinth Level Work' }, 

        { label: 'Columns & Beam', value: 'Columns & Beam' },
        { label: 'Slab & Roof', value: 'Slab & Roof' }, 

        { label: 'Wall Work', value: 'Wall Work' },
        { label: 'Plastering', value: 'Plastering' }, 
        
        { label: 'Home Maintenance', value: 'Home Maintenance' }, 
    ];
    // end: drop down data 

    return(
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
                    Title="Add New Site" 
                    Search={false} 
                    Profile={false}  
                    Back={true}
                    BackScreen="" 
                    Skip={false} 
                    SkipScreen=""  
                />
                {/* End: Header */} 
                    <ScrollView  bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true} style={{padding:0,paddingVertical:10}}>
                    
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput title="Site Name" mandatory={true} placeholder="Site Name" onChangeText={(value)=>onChangeTextHander("name",value)} keyboard="default"/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput title="House / Ofifice / Block Number"  mandatory={true} placeholder="Enter House / Block Number" onChangeText={(value)=>onChangeTextHander("houseNumber",value)} keyboard="default"/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput title="Addres Line"  mandatory={true} placeholder="" onChangeText={(value)=>onChangeTextHander("addressLineOne",value)}/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput title="Addres Line (Near By Landmark)" placeholder="" onChangeText={(value)=>onChangeTextHander("addressLineTwo",value)} keyboard="default"/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput title="Pin Code"  mandatory={true} placeholder="452001" onChangeText={(value)=>onChangeTextHander("pincode",value)} keyboard="phone-pad" defaultValue={formData.pincode}/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput title="City"  mandatory={true} placeholder="Ex. City" onChangeText={(value)=>onChangeTextHander("city",value)} keyboard="default" defaultValue={formData.city}/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput title="State"  mandatory={true} placeholder="Ex. State" onChangeText={(value)=>onChangeTextHander("state",value)} keyboard="default" defaultValue={formData.state}/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput defaultValue={formData.stage} title="Select Home Building Stage"  mandatory={true} placeholder="Select Home Building Stages" onChangeText={(value)=>onChangeTextHander("stage",value)} keyboard="default" dropDown={true} dropDownTitle="Select Home Building Stage" dropdowndata={DropDownData}/> 
                            </View>  
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMButton marginBottom={true} theme="default" btnText="Continue" functionType="createaccount" onPress={CreateSiteHandler} isLoading={isLoading} /> 
                            </View>  
                            
                    </ScrollView> 
            </ScreenWrapper> 
    )
}

export default AddNewSiteFillDetails;