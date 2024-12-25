import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../utility/color';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Loader = () => {
  return ( 
      <View style={{width:'100%', height:310, marginBottom:12, backgroundColor:Colors.lighteshGray, borderRadius:9, overflow:'hidden',padding:0}}>
        
        <View style={{width:'100%', height:30, backgroundColor:'#D1D1D1', justifyContent:'center',paddingHorizontal:12}}> 
          <ShimmerPlaceholder 
            style={{width:'40%', height:15, borderRadius:12 }}
            shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
          > 
          </ShimmerPlaceholder>
        </View>

        <View style={{width:'100%', height:210,backgroundColor:Colors.lighteshGray, position:'relative'}}>
              <ShimmerPlaceholder 
                style={{width:'36%', height:'18%', borderRadius:12, position:'absolute', bottom:10, right:10 }}
                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
              > 
              </ShimmerPlaceholder>
        </View>

        <View style={{width:'100%', height:70,backgroundColor:Colors.lighteshGray, flexDirection:'row'}}> 
          <View style={{width:'25%', height:'100%', backgroundColor:'#D1D1D1', justifyContent:'center', padding:10}}>
            <ShimmerPlaceholder 
              style={{width:'100%', height:'30%', borderRadius:3 , marginBottom:12}}
              shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
            > 
            </ShimmerPlaceholder>
            <ShimmerPlaceholder 
              style={{width:'100%', height:'30%', borderRadius:3 }}
              shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
            > 
            </ShimmerPlaceholder>

          </View>
          <View style={{width:'25%', height:'100%', justifyContent:'center', padding:10, backgroundColor:'#D1D1D1', borderColor:"#fff", borderLeftWidth:1}}>
            <ShimmerPlaceholder 
                style={{width:'100%', height:'30%', borderRadius:3 , marginBottom:12}}
                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
              > 
              </ShimmerPlaceholder>
              <ShimmerPlaceholder 
                style={{width:'100%', height:'30%', borderRadius:3 }}
                shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
              > 
              </ShimmerPlaceholder>
          </View>
          <View style={{width:'25%', height:'100%',justifyContent:'center', padding:10, backgroundColor:'#D1D1D1', borderColor:"#fff",borderLeftWidth:1,borderRightWidth:1}}>
              <ShimmerPlaceholder 
                  style={{width:'100%', height:'30%', borderRadius:3 , marginBottom:12}}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder>
                <ShimmerPlaceholder 
                  style={{width:'100%', height:'30%', borderRadius:3 }}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder>
          </View>
          <View style={{width:'25%', height:'100%',justifyContent:'center', padding:10, backgroundColor:'#D1D1D1'}}>
              <ShimmerPlaceholder 
                  style={{width:'100%', height:'30%', borderRadius:3 , marginBottom:12}}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder>
                <ShimmerPlaceholder 
                  style={{width:'100%', height:'30%', borderRadius:3 }}
                  shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder>
          </View>
        </View> 

      </View> 
  )
}

export default Loader