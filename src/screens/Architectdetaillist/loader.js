import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../utility/color';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Loader = () => {
  return (
    <View style={{width:'100%', height:Height-70, marginBottom:12, backgroundColor:'#ffffff', overflow:'hidden', position:"relative", padding:12}}>
           
          <View style={{width:'100%', height:'86%',marginTop:20, backgroundColor:Colors.lightGray, borderRadius:12 }}></View>
          <View style={{width:'100%', flexDirection:'row', justifyContent:"space-between", position:"absolute", bottom:10, left:10}}> 
                
              <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>   
                <ShimmerPlaceholder 
                  style={{width:35, height:35, borderRadius:55 }}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder>
                <ShimmerPlaceholder 
                  style={{width:80, height:14, borderRadius:3, marginLeft:8}}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder> 
              </View>
              <ShimmerPlaceholder 
                style={{width:'40%', height:30, borderRadius:3 }}
                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
              > 
              </ShimmerPlaceholder>
          </View>      
          <ShimmerPlaceholder 
            style={{width:'80%', height:15, borderRadius:12 , position:'absolute', bottom:60, left:10 }}
            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
          >
          </ShimmerPlaceholder>
          <ShimmerPlaceholder 
            style={{width:'60%', height:15, borderRadius:12 , position:'absolute', bottom:80, left:10 }}
            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
          >
          </ShimmerPlaceholder>
          <ShimmerPlaceholder 
            style={{width:60, height:60, borderRadius:55 , position:'absolute', bottom:120, right:15 }}
            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
          >
          </ShimmerPlaceholder>
          <ShimmerPlaceholder 
            style={{width:60, height:60, borderRadius:55 , position:'absolute', bottom:190, right:15 }}
            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
          >
          </ShimmerPlaceholder>
    </View>  
  )
}

export default Loader