import { View, Text , StyleSheet, Dimensions} from 'react-native'
import React from 'react'
// import Colors from '../../utility/color';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
 

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;  // Adjust the item width to show 3 items per screen

const LoaderAddons = () => {
  return (
    <View style={styles.container}> 
        <View style={[styles.box,styles.upperBox,{backgroundColor:'#D4D4D4'}]}> 
                <ShimmerPlaceholder 
                      style={{width:60, height:60, borderRadius:66 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder> 
        </View>
        <View style={[styles.box,styles.lowwerBox]}> 
                <ShimmerPlaceholder 
                      style={{width:'80%', height:12, borderRadius:12, marginBottom:8 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder> 
                <ShimmerPlaceholder 
                      style={{width:'90%', height:12, borderRadius:12, marginBottom:8  }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder> 
                <ShimmerPlaceholder 
                      style={{width:40, height:40, borderRadius:66 }}
                      // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: ITEM_WIDTH - 10,
        height:210,
        backgroundColor:'#ffffff',
        margin:4, 
        flexDirection:'column', 
        borderTopLeftRadius:12,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 3,
        // backgroundColor:Colors.lighteshGray,
        overflow:"hidden" 
    },
    box:{ 
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        padding:10, 
    },
    upperBox:{
        height:90,
        borderTopLeftRadius:12,
        borderBottomRightRadius:12,
        position:'relative'
    },  
    lowwerBox:{
        height:120,
        backgroundColor:'#ffffff',
        flexDirection:'column',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    }, 
  });
export default LoaderAddons