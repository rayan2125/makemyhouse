import React,{useEffect, useState, memo} from 'react'
import {View, Text,  Image, TouchableOpacity,   } from 'react-native'; 
 
import Images from '../utility/images';
import ApiService from '../../ApiServices';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';

let favIconsArray = new Array();

const FavIcon = ({favarray,projectid , wishlisted})=>{
    const [fav,setfav] = useState(wishlisted); 
  
    useEffect(()=>{
        console.log(`i'm the fav of ${projectid} -- ${favarray} -- ${fav}`)
        if(wishlisted == true){
            favIconsArray.push(projectid); 
        }
        console.log("favIconsArray: ",favIconsArray);
        AsyncStorage.getItem("favitems",(err,creds)=>{
            console.log("local storage: ", creds);
        }); 

    },[fav,favIconsArray]);

    const addfav=(id)=>{
        favIconsArray.push(id);
        console.log(favIconsArray.includes(id));
        console.log("id: ", id)
        setfav(true)
        let body = {
            project_id: id,
        }
        let url = `customer/wishlist`
        ApiService.Post(url, body)
        .then(response => {
            if(response && response.status==200) { 
                // console.log("add fav response: ", response.data)
                if(response.data.project_id){ 
                    AsyncStorage.getItem("favitems",(err,creds)=>{
                        console.log("local storage: ", typeof creds);

                    });   
                } 
                console.log("fav");
            }
        }).catch(e => {
            console.log("add fav",e);
        }) 
    }
    const removefav=(id)=>{
        console.log(favIconsArray.includes(id));
        console.log("id: ", id)
        setfav(false);
        // let body = {
        //     project_id: id,
        // }
        // let url = `customer/wishlist`
        // ApiService.Post(url, body)
        // .then(response => {
        //     if(response){
        //         console.log("remove fav response: ", response)
        //         //setfav(false);
        //         // setfav((prev) => prev.filter((id) => id !== response.project_id));
        //     } 
        // }).catch(e => {
        //     console.log("remove fav",e);
        // }); 
    } 
    

    return(
        <>   
            {/* <Text style={{color:'blue', fontWeight:'800'}}>
                 {favarray[0]}
            </Text>
            <TouchableOpacity onPress={()=>setfav(true)}>
                    
                <Text style={[{ fontWeight:'800'},fav?{color:"green"}:{color:'red'}]}>
                    {projectid}
                </Text>
            </TouchableOpacity> */}
            {
                favIconsArray.includes(projectid) && fav?
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
                            <Text style={{color:'red', fontWeight:'700'}}>{projectid}</Text>
                            <View style={{ alignSelf: "flex-end", marginRight: 20 }} />
                </TouchableOpacity>
                :
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{addfav(projectid)}}>  
                    <View  style={{width:45, height:45, justifyContent:"center", alignItems:'center', alignItems:'center', backgroundColor: "#00000050", borderRadius:50  }}>
                        <Image source={Images.Likereel} style={{ width:RFValue(34),height:RFValue(34) }} /> 
                    </View>
                    <Text style={{color:'red', fontWeight:'700'}}>{projectid}</Text>
                    <View style={{ alignSelf: "flex-end", marginRight: 20, }}> 
                    </View>
                </TouchableOpacity>
            }
           

        </>
    )
}

export default FavIcon;