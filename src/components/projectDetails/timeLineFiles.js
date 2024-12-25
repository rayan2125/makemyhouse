import { View, Text, StyleSheet,Dimensions, TouchableOpacity, Image, VirtualizedList} from 'react-native'
import React,{useCallback} from 'react';

import RNFetchBlob from 'rn-fetch-blob';
 
import Colors from '../../screens/utility/color';

import FontSize,{FontWeight} from '../../screens/utility/fonts';

 
import FilesSVG from '../../../assets/images/icons/files.svg'; 
  
import { actuatedNormalize } from '../../screens/utility/scaling';



const  Files = (props) => {
  
  // to download the pdf file 
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
 
  // start: virtualization
  const getItemCount = (data,index) => data.length;
  const getItem  = (data,index)=>{ 
      return data[index];
  } 

  function formatDate(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);
    
    // Define arrays for month names and suffixes
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const suffixes = ['AM', 'PM'];

    // Get day, month, and year from the Date object
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    
    // Get hours and minutes
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    
    // Determine AM/PM and adjust hours for 12-hour format
    const period = hours >= 12 ? suffixes[1] : suffixes[0];
    hours = hours % 12 || 12; // Convert to 12-hour format
    
    // Pad minutes with leading zero if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Build the formatted date string
    return `${day}-${month}-${year} ${hours}:${formattedMinutes}${period}`;
  }
  
  const renderItem = (({item,index}) => (
    
      <TouchableOpacity key={item.id} style={[styles.FilesCotainer,props.data.length == index+1?{marginBottom:110}:{}]} onPress={()=>{
        item.doc.extension == 'pdf'?
          handleDownload(item.doc.url,item.doc.name)
        :
        console.log("not a pdf file.")
      }}> 
        <View style={[styles.LeftSideImages]}>
          {
            item.doc.extension == 'pdf'?
            <View style={[styles.circle]}>
              <FilesSVG width={actuatedNormalize(28)} height={actuatedNormalize(28)} /> 
            </View> 
            :
            <View style={[styles.circle,{backgroundColor:Colors.lighteshGray,overflow: 'hidden'}]}> 
                <Image 
                 style={{ width:90, height:90, resizeMode: 'cover' }}
                 source={{uri:item.doc.url}}
                />
            </View> 
          }
          
        </View>
        <View style={[styles.RightSideContent]}>
          <Text style={[styles.mainHeader]}>{item.doc.name}</Text>
          <Text style={[styles.para]}>
            {formatDate(`${item.doc.date}`)}
          </Text> 
        </View>
      </TouchableOpacity>
  ))

  return (
    <VirtualizedList
      windowSize={4}
      data={props.data}
      initialNumToRender={4}
      keyExtractor={(item,index) => index}
      getItemCount={getItemCount}
      renderItem={renderItem}
      getItem={getItem}  
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
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

export default Files