import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'

// header 
import ScndHeader from '../../components/headers/scndHeader'
import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'

// components 
import CTMTextInput from '../../components/textInput'; 
import CTMButton from '../../components/button'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation,useNavigationState  } from '@react-navigation/native';

// notification 
import AnimatedMessage from '../../components/animatedNotification';
import ApiService from '../../ApiServices'
 


//main screen 
const UpdateAddNewSiteFillDetails = ()=>{
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
        id:'',
        name: '',
        stage: '',
        pincode: '',
        state:'',
        city:'',
        // combinatiob of house number, address line 1, address line 2
        // location:'',
        houseNumber:'',
        addressLineOne:'',
        addressLineTwo:'',

        address:'',

        lat:'',
        long:'',

        // create plot page 
        purpose:'', // purpose of home builing 
        type:'', // plot shape (rectangle/non-rectangle) 
        width:'', // width 
        // depth:'', // height 
        plot_area:'', // area  
        floors:'', // floors 
        direction:'', // direction 
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
                
                CreateSiteApiCall();
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
        setFormData({ ...formData, [key]: value });
    }
    useEffect(()=>{
        console.log("formData updated", formData);
    },[formData]);
    // End: TextInput

    // start: get the site details 
    useEffect(()=>{ 
        AsyncStorage.getItem('UpdateCreateSite',(err,credentials)=>{  
            AsyncStorage.getItem('updatescreenlocation',(err,location)=>{
                let aa = JSON.parse(location)
                console.log(aa);
                  // console.log("create stie and plot details: ",JSON.parse(credentials))
                if(credentials != null){
                    let  obj= JSON.parse(credentials);  
                    // console.log("create stie and plot details: ",obj); 
                    setFormData({
                        ...formData,
                        id:obj.id,
                        name: obj.name,
                        stage: obj.stage,
                        pincode: obj.pincode,
                        state:obj.state,
                        city:obj.city,  

                        address:`${obj.houseNumber}, ${obj.addressLineOne}, ${obj.addressLineTwo}`,  

                        houseNumber:obj.houseNumber,
                        addressLineOne:obj.addressLineOne,
                        addressLineTwo:obj.addressLineTwo,

                        lat:aa.lat,
                        long:aa.long,

                        purpose:obj.purpose,
                        type:obj.type,
                        plot_area:parseInt(obj.plot_area),
                        width:parseInt(obj.width),  
                        // depth:parseInt(obj.depth),  
                        floors: obj.floors,
                        direction:obj.direction
                    }); 
                } 
            }); 
        });
    },[]);
    // end: get the site details 

    // api call to create site 
    const CreateSiteApiCall = async ()=>{
    setIsLoading(true)   
    let url = `customer/ConstructionSite/${formData.id}`; 
        try{ 
            // AsyncStorage.removeItem('SelectedSite');
                
            let newFormData = {
                name:formData.name,
                stage: formData.stage,
                pincode: parseInt(formData.pincode),
                state:formData.state,
                city:formData.city,

                address:`${formData.houseNumber}, ${formData.addressLineOne}, ${formData.addressLineTwo}`, 

                lat:formData.lat,
                long:formData.long,

                // create plot page 
                purpose:formData.purpose,  
                type:formData.type, 
                width:parseInt(formData.width),      
               // depth:parseInt(formData.plot_area) / parseInt(formData.width),

                plot_area:parseInt(formData.plot_area), 
                floors:parseInt(formData.floors),  
                direction:formData.direction,  
            }
            console.log("create site api call:----", newFormData);
            await ApiService.Put(url,newFormData)
            .then((res)=>{
                console.log(res.data.data.ID);
                // AsyncStorage.setItem('plotDetilaResponse',response.data);
                AsyncStorage.setItem('SelectedSite',`${res.data.data.ID}`); 
                setTimeout(()=>{ 
                    navigation.navigate('SiteDetails');
                    // navigation.navigate('SettingsStack', { screen: 'SettingsScreen1', params: { name: 'John Doe' } });
                },1200);
            })
            .catch(err=>{
                setIsLoading(false);
                console.log("while creating site then-catch error: ",err)
                setMessages(['Internal server error, Please try again later.'])
            })

        }catch(error){
            setIsLoading(false);
            console.log("while creating site try-catch: ",error)
            setMessages(['Internal server error, Please try again later.'])
        } 
    } 
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
                    Title="Update Site" 
                    Search={false} 
                    Profile={false}  
                    Back={false}
                    BackScreen="" 
                    Skip={false} 
                    SkipScreen=""  
                />
                {/* End: Header */} 
                    <ScrollView  bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={true} style={{padding:0,paddingVertical:10}}>
                    
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput defaultValue={formData.name} title="Site Name" placeholder="Site Name" onChangeText={(value)=>onChangeTextHander("name",value)} keyboard="default"/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput defaultValue={formData.address.split(',')[0]} title="House / Ofifice / Block Number" placeholder="Enter House / Block Number" onChangeText={(value)=>onChangeTextHander("houseNumber",value)} keyboard="default"/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput defaultValue={formData.address.split(',')[1]}  title="Addres Line"placeholder="" onChangeText={(value)=>onChangeTextHander("addressLineOne",value)}/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput defaultValue={formData.address.split(',')[2]}  title="Addres Line (Near By Landmark)"  placeholder="" onChangeText={(value)=>onChangeTextHander("addressLineTwo",value)} keyboard="default"/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput defaultValue={formData.pincode} title="Pin Code" placeholder="452001" onChangeText={(value)=>onChangeTextHander("pincode",value)} keyboard="phone-pad"  /> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput defaultValue={formData.city} title="City" placeholder="Ex. City" onChangeText={(value)=>onChangeTextHander("city",value)} keyboard="default"/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput  defaultValue={formData.state} title="State" placeholder="Ex. State" onChangeText={(value)=>onChangeTextHander("state",value)} keyboard="default"/> 
                            </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMTextInput defaultValue={formData.stage} title="Select Home Building Stage"  placeholder="Select Home Building Stages" onChangeText={(value)=>onChangeTextHander("stage",value)} keyboard="default" dropDown={true} dropDownTitle="Select Home Building Stages" dropdowndata={DropDownData}/> 
                            </View>  
                            <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                                <CTMButton marginBottom={true} theme="default" btnText="Update & Save" functionType="createaccount" onPress={CreateSiteHandler} isLoading={isLoading} /> 
                            </View>  
                            
                    </ScrollView> 
            </ScreenWrapper> 
    )
}

export default UpdateAddNewSiteFillDetails;