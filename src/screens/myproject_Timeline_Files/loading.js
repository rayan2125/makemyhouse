import { View, Text, StyleSheet,Dimensions, TouchableOpacity, Image, VirtualizedList} from 'react-native'
import React,{useCallback} from 'react';

 
import Colors from '../utility/color';

 //AutoHeightImage component
import FontSize ,{FontWeight} from '../utility/fonts';

  
import { actuatedNormalize } from '../utility/scaling';
 
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const  FilesLoading = (props) => { 
  return (
    <View  style={[styles.FilesCotainer]}> 
        <View style={[styles.LeftSideImages]}>
            <View style={[styles.circle,{backgroundColor:Colors.lighteshGray,overflow: 'hidden'}]}> 
                <ShimmerPlaceholder 
                      style={{width:60, height:60, borderRadius:66 }}
                      shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                > 
                </ShimmerPlaceholder> 
            </View>   
        </View>
        <View style={[styles.RightSideContent]}>
            <ShimmerPlaceholder 
                      style={{width:60, height:10, marginBottom:6, borderRadius:12  }}
                      shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
            > 
            </ShimmerPlaceholder> 
            <ShimmerPlaceholder 
                      style={{width:120, height:10, marginBottom:6, borderRadius:12  }}
                      shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
            > 
            </ShimmerPlaceholder> 
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  FilesCotainer:{
    width:'100%',   
    height:110,
    position: 'relative', 
    flexDirection:'row' ,  
    
  },
  LeftSideImages:{
    width:'23%',   
    height:'100%', 
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    position: 'relative', 
  }, 
  circle:{
    width:actuatedNormalize(70),
    height:actuatedNormalize(70), 
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:100, 
    backgroundColor:Colors.lightGray
  },
  RightSideContent:{
    width:'77%',   
    height:'100%', 
    borderBottomWidth:2,
    borderBottomColor:Colors.lightGray,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'flex-start',
    paddingHorizontal:12
  },
  mainHeader:{
    fontSize:FontSize.xp,
    fontWeight:FontWeight.medium,
    color:Colors.black,
    marginBottom:1
  },
  para:{
    fontSize:FontSize.xxp,
    fontWeight:FontWeight.medium,
    color:Colors.gray
  }, 
});

export default FilesLoading