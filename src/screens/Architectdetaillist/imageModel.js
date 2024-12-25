import React,{useState, memo, useEffect, useMemo} from 'react'
import { TouchableOpacity, View,Dimensions, Text ,StyleSheet, BackHandler, Alert } from 'react-native'; 
  
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
import { Util } from '../../utility/scaling';
  
import ImageViewer from 'react-native-image-zoom-viewer';
 
import { useNavigation,useNavigationState  } from '@react-navigation/native';  

 
const ImageModel = ({route}) => { 
  const navigation = useNavigation();    

  const closeHandler = ()=>{ 
    navigation.goBack();
  } 

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused() && navigation.canGoBack()){
        navigation.goBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  
  const [image,setImage] = useState(route.params.data);
   
  useEffect(()=>{
      setImage([]);
      if(route.params.data.length > 0){
        route.params.data.map((item,inidex)=>{
          setImage((prev)=>[...prev,{url:item.imgUrl}]);
        }) 
      }else{
        navigation.goBack();
        setImage([]);
      }
  },[]); 

   
  return (
    <View style={{width:Width, height:Height, backgroundColor:'#121212', position:'relative'}}>   
        <TouchableOpacity onPress={()=>{closeHandler()}} style={{width:45, height:45, position: 'absolute',top:22, left:12, justifyContent:'center', alignItems:'center', alignContent:'center', zIndex:9999, backgroundColor:'#ffffff21', overflow:'hidden', borderRadius:66}}>   
            <Text style={{fontSize:18, color:'#ffffff', fontWeight:'500', marginBottom:0, paddingBottom:0, width:'100%', height:'100%', textAlign:'center', textAlignVertical:'center'}}>X</Text>
        </TouchableOpacity>

        <View style={{width:'100%',height:'100%'}}>
         <ImageViewer imageUrls={image}/>
        </View>

    </View>
  )
   
}

export default ImageModel

const styles = StyleSheet.create({
  container: { 
    width:Width,
    height:Height
  },
  zoomableContainer: { 
    width:Width,
    height:Height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#ddd"
  },
})