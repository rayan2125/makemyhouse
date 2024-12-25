import { StyleSheet, View, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import Colors from '../../utility/color';
import AutoHeightImage from 'react-native-auto-height-image';
import ApiService from '../../ApiServices';


const { width: windowWidth } = Dimensions.get("window"); 

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
    <Swiper style={{ height:230, marginBottom:0, pointerEvents: "box-none"}} 
      loop={false}
      useNativeDriver={false}
      animated={true}  showsPagination={true} pagingEnabled={true}
      bounces={true} removeClippedSubviews={true}  
      onIndexChanged={(index) => setActiveIndex(index)}
      dot={<View style={{backgroundColor:Colors.lightGray, width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 22, marginBottom: 3,}} />}
      activeDot={<View style={{backgroundColor:Colors.PrimaryColor, width: 12, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 22, marginBottom: 3,}} />}
    >
        {
            bannerData.map((item,index)=>{
                return(
                  <View style={{
                      justifyContent: 'center',
                      alignItems: 'center', 
                      padding: 12, 
                      position: 'relative', 
                  }} key={item.title}>
                      <View style={styles.innerslideBanner}>  
                      <AutoHeightImage
                          height={130} 
                          width={windowWidth}
                          resizeMode="contain"
                          source={{ uri: item.image }}
                      />
                      {/* <Image 
                          resizeMode="contain"
                          source={{ uri: item.image }}
                          style={{width:'100%', height:'100%'}}
                      /> */}
                      </View>
                  </View>  
                ) 
              })
        }
  </Swiper>
  );
  }

  if(bannerData.length == 0){
    return(
        <View style={{ height:230, marginBottom:0, pointerEvents: "box-none",}} >
            <View style={[styles.slideBanner]}>
                <View style={[styles.innerslideBanner, {backgroundColor:'#eee',height: 120,}]}>   
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
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 9,
    elevation: 2, 
  }, 
});

export default DashboardBanner;
