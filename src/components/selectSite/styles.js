import { StyleSheet} from 'react-native' 
import Colors from '../../screens/utility/color';
import FontSize from '../../screens/utility/fonts';
  

const styles = new StyleSheet.create({
    Container:{
        width:'100%', 
        position:'relative',
        marginTop:10,
        marginBottom:12,  
    },
    InnerBoxShadow:{
        width:'100%',
        height:110,
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
        elevation:2, 
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
        height:85, 
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
        fontSize:FontSize.h6,
    }
})

export default styles;
