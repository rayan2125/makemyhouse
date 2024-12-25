import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../utility/color';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
 
const Loader = () => {
  return (
    <View style={{padding:12, flexDirection:'row', flexWrap:'wrap', justifyContent:"space-between", width:'100%', height:"100%", backgroundColor:"#fff"}}>
        
        <View style={{width:'100%',height:180, backgroundColor:Colors.lighteshGray, borderRadius:12, borderBottomLeftRadius:0, borderBottomRightRadius:0, overflow:"hidden", padding:0, marginBottom:16, elevation:2}}>
            <View style={{width:'100%',height:'70%',flexDirection:'row', justifyContent:'flex-start', alignContent:'center', alignItems:'center', padding:12}}>
                <ShimmerPlaceholder 
                  style={{width:85, height:85, borderRadius:55 }}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder>
                <View style={{width:'70%',height:'100%', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'flex-start', padding:10}}>  
                    <ShimmerPlaceholder 
                    style={{width:'90%', height:18, borderRadius:12, marginBottom:8 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder 
                    style={{width:'70%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
                </View>
            </View> 
            <View style={{width:'100%', height:40, backgroundColor:'#ffffff', flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:12}}> 
                    <ShimmerPlaceholder 
                    style={{width:'40%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
                    
                    <ShimmerPlaceholder 
                    style={{width:'40%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
            </View>
        </View>
                
        <View style={{width:'100%',height:180, backgroundColor:Colors.lighteshGray, borderRadius:12, borderBottomLeftRadius:0, borderBottomRightRadius:0,  overflow:"hidden", padding:0, marginBottom:16, elevation:2}}>
            <View style={{width:'100%',height:'70%',flexDirection:'row', justifyContent:'flex-start', alignContent:'center', alignItems:'center', padding:12}}>
                <ShimmerPlaceholder 
                  style={{width:85, height:85, borderRadius:55 }}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder>
                <View style={{width:'70%',height:'100%', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'flex-start', padding:10}}>  
                    <ShimmerPlaceholder 
                    style={{width:'90%', height:18, borderRadius:12, marginBottom:8 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder 
                    style={{width:'70%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
                </View>
            </View> 
            <View style={{width:'100%', height:40, backgroundColor:'#ffffff', flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:12}}> 
                    <ShimmerPlaceholder 
                    style={{width:'40%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
                    
                    <ShimmerPlaceholder 
                    style={{width:'40%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
            </View>
        </View>

                        
        <View style={{width:'100%',height:180, backgroundColor:Colors.lighteshGray, borderRadius:12, borderBottomLeftRadius:0, borderBottomRightRadius:0,  overflow:"hidden", padding:0, marginBottom:16, elevation:2}}>
            <View style={{width:'100%',height:'70%',flexDirection:'row', justifyContent:'flex-start', alignContent:'center', alignItems:'center', padding:12}}>
                <ShimmerPlaceholder 
                  style={{width:85, height:85, borderRadius:55 }}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder>
                <View style={{width:'70%',height:'100%', flexDirection:'column', justifyContent:'center', alignContent:'center', alignItems:'flex-start', padding:10}}>  
                    <ShimmerPlaceholder 
                    style={{width:'90%', height:18, borderRadius:12, marginBottom:8 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder>
                    <ShimmerPlaceholder 
                    style={{width:'70%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
                </View>
            </View> 
            <View style={{width:'100%', height:40, backgroundColor:'#ffffff', flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:12}}> 
                    <ShimmerPlaceholder 
                    style={{width:'40%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
                    
                    <ShimmerPlaceholder 
                    style={{width:'40%', height:18, borderRadius:12 }}
                    shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                    > 
                    </ShimmerPlaceholder> 
            </View>
        </View> 
 
    </View>
  )
}

export default Loader