import { View, Text , StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import React from 'react'
// import Colors from '../../utility/color';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
 

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;  // Adjust the item width to show 3 items per screen



const Loader = ()=>{
    return (
        <View  style={{padding:0, marginVertical:12}}>  
            <View style={{padding:10}}>
                <View style={styles.container}>
                        <View style={[styles.totalAmount]}> 
                                <ShimmerPlaceholder 
                                    style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                    // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                > 
                                </ShimmerPlaceholder> 
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}> 
                                    <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View> 
                        </View>
                        <View style={[styles.totalAmount]}>
                                <ShimmerPlaceholder 
                                    style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                    // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                > 
                                </ShimmerPlaceholder> 
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                    <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View>
                        </View>
                        <View style={[styles.otherColumBased]}>
                                <ShimmerPlaceholder 
                                    style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                    // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                > 
                                </ShimmerPlaceholder> 
                                <View  style={[styles.otherColumBasedInner]}>
                                    <ShimmerPlaceholder 
                                        style={{width:'60%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                        <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                        > 
                                        </ShimmerPlaceholder> 
                                    </View>
                                </View>
                                <View  style={[styles.otherColumBasedInner]}>
                                    <ShimmerPlaceholder 
                                        style={{width:'60%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                    <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                        <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                        > 
                                        </ShimmerPlaceholder> 
                                    </View>
                                </View>
                        </View>
                        <View style={[styles.otherColumBased]}>
                                        <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                        > 
                                        </ShimmerPlaceholder> 
                            <View  style={[styles.paymentbox]}>
                                <View style={{width:'70%',height:'100%' ,justifyContent:'flex-start', flexDirection:'row'}}>
                                    <View> 
                                        <ShimmerPlaceholder 
                                            style={{width:45, height:45, borderRadius:12, marginBottom:8 }}
                                            // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                        > 
                                        </ShimmerPlaceholder> 
                                    </View>
                                    <View style={{marginLeft:6}}> 
                                        <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                        > 
                                        </ShimmerPlaceholder> 
                                         
                                        <TouchableOpacity>
                                            <ShimmerPlaceholder 
                                            style={{width:'43%', height:12, borderRadius:12, marginBottom:8 }}
                                            // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                            > 
                                            </ShimmerPlaceholder> 
                                        </TouchableOpacity> 
                                    </View> 
                                </View>   
                                <View style={{width:'30%',height:'100%', flexDirection:'row',justifyContent:'flex-end',alignContent:'center', alignItems:'center'}}> 
                                        <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                        > 
                                        </ShimmerPlaceholder> 
                                </View>
                            </View> 
                        </View> 
                        <View style={[styles.totalAmount,{borderBottomWidth:0}]}>
                                        <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                        > 
                                        </ShimmerPlaceholder> 
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                        <ShimmerPlaceholder 
                                        style={{width:'40%', height:12, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                        > 
                                        </ShimmerPlaceholder> 
                                </View>
                        </View>
                       
                                <View style={[styles.totalAmount,{borderBottomWidth:0, justifyContent:'center', alignContent:'center', alignItems:'center'}]}>
                                    {/* <TouchableOpacity onPress={()=>handlePayment(item.amountDue,item.orderCode,token)} style={{width:'50%',height:'70%',backgroundColor:Colors.PrimaryColor, justifyContent:'center', alignContent:'center', alignItems:'center', borderRadius:9 }}>
                                        <Text style={{fontSize:FontSize.p, color:'#ffffff'}}>Pay Now</Text>
                                    </TouchableOpacity> */}
                                    <ShimmerPlaceholder 
                                        style={{width:'50%', height:56, borderRadius:12, marginBottom:8 }}
                                        // shimmerColors={[Colors.lighteshGray,Colors.lightGray,Colors.lighteshGray]}
                                    > 
                                    </ShimmerPlaceholder> 
                                </View>
                        

                        
                </View>
            </View>
        </View> 
    ) 
}


const styles = StyleSheet.create({
  container:{
    width:'100%',
    minHeight:300,
    backgroundColor:'#ffffff',
    borderRadius:9,
    elevation:3,
    padding:10
},
totalAmount:{
    width:'100%',
    height:70, 
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    alignContent:'center',
    borderBottomWidth:2,
    borderBottomColor:'#eee'
},

otherColumBased:{
    width:'100%',
    minHeight:70,  
    flexDirection:'column',
    paddingTop:22,
    borderBottomWidth:2,
    borderBottomColor:'#eee'
},
otherColumBasedInner:{
    width:'100%',
    height:40, 
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    alignContent:'center' 
},
paymentbox:{
    width:'100%',
    height:90, 
    flexDirection:"row",
    justifyContent:'space-around',
    alignContent:'center',
    alignItems:'center'
}
});

export default Loader;