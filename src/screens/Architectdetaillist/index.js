import React, { useEffect, useState, useCallback , useRef } from 'react';
import { Modal, BackHandler, View, Text, Image, Share, SafeAreaView,VirtualizedList, TouchableOpacity, TextInput,Dimensions,StyleSheet } from 'react-native'
import { Util } from '../utility/scaling.js';
import Images from '../utility/images.js';
import EnquiryNowpopup from './EnquiryNowpopup.js'; 
import MorePopup from './MorePopup.js'
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
 
import Loader from './loader.js';
import axios from 'axios';
import { useNavigation,useNavigationState  } from '@react-navigation/native';
import ImageContainer from './ImageContainer.js';
import Colors from '../utility/color.js';

// let APIURL = GlobalData.APIURL;  
let APIURL = 'https://api.makemyhouse.com/'; 

let arrIds = new Array(); // store the project ids.
let arrDetails = new Array(); // store project details. 

 
import ArrowLeftLight from '../../../assets/images/icons/arrowLeftLight.svg'; 

import Swiper from 'react-native-swiper'; 

import ImageModel from './imageModel.js';

import { useFocusEffect } from '@react-navigation/native';

import FavIcon from './favIcon.js';

import { RFValue } from 'react-native-responsive-fontsize';
 

import Zoomicon from '../../../assets/images/icons/zoomicon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import { FontWeight } from '../utility/fonts.js';


const Architectdetaillist = ({ navigation, route }) => {  

  const navigationInit = useNavigation(); 

  const flatListRef = useRef(null);
  const scrollOffset = useRef(0);
  const isScrolling = useRef(false);
  const [scrollingEnabled,setscrollingEnabled] = useState(true);

  const handlScrollingBeginDrag = ()=>{
      setscrollingEnabled(true);
      setTimeout(()=>{
          setscrollingEnabled(false);
      },1000);
  }

  const handleScrollingEndDrag = ()=>{
      setscrollingEnabled(false);
      setTimeout(()=>{
          setscrollingEnabled(true);
      },1000);
  }
  const [scrollPosition, setScrollPosition] = useState(0);

  let aa = parseInt(Height-Util.getHeight(7));

  const [snapIndex, setSnapIndex] = useState(0);

  const handleScrolling = (event)=>{
      const { contentOffset } = event.nativeEvent;
      const newIndex = Math.round(contentOffset.y / aa);
      if (newIndex !== snapIndex) {
      event.nativeEvent.contentOffset = { x: 0, y: snapIndex * aa};
      }
  }
  
  const type = route?.params?.pagetype;    
  const [more,setmore] = useState(false); // use to show the more details
  const [enquirypopup, setenquirypopup] = useState(false);   

  const routeName = useNavigationState(state => state.routes[state.index].name);

  const navigationState = useNavigationState((state) => state);
  

  const handleBackPress = () => {  
        // console.log("routeName:",routeName); 
        // You can also check conditions before navigating
        //   if (routeName == 'Architectdetaillist' ) {
        //       if(type == 2){  
        //           navigation.navigate('InteriorList');
        //           return true;
        //       }else{
        //           navigation.navigate('ArchitectList');
        //           return true;
        //       }
        //   } 
        // return true;
        // const { routes, index } = navigationState;
        // if (index > 0) {
        // const previousRouteName = routes[index - 1].name;
        //     console.log('Previous route name:', previousRouteName);
        // } else {
        //     console.log('No previous route');
        // }
        // return true;
  }; 
    //   useEffect(() => { 
    //       const backSubscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    //       return () => backSubscription.remove();
    //   }, []);

    const [token,setToken] = useState('');

    useFocusEffect(
        useCallback(() => {  
            console.log('Screen went in focus');
            AsyncStorage.getItem("ShareUrlFilters",(error, creds)=>{
                console.log("_+_+_+_+_+_+_ Detailed screen list: ", creds);
            });
            AsyncStorage.getItem('UserToken',(err, cr)=>{
                setToken(cr);
            });
          return () => { 
            console.log('Screen went out of focus');
            AsyncStorage.removeItem("ShareUrlFilters");
          };
        }, [])
    );

    useFocusEffect(
        useCallback(() => { 
        console.log('Screen came into focus');
        const backSubscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => backSubscription.remove();
        }, [])
    );

    const [shareFilters,setshareFilters] = useState('');

    // start: filters
    useEffect(()=>{
        AsyncStorage.getItem("ShareUrlFilters",(err,creds)=>{
            if(creds != '' || creds != null){
                setshareFilters(creds);
            }
        });
    },[]);
    // end: filters


  
  const enquirypopupclosefunc = (val) => {
      setenquirypopup(false)
  } 
  const morepopupclosefunc = (val) => {
      setmore(false)
  }
  // here to handle the state of enquery-complnent 
  const handleStateEnquiryNowpopup = (newValue)=>{
      setenquirypopup(newValue);
  }
  

  // project ids 
  const [projectIds,setProjectIds] = useState([]);
  const arrIds = useRef([]);  
 
  const [favarray,setFavarray] = useState([]);
  const favRef = useRef(null);
  useEffect(() => {
    if(favRef.current != null ){ 
        console.log("favRef.current = '': ", {
            favarray,
            ref: favRef.current
        });
        setFavarray((prevArray) => [...prevArray, favRef.current]);
    } 
  }, [favRef.current]);

  // project details 
  const [projectDetailes,setProjectDetailes] = useState([]);
  const arrProjectDetails = useRef([]);

  useEffect(()=>{ 
    arrIds.current = []; // empty arrIds
    arrProjectDetails.current = [] // empty arrProject
    arrIds.current  = route.params.projectId ;
    setProjectIds([arrIds.current]);    
  },[]);

  
  // useEffect runs when got the first product Id
  useEffect(()=>{ 
      if(projectIds.length == 1){
        Trendingapicall();  
      } 
  },[projectIds,token]); 

  // Trendingapicall
  const Trendingapicall = async () => {   
      if( projectIds != undefined && projectIds.length>0){ 
      console.log("Trendingapicall Call");
      // console.log("projectIds: 1: ", projectIds); 
          try{
            if(token){
                let url = `${APIURL}public/projects/project_details/${projectIds[0]}?token=${token}`; 
                console.log("----->>>: ", url);
                const response = await axios.get(url);   
    
                // console.log("first project::::",response.data);
    
                if(response.data.length>0){  
                    arrProjectDetails.current = response.data;  
                    if(response.data.wishlisted == true){
                        // favarray.push(`${response.data.projectID}`);
                       // setFavarray((prev)=>[...prev,response.data.projectID]);
                       favRef.current = response.data.projectID;
                    } 
                } 
            } else{
                console.log("token is not avliable wait for some time ")
            }
          }
          catch(error){
            console.log(error);
            return error;
          }
          finally{
            console.log("Trendingapicall finally Call" );
            setProjectDetailes([arrProjectDetails.current]); 
            // GetNextProjectsIDs();
          }
      }else{
          console.log("else condition Trendingapicall");
      }
  }; 

 
  // run when received first project details. 
  useEffect(()=>{
      if(projectDetailes != undefined && projectDetailes.length == 1){ 
        GetNextProjectsIDs();  
      }else{
        console.log('Project details length is longer ')
      }
  },[projectDetailes]); 

 
  // now get the next projects details. 
  const GetNextProjectsIDs = async  ()=>{ 
      if(projectDetailes != undefined || projectDetailes.length == 1){ 
      console.log("GetNextProjectsIDs Call")
      let url = `${APIURL}public/projects?random=1&noOfProjects=4&exceptProjectID=${projectIds[projectIds.length - 1]}${shareFilters}&token=${token}`; 
      console.log("GetNextProjectsIDs:->",url);
      try{ 
          const response = await axios.get(url);    
          if( response.data.length > 0 ){ 
              response.data.map((item,index)=>{     
                  setProjectIds((prevState) => [...prevState, item.projectID]);
              });
          } 
      }catch(error){
          console.log("get Next Project Ids:---",error); 
          return error;
      } 
      finally{
          console.log("GetNextProjectsIDs finally call") 
          } 
      }else{
      console.log("else condition GetNextProjectsIDs");
      } 
  }

  useEffect(()=>{
      if(projectIds.length == 5){ 
        console.log(projectIds);
        AddNewProjectsDetails();
      }  
  },[projectIds]);
 
  // get next ids data
  const AddNewProjectsDetails = () =>{ 
      console.log("AddNewProjectsDetials call");
      try{
      if(projectIds != undefined && projectIds.length == 5){
          console.log("projectIds:1:::::::::: ",projectIds); 
          projectIds.map( async (item,index)=>{ 
              if(item != projectIds[0]){
                let url = `${APIURL}public/projects/project_details/${item}?token=${token}`;
                console.log("AddNewProjectsDetails:->",url);
                let response = await axios.get(url);   
                console.log(index); 
                setProjectDetailes((prevState) => [...prevState, response.data]);
                 
                if(response.data.wishlisted == true){
                    //favarray.push(`${response.data.projectID}`);
                    // setFavarray((prev)=>[...prev,response.data.projectID]);
                    favRef.current = response.data.projectID;
                } 
              }
          })
      }else{
          console.log("else condition AddNewProjectsDetails")
      }
      }
      catch(error){
      console.log(error);
      return error;
      }
      finally{
      console.log("AddNewProjectsDetials finally call");  
      }
  } 
 
  // start: VirtualizedList
  const [continueLoading,setContinueLoading]  = useState(false);
  const getItemCount = (data,index) => data.length;
  const getItem  = (data,index)=>{ 
      return data[index];
  } 
  // redner footer element 
  const renderFooter = ()=>{
      return continueLoading ? (
          <View style={{ height:Height-Util.getHeight(7), padding: 10, justifyContent:'center', alignContent:'center', alignItems:'center',marginBottom:Util.getHeight(7) }}>
              <Text>Loading...</Text>
          </View>
      ) : null;
  } 

  const infiniteScrolling = async ()=>{
      if(continueLoading){
          return;
      }
      else if(projectIds.length >= 3 && projectDetailes.length >= 3){
      setContinueLoading(true);
      console.log('run infinite scrolling : if');
      // now here we add new items into the system...
      let arrIdsTemp = new Array();
      let url = `${APIURL}public/projects?random=1&noOfProjects=5&exceptProjectID=${projectIds[projectIds.length - 1]}${shareFilters}`; 
      try{
          const response = await axios.get(url);
          response.data.map((item,index)=>{
             arrIdsTemp.push(item.projectID);
          })
      }   
      catch(error){
          return error;
      }
      finally{
          if(arrIdsTemp.length > 0){
              arrIdsTemp.map( async (item,index)=>{
                  let url = `${APIURL}public/projects/project_details/${item}`;
                  let response = await axios.get(url);
                  setProjectDetailes((prevState) => [...prevState, response.data]);
                   

                  if(response.data.wishlisted == true){
                    
                    favRef.current = response.data.projectID;
                  } 
              })
              setContinueLoading(false);
          }
      } 
      }else{
          console.log('run infinite scrolling : else');
      }
  } 
  // end: VirtualizedList

  const[ tempProjectId, setTempProjectId] = useState('');


  // share component  
  const onShare = async (projectname, link) => {
      try {
        const result = await Share.share({
          title: link,
          url:`${link}`,
          message:`${link}`,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
            console.log("Shared with activity type.");
          } else {
            // shared
            console.log("Shared");
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
          console.log("Share dismissed");
        }
      } catch (error) {
        console.log(error);
      }
  };

  
  const [imageModel,setImageModel]= useState();
  const [imageModalVisible,setImageModalVisible]=useState(false);
  const imageModelHandler = (data) =>{
    console.log(data);
    setImageModel(data);
    setTimeout(()=>{
        // setImageModalVisible(!imageModalVisible);
        navigation.navigate('ImageModel',{data:data});
    },10); 
  }
  
  // end: Fav 

  const RenderItem = useCallback(({item,index}) => (
      <> 
          <View key={item.projectID} style={{backgroundColor:'rgba(0,0,0,0.3)',padding:0,height:Height-Util.getHeight(7),borderColor:'#fff',borderBottomWidth:6,position:'relative'}} > 
               
              <View style={{position:'absolute',bottom:Util.getHeight(16),right:0,zIndex:999, right:13}}>
                 
                <FavIcon projectid={item.projectID}  wishlisted={item.wishlisted}/>
                  
                <TouchableOpacity activeOpacity={0.8} style={{marginTop:12}} onPress={()=>onShare(item.projectName,item.shareUrl)}> 
                    <View  style={{width:45, height:45, justifyContent:"center", alignItems:'center', alignItems:'center', backgroundColor: "#00000050", borderRadius:50  }}>
                        <Image source={Images.Share_reel} style={{ height:RFValue(30), width: RFValue(30), alignSelf: "center" }} />  

                    </View>
                    <View style={{ alignSelf: "flex-end", marginRight: 22, }}></View>  
                </TouchableOpacity>

                
                <TouchableOpacity activeOpacity={0.8} style={{marginTop:12}} onPress={()=>imageModelHandler(item.imageDetail)} > 
                    <View  style={{width:45, height:45, justifyContent:"center", alignItems:'center', alignItems:'center', backgroundColor: "#00000050", borderRadius:50  }}> 
                        <Zoomicon width={RFValue(25)} height={RFValue(25)}/>
                    </View>
                    <View style={{ alignSelf: "flex-end", marginRight: 22, }}> 
                    </View>  
                </TouchableOpacity>


              </View> 

              <ImageContainer more={more} navigation={navigation} imageData={item.imageDetail} imageModelHandler={imageModelHandler} title={item.projectName}/> 
              <View style={{position:'absolute',padding:2,bottom:12,left:12,right:12,zIndex:999}}>
                    
                   
                  {/* <Text style={[{  fontSize: 16, fontWeight: '400', color:'red' }]}>{item.projectID}</Text>   */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between",alignContent:'center',alignItems:'center',paddingBottom: 10, marginTop:10, marginBottom:3  }}>  
                      {
                              type == 2 ? null : 
                              <TouchableOpacity style={{ flexDirection: "row" }} onPress={() =>{ setmore(true); setTempProjectId(item.projectID)}}>
                                  <Image source={Images.Upward_Arrow_Green} style=
                                      {{ height: 30, width: 30, alignSelf: "center" }} />
                                  <Text style={{ marginLeft:6, fontWeight:600, color: "#4CB050", fontSize: 16, fontWeight: '400', alignSelf: "center" }}>
                                      MORE 
                                  </Text> 
                              </TouchableOpacity>
                      }
                      <TouchableOpacity style={{ backgroundColor: "#4CB050", padding: 10, borderRadius: 10, width: 150 ,}} onPress={() => {setenquirypopup(true); setTempProjectId(item.projectID)}}>
                          <Text style={{ textAlign: "center", fontWeight: "400", fontSize: 16, color: '#ffffff' }}>ENQUIRY NOW</Text> 
                      </TouchableOpacity>
                  </View>
                  
              </View>
          </View>
      </>
  ),[]); 
 

  const [activeIndex,setActiveIndex] = useState(0)
  // swipper 
    const swiperRef = useRef(null)

  useEffect(()=>{
    
    if (swiperRef && swiperRef.current) {
      console.log("active index:", activeIndex);
      console.log("projectDetailes length:", projectDetailes.length);
      
      if(activeIndex == projectDetailes.length ){
        console.log(activeIndex);
        // infiniteScrolling();
        console.log(projectDetailes);
      }else{
        console.log(null);
       
      }
    }else{
      console.log("nothing here...")
    }

  },[activeIndex]); 

  const onMomentumScrollEnd = (e, state) => {  
      console.log("active index:", state.index);
      
    //  console.log(state.index);
    if(state.index+1 == projectDetailes.length){ 
      console.log("run function here ");
      infiniteScrolling();
    }
    // You can change the index value here 
  }
 

  // main return 
  return (
      <SafeAreaView style={{ flex: 1, }}>
          {/* start of header */}
         
          {
              more == false ? (
                  <View style={{ zIndex:9999,backgroundColor: Colors.SecondaryColor, height: Util.getHeight(7), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#D4D4D4" }}>
                      <TouchableOpacity style={{ flex: 0.2 }} onPress={() => navigation.goBack()}>
                          {/* <Image source={Images.BlackLeftArrow}
                              style={{ width: 18, height: 18, }} resizeMode='contain'
                          /> */}
                          <ArrowLeftLight  width={18} height={18} />
                      </TouchableOpacity>

                      {
                        type == 2 ?
                        <Text style={{color:Colors.white, fontSize:RFValue(15),fontWeight:FontWeight.medium}}>Interior Design </Text>
                        :
                        <Text style={{color:Colors.white, fontSize:RFValue(15),fontWeight:FontWeight.medium}}>Architectural Design</Text>
                      } 
                 
                  </View>
              ) : null
          }
              
          {/* end of header */}
          {/* <PagerView style={{ flex: 1 }} initialPage={0} orientation="vertical"> */}
             
      
                  {
                      projectDetailes.length >=5 ?
                      <>
                  
                     

                       <Swiper
            ref={swiperRef}
            style={styles.wrapper}
            showsButtons={false}
            buttonWrapperStyle={styles.buttonWrapper}
            // nextButton={<Text style={styles.buttonText}>Next</Text>}
            // prevButton={<Text style={styles.buttonText}>Prev</Text>}
            loop={false}
            horizontal={false}
            pagination={false}
            bounces={true}
            showsVerticalScrollIndicator={false}
            pagingEnabled={true}
            showsPagination={false}

            // onIndexChanged={(index) => setActiveIndex(index)}

            
            onMomentumScrollEnd={onMomentumScrollEnd}

            loadMinimal={true} loadMinimalLoader={ <Text>Loading....</Text>} 
          > 
   

            {
              projectDetailes.map((item,index)=>{
                return (
                <RenderItem key={index} item={item} index={index}/>
                )
              })
            } 

            </Swiper> 
                         
                      </>
                      :  
                        <View
                            style={{
                                
                                height:Height,
                                width: '100%',
                                zIndex: 666,
                                backgroundColor:'#fff',
                                flexDirection:'column',
                                padding:0,
                                justifyContent:'flex-start',
                                alignContent:'center',
                                alignItems:'center'
                                }}
                            >
                            <Loader/>
                            <Loader/>
                            <Loader/>
                        </View>
                  }

             
              {/* end: main component */}
          {/* </PagerView>  */}
            {
                more && 
                <View style={{}}>
                  <MorePopup projectId={tempProjectId} morepopupclosefunc={morepopupclosefunc} more={more} />
                </View> 
            } 
          
            {
              enquirypopup &&
              <View style={{}}>
                  <EnquiryNowpopup projectId={tempProjectId} handleStateEnquiryNowpopup={handleStateEnquiryNowpopup} enquirypopupclosefunc={enquirypopupclosefunc} navigation={navigation} type={type}/>
              </View>
            }

            {/* <Modal animationType="slide" transparent={true} visible={imageModalVisible}>
                <ImageModel data={imageModel}/>
            </Modal> */}
      </SafeAreaView>
  )
}

export default Architectdetaillist;

const styles = StyleSheet.create({
  textShadow:{ 
      color: "#fff", 
      textShadowColor: 'rgba(0, 0, 0,1)', // Shadow color
      textShadowOffset: { width: 2, height: 2 }, // Shadow offset
      textShadowRadius: 5, // Shadow radius
  },
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
  },
  modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: 160,
      width: 220

  },
  button: {
      borderRadius: 15,
      padding: 5,
      elevation: 2,
  },
  buttonOpen: {
      backgroundColor: '#F194FF',
  },
  buttonClose: {
      backgroundColor: '#2196F3',
  },
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  modalText: {
      color: "#000000",
      fontSize: 17,
      lineHeight: 35,
      fontWeight: "600"
  },
  modalText2: {
      color: "#000000",
      fontSize: 13,
      lineHeight: 15
  },
});