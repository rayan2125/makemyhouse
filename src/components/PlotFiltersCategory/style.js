import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../screens/utility/color';
import FontSize ,{FontWeight} from '../../screens/utility/fonts';
const { width, height} = Dimensions.get("window");


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = new StyleSheet.create({ 
    Box:{
      padding:8,
      paddingHorizontal:12,
      backgroundColor:Colors.lighteshGray,
      marginRight:8,
      borderRadius:6, 
    },
    ActiveBox:{
      backgroundColor:Colors.PrimaryColor,
      color:Colors.white
    },
    BoxText:{
      fontSize:FontSize.xp,
      fontWeight:FontWeight.regular,
      color:Colors.TextColor
    },
    ActiveTextBox:{
      color:Colors.white, 
    },
    container:{
      width:windowWidth/2, 
      marginRight:12, 
      position:'relative' 
    },
    filtersDataText:{
      fontSize:FontSize.p, 
      color:Colors.black
    },
    filtersDataTextTwo:{
      position:'relative', 
      color:Colors.black
    },
    mediaCoverage:{
      minHeight:40,
      backgroundColor:Colors.white,
      borderWidth:2,
      borderColor:Colors.lightGray,
      flexDirection:'column'
    },
    mediaBox:{
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      width:'100%',
      backgroundColor:'#D9D9D9'
    },
    sampleDelivery:{
      position:'relative',
      padding:0,
      margin:0
    },
    sampleDeliveryTextPosition:{
      position:'absolute',
      top:10, left:10, zIndex:999,
      fontSize:FontSize.h4-3,
      color:Colors.white,
      fontWeight:'700'
    },
    sampleDeliveryOverlay:{
      width:'100%',height:160,
      backgroundColor:'rgba(0,0,0,0.18)',
      borderTopLeftRadius:16,
      borderTopRightRadius:16,
      position:'absolute',
      top:0,left:0,
      zIndex:888
    },
    sampleDeliveryTextViewproject:{ 
      fontSize:FontSize.h3-3,
      fontWeight:FontWeight.regular,
      color:Colors.SecondaryColor
    }
});

export default styles;