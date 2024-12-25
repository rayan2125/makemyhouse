import { View, Text, StyleSheet,VirtualizedList, TouchableOpacity } from 'react-native'
import React,{useState, useEffect, useCallback} from 'react'

import Images from '../../screens/utility/images';
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize,{FontWeight} from '../../screens/utility/fonts';
import Colors from '../../screens/utility/color';
import { useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MyProjectComponent = (props) => {
    const  navigation = useNavigation();  

    // start: list refreshing 
    const [refreshing,setRefreshing] = useState(false);
    const handleRefreshing = ()=>{
        setRefreshing(true);
        props.onRefreshing();
        setRefreshing(false);
    }
    // end: list refreshing 

    // start: virtualization
    const getItemCount = (data,index) => data.length;
    const getItem  = (data,index)=>{ 
        return data[index];
    }
    
    // ProjectStack
    const NavigationHandler =(id)=>{  
        console.log("my project screen:  clicked project =--->", id);
        AsyncStorage.setItem('projectIdNewTimeline',`${id}`);
        navigation.navigate('ProjectStack',{projectid:id});
    }

    const renderItem = useCallback(({item,index}) => (
        <TouchableOpacity key={index} style={[styles.Container,index == 0?{marginTop:12}:null, index+1 == props.data.length?{marginBottom:60}:{}]}  onPress={()=>NavigationHandler(item.projectid)}> 
            <View style={[styles.upperSection]}>
                   <View style={[styles.shortNameContainer]}>
                        <View style={[styles.shortNameContainerCircle]}>
                            <Text style={[styles.shortNameContainertext]}>{item.shortName}</Text>
                        </View> 
                   </View>
                   <View style={[styles.extraNameContainer]}>
                        <Text style={[styles.upperSectiontext]}>{item.extrData}</Text>
                   </View> 
            </View>
            <View style={[styles.lowwerSection]}>
                    <View style={[styles.lowwerSectionLeft]}>
                            {/* <Text style={[styles.lowwerSectiontext]}>{item.siteName}</Text> */}
                    </View>
                    <View style={[styles.lowwerSectionRight]}>
                            <Text style={[styles.lowwerSectiontext,{marginRight:6, color:Colors.SecondaryColor, fontWeight:FontWeight.medium}]}>Dashboard</Text>
                            <AutoHeightImage
                                width={18}  
                                resizeMode="contain"
                                source={Images.MoreRightArrow} 
                            />
                    </View>
            </View>
        </TouchableOpacity>
    ))
    // end: virtualization

  return (
    <VirtualizedList
        windowSize={4}
        data={props.data}
        initialNumToRender={4}
        keyExtractor={(item,index) => index}
        getItemCount={getItemCount}
        renderItem={renderItem}
        getItem={getItem}  
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{padding:10, paddingBottom:44}}
        refreshing={refreshing}
        onRefresh={handleRefreshing}
    />
  )
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:180,
        backgroundColor:'#ECF3FF',
        borderRadius:6,
        borderTopLeftRadius:22,
        borderTopRightRadius:22, 
        elevation:4,
        marginBottom:34,
        flexDirection:'column',
        position: 'relative', 
    },
    upperSection:{
        width:'100%',
        height:'60%', 
        borderTopLeftRadius:22,
        borderTopRightRadius:22, 
        padding:8,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center',
        position:'relative' 
    }, 
    shortNameContainer:{ 
        width:'20%',
        height:'100%', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    shortNameContainerCircle:{
        width:65,
        height:65,
        backgroundColor:'#3CAF4B',
        borderRadius:100,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },  
    shortNameContainertext:{
        fontSize:FontSize.h4,
        fontWeight:FontWeight.medium,
        color:'#ffffff'
    }, 
    extraNameContainer:{
        width:'80%',
        height:'100%', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'flex-start',  
        marginLeft:8
    }, 
    upperSectiontext:{
        fontSize:FontSize.p - 1,
        color:"#000000",
        fontWeight:FontWeight.medium
    },   
    lowwerSection:{
        width:'100%',
        height:'22%',
        backgroundColor:'#ffffff',
        paddingHorizontal:12,
        paddingVertical:0,
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center' 
    },
    lowwerSectionLeft:{
        width:'65%',  
    },
    lowwerSectionRight:{
        width:'35%', 
        flexDirection:'row',
        justifyContent:'flex-end',
        alignContent:'center',
        alignItems:'center' ,
        borderLeftWidth:2,
        borderColor:'#000'
    },
    lowwerSectiontext:{
        fontSize:FontSize.xp,
        color:'black'
    }
})

export default MyProjectComponent