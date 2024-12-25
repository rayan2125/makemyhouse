import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
// import Colors from '../../utility/color';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
 
const Loader = () => {
  return (
    <View style={styles.container}> 
      <View style={{width:'100%',minHeight:200, backgroundColor:'#fff', borderRadius:12, overflow:"hidden", padding:0, elevation:3}}> 
        <View style={styles.containerBox}>
          <View style={{width:'100%', height:50, flexDirection:'row', justifyContent:'space-between', alignContent:'center', alignItems:'center', paddingHorizontal:12, borderBottomWidth:1, borderColor:'#d1d1d1'}}>
                  <ShimmerPlaceholder 
                      style={{width:'20%', height:18, borderRadius:12 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                  > 
                  </ShimmerPlaceholder> 
                  <ShimmerPlaceholder 
                      style={{width:'35%', height:18, borderRadius:12 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                  > 
                  </ShimmerPlaceholder> 
                  <ShimmerPlaceholder 
                      style={{width:'25%', height:18, borderRadius:12 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                  > 
                  </ShimmerPlaceholder> 
          </View> 
          <View style={{width:'100%', flexDirection:'column', padding:12, paddingVertical:22}}>

                  <ShimmerPlaceholder 
                      style={{width:'25%', height:18, borderRadius:12, marginBottom:18 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                  > 
                  </ShimmerPlaceholder>  
                  
                  <ShimmerPlaceholder 
                      style={{width:'85%', height:18, borderRadius:12, marginBottom:12 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                  > 
                  </ShimmerPlaceholder> 
                  
                  <ShimmerPlaceholder 
                      style={{width:'95%', height:18, borderRadius:12, marginBottom:8 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                  > 
                  </ShimmerPlaceholder> 
                  
                  <ShimmerPlaceholder 
                      style={{width:'100%', height:18, borderRadius:12, marginBottom:8 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                  > 
                  </ShimmerPlaceholder> 

                  <View style={{width:'100%', height:190, marginVertical:22,borderRadius:6, flexDirection:'row', justifyContent:'space-between'}}></View>


                  <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
                      <ShimmerPlaceholder 
                          style={{width:'40%', height:34, borderRadius:6, marginBottom:8 }}
                          // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                      > 
                      </ShimmerPlaceholder> 
                          
                      <ShimmerPlaceholder 
                          style={{width:'40%', height:34, borderRadius:6, marginBottom:8 }}
                          // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                      > 
                      </ShimmerPlaceholder> 
                  </View>
                  

          </View>
        </View>
      </View>       
  </View>
  )
}
const styles = StyleSheet.create({
    container:{    
      padding:6, 
      flexDirection:'row', 
      flexWrap:'wrap', 
      justifyContent:"space-between", 
      width:'100%', 
      minHeight:300, 
      backgroundColor:"#fff", 
      position:'relative',
      paddingTop:6,
      marginBottom:16
    },
    upperBorderBox:{
      width:'100%',
      minHeight:300, 
      zIndex:-1,
      position:'absolute',
      top:-3,
      // backgroundColor:Colors.SecondaryColor, 
      borderRadius:14
    },
    containerBox:{
      width:'100%',
      minHeight:300,
      backgroundColor:"#ffffff", 
      zIndex:0,
      borderRadius:14,  
      marginTop:2,
      overflow:'hidden'
    }, 
  });
export default Loader