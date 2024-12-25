import { VirtualizedList, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React,{useEffect, useState, memo, useCallback } from 'react'
import Colors from '../../screens/utility/color';
import FontSize from '../../screens/utility/fonts';
 
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

import Images from '../../screens/utility/images';


import RupeeColor from '../../../assets/images/icons/rupeeColor.svg';

import SvgUri from 'react-native-svg-uri'; // Import SvgUri
import { RFValue } from 'react-native-responsive-fontsize';


const SelectAddOnsComponent = (props) => {
    
    // data
    const Data = props.data;

    // state 
    const [selectedSite,setSelectedSite] = useState('');

    // const onHandlerState = (state)=>{
    //     setSelectedSite(state)
    //     props.onPress(state);
    // }

    // start: virtualization
    const getItemCount = (data,index) => data.length;
    const getItem  = (data,index)=>{ 
        return data[index];
    }

    // on press 
    const [selectAdonsState,setselectAdonsState] = useState([]);

    const selectAdons = (id)=>{
        const isPresentInArray = selectAdonsState.includes(id);
        if(isPresentInArray == true){
            console.log("id already in array");    
            setselectAdonsState(() => selectAdonsState.filter((item) => item != id)); 
            // return props.onPress(selectAdonsState);
        }else{ 
            console.log("id not in array")
            setselectAdonsState(()=>[...selectAdonsState , id]); 
           // return props.onPress(selectAdonsState);
        } 
    }

    useEffect(()=>{
       props.onPress(selectAdonsState);
    },[selectAdonsState]);

    useEffect(()=>{
        // make it empty
        setselectAdonsState([]);
    },[]);

    const renderItem = useCallback(({item,index}) => (
        <View  key={index} style={[styles.Container,index == 0?{marginTop:22}:null]}  > 
            <View style={styles.InnerBoxShadow}></View>
            <View style={styles.InnerBox}>
                <View style={[styles.innerUpper,{flexDirection:'row',justifyContent:'flex-start'}]}> 
                       
                        <RupeeColor width={16} height={16} style={{marginTop:2}}/>
                        <Text style={[styles.innerUpperText,{fontWeight:'500'}]}>{item.totalPrice}</Text> 
                     
                </View>
                <View style={styles.innerLowwer}>

                        {/* start: loop all the elements */}

                        {
                            item.innerElements.map((item,index)=>{
                                return( 
                                    <TouchableOpacity key={index} style={{padding:0,width:'100%',flexDirection:'row',
                                            height:110, justifyContent:'center', flexDirection:'row',justifyContent:'center',
                                            alignItems:'center',alignContent:'center',
                                            borderBottomWidth:2,borderBottomColor:Colors.lighteshGray
                                    }} 
                                    onPress={()=>selectAdons(item.id)}
                                    >

                                        <View style={[styles.itemBox,{width:'10%',height:'100%'}]}>
                                           
                                            {
                                                selectAdonsState.includes(item.id)?
                                                    <AutoHeightImage
                                                        width={30} 
                                                        source={Images.CheckTickFill}
                                                    />
                                                :
                                                    <AutoHeightImage
                                                        width={30} 
                                                        source={Images.CheckTickEmpty}
                                                    /> 
                                            } 

                                        </View>
                                        <View style={[styles.itemBox,styles.ImagesContanier,{width:'20%'}]}>
                                            {
                                                item.icon == true ?
                                                    <SvgUri
                                                        width={RFValue(16)}
                                                        maxHeight={RFValue(16)}
                                                        source={{ uri: item.image }} // Set the source to the SVG URL
                                                    />
                                                :
                                                    <AutoHeightImage
                                                        width={46} 
                                                        // source={Images.selectAddOne}
                                                        source={{uri:item.image}}
                                                    /> 
                                            }  
                                        </View>

                                        <View style={[styles.itemBox,styles.titleContainer,{width:'40%',alignItems:'flex-start'}]}>
                                                <Text style={{fontSize:FontSize.xp,color:Colors.black}}>{item.titke}</Text>
                                                <Text style={{fontSize:FontSize.xxp,color:Colors.blackShadeTwo}}>{item.content}</Text>
                                        </View> 
                                        <View style={[styles.itemBox,styles.priceContainer,{width:'30%',height:'100%'   }]}> 
                                            <RupeeColor width={16} height={16} style={{marginTop:2}}/>
                                            <Text style={[styles.innerUpperText,{fontWeight:'500'}]}>{item.price}</Text> 
                                        </View> 
                                    </TouchableOpacity>
                                )
                            })
                        } 
                     
                        {/* end: loop all the elements */}
                    
                </View>
            </View>
        </View>
    ))
    // end: virtualization

    return(
        <VirtualizedList
            windowSize={4}
            data={Data}
            initialNumToRender={4}
            keyExtractor={(item,index) => index}
            getItemCount={getItemCount}
            renderItem={renderItem}
            getItem={getItem}  
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    )
}
const styles = new StyleSheet.create({
    Container:{
        width:'100%',  
        backgroundColor:'orange',
        position:'relative',
        marginTop:10,
        marginBottom:12, 
        borderRadius:12 
    },
    InnerBoxShadow:{
        width:'100%',
        minHeight:210,
        backgroundColor:Colors.SecondaryColor, 
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12,
        position:'absolute',
        top:-2, 
    },

    InnerBox:{
        width:'100%',
        minHeight:210,
        backgroundColor:'#fff',
        borderRadius:3,  
        paddingBottom:22
    }, 
    innerUpper:{
        width:'100%',
        height:45,
        backgroundColor:'#EDF4F9',
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        paddingHorizontal:12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
    }, 
    innerLowwer:{
        width:'100%',  
        paddingHorizontal:10,
        paddingTop:10,
        backgroundColor:'#ffffff' 
    },
    
    innerUpperText:{
        color:Colors.SecondaryColor,
        fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',
        marginLeft:2
    },
    priceContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        alignContent:'center'
    },
    itemBox:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }
})
export default SelectAddOnsComponent