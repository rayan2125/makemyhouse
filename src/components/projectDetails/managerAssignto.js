import { View, Text,StyleSheet, TouchableOpacity,Linking } from 'react-native'
import React from 'react'

import Usericonsnd from '../../../assets/images/icons/userIconsnd.svg';
import ChatIcons from '../../../assets/images/icons/chatIcons.svg';
import { actuatedNormalize } from '../../screens/utility/scaling';
import FontSize ,{FontWeight} from '../../screens/utility/fonts';
import Colors from '../../screens/utility/color';
import { useNavigation} from '@react-navigation/native';
const ManagerAssignTo = (props) => {
    const navigation = useNavigation(); 

    const openEmail = (url)=>{ 
        Linking.openURL(`mailto:${url}`).catch((err) => {
            console.error('Error opening email app', err);
            Alert.alert('Error', 'Failed to open email app');
        });
    }

    const openDialPad = (phoneNumber) => {
        const url = `tel:${phoneNumber}`;
      
        Linking.openURL(url).catch((err) => {
          console.error('Error opening dial pad', err);
          Alert.alert('Error', 'Failed to open dial pad');
        });
      };

    // Chat
    return (
        <>
        <View style={styles.container}>
            <View style={[styles.box,{ width:'20%'}]}> 
                <Usericonsnd width={actuatedNormalize(70)} height={actuatedNormalize(70)}/>
            </View>
            <View style={[styles.box,{ width:'60%',flexDirection:'column', alignItems:'flex-start',padding:12}]}>
                <Text style={{fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold', fontWeight:FontWeight.medium,color:Colors.SecondaryColor}}>{props.data.name}</Text>
                {
                    (props.data.phone_number != null || props.data.phone_number != '' || props.data.phone_number != undefined) ?
                    
                    <TouchableOpacity activeOpacity={0.62} onPress={()=>openDialPad(parseInt(props.data.phone_number))}>
                        <Text style={{fontSize:FontSize.xp, fontWeight:FontWeight.regular,color:Colors.SecondaryColor}}>{props.data.phone_number}</Text>
                    </TouchableOpacity>
                    
                    :
                    <></> 
                }
                <TouchableOpacity activeOpacity={0.62} onPress={()=>{openEmail('operations@makemyhouse.com')}}>
                    <Text style={{fontSize:FontSize.xxp, fontWeight:FontWeight.regular,color:Colors.SecondaryColor}}>Operations@makemyhouse.com</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.box,{ width:'20%'}]} onPress={()=>{navigation.navigate('Chat')}}>
                <ChatIcons width={actuatedNormalize(30)} height={actuatedNormalize(30)}/>
            </TouchableOpacity>
        </View> 
        </> 
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:120,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        borderRadius:9,
        elevation:3,
        position: 'relative',
        padding:10,
        marginTop:12
    },
    box:{
        width:'33%', 
        height:'100%', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    }
})

export default ManagerAssignTo