import { View, Text, ScrollView, StyleSheet,BackHandler, ToastAndroid,Dimensions,Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'
import OneSignal  from 'react-native-onesignal'; 
import MainHeader from '../../components/headers/mainHeader'
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
// inner compoentns 
import Banner from '../../components/carousels/banner'
import PendingOrdersCarousel from '../../components/carousels/pendingOrders'
import FiltersHeader from '../../components/carousels/filrersHeader'
import FiltersDataDesign from '../../components/carousels/filtersDataDesign'
import HowItWorks from '../../components/howitwork'
import Testimonial from '../../components/testimonial'
import DesignPlanning from '../../components/designAndPlanning'
import Aifloreplan from '../../components/designAndPlanning/Aifloreplan'
import MediaCoverage from '../../components/mediaCoverage'
import HomePlanDesign from '../../components/homePlanDesign'
import ContractorWorker from '../../components/contractorWorker'

// utiles
import Colors from '../utility/color.js';
import FontSize ,{FontWeight} from '../utility/fonts.js';
import Images from '../utility/images.js';

// api service
import ApiService from '../../ApiServices';
 
import LoadingPackageCard from '../../components/designAndPlanning/loadingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { useNavigation,useNavigationState  } from '@react-navigation/native';

// notification 
import AnimatedMessage from '../../components/animatedNotification';
 
import TrendingHouseDesign from '../../components/PlotFiltersCategory/TrendingHouseDesign.js';
import InteriorHouseDesign from '../../components/PlotFiltersCategory/InteriorHouseDesign.js'
import CommercialHouseDesign from '../../components/PlotFiltersCategory/CommercialHouseDesign.js'

import { useTranslation } from 'react-i18next'; 

import DashboardBanner from '../../components/carousels/dashboardBanner.js';


const Dashobard = ({navigation}) => { 
 //  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  
  console.log("testing", )

 
 

  // aimate notification 
  const [messages, setMessages] = useState([]);
  
  // start: Trending House Filter 
  const [trendingHouseFilters,setTrendingHouseFilters] = useState([`By Area`, 'By BHK', 'By Location', 'By Direction']);   
  // end: Trending House Filter 
 

  // start: Commercial Design
  const [commercialDesignFilters,setCommercialDesignFilters] = useState(['Magnificient Commercial Design', 'Elegent Institutional Designs','Residential / Rental Apartment Designs']);
  // end: Commercial Design

  // start: media Coverage & updates 
  const [mediaCoverageData,setMediaCoverageData] = useState([]);
  const [isLoadingDatamediaCoverage,setIsLoadingDatamediaCoverage] = useState(false);
  useEffect(()=>{
    setMediaCoverageData([
      {id:1,image:Images.Media1,data:{area:'Your Story'}},
      {id:2,image:Images.Media2,data:{area:'Outlook Magazine'}}
    ]);
  },[]);
  // emd: media Coverage & updates 
  
  // start: Home PLan Design
  const [homePLanDesignData,setHomePlanDesignData] = useState([]);
  const [isLoadingDataHomePlanDesign,setIsLoadingDataHomePlanDesign] = useState(false);
  useEffect(()=>{
    setHomePlanDesignData([
      {id:1,link:'https://www.plotkhareedo.com/',external:true, title:'Buy & Sell Plot',image:Images.HomePlansAndDesigns1,data:['Easy registration on Plot Khareedo','Geo location-based plot search','Thousands of verified sellers','60+ cities available']},
      {id:2,link:'https://www.masonsandmortar.com/',external:true, title:'Turnkey Construction',image:Images.HomePlansAndDesigns2,data:['100% Quality Assurance','Safe money transaction Model','Assured Quality controls','Track progress on app']},
      {id:3,link:'https://yellowcap.in/lander',external:true, title:'Contractors & Labors',image:Images.HomePlansAndDesigns3,data:['1 Lacs+ verified Contractors','List your Project in few clicks','Easy chat system to connect','Hire contractor for free']},
      {id:4,link:'https://www.makemyhouse.com/site/site-supervision',external:false, title:'Site Supervision & Quality Audit',image:Images.HomePlansAndDesigns4,data:['QA/QC Services','Home Inspect Services','Fire Safety Audit','Structural Safety Audit']}, 
    ]) 
  },[]);  
  // end: Home PLan Design

  const [packageAndDesign,setpackageAndDesign] = useState([]);
  useEffect(()=>{
      getPackageDesign();
  },[]);
  const getPackageDesign = async ()=>{
      let url = 'public/productsv2/list';
      const aa = await ApiService.Getapiheader(url) 
      .then(response=>{  
        if(response){ 
          if(response.data.length>0){
            
            setpackageAndDesign(response.data); 
          }else{
            setpackageAndDesign([]); 
          }
        }else{
          setpackageAndDesign([]);
        }
      })
      .catch(error=>{
          console.log("get package Design error: ",error);
          setMessages([`Get packages data: ${error}`,]);
      }) 
  }

  //start: Contractor & Workers
  const [contractorData,setContractorData] = useState([]);
  const [isLoadingDataContractorData,setIsLoadingDataContractorData] = useState(false);
  useEffect(()=>{
    setContractorData([
      {id:1,image:Images.ContractorWorker1,title:"Civil contractor", externalLink:false,link:'https://www.makemyhouse.com/civil-contractor'},
      {id:2,image:Images.ContractorWorker2,title:"Roofing contractor", externalLink:false,link:'https://www.makemyhouse.com/roofing-contractor'},
      {id:3,image:Images.ContractorWorker3,title:"Flooring contractor", externalLink:false,link:'https://www.makemyhouse.com/flooring-&-tiling-contractor'},
      {id:4,image:Images.ContractorWorker4,title:"Concrete-RCC contractor", externalLink:false,link:'https://www.makemyhouse.com/concrete-contractor'},
      {id:5,image:Images.ContractorWorker5,title:"Landscape-Garden Works", externalLink:false,link:'https://www.makemyhouse.com/landscape-contractor'},
      {id:6,image:Images.ContractorWorker6,title:"Painting contractor", externalLink:false,link:'https://www.makemyhouse.com/painting-contractor'},
      {id:7,image:Images.ContractorWorker7,title:"Ceiling contractor", externalLink:false,link:'https://www.makemyhouse.com/false-ceiling-contractor'},
      {id:8,image:Images.ContractorWorker8,title:"Electrical contractor", externalLink:false,link:'https://www.makemyhouse.com/electrical-contractor'},
      {id:9,image:Images.ContractorWorker9,title:"Plumbing contractor", externalLink:false,link:'https://www.makemyhouse.com/construction-plumbing'},
      {id:10,image:Images.ContractorWorker10,title:"Solar contractor", externalLink:false,link:'https://www.makemyhouse.com/construction-homedecorator'}, 
    ]);
  },[]);
  //end: Contractor & Workers

  // start: HowItWorks
  const [howItWorksData,setHowItWorksData] = useState([]);
  const [isLoadingDataHowItWorks,setIsLoadingDataHowItWorks] = useState(false);
  useEffect(()=>{
    setHowItWorksData([
      {
        id:1,mainTitle:"Finalise your design through our team 1", coverImage:Images.HowItWork,
        data:[
          {id:1,title:'Place your order !',subData:['Place your order through our website or mobile application']},
          {id:2,title:'Design Approval',subData:['Approve your design and get set for stage 2!']}
        ]
      },
      {
        id:2,mainTitle:"Finalise your design through our team 2", coverImage:Images.HowItWork,
        data:[
          {id:1,title:'Place your order !',subData:['Place your order through our website or mobile application']},
          {id:2,title:'Design Approval',subData:['Approve your design and get set for stage 2!']}
        ]
      },
      {
        id:3,mainTitle:"Finalise your design through our team 3", coverImage:Images.HowItWork,
        data:[
          {id:1,title:'Place your order !',subData:['Place your order through our website or mobile application']},
          {id:2,title:'Design Approval',subData:['Approve your design and get set for stage 2!']}
        ]
      }
    ]);
  },[]);
  // end: HowItWorks

  // start: Testimonial 
  const [testimonialData,setTestimonialData] = useState([]);
  const [isLoadingDataTestimonialData,setIsLoadingDataTestimonialData] = useState(false);
  useEffect(()=>{
    setTestimonialData([
      {id:1,name:'Krishna Singh', stars:5,comment:'Ar. Rakshendra Solanki Er. Ajay Dangar Ar. Rakhi Gour are one of the best architects in makemyhouse. I am refering to take services from the make my house company to get proper design concept and timely completion of the project'},
      {id:2,name:'Piyush Raj',stars:4,comment:'Ar. Rakshendra Solanki Er. Ajay Dangar Ar. Rakhi Gour are one of the best architects in makemyhouse. I am refering to take services from the make my house company to get proper design concept and timely completion of the project'}, 
    ])
  },[]);
  // end: Testimonial 


  // start: onPressNavigation
  const onPressNavigation = (data)=>{
    // AsyncStorage.setItem('SelectedSite',`${res.data.data.ID}`);
    AsyncStorage.removeItem('projectId');
    AsyncStorage.getItem('SelectedSite',(err,credentials)=>{
        console.log("++++++++++++++++++++++++", credentials);
        if(credentials != null){
            AsyncStorage.setItem('projectId',`${data}`);
            console.log("from ------- solution screen ------------", {siteID:credentials, projectid:data});
            navigation.navigate('Package',{ params: {siteID:credentials, projectid:data}});      
        }else{
            setMessages(['Kindly select any site or create a new one.']);
        }
    });
    // console.log("on Press Navigation:", data); 
  }
  // end: onPressNavigation 

  

  // start: Pending orders 
  const [pendingOrdersData,setPendingOrdersData] = useState([]);
  useEffect(()=>{ 
    // const data = getCustomerPendingOrderData();
    // console.log(data); 
    let url = 'customer/orders?status=Pending Client Approval'; 
    ApiService.Getapiheader(url)
    .then(response=>{ 
      if(response && response.orders){
        setPendingOrdersData(response.orders);
      }else{
        setPendingOrdersData([]);
      }
    })
    .catch(error=>{
      console.log("Error while getting the pending orders: ", error)
      setMessages([`Pening orders not found: ${error}`]);
    })
  },[]);
  // end: Pending Orders 

  const [token,setToken] = useState('');
  useEffect(()=>{
    AsyncStorage.getItem('UserToken',(error,tokenCreds)=>{ 
      if(tokenCreds == null || tokenCreds == '' || tokenCreds == undefined){
        return AsyncStorage.clear()
      }
      return setToken(tokenCreds)
    });
  },[]);
   

  return (
    <ScreenWrapper>
      
      {/* Start: Notification Bar  */}
      <View
        style={{
        position: 'absolute', 
        left: 0, 
        top:'0%',
        width:'100%',
        zIndex:999, 
        padding:12
        }}
    >
        {messages.map((message) => (
        <AnimatedMessage
            key={message}
            message={message}
            onHide={() => {
            setMessages((messages) =>
                messages.filter(
                (currentMessage) =>
                    currentMessage !== message
                )
            );
            }}
        />
        ))}
      </View>
      {/* End: Notification Bar  */}

      <MainHeader />
      <ScrollView  bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        
        <DashboardBanner token={token}/>
         
        {/* working */}
        {
          pendingOrdersData.length > 0 ?
            <View style={{padding:0}}> 
              <View style={{padding:10, paddingBottom:0, paddingTop:0}}>
                <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold' }}>{t('pendingSection')}</Text>
              </View>
              <PendingOrdersCarousel data={pendingOrdersData} token={token}/>  
            </View>
          :
          <>
          </>
        }
        
        {/* working */}
        {/* End: Pending Order */}

        {/* Start: Design & Planning */}
        <View style={{padding:0,marginVertical:12, marginTop:0}}> 
          <View style={{padding:10}}>  
            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold'}}>{t('designAndPlanning')}</Text>
          </View> 
          <View style={{flexDirection:'row',flexWrap:'wrap',padding:8}}>
            
              { 
                      packageAndDesign.length > 0 ? 
                      (
                          packageAndDesign.map((item,index)=>{
                              return <DesignPlanning key={index} BoxType={item.type=='BNDL'?'color':'gray'} Text={item.name} Image={Images.Package1} apiImageB={true} apiImage={item.icon} tag={item.type=="BNDL"?"PACKAGE":""} onPressNavigation={()=>onPressNavigation(item.id)}/>    
                          })
                      )
                      : 
                      <>
                          <LoadingPackageCard key={1}/>
                          <LoadingPackageCard key={2}/> 
                          <LoadingPackageCard key={3}/>
                          <LoadingPackageCard key={4}/>
                          <LoadingPackageCard key={5}/>
                      </>
              } 
             <Aifloreplan BoxType="gray" Text="AI" SndText="Floor Plan"  Image={Images.Aifloreplan} tag=""  onPressNavigation={onPressNavigation}/>
          </View> 
        </View>  
        {/* End: Design & Planning */}

        {/* Start: Trending House Designs  */} 
        <TrendingHouseDesign filters={trendingHouseFilters}  type="1"/>  
        {/* End:Trending House Designs  */}
        <View style={{height:30}}></View>

        {/* start: start: Interior Design Categories */} 
        <InteriorHouseDesign/>
        {/* end: start: Interior Design Categories   */}
        <View style={{height:30}}></View>
         
        <CommercialHouseDesign filters={commercialDesignFilters}  type="1"/>
        {/* end: Commercial Design */}
        <View style={{height:0}}></View>
        {/* start: Media Coverage & Updates */}
        <View style={{padding:0}}> 
          <View style={{padding:10}}>  
            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Media Coverage & Updates</Text>
          </View> 
          <View style={{flexDirection:'row',flexWrap:'wrap',padding:0,marginLeft:10,marginBottom:12}}> 
            <MediaCoverage data={mediaCoverageData} isLoading={isLoadingDatamediaCoverage}/>
          </View>
        </View>  
        {/* end: Media Coverage & Updates */}
        <View style={{height:30}}></View>
        {/* Start: Home Plans And Design */} 
        <View style={{padding:0}}> 
          <View style={{padding:10}}>  
            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Home Plans And Design</Text>
          </View> 
          <View style={{flexDirection:'row',flexWrap:'wrap',padding:0,marginLeft:10,marginBottom:12, minHeight:220,  }}> 
            <HomePlanDesign data={homePLanDesignData} isLoading={isLoadingDataHomePlanDesign}/>
          </View>
        </View> 
        {/* end: Home Plans And Design  */}
        <View style={{height:30}}></View>
        {/* start: Contractor & Workers */}
        <View style={{padding:0}}> 
          <View style={{padding:10}}>  
            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Contractor & Workers</Text>
          </View> 
          <View style={{flexDirection:'row',flexWrap:'wrap',padding:0,marginLeft:10,marginBottom:12}}> 
            <ContractorWorker data={contractorData} isLoading={isLoadingDataContractorData} />  
          </View>
        </View> 
        {/* end: Contractor & Workers */}
        <View style={{height:30}}></View>
        {/* Start: How It Works? */}
        <View style={{padding:0}}>
          <View style={{padding:10}}>
            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>How It Works?</Text>
          </View> 
          <View style={{flexDirection:'row', flexWrap:'wrap', padding:10, minHeight:350}}>
            <HowItWorks data={howItWorksData} isLoading={isLoadingDataHowItWorks}/>
          </View>
        </View>
        {/* end: How It Works? */}
        <View style={{height:30}}></View>
        {/* Start: Testimonial */}
        <View style={{padding:0}}>
          <View style={{padding:10}}>
            <Text style={{color:Colors.SecondaryColor,fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',fontWeight:FontWeight.medium}}>Our Satisfied Homeowners</Text>
          </View> 
          <View style={{flexDirection:'row',flexWrap:'wrap',padding:0,marginLeft:10,marginBottom:12}}>
            <Testimonial data={testimonialData} isLoading={isLoadingDataTestimonialData}/>
          </View>
        </View>    
        {/* End: Testimonial */} 
        <View style={{height:30}}></View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = new StyleSheet.create({
  container:{
    
  }
});

export default Dashobard