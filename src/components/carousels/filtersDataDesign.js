import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../screens/utility/color";
import FontSize,{FontWeight} from "../../screens/utility/fonts";
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import Images from "../../screens/utility/images";
import FastImage from "react-native-fast-image";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

import RNFetchBlob from 'rn-fetch-blob';

const FiltersDataDesign = (props) => {
   

  const Data = props.data;
  
  const [tempFilter,setTempFilter] = useState('');
 
  const handleDownload = async (url,name,) => {
    alert('Downloading', 'PDF download is in progress...', [], { cancelable: false });
    try {
      const { config, fs } = RNFetchBlob;
      const { DownloadDir } = fs.dirs;

      const response = await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: 'Downloaded PDF File',  
          description: 'Downloading PDF file...',
          path: `${DownloadDir}/${name}.pdf`,
        },
      }).fetch('GET', url);

      console.log('Success', 'PDF downloaded successfully!');
      alert('Success', 'PDF downloaded successfully!', [], { cancelable: false });
    } catch (error) {
      console.log('Error', 'Failed to download PDF. Please try again later.', error);
    }
  };

  // renderItem component 
  const renderItem = ({ item,index }) => (
    (props.type == 1 ?
      <TouchableOpacity key={index}  activeOpacity={0.91} style={[styles.container]}>
          <AutoHeightImage
              width={windowWidth/2} 
              maxHeight={168}
              resizeMode="contain"
              source={item.image}
              style={{borderTopLeftRadius:12,borderTopRightRadius:12,}}
          />
          <View style={{marginVertical:2}}></View> 
            {
              props.extraText == true ? 
              <Text style={styles.filtersDataText}>    
                {props.text} {item.data.area}
              </Text>
              :
              <Text style={styles.filtersDataText}>    
                  {item.data.area}
              </Text> 
            }
      </TouchableOpacity>
      :
      props.type == 2 ? 
      <TouchableOpacity key={index}  activeOpacity={0.91} style={styles.container}>
          <AutoHeightImage
              width={windowWidth/2}
              maxHeight={160} 
              resizeMode="contain"
              source={item.image}
              style={{borderTopLeftRadius:12,borderTopRightRadius:12,}}
          /> 
          <Text style={[styles.filtersDataText,styles.filtersDataTextTwo,{fontWeight:'500'}]}>
              {item.data.area}
          </Text> 
      </TouchableOpacity>
    :
    props.type==3?
      <TouchableOpacity key={index} activeOpacity={0.91} style={[styles.container,styles.mediaCoverage]}>
          <View style={[styles.mediaBox,{height:60,backgroundColor:'#ffffff'}]}>
              <AutoHeightImage
                  width={windowWidth/2}
                  maxHeight={50} 
                  resizeMode="contain"
                  source={item.image} 
              />  
          </View>
          <View style={[styles.mediaBox]}>
            <Text style={[styles.filtersDataText,{fontWeight:'700',textAlign:'center',fontSize:12,padding:6}]}>
              Publication: {item.data.area}
            </Text>
          </View>
      </TouchableOpacity>
    :
    props.type==4?
      <TouchableOpacity key={item.title} activeOpacity={0.91}  style={[styles.container,{flexDirection:'column',position:'relative'}]} 
        onPress={()=>{
            if(item.type != 'pdf' ){
              props.openCloseImageModalHandler(item.image, item.type)
            }else{
              handleDownload(item.image,item.title);
            } 
          } 
        }
      >
          <View style={[styles.sampleDelivery,{height:160, overflow:'hidden', borderTopLeftRadius:16,borderTopRightRadius:16}]}>
              <Text style={styles.sampleDeliveryTextPosition}>{item.title}</Text>
              <View style={styles.sampleDeliveryOverlay}></View> 
              {/* <AutoHeightImage
                  width={windowWidth/2} 
                  resizeMode="contain"
                  source={{uri:item.image}} 
                  style={{borderTopLeftRadius:16,borderTopRightRadius:16}}
              />    */}
              {
                item.type != 'pdf'? 
                <Image
                  resizeMode="contain"
                  source={{uri:item.image}} 
                  style={{height:'100%', width:'100%'}}
                />
                :
                <FastImage 
                  resizeMode={FastImage.resizeMode.contain} 
                  style={{ width: '100%', height: '80%' }}  
                  source={Images.pdfthumb}
                />
              }
              
          </View>
          {/* <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:8}}>  
              <Text style={styles.sampleDeliveryTextViewproject}>View Project</Text>  
              <AutoHeightImage
                  width={28}
                  maxHeight={12} 
                  resizeMode="contain"
                  source={Images.ArrowRightFillDark} 
                  style={{borderTopLeftRadius:16,borderTopRightRadius:16,marginLeft:6}}
              /> 
          </View> */}
      </TouchableOpacity>
    :null
    )
    
  );

  return ( 
    <FlatList
      style={{marginTop:18}}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={Data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      bounces={false}
    />
  )
}

const styles = new StyleSheet.create({  
  container:{
    width:windowWidth/2, 
    marginRight:12, 
    position:'relative' 
  },
  filtersDataText:{
    fontSize:FontSize.p, 
    color:Colors.black
  },
  filtersDataTextTwo:{
    position:'absolute',
    bottom:2,
    left:6,
    color:Colors.white
  },
  mediaCoverage:{
    minHeight:40,
    backgroundColor:Colors.white,
    borderWidth:2,
    borderColor:Colors.lightGray,
    flexDirection:'column'
  },
  mediaBox:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    width:'100%',
    backgroundColor:'#D9D9D9'
  },
  sampleDelivery:{
    position:'relative',
    padding:0,
    margin:0,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  sampleDeliveryTextPosition:{
    position:'absolute',
    top:10, left:10, zIndex:999,
    fontSize:FontSize.xxp,
    color:Colors.white,
    fontWeight:'500'
  },
  sampleDeliveryOverlay:{
    width:'100%',height:160,
    backgroundColor:'rgba(0,0,0,0.18)',
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
    position:'absolute',
    top:0,left:0,
    zIndex:888
  },
  sampleDeliveryTextViewproject:{ 
    fontSize:FontSize.p,
    fontWeight:FontWeight.regular,
    color:Colors.SecondaryColor
  }
})

export default FiltersDataDesign