import { View, Text, ScrollView, StyleSheet ,Dimensions, BackHandler} from 'react-native'
import React, { useState, useEffect, useCallback  } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'
import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'

// header 
import ScndHeader from '../../components/headers/scndHeader'

// footer 
import MainFooter from '../../components/footer/mainFooter'

// components 
import SelectSiteComponent from '../../components/selectSite'

import LoadingCard from '../../components/selectSite/loadingCard'

const {width, height} = Dimensions.get('window'); 
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import ApiService from '../../ApiServices'


// notification 
import AnimatedMessage from '../../components/animatedNotification'; 

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
 

//main screen 
const SelectSite = ({ route })=>{
    
     // aimate notification 
     const [messages, setMessages] = useState([]);
     useEffect(()=>{
         // setTimeout(()=>{
         //   setMessages([]);
         // },2000);
     },[messages]);
    const  navigation = useNavigation();  
        
    const fromPage = route?.params?.fromPage || '';
    const [fromPageState,setfromPageState] = useState('');
    useEffect(()=>{
        const knowTheNavigation = () => {
            console.log("from page------------==============", route?.params?.fromPage); 
            console.log("store this route name into the storage and then clean it:", fromPage);
            AsyncStorage.setItem('fromPackageScreen', fromPage);
            setfromPageState(fromPage);
        }
        knowTheNavigation();
    },[]);

    // is loading 
    const [isLoading,setIsLoading] = useState(false); 

    const [isContinueActive,setisContinueActive] = useState(false)

    // recented created sitedata 
    const [recentAddedSite,setRecentAddedSite] = useState([]);

    // handler function
    const onHandleChange = (selectedSiteId)=>{
        console.log("selected site Id from select site screen:",selectedSiteId)
        // this is how we choose the selected site for user
        AsyncStorage.setItem('SelectedSite',`${selectedSiteId}`);
        setisContinueActive(true);
    } 
  
    useFocusEffect(
        useCallback(() => { 
          console.log('Screen came into focus');
          getAllCretedSites();
          AsyncStorage.getItem('SelectedSite',(err,creds)=>{
            if(creds){
                setisContinueActive(true)
            }else{
                setisContinueActive(false)
            }
          }) 
          return () => { 
            console.log('Screen went out of focus');
            getAllCretedSites();
          };
        }, [])
    ); 

    const getAllCretedSites = ()=>{
        setRecentAddedSite([]);
        let url = 'customer/ConstructionSite'; 
        // console.log("get all creates sited response : ",{
        //     url,
        //     "method":'get all created sites'
        // });
        ApiService.Getapiheader(url)
        .then(response=>{ 
            setRecentAddedSite([]);
            console.log("get all creates sited response : ",{
                "data":response.data,
                "lenght":response.data.sites.length
            });
            let data = response.data.sites;  
            if(data.length > 0 ){
                data.map((item,index)=>{
                    // console.log(item) 
                    setRecentAddedSite((preData)=>[...preData,{
                        id: item.ID,
                        siteName:item.name,
                        content:item.address
                    }]); 
                })
            }else{
                setMessages([`Something went getting all getAllCretedSites.`]);
            
            }
        })
        .catch(error=>{
            console.log("select site screen: ", error);
            setMessages([`Something went getting all getAllCretedSites. Error: ${error}`]);
            
        }) 
    }   
     
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
                    Title="Select Site" 
                    Search={true} 
                    Profile={false}  
                    Back={true}
                    BackScreen="" 
                    Skip={false} 
                    SkipScreen=""  
                />
                {/* End: Header */}
                
                <View style={{flex:1,padding:0,paddingHorizontal:10,marginTop:0}}>
                    {
                        recentAddedSite.length > 0 ?
                            <SelectSiteComponent data={recentAddedSite} isLoading={isLoading} onPress={onHandleChange}/>     
                        :
                        <>
                        {/* {
                            recentAddedSite.length == 0 ?
                                <Text style={{color:'black', fontSize:14, marginTop:12}}>No data Avaliable</Text>
                            : */}
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/>
                                <LoadingCard/> 
                                <LoadingCard/>
                            </ScrollView> 
                        {/* } */}
                            
                        </>
                    }  
                </View>    
                <MainFooter themeType={1} theme="light" isContinueActive={isContinueActive} isContinuetoHome={fromPage == "home"?true:false}/> 
            </ScreenWrapper> 
    )
}

export default SelectSite;