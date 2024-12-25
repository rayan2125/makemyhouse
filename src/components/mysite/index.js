import { VirtualizedList, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React,{useEffect, useState, memo, useCallback } from 'react'
import Colors from '../../screens/utility/color';
import FontSize ,{FontWeight} from '../../screens/utility/fonts';
 
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import Images from '../../screens/utility/images';
 
const MySiteComponent = (props) => {
    
    // data
    const Data = props.data;

    // state 
    const [selectedSite,setSelectedSite] = useState('');

    const onHandlerState = (state)=>{
        setSelectedSite(state)
        props.onPress(state);
    }

    // start: virtualization
    const getItemCount = (data,index) => data.length;
    const getItem  = (data,index)=>{ 
        return data[index];
    }
    const renderItem = useCallback(({item,index}) => (
        <TouchableOpacity activeOpacity={0.9} key={index} style={[styles.Container,index == 0?{marginTop:22}:null]} onPress={()=>onHandlerState(item.id)}> 
            <View style={styles.InnerBoxShadow}></View>
            <View style={styles.InnerBox}>
                <View style={styles.innerUpper}>
                    <Text style={[styles.innerUpperText,{fontWeight:'500'}]}>{item.siteName}</Text> 
                </View>
                <View style={styles.innerLowwer}>
                    <Text style={styles.textPara}>{item.content}</Text>
                </View>
                <View style={{width:'100%',height:60,paddingHorizontal:12,justifyContent:'flex-start',}}>
                    <View style={{width:'100%',height:60,borderTopWidth:2,borderTopColor:Colors.lightGray,flexDirection:'row',justifyContent:'center',alignItems:'center',alignContent:'center'}}> 
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                            <Text style={[styles.textPara,{color:Colors.SecondaryColor,fontWeight:FontWeight.medium}]}>View Site Deatail</Text>
                            <AutoHeightImage
                                width={8}    
                                source={Images.ArrowRightSnd}
                                style={{marginLeft:6}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',marginLeft:10}}>
                            <Text style={[styles.textPara,{color:Colors.SecondaryColor,fontWeight:FontWeight.medium}]}>My Project</Text>
                            <AutoHeightImage
                                width={8}    
                                source={Images.ArrowRightSnd}
                                style={{marginLeft:6}}
                            />
                        </TouchableOpacity>
                    </View>                
                </View>
            </View>
        </TouchableOpacity>
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
        position:'relative',
        marginTop:10,
        marginBottom:12,  
    },
    InnerBoxShadow:{
        width:'100%',
        minHeight:110,
        backgroundColor:Colors.SecondaryColor, 
        borderTopLeftRadius:3,
        borderTopRightRadius:3,
        borderBottomLeftRadius:3,
        borderBottomRightRadius:3,
        position:'absolute',
        top:-2, 
    },
    InnerBox:{
        width:'100%',
        minHeight:130,
        backgroundColor:'#ffffff',
        borderRadius:3, 
        elevation:5, 
    },
    innerUpper:{
        width:'100%',
        height:45,
        backgroundColor:Colors.PrimaryColorLight,
        borderTopLeftRadius:3,
        borderTopRightRadius:3,
        paddingHorizontal:12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center'
    }, 
    innerLowwer:{
        width:'100%',
        minHeight:85, 
        paddingHorizontal:12,
        paddingTop:10,
        backgroundColor:'#ffffff'
    },
    radiusButton:{
        width:22,
        height:22,
        backgroundColor:Colors.graySnd, 
        borderWidth:2,
        borderColor:Colors.graySnd,
        borderRadius:32
    },
    radiusButtonActive:{
        width:22,
        height:22,
        backgroundColor:'transparent',
        borderWidth:2, 
        borderColor:Colors.SecondaryColor,
        borderRadius:32,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    radiusButtonActiveInner:{
        width:12,
        height:12,
        backgroundColor:Colors.SecondaryColor, 
        borderRadius:12
    },
    innerUpperText:{
        color:Colors.SecondaryColor,
        fontSize:FontSize.h3-2,
    },
    textPara:{
        color:Colors.black,fontSize:FontSize.h4-2
    }
})
export default MySiteComponent