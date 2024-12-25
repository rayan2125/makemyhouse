import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React,{useEffect, useState, memo, } from 'react'
import Colors from '../../screens/utility/color';
import FontSize ,{FontWeight} from '../../screens/utility/fonts';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

import styles from './style';

import { SvgUri } from 'react-native-svg';



const DesignPlanning = (props) => {

  const [boxType,seyBoxType] = useState(props.BoxType);  

  return (
    <TouchableOpacity activeOpacity={0.91}  style={styles.container} onPress={()=>{props.onPressNavigation()}}>
        <View style={[styles.box,styles.upperBox,{backgroundColor:boxType=='color'?'#D3EDD7':'#E6E6E6'}]}>
              {
                props.tag != ""? 
                  <View style={styles.tag}>
                      <Text style={[styles.tagText,{fontSize:FontSize.xxxp, color:"#ffffff"}]}>{props.tag}</Text>
                  </View>
                :
                null 
              }
                <View style={{width:50,height:50, backgroundColor:'#ffffff', borderRadius:50,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  {
                    props.apiImageB == true?
                    // <AutoHeightImage
                    //     width={22}
                    //     maxHeight={22}
                    //     resizeMode="contain"
                    //     source={{uri:props.apiImage}}
                    // />  
                    // <FastImage
                    //     style={{width:22,height:22, backgroundColor: 'transparent'}} 
                    //     source={{uri:`${props.apiImage}`}}
                    //     resizeMode={FastImage.resizeMode.contain}
                    // />
                    <SvgUri
                      width="50%"
                      height="50%"
                      uri={props.apiImage}
                    />
                    :
                    <AutoHeightImage
                        width={22}
                        maxHeight={22}
                        resizeMode="contain"
                        source={props.Image}
                    />  
                  }
                    
                </View>
        </View>
        <View style={[styles.box,styles.lowwerBox]}>
            <Text style={{textAlign:'center',color:Colors.black,fontSize:FontSize.xp,fontWeight:FontWeight.regular}}>{props.Text}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default DesignPlanning;