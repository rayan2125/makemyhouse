import { StyleSheet, View, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import Colors from '../../screens/utility/color';
import AutoHeightImage from 'react-native-auto-height-image';
import ApiService from '../../ApiServices';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { Util } from '../../utility/scaling';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window"); 


 
const DashboardBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  
  const [bannerData,setBannerData] = useState([]); 

  useEffect(()=>{
    const getBannerData = ()=>{
      let url = 'public/Banners/list';
      ApiService.Getapiheader(url)
      .then(response=>{ 
        response.data.map((item,index)=>{ 
          let data = {
            id:item.id,
            image:item.bannerImg,
            link:item.url,
            title:item.name,
          }   
          console.log(data);
          setBannerData((prevList) => {
            return [...prevList, data];
          });
        })
      })  
      .catch(error=>{
        console.log("banner error: ",error);
      }) 
    }
    getBannerData();
    },[]);

 
  if(bannerData.length > 0 && bannerData )  {
    
  return (
    <Swiper style={{ maxHeight:RFValue(180), marginBottom:0, pointerEvents: "box-none", marginTop:6 }} 
      loop={false}
      useNativeDriver={false}
      animated={true}  showsPagination={true} pagingEnabled={true}
      bounces={true} removeClippedSubviews={true}  
      onIndexChanged={(index) => setActiveIndex(index)}
      dot={<View style={{backgroundColor:Colors.lightGray, width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3 }} />}
      activeDot={<View style={{backgroundColor:Colors.PrimaryColor, width: 12, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3}} />}
    >
        {
            bannerData.map((item,index)=>{
                return(
                  <View style={{
                      maxHeight: RFValue(150),
                      justifyContent: 'center',
                      alignItems: 'center', 
                      padding: 12, 
                      backgroundColor:'#ffffff'
                  }} key={item.title}>
                      {/* <View style={styles.innerslideBanner}>   */}
                      
                        <AutoHeightImage
                            maxHeight={RFValue(150)} 
                            width={windowWidth-12}
                            resizeMode="contain"
                            source={{ uri: item.image }}
                            style={{ borderRadius:9, shadowColor: '#000',
                              shadowOffset: { width: 0, height: 2 },
                              shadowOpacity: 0.8,
                              shadowRadius: 2,
                              borderWidth:1, borderColor:Colors.lighteshGray}}
                        />
                      
                      {/* <AutoHeightImage
                          maxHeight={200} 
                          width={windowWidth-12}
                          resizeMode="contain"
                          source={{ uri: item.image }}
                          style={{ borderRadius:9,elevation: 12}}
                      /> */}
                      {/* <FastImage 
                        resizeMode="stretch"  
                        source={{ uri: item.image }} 
                        style={{width:'100%', height:'100%', borderRadius:9,elevation: 4,}}
                      /> */}
                      {/* </View> */}
                  </View>  
                ) 
              })
        }
  </Swiper>
  );
  }

  if(bannerData.length == 0){
    return(
        <View style={{ height:230, marginBottom:0, pointerEvents: "box-none", marginTop:6}} >
            <View style={[styles.slideBanner]}>
                <View style={[styles.innerslideBanner, {backgroundColor:'#eee',height: 180,}]}>  

                </View>
            </View>
        </View>
    )
  } 
};

const styles = StyleSheet.create({ 
  slideBanner: {
    maxHeight: 200,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 12,   
  }, 
  innerslideBanner: { 
    overflow: 'hidden',
    width: '100%',
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 9,
    elevation: 2,
    backgroundColor:'red'
  }, 
});

export default DashboardBanner;
