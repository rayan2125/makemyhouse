import React,{useCallback, useEffect} from 'react';

import {View, Image, TouchableOpacity, Dimensions, BackHandler} from 'react-native';

import { useNavigation,useNavigationState  } from '@react-navigation/native';
import Images from '../utility/images';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const DesignIdea = ()=>{
 
    const  navigation = useNavigation();    

    return (

        <View style={{width:'100%',height:'100%',backgroundColor:'#fff',padding:0}}>
             <TouchableOpacity style={{width:'100%', height:windowHeight/2, }} onPress={()=>navigation.navigate('ArchitectDesign')}> 
                 <Image style={{ width: '100%', height: '100%' }}  resizeMode="cover"
                    source={Images.Architect} /> 
             </TouchableOpacity>
             
             <TouchableOpacity style={{width:'100%', height:'50%', }} onPress={()=>navigation.navigate('InteriorDesign')}> 
                <Image style={{ width: '100%', height: '100%' }}  resizeMode="cover"
                    source={Images.Interior} /> 
             </TouchableOpacity>
        </View>
    )
}

export default DesignIdea;