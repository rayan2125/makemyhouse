import React,{useEffect, useState, memo, useCallback} from 'react'
import {View, Text,  Image, TouchableOpacity,   } from 'react-native'; 
let APIURL = 'https://api.makemyhouse.com/'; 

import Images from '../utility/images';
import ApiService from '../../ApiServices';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const FavIcon = ({projectid, wishlisted})=>{
    const [fav,setfav] = useState(wishlisted);  
    
    
    useEffect(()=>{
        const func = ()=>{
            AsyncStorage.getItem('UserToken',(err, cr)=>{
                let url = `${APIURL}public/projects/project_details/${projectid}?token=${cr}`; 
                console.log("-----", url); 
                const response = axios.get(url);
                if(response && response.data){    
                    console.log(`${response.data.wishlisted} -- ${projectid}`)
                    if(response.data.wishlisted == true){
                        setfav(true); 
                    } 
                } 
            });
        }
        func();
    },[]);
    

    const addfav=(id)=>{ 
        let body = {
            project_id: id,
        }
        let url = `customer/wishlist`
        ApiService.Post(url, body)
        .then(response => {
            if(response && response.status==200) { 
                // console.log("add fav response: ", response.data)
                if(response.data.project_id){ 
                    setfav(true);
                }   
            }
        }).catch(e => {
            console.log("add fav",e);
        }) 
    }
    const removefav=(id)=>{ 
        let body = {
            project_id: id,
        }
        let url = `customer/wishlist`
        ApiService.Post(url, body)
        .then(response => {
            if(response && response.status==200) { 
                // console.log("add fav response: ", response.data)
                if(response.data.project_id){ 
                    setfav(false);
                }   
            }
        }).catch(e => {
            console.log("remove fav",e);
        }); 
    } 
    

    return(
        <>   
           
            {
                fav?
                <TouchableOpacity activeOpacity={0.8} onPress={() => removefav(projectid)}>
                            <View
                                style={{
                                    width: 45,
                                    height: 45,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#00000050",
                                    borderRadius: 50,
                                }}
                            >
                                <Image
                                source={Images.LikeFill}
                                style={{ width: RFValue(24), height: RFValue(22) }}
                                />
                                
                            </View>
                            
                            <View style={{ alignSelf: "flex-end", marginRight: 20 }} />
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{addfav(projectid)}}>  
                    <View  style={{width:45, height:45, justifyContent:"center", alignItems:'center', alignItems:'center', backgroundColor: "#00000050", borderRadius:50  }}>
                        <Image source={Images.Likereel} style={{ width:RFValue(34),height:RFValue(34) }} /> 
                    </View>
                     
                    <View style={{ alignSelf: "flex-end", marginRight: 20, }}> 
                    </View>
                </TouchableOpacity>
            }
           

        </>
    )
}

export default memo(FavIcon);