import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import React,{useEffect, useState, memo, } from 'react'
import Colors from '../../screens/utility/color';
import FontSize ,{FontWeight} from '../../screens/utility/fonts';

import styles from './style';

 
import FastImage from 'react-native-fast-image';

const Aifloreplan = (props) => {

  const [boxType,seyBoxType] = useState(props.BoxType); 

  const handleNavigation = async (link)=>{ 
    // const supported = await Linking.canOpenURL(link);  
    // await Linking.openURL(link);
  }

  return (
    <TouchableOpacity activeOpacity={0.91}   style={styles.container} onPress={()=>handleNavigation('https://homeplannner.com/')}>
        <View style={[styles.box,styles.upperBox,{backgroundColor:boxType=='color'?'#E6E6E6':'#E6E6E6'}]}> 
            {/* <AutoHeightImage
                    width={60}
                    maxHeight={60}
                    resizeMode="contain"
                    source={props.Image}
            /> */}
            {/* <WebView
                // originWhitelist={['*']}
                style={{width:60,height:60, backgroundColor: 'transparent'}}
                source={require('../../../assets/images/aifloreplan.gif')}
                containerStyle={{backgroundColor:'transparent'}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            /> */}
            <FastImage
                  style={{width:60,height:60, backgroundColor: 'transparent'}}
                 // source={require('./assets/gif/aifloreplan.gif')}
                 source={require('../../../assets/images/aifloreplan.gif')}
                 resizeMode={FastImage.resizeMode.contain}
            />
        </View>
        <View style={[styles.box,styles.lowwerBox,{flexDirection:'Column'}]}>
            <Text style={{textAlign:'center',color:Colors.red,fontSize:FontSize.xp,fontWeight:FontWeight.regular}}>
                {props.Text}
            </Text>
            <Text style={{marginLeft:4,textAlign:'center',color:Colors.black,fontSize:FontSize.xp,fontWeight:FontWeight.regular}}>
                {props.SndText}
            </Text> 
        </View>
    </TouchableOpacity>
  )
}


export default Aifloreplan;