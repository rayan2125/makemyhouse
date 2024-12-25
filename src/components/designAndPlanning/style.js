import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../screens/utility/color';


const { width, } = Dimensions.get("window");


const styles = new StyleSheet.create({
    container:{
        width:width / 3 - 16,
        height:160,
        backgroundColor:'#ffffff',
        margin:4,
        marginHorizontal:5, 
        marginTop:0,
        marginBottom:14,
        flexDirection:'column', 
        borderTopLeftRadius:12,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 3,
    },
    box:{
        height:80,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        padding:10
    },
    upperBox:{
        borderTopLeftRadius:12,
        borderBottomRightRadius:12,
        position:'relative'
    },  
    lowwerBox:{
        backgroundColor:'#ffffff',
    },
    tag:{
        position:'absolute', top:10, left:0,
        backgroundColor:Colors.PrimaryColor, zIndex:999,
        borderTopRightRadius:4,borderBottomRightRadius:4,
        flexDirection:'row', justifyContent:'flex-start'
    },
    tagText:{
        fontSize:12,
        textAlign:'left',
        paddingVertical:2,
        paddingLeft:4,
        paddingRight:6,
        fontWeight:'500'
    }

})

export default styles;