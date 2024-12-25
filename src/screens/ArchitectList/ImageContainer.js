import React,{useState, memo} from 'react'
import { Text,  Image,StyleSheet, Dimensions,TouchableOpacity,ImageBackground   } from 'react-native'; 
 
import AutoHeightImage from 'react-native-auto-height-image';
const Width = Dimensions.get('window').width;  
let APIURL = 'https://api.makemyhouse.com/';

const ImageContainer = ({index, navigation, data,projectid, path})=>{    
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handleClick = (index,projectid) => { 
        // Handle the click event here 
      console.log(`'View clicked: ${projectid} ==== index: ${index}`); 
      // now use this.. projectId to nevigate to the detailed screen 
      navigation.navigate('Architectdetaillist', { projectId: projectid });
    };

    
    return (  
           <>   
            
                        <TouchableOpacity key={index} activeOpacity={1}  onPress={()=>navigation.navigate('Architectdetaillist', { projectId: projectid })}>  
                            <AutoHeightImage
                                width={Width}
                                // maxHeight={400} 
                                source={{ uri: `${APIURL}public/media/rimage/500/${path}${data}?watermark=false` }}
                            />
                        </TouchableOpacity>  

            </> 
    )
}

export default memo(ImageContainer);


const styles = StyleSheet.create({
    container: {
      width: 300,
      height: 200, 
      padding: 20,
    },
    slide: {
      width:'100%',
      height: '100%',  
      paddingRight:0,
      paddingEnd:0
    },
  });