import React,{useState, memo, useEffect, useRef} from 'react'
import { TouchableOpacity, FlatList, View,Dimensions, Image,StyleSheet,  ImageBackground, Text  } from 'react-native';  
import AutoHeightImage from 'react-native-auto-height-image';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;



let APIURL = 'https://api.makemyhouse.com/';

import { Util } from '../utility/scaling';

// import Animated, {
//   useSharedValue,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated'; 

 

// image contianer 
const ImageContainer = ({navigation, imageData, title,imageModelHandler})=>{
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    
    const scrollToIndex = (index) => {
      flatListRef.current.scrollToIndex({ animated: true, index });
      setActiveIndex(index);
      console.log("activeindex", index)
    };

    const [toggleElementsState,settoggleElementsState]= useState(false);
     

    return(
        <>  
            {/* <Text style={{position:'absolute',padding:8,backgroundColor:'black',top:12,right:12,zIndex:999,color:'#fff'}}>{activeIndex + 1} / {imageData?imageData.length:activeIndex+1}</Text> */}
            <View style={{width:Width,height:'100%',backgroundColor:'#f2f2f2'}}>
                 {/* <Swiper  animated={true}  showsPagination={false} pagingEnabled={true} bounces={true} removeClippedSubviews={true} 
                    onIndexChanged={setActiveIndex} loadMinimal={true} loadMinimalLoader={ <Text>Loading....</Text>} loop={false} useNativeDriver={false} style={{ pointerEvents: "box-none" }} >
                        {
                            imageData&&
                            (imageData.length > 0? 
                                (imageData.map((item,index)=>{
                                    return  <ImageBackground key={index} source={{uri:`${APIURL}public/media/rimage/500/completed-project/${item.img}`}}  blurRadius={50}  resizeMode="cover" style={styles.image}> 
                                                     <AutoHeightImage
                                                        width={Width} 
                                                        source={{ uri:  `${APIURL}public/media/rimage/500/completed-project/${item.img}` }}
                                                    />
                                            </ImageBackground>  
                                })) 
                                :<Text>No data</Text>)
                        }  
                    </Swiper> */}

                    <FlatList
                        ref={flatListRef} 
                        data={imageData}
                        renderItem={({ item,index }) =>  
                          <TouchableOpacity activeOpacity={0.96}>
                            {/* <TouchableOpacity activeOpacity={0.96} onPress={()=>imageModelHandler(imageData)}> */}
                           <ImageBackground key={index} source={{uri:`${item.imgUrl_10}`}}  blurRadius={1}  resizeMode="cover" style={styles.image}>
                                                        
                                <AutoHeightImage
                                    width={Width} 
                                    maxHeight={Height-Util.getHeight(7)} 
                                    resizeMode="contain"
                                    source={{ uri:  `${item.imgUrl_500}` }}
                                /> 
                             
 
                            </ImageBackground>  
                          </TouchableOpacity>
                        }
                        keyExtractor={(item,index) => index} 
                        
                        horizontal
                        scrollEnabled={true} 

                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}  
                        snapToAlignment={'start'}
                        snapToInterval={Width}
                        decelerationRate={'fast'}
        
                        removeClippedSubviews={true}
                        lazy={false}
        
                        pagingEnabled
                        onScroll={(event) => {
                            const viewSize = event.nativeEvent.layoutMeasurement.width;
                            const contentOffset = event.nativeEvent.contentOffset.x;
                            const index = Math.floor(contentOffset / viewSize);
                            if (index != activeIndex) {
                              setActiveIndex(index);
                            } 
                        }}
                    />

                     {/* Thumbnails */}
                    {/* <View style={[styles.thumbnailContainer,toggleElementsState == true? {bottom:Util.getHeight(9)}:{}]}>
                      <FlatList
                        data={imageData}
                        renderItem={({ item, index }) =>
                          <TouchableOpacity onPress={() => scrollToIndex(index)}>
                            <Image
                              source={{ uri: `${APIURL}public/media/rimage/100/completed-project/${item.img}?watermark=false` }}
                              style={[styles.thumbnail,activeIndex==index?{borderColor:'#002F5B'}:{borderColor:'#3CAF4B'}]}
                            />
                          </TouchableOpacity>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                      />
                    </View>  */}

                     {/* Pagination */}
                     {
                      imageData &&   
                      <View style={{width:'15%', height:30, position:'absolute', top:10, right:10, backgroundColor:'#313131', borderRadius:33, overflow:"hidden", justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                          <Text style={{color:'#fff', textAlign:'center'}}>{activeIndex+1} / {imageData.length}</Text>
                      </View> 
                     }
                    {
                      toggleElementsState == false ? 
                      <View style={{position:'absolute',padding:2,bottom: Util.getHeight(8.5),left:12,right:12,zIndex:999}}>
                        <Text style={[styles.textShadow,{  fontSize: 16, fontWeight: '400' }]}>{title}</Text> 
                      </View>
                      :
                      null
                    }
                    
                    
            </View> 
        </>
    )
}


export default ImageContainer;


const styles = StyleSheet.create({
    textShadow:{ 
      color: "#fff", 
      textShadowColor: 'rgba(0, 0, 0,1)', // Shadow color
      textShadowOffset: { width: 2, height: 2 }, // Shadow offset
      textShadowRadius: 5, // Shadow radius
    },
    container: {
      width: 300,
      height: 200,
      backgroundColor: '#DDDDDD',
      padding: 20,
    },
    slide: {
      width:'100%',
      height:'100%',  
      paddingRight:0,paddingEnd:0
    },
    image: {
        flex:1,
        justifyContent: 'center',
        width:Width
      },
      thumbnailContainer: {
        position: 'absolute',
        bottom: Util.getHeight(13.8),
        paddingHorizontal: 14,
        // width:'100%', 
        // backgroundColor:'red',
      },
      thumbnail: {
        width: 50,
        height: 50,
        marginRight: 10,
        backgroundColor:'#d1d1d1',
        borderWidth:2,  
        borderRadius:3
      },
  });