import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React,{memo, useState, useRef, useCallback, useEffect} from 'react';
 
const { width, height} = Dimensions.get("window");

 
import Colors from '../../screens/utility/color';
import Images from '../../screens/utility/images';

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize ,{FontWeight} from '../../screens/utility/fonts';
 
import Swiper from 'react-native-swiper';
 
// pendingPayment

 
import { useNavigation,  } from '@react-navigation/native';

const RelatedProjects = (props) => {
    const  navigation = useNavigation();  
    
    // active index 
    const [activeIndex, setActiveIndex] = useState(0);

    const NavigationHandler =(id)=>{   
        // console.log("related project: ", id);
        // AsyncStorage.removeItem('projectIdNewTimeline');
        // AsyncStorage.setItem('projectIdNewTimeline',`${id}`);
        // navigation.navigate('ProjectStack',{projectid:id});
        props.getRelatedProjectiD(id);
    } 
  
  return (
    <Swiper style={{ height:260, marginBottom:0, pointerEvents: "box-none"}} 
        loop={false}
        useNativeDriver={false}
        animated={true}  showsPagination={true} pagingEnabled={true}
        bounces={true} removeClippedSubviews={true}  
        onIndexChanged={(index) => setActiveIndex(index)}
        dot={<View style={{backgroundColor:Colors.lightGray, width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 32, marginBottom: 3,}} />}
        activeDot={<View style={{backgroundColor:Colors.PrimaryColor, width: 12, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 32, marginBottom: 3,}} />}
    >
            {
                props.data&&
                (props.data.length > 0? 
                (
                    props.data.map((item,index)=>{
                    return(
                        <View key={item.id} style={[styles.slide]}> 
                            <TouchableOpacity  style={styles.InnerSlide} onPress={()=>NavigationHandler(item.projectid)}> 
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
                        </View>
                    ) 
                    })
                ) 
                :<Text>No data</Text>)
            }  
    </Swiper> 
  )
}
const styles = new StyleSheet.create({   
    slide:{
      width:width, 
      height:220,
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      padding:4, 
    },
    InnerSlide:{ 
        width:'96%',
        height:180,
        backgroundColor:'#ECF3FF',
        borderRadius:12, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2, 
        elevation:3,
        position:'relative'  
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
export default RelatedProjects