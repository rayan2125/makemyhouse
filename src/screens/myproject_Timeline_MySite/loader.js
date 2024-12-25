import { View, Text , StyleSheet, Dimensions} from 'react-native'
import React from 'react'  
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
// import Colors from '../../utility/color';
import LinearGradient from 'react-native-linear-gradient';
import FontSize from '../utility/fonts';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
 

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;  // Adjust the item width to show 3 items per screen



const Loader = (props)=>{

    if (props.type == 'sitedetais'){
    return ( 
        <View style={{padding:10,marginTop:20,justifyContent:'center',alignContent:'center'}}>
            <View style={[styles.boxFull,{marginBottom:10}]}>
                <View> 
                        <ShimmerPlaceholder 
                                style={{width:140, height:14, borderRadius:66, marginBottom:14 }}
                                // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                        > 
                        </ShimmerPlaceholder> 
                        <ShimmerPlaceholder 
                            style={{width:110, height:12, borderRadius:66, marginBottom:12 }}
                            // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                        > 
                        </ShimmerPlaceholder> 
                </View> 
            </View>   
            <ShimmerPlaceholder 
                style={{width:180, height:12, borderRadius:66, marginBottom:10 }}
                // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
            > 
            </ShimmerPlaceholder> 
        </View>  
    )}

    if(props.type=="plotdetails"){
        return (
            <View style={{padding:10, minHeight:10, marginTop:20, justifyContent:'center', alignContent:'center'}}>
                            <View style={[styles.boxFull,{marginBottom:24}]}>
                                <View>
                                    <ShimmerPlaceholder 
                                            style={{width:140, height:14, borderRadius:66, marginBottom:14 }}
                                            // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    <ShimmerPlaceholder 
                                        style={{width:110, height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View> 
                            </View> 
                            {/* Start: Loop */}
                            <View style={styles.loop}>
                                <View style={styles.innerLoop}>
                                     
                                    <ShimmerPlaceholder 
                                        style={{width:'60%',height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    
                                    <ShimmerPlaceholder 
                                        style={{width:'50%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View>
                                <View style={styles.innerLoop}> 
                                    <ShimmerPlaceholder 
                                        style={{width:'70%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    
                                    <ShimmerPlaceholder 
                                        style={{width:'60%',height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View>
                            </View>  
                            <View style={styles.loop}>
                                <View style={styles.innerLoop}>
                                    <ShimmerPlaceholder 
                                        style={{width:'90%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    
                                    <ShimmerPlaceholder 
                                        style={{width:'60%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View>
                                <View style={styles.innerLoop}>
                                    <ShimmerPlaceholder 
                                        style={{width:'80%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    
                                    <ShimmerPlaceholder 
                                        style={{width:'60%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View>
                            </View>  
                            <View style={styles.loop}>
                                <View style={styles.innerLoop}>
                                    <ShimmerPlaceholder 
                                        style={{width:'70%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    
                                    <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View>
                                <View style={styles.innerLoop}>
                                    <ShimmerPlaceholder 
                                        style={{width:'80%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    
                                    <ShimmerPlaceholder 
                                        style={{width:'50%', height:12, borderRadius:66, marginBottom:12 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View>
                            </View>  
                            {/* End: Loop */}
                        </View>
        )
    }


    if(props.type == 'requestform'){
        return (
            <View style={{padding:0, marginVertical:0}}> 
                <View style={{padding:10}}>
                    <View style={[styles.container]}>
                            
                    </View>
                </View> 
            </View>
        )
    }


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
        marginVertical:12
    },
    box:{
        width:'33%', 
        height:'100%', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
    },
    DarkHeder:{
        width:'100%',
        height:60, 
        backgroundColor:'#E5E5E5',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center',
        paddingHorizontal:10
    },
    boxFull:{
        width:'100%',
        minHeight:35, 
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'flex-start',
        alignItems:'flex-start', 
    },
    loop:{
        width:'100%',
        minHeight:60, 
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:12
    },
    innerLoop:{
        width:'50%',
        flexDirection:'column',
        justifyContent:'flex-start'
    },
    uppertext:{
        // color:Colors.graySnd,
        // fontSize:FontSize.p,
        // fontWeight:FontWeight.regular
    },
    lowwertext:{
        color:'#2C2C2C',
        fontSize:FontSize.h6,
        // fontWeight:FontWeight.medium
    }

  });

export default Loader;