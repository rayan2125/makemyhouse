import { View, Text, ScrollView, StyleSheet ,Dimensions, Modal, TouchableOpacity, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'


// header 
import ScndHeader from '../../components/headers/scndHeader'

import MySiteComponent from '../../components/mysite'



//main screen 
const MySite = ()=>{

    // is loading 
    const [isLoading,setIsLoading] = useState(false); 

    // recented created sitedata 
    const [recentAddedSite,setRecentAddedSite] = useState([]);

    // handler function
    const onHandleChange = (selectedSiteId)=>{
        console.log("selected site Id:",selectedSiteId)
    }

    useEffect(()=>{
        setRecentAddedSite([
            {id:1,siteName:'Site Name',content:'Gangwal Bus Stand, Kagdipura Road, MOG Lines, Scheme No 71, Indore, Madhya Pradesh 452002, India.'},
            {id:2,siteName:'Zafar’s Site 2',content:'Gangwal Bus Stand, Kagdipura Road, MOG Lines, Scheme No 71, Indore, Madhya Pradesh 452002, India.'},
            {id:3,siteName:'GPO Site ',content:'Gangwal Bus Stand, Kagdipura Road, MOG Lines, Scheme No 71, Indore, Madhya Pradesh 452002, India.'},
            {id:4,siteName:'Zafar’s Site 4',content:'Gangwal Bus Stand, Kagdipura Road, MOG Lines, Scheme No 71, Indore, Madhya Pradesh 452002, India.'},
            {id:5,siteName:'Zafar’s Site 4',content:'Gangwal Bus Stand, Kagdipura Road, MOG Lines, Scheme No 71, Indore, Madhya Pradesh 452002, India.'},
            
        ])
    },[]); 
     
    return(
        <ScreenWrapper>
                {/* Start: Header */}
                <ScndHeader 
                    Title="My Site" 
                    Search={false} 
                    Profile={false}  
                    Back={true}
                    BackScreen="" 
                    Skip={false} 
                    SkipScreen=""  
                />
                {/* End: Header */}
                
                {/* Start: Main Body */}
                <View style={{flex:1,padding:0,paddingHorizontal:0,marginTop:0}}>

                    <View style={{flex:1,padding:0,paddingHorizontal:10,marginTop:0}}>
                        <MySiteComponent data={recentAddedSite} isLoading={isLoading} onPress={onHandleChange}/>     
                    </View> 
                    
                </View>

            </ScreenWrapper>
    )
}                


export default MySite;