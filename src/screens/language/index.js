import { View, Text, ScrollView, StyleSheet ,Dimensions, Image, TouchableOpacity, TextInput, FlatList} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'


// header 
import ScndHeader from '../../components/headers/scndHeader'



const {width, height} = Dimensions.get('window'); 

import Images from '../utility/images';

import FontSize from '../utility/fonts';

import { useRoute } from '@react-navigation/native';

import { useNavigation,useNavigationState  } from '@react-navigation/native';

// Start: icons 

// end: icons

// notification 
import AnimatedMessage from '../../components/animatedNotification';

const STORE_LANGUAGE_KEY = "settings.lang";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const LanguageScreen = (props) => {
  const { t, i18n } = useTranslation();
    // aimate notification 
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
        // setTimeout(()=>{
        //   setMessages([]);
        // },2000); 
    },[messages]);
  const navigation = useNavigation(); 
  const route = useRoute();

  const [selectedLanguage,setselectedLanguage] = useState('en');
  useEffect(()=>{
    AsyncStorage.getItem(STORE_LANGUAGE_KEY, (err, language) => {
      if(language == null || language == ""){
        console.log("----alreay selected language----1", language); 
        setselectedLanguage('en');
      }
      else {
        setselectedLanguage(language); 
      }
    });
  },[]);

  const LanguageHandler = (language)=>{
      setselectedLanguage(language.trim().toLowerCase());
      console.log("selected language::", language);
      i18n.changeLanguage(language.trim().toLowerCase());
  }

  return (
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
                Title="Language"
                Search={false} 
                Profile={false}  
                Back={true}
                BackScreen="More" 
                Skip={false} 
                SkipScreen=""   
            /> 

              <View showsVerticalScrollIndicator={false} style={{flex:1,padding:0,paddingHorizontal:0,marginTop:0}}>
                <View style={{padding:0}}> 
                    <View style={[styles.container,{padding:2}]}>  
                         <TouchableOpacity style={[styles.languageBox]} onPress={()=>LanguageHandler('en')}>
                            <View style={styles.languageBoxActive}>
                                {
                                  selectedLanguage == 'en'? <Image source={Images.FilterSelect} style={{ height: 25, width: 25.5 }} /> : <Image source={Images.FilterUnselect} style={{ height: 25, width: 25.5 }} />
                                }
                            </View>
                            <Text style={styles.languageBoxText}>A</Text>
                            <Text style={styles.languageBoxTextSecond}>English</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={[styles.languageBox]} onPress={()=>LanguageHandler('hi')}>
                            <View style={styles.languageBoxActive}>
                                {
                                  selectedLanguage == 'hi'? <Image source={Images.FilterSelect} style={{ height: 25, width: 25.5 }} /> : <Image source={Images.FilterUnselect} style={{ height: 25, width: 25.5 }} />
                                }
                            </View>
                            <Text style={styles.languageBoxText}>आ</Text>
                            <Text style={styles.languageBoxTextSecond}>हिंदी</Text>
                         </TouchableOpacity> 
                    </View> 
                </View> 
              </View> 
        </ScreenWrapper>
  )
}
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  languageBox:{
    width:width / 3 - 12,
    height:120, 
    borderRadius:6,
    margin:5,
    backgroundColor:'#ffffff',
    borderWidth:2,
    borderColor:'#ffffff',
    elevation:4 ,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    position: 'relative', 
  },
  languageBoxActive:{
    width:40,
    height:40, 
    position: 'absolute',
    top:6,
    right:6,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  languageBoxText:{
    color:'#000000',
    fontSize:FontSize.h3,
    fontWeight:'600',
    marginBottom:8
  },
  languageBoxTextSecond:{
    color:'#000000',
    fontSize:FontSize.h6,
    fontWeight:'400'
  }
})
export default LanguageScreen

