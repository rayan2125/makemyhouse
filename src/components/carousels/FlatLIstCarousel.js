import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;  // Adjust the item width to show 3 items per screen

// import Colors from '../../screens/utility/color';
import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component
import FontSize,{FontWeight} from '../../screens/utility/fonts';


import CircleWithPlusSign from '../../../assets/images/icons/circleWithPlusSign.svg';
import CircleWithTickSign from '../../../assets/images/icons/circleWithTickSign.svg';
import { RFValue } from 'react-native-responsive-fontsize';

import SvgUri from 'react-native-svg-uri'; // Import SvgUri
 
const FlatListCarousel = (props) => {

  // useEffect(()=>{
  //   console.log("props--------===========", {
  //     length:props.data[0],
  //     type:props.data
  //   })
  // },[]);

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / ITEM_WIDTH);
    setCurrentIndex(newIndex);
  }; 

  // const [temp,settemp] = useState([]);
  // useEffect(()=>{
  //   if(props.listData!= undefined){
  //     console.log("item added into the list already props: ",props.listData); 
  //     settemp(props.listData);
  //     console.log(props.listData.includes(parseInt(7)))
  //   }
    
  // },[props]); 

  const renderItem = ({ item,index }) => (
    // <View style={styles.itemContainer}>
    //   <Text style={styles.itemText}>{index+1}</Text>
    // </View> 
    <TouchableOpacity key={item.id} activeOpacity={0.41}  style={styles.containerBox} onPress={()=>{props.onPress(item)}}>
        <View style={[styles.box,styles.upperBox,{backgroundColor:item.type=='BNDL'?'#D3EDD7':'#D4D4D4'}]}> 
            <View style={{width:50,height:50, backgroundColor:'#ffffff', borderRadius:50,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
              {
                (item.icon == null && item.icon == '') ? 
                  <AutoHeightImage
                      width={32}
                      maxHeight={32}
                      resizeMode="contain"
                      source={{uri:item.featured_image}}
                  /> 
                  :
                  (
                    item.icon.includes('png') ? 
                      <AutoHeightImage
                          width={28}
                          maxHeight={28}
                          resizeMode="contain"
                          source={{uri:item.icon}}
                      /> 
                    : 
                      <SvgUri
                        width={RFValue(16)}
                        maxHeight={RFValue(16)}
                        source={{ uri: item.icon }} // Set the source to the SVG URL
                      />
                  )
              }
                   
                      
            </View>
        </View>
        <View style={[styles.box,styles.lowwerBox]}>
            <Text style={{textAlign:'center',fontSize:FontSize.xp,fontWeight:FontWeight.regular, margin:10}}>{item.name}</Text>
             
            {/* {
              props.list.includes(item.id) == item.id? 
              <CircleWithTickSign width={RFValue(32)} height={RFValue(32)}/> 
              :
              <CircleWithPlusSign width={RFValue(32)} height={RFValue(32)}/> 
            }  */}
            {
              props.listData!= undefined?
              (
                props.listData.includes(parseInt(item.id)) == true? 
                <CircleWithTickSign width={RFValue(32)} height={RFValue(32)}/> 
                :
                <CircleWithPlusSign width={RFValue(32)} height={RFValue(32)}/> 
              )
              :
              null
            }
        </View> 
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}> 
      {/* {
        props.data.map((item,index)=>{
          return (<Text style={{color:'yellow'}}>{item.name}</Text>)
        })
      } */}
      <FlatList
        ref={flatListRef}
        data={props.data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}  // Disable paging as we need custom scroll handling
        snapToInterval={ITEM_WIDTH}  // Snap to each item
        decelerationRate="normal"  // Control the speed of deceleration
       // onScroll={handleScroll}
        keyExtractor={(item, index) => index.toString()} 
      />
      {/* <View style={styles.pagination}>
        {Array(Math.ceil(props.data.length - 2)).fill().map((_, index) =>{ 
         return <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: currentIndex === index ? Colors.PrimaryColor : '#ddd' },
              currentIndex === index?{backgroundColor:Colors.PrimaryColor, width: 12, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 0, marginBottom: 3,}:{}
            ]}
          /> 
        })}   
      </View>  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    width:'100%',
    minHeight:230,
    padding:10, 
  },
  itemContainer: {
    width: ITEM_WIDTH - 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ccc',  // Adjust the background color as needed
    marginHorizontal: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
  pagination: {
    width:"100%", 
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap:'wrap',
    alignItems: 'center',
    paddingVertical: 10, 
    marginTop:0,  
  },
  dot: {
    // backgroundColor:Colors.lightGray, width: 8, height: 8,borderRadius: 4, 
    // marginHorizontal: 5,
    // marginBottom:8
     width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginBottom: 3,
  },
  containerBox:{
    width: ITEM_WIDTH - 10,
    height:210,
    backgroundColor:'#ffffff',
    margin:4,
    marginHorizontal: 5, 
    flexDirection:'column', 
    borderTopLeftRadius:12,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
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
    height:110,
    backgroundColor:'#ffffff',
},
tag:{
    position:'absolute', top:10, left:0,
    zIndex:999,
    borderTopRightRadius:4,borderBottomRightRadius:4,
    flexDirection:'row', justifyContent:'flex-start'
},
tagText:{
    fontSize:12,
    textAlign:'left',
    paddingVertical:2,
    paddingLeft:4,
    paddingRight:6,
    fontWeight:'500'
} 
});

export default FlatListCarousel;
