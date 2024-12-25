import React,{useEffect, useState, memo} from 'react'
import {View, Text,  Image, TouchableOpacity,   } from 'react-native'; 
 
import Images from '../../utility/images';
import ApiService from '../../ApiServices';
import { RFValue } from 'react-native-responsive-fontsize';
 
const FavIcon = (props)=>{
    // const [fav,setfav] = useState([props.favdata]); 
 
       

    const [favcon,setfavcon] = useState(false);

    return(
        <>  
              {
                props.favarray.includes(props.projectid) && (
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => props.removefav(props.projectid)} // Ensure you're using item.projectID here
                        >
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
                        <Text style={{color:'red', fontWeight:'700'}}>{props.projectid}</Text>
                        <View style={{ alignSelf: "flex-end", marginRight: 20 }} />
                        </TouchableOpacity>
                    )
                }

                {
                    !props.favarray.includes(props.projectid) && ( 
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{props.addfav(props.projectid)}}>  
                            <View  style={{width:45, height:45, justifyContent:"center", alignItems:'center', alignItems:'center', backgroundColor: "#00000050", borderRadius:50  }}>
                                <Image source={props.favarray.includes(props.projectid)?Images.Likereel:Images.LikeFill} style={{ width:RFValue(34),height:RFValue(34) }} /> 
                            </View>
                            <Text style={{color:'red', fontWeight:'700'}}>{props.projectid}</Text>
                            <View style={{ alignSelf: "flex-end", marginRight: 20, }}> 
                            </View>
                        </TouchableOpacity>
                    )
                }
        </>
    )
}

export default FavIcon;