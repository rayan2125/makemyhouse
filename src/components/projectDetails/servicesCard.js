import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React,{memo, useState, useRef, useCallback, useEffect} from 'react';
 
const { width, height} = Dimensions.get("window");

import Colors from '../../screens/utility/color';

  //AutoHeightImage component
import FontSize,{FontWeight} from '../../screens/utility/fonts';

import IinfoIcon from '../../../assets/images/icons/iinfoIcon.svg';  
import IinfoIconWhite from '../../../assets/images/icons/iinfoIconWhite.svg';  

import UserIconThird from '../../../assets/images/icons/userIconThird.svg';
import FillArrow from '../../../assets/images/icons/fillArrow.svg'

import { RFValue } from 'react-native-responsive-fontsize';


const ServicesCard = (props) => {   
  console.log(props.data[0]);

  const [toolTipData,settoolTipData] = useState(null);
  const [serviceName,setserviceName]= useState(null);
  const [showHide,setshowHide] = useState(false);

  useEffect(()=>{
    console.log("++++ +++ +++ ",{showHide, toolTipData, serviceName})
  },[ showHide, toolTipData, serviceName,]);

  const openToolTip = (data,servicenamepa,showHidepa)=>{
    console.log("-----  ---- ---- ",{
        data, 
        servicenamepa,
        showHidepa
    }) 

    if(toolTipData == null && serviceName ==null && showHide ==false){
        settoolTipData(data);
        setserviceName(servicenamepa)
        setshowHide(true)
    }

    else if(toolTipData == data && serviceName == servicenamepa && showHide == showHidepa){
        settoolTipData(null);
        setserviceName(null);
        setshowHide(false);
    }

    else if(toolTipData != data && serviceName != servicenamepa && showHide != showHidepa){
        settoolTipData(null);
        setserviceName(null);
        setshowHide(false);

        setTimeout(()=>{
            settoolTipData(data);
            setserviceName(servicenamepa)
            setshowHide(true)
        },1);
    }
    else{
        settoolTipData(data);
        setserviceName(servicenamepa)
        setshowHide(true)
    }

   
  }  

  function formatDate(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);
    
    // Define arrays for month names and suffixes
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const suffixes = ['AM', 'PM'];

    // Get day, month, and year from the Date object
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    
    // Get hours and minutes
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    
    // Determine AM/PM and adjust hours for 12-hour format
    const period = hours >= 12 ? suffixes[1] : suffixes[0];
    hours = hours % 12 || 12; // Convert to 12-hour format
    
    // Pad minutes with leading zero if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Build the formatted date string
    return `${day}-${month}-${year}`;
  }

  return ( 
<> 
        {
            props.data&&
            (props.data.length > 0? 
              (
                props.data.map((item,index)=>{ 
                    return ( 
                        <View key={index} style={styles.slide}> 
                            <View style={styles.InnerSlide}> 
                            <View style={{flexDirection:'row', justifyContent:'space-between',alignContent:'center', alignItems:'center', height:40,width:'100%', backgroundColor:'#eee', paddingHorizontal:10}}>
                                    <Text style={{fontSize:FontSize.p,color:Colors.SecondaryColor}}>Order Code: {item.name}</Text>
                                    {/* <Text style={{fontSize:FontSize.xp,color:Colors.SecondaryColor}}>{item.creationDate}</Text> */}
                                    <Text style={{fontSize:FontSize.p,color:Colors.SecondaryColor}}>{
                                       // formatDate(item.creationDate) 
                                    }</Text>
                            </View>
                            <View style={{paddingHorizontal:10}}>
                                {
                                    item.services.map((itemx,indexx)=>{
                                        return( 
                                            <View key={itemx.name} style={styles.inlineLINE}>

                                                    

                                                    <View style={{width:'70%', flexDirection:'row', justifyContent:'flex-start', alignContent:'center', alignItems:'center'}}>
                                                        <Text style={{fontSize:FontSize.p,color:Colors.SecondaryColor}}>{itemx.name}</Text>

                                                        {
                                                            itemx.assigned_to != null &&( 
                                                            <TouchableOpacity onPress={()=>openToolTip(`${itemx.assigned_to}`,`${itemx.name}`, showHide)}>
                                                                {/* <Text>{itemx.assigned_to}</Text> */}
                                                                <UserIconThird  width={RFValue(12)} height={RFValue(16)} style={{marginLeft:6}}/>
                                                            </TouchableOpacity>
                                                            )
                                                        }    

                                                        {
                                                            (itemx.assigned_to == toolTipData) && ((itemx.name == serviceName)) && (showHide == true)  && 
                                                                <View style={[styles.tooltipContainer]}>
                                                                    <View style={{position:'relative', flexDirection:'row', alignContent:'center', alignItems:'center',zIndex:999}}> 
                                                                        <FillArrow width={10}/>
                                                                        <View style={styles.tooltipBox}> 
                                                                            <Text style={{marginHorizontal:6, color:'#000'}}>{itemx.assigned_to}</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                        }

                                                    </View>
                                                    

                                                    {
                                                        itemx.status == 'in progress' && 
                                                        <TouchableOpacity style={[styles.innerBoxBox,{backgroundColor:'#667085',borderWidth:0}]}>
                                                            <Text style={[styles.innerBoxBoxText,{color:'#fff'}]}>In progress</Text>
                                                            <IinfoIconWhite width={RFValue(12)}/>
                                                         </TouchableOpacity>
                                                    }    

                                                    {
                                                        itemx.status == 'pending' && 
                                                        <TouchableOpacity style={[styles.innerBoxBox,{backgroundColor:'#667085',borderWidth:0}]}>
                                                            <Text style={[styles.innerBoxBoxText,{color:'#fff'}]}>In process</Text>
                                                            <IinfoIconWhite width={RFValue(12)}/>
                                                         </TouchableOpacity>
                                                    }   

                                                    {
                                                        itemx.status == 'completed' && 
                                                        <TouchableOpacity style={[styles.innerBoxBox,{backgroundColor:'#4CB050',borderWidth:0}]}>
                                                            <Text style={[styles.innerBoxBoxText,{color:'#fff'}]}>Completed</Text>
                                                            <IinfoIconWhite />
                                                        </TouchableOpacity>
                                                    }

                                                    {
                                                        itemx.status == 'incomplete' && 
                                                        <TouchableOpacity style={[styles.innerBoxBox,{backgroundColor:'#ABABAB',borderWidth:0}]}>
                                                            <Text style={[styles.innerBoxBoxText,{color:'#fff'}]}>Incomplete</Text>
                                                            <IinfoIcon width={RFValue(12)} height={RFValue(12)} style={{marginTop:2}}/>
                                                        </TouchableOpacity>
                                                    }

                                                    
                                                    {
                                                        itemx.status == 'active' && 
                                                        <TouchableOpacity style={[styles.innerBoxBox,{backgroundColor:'##002F5B',borderWidth:0}]}>
                                                            <Text style={[styles.innerBoxBoxText,{color:'#fff'}]}>Active</Text>
                                                            <IinfoIcon width={RFValue(12)} height={RFValue(12)}/>
                                                        </TouchableOpacity>
                                                    } 


                                                    {/* <TouchableOpacity style={[styles.innerBoxBox,{backgroundColor:Colors.PrimaryColor,borderWidth:0}]}>
                                                            <Text style={[styles.innerBoxBoxText,{color:'#fff'}]}>{itemx.status}</Text>
                                                            <IinfoIconWhite />
                                                    </TouchableOpacity> */}  
                                            </View>
                                        )
                                    })
                                } 
                            </View>     
                            </View>
                        </View>  
                    )
                })
              ) 
              :<Text>No data</Text>)
        }         
</>
)}

const styles = new StyleSheet.create({   
    slide:{
        width:width , 
        minHeight:90,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',  
        padding:0,
        margin:0,  
    },
    InnerSlide:{ 
      width:'100%', 
      minHeight:90,
      position:'relative',
      paddingVertical:10,   
    }, 
    inlineLINE:{
        width:'100%',
        height:60,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center', 
        borderTopWidth:1,
        borderTopColor:'#eee',
        borderBottomWidth:1,
        borderBottomColor:'#eee',

    },

    innerBoxBox:{ 
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
        borderRadius:22,
        borderWidth:1,
        borderColor:Colors.black,
        paddingHorizontal:12,
        paddingVertical:6
    },

    innerBoxBoxText:{
        fontSize:FontSize.xxp,
        fontWeight:FontWeight.regular,
        color:Colors.black,
        marginRight:6
    }, 
    tooltipContainer:{
        minWidth:64, height:40, 
        // position:'absolute', 
        // left:width/3, 
        // top:8, 
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center' 
    },
    tooltipBox:{
        minWidth:60,height:40, backgroundColor:'#D9D9D9', justifyContent:'center', alignContent:'center', alignContent:'center', borderRadius:4,
    }
  })
export default ServicesCard