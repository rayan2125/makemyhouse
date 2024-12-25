
import React, { useState, useEffect, useMemo, useContext,useCallback } from 'react'
import { BackHandler,  TouchableOpacity, Image, Text, View  } from 'react-native';
import Axios from 'axios';
import styles from './styles';
import { Card } from 'react-native-paper';
import Images from '../../utility/images';
import { Util } from '../../utility/scaling';
import MasonryList from '@react-native-seoul/masonry-list';
import { useNavigation,useNavigationState } from '@react-navigation/native';  
import Loader from './loader';
import ApiService from '../../ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ByCategorypopup from './ByCategory';
import ByStylepopup from './BYStyle';
import Colors from '../../utility/color';

import ArrowLeftLight from '../../../assets/images/icons/arrowLeftLight.svg'; 

import { useFocusEffect } from '@react-navigation/native';

const InteriorList = ({ route, navigation }) => {
    
    // start: share filters 
    useEffect(()=>{
        AsyncStorage.removeItem("ShareUrlFilters");
    },[]);
     
    const ShareFiltersHandler = (url)=>{
        // before starting the filter clear its value 
        AsyncStorage.removeItem("ShareUrlFilters");
        // direction basically the dimension filters

        console.log("InteriorList share filters: ", {
            url 
        });  
        AsyncStorage.setItem("ShareUrlFilters", url);  
    }
    // end: share filters 

    const navigationInit = useNavigation();
    const routeName = useNavigationState(state => state.routes[state.index].name); 
    useEffect(() => {  
        const handleBackPress = () => {  
            // console.log("routeName:",routeName); 
            // You can also check conditions before navigating
            if ( routeName == 'InteriorList' ) {
            //   navigation.navigate('StartTab');
                navigation.goBack();
                return true;
            } 
            return false;
        };  
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);
        return () => {
         BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        }
    }, []);

    const [data,setData] = useState([]);
    const [mainLoading,setMainLoading] = useState(true); 
    const [continueLoading,setContinuesLoading] = useState(false);
    const [page,setPage] = useState(1);

    const [filterCheck,setFilterCheck] = useState(false);
    const [urlDynamicInfinite,setUrlDynamicInfinite] = useState('');
 

    // state: filter Category
    const [bycategorystate,setbycategorystate] = useState(false)
    const bycategoryclosefunc = (val) => {
        setbycategorystate(val)
    } 
    // end: filter Category

    // state: filter style
    const [bystylestate,setbystylestate] = useState(false)
    const bystyleclosefunc = (val) => {
        setbystylestate(false)
    } 
    // end: filter style


    
    // start: used for both filters 
    const toChangeMainLoadingFunc = (state)=>{
        setMainLoading(state);
    }
    const toChnagePageFunc = (state)=>{
        setPage(state);
    } 
    const toChnageFilterCheckFunc = (state)=>{
        setFilterCheck(state);
    }
    const toChnageUrlDynamicInfiniteFunc = (state)=>{
        setUrlDynamicInfinite(state);
        // console.log("setUrlDynamicInfinite(state);",state);
        // share filters works here
        ShareFiltersHandler(state); 
    }
    // end: used for both filters 

    const [selectedFilter,setselectedFilter] = useState('');
    useFocusEffect(
        useCallback(() => {
            setselectedFilter('');
            // console.log('Screen went in focus');  
            // console.log("--------------- route: ", route.params);
            setMainLoading(true); 
            if(route.params!= undefined && route.params){ 
                if(route.params.object.filterType == 'subcategory'){ 
                   // console.log(`route.params: &subcategory=${route.params.object.subcategory}`); 
                    setUrlDynamicInfinite(`&subcategory=${route.params.object.subcategory}`);
                    AsyncStorage.setItem("ShareUrlFilters", `&subcategory=${route.params.object.subcategory}`); 
                    setFilterCheck(true);
                    setData([]);
                    setPage(1); 
                    setselectedFilter(`${route.params.object.subcategory}`);
                } else{
                    setFilterCheck(false);
                    setPage(1);
                    setData([]);
                    InitialDataFetch();
                    setselectedFilter('');
                }
            }else{
                setFilterCheck(false);
                setPage(1);
                setData([]);
                InitialDataFetch();
                setselectedFilter('');
            } 
          return () => { 
            console.log('Screen went out of focus');  
            AsyncStorage.removeItem("interiorcategory");
          };
        }, [])
      );
    
    useEffect(()=>{ 
        // AsyncStorage.removeItem('interiorstyle')
        // AsyncStorage.removeItem('interiorcategory') 

        // setMainLoading(true);
        if(urlDynamicInfinite != ''){ 
           // console.log('***********************:1');
            InitialDataFetch();
           //  console.log("--------------",urlDynamicInfinite)
        } 
        // else{
        //     console.log('***********************:2'); 
        //     setFilterCheck(false);
        //     setPage(1);
        //     setData([]);
        //     InitialDataFetch();
        // }
    },[urlDynamicInfinite]);

   
     
    const imageslenght = data.length;

    // here we control the filters  
    const InitialDataFetch =  async()=>{ 
        try{ 
            let url = filterCheck == false ? `https://api.makemyhouse.com/public/InteriorDesigns?page=${page}&limit=9`: `https://api.makemyhouse.com/public/InteriorDesigns?page=${page}&limit=9${urlDynamicInfinite}`;
             console.log("InitialDataFetch url: ",url)
            const response = await ApiService.GetapiheaderWithFullURL(url)
           //  console.log(response.interior_designs);
            setData(response.interior_designs);

           //  filterCheck == true ? console.log("response_data_filter CHeck", response.data.interior_designs): null;
        }
        catch(error){
            console.log(error);
            setPage(1);
        }
        finally{ 
            setMainLoading(false); 
            setPage(page+1);
        }
    }

    // infinite scrolling 
    const InfiniteScrolling = async ()=>{ 
        if(continueLoading){
            return;
        }
        try{ 
            setContinuesLoading(true);
            let url = filterCheck == false ? `https://api.makemyhouse.com/public/InteriorDesigns?page=${page+1}&limit=9` : `https://api.makemyhouse.com/public/InteriorDesigns?page=${page+1}&limit=9${urlDynamicInfinite}`;
            console.log("infinite scrolling url: ",url)
            const response = await ApiService.GetapiheaderWithFullURL(url)  
            setData((prevsData)=> [...prevsData, ...response.interior_designs]);
        }
        catch(error){
            console.log(error);
            setPage(1);
        } finally{
            setPage(page+1);
            setContinuesLoading(false);
        }
    } 

    // start: RenderItem  
    const HomeInteriorCard = ({ item, style }) => {
        const randomBool = useMemo(() => Math.random() < 0.6, []);  
        const [fav,setfav] = useState(item.wishlisted);   
        return (
            <Card style={[{ marginTop: 12, flex: 1 }, style]} onPress={() => navigation.navigate('Architectdetaillist', { pagetype: 2 ,projectId:item.projectID})}>
                <Image source={{ uri: item.imageUrl }} style={{ height: randomBool ? 150 : 280, alignSelf: 'stretch', borderRadius: 8, }} resizeMode="cover" />  
                {/* <TouchableOpacity style={[styles.positionImg]} onPress={()=>{alert(item.imageUrl)}}>
                    <Image style={styles.imageGrid} resizeMode={"contain"} source={Images.fillheart} />
                </TouchableOpacity> */}
            </Card>
        );
    };  

    const renderItem = ({ item, i }) => {
        return (
            <HomeInteriorCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />
        );
    };
    // end: RenderItem  

    const resetAllFilter = ()=>{
        // alert("reset all filters");
        setFilterCheck(false);
        setPage(1); 
       // console.l
    } 
    

    return (
        <View style={{ flex: 1, padding: 0, backgroundColor: "#ffffff" }}>
            <View style={{ backgroundColor: Colors.SecondaryColor, height: Util.getHeight(7), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#D4D4D4" }}>
                <TouchableOpacity style={{ flex: 0.8 }} onPress={() => navigation.goBack()}> 
                     <ArrowLeftLight  width={18} height={18} />
                </TouchableOpacity>
                <View style={{ flex: 4, flexDirection: "row", justifyContent: "flex-start",  }}>
                
                    <Text style={{  alignSelf: "center", color: '#ffffff', fontSize: 18, fontWeight: "400" }}>
                        Interior Design
                    </Text>
                </View>
                <View style={{ flex: 0.8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                   
                </View>
            </View>
            <View style={{ flexDirection: "row", margin: 0, paddingHorizontal:10, padding:10, justifyContent:'space-between', backgroundColor:'#ffffff', borderBlockColor:Colors.lighteshGray, borderBottomWidth:2 }}>
                 
                <TouchableOpacity style={{ flexDirection: "row", borderWidth: 1,  width:'49%', padding: 8, justifyContent: "center", borderRadius: 10, borderColor: "#D1D1D1", }} onPress={()=>{setbycategorystate(true); }}>
                    <Image resizeMode={"contain"} source={Images.Search} style={{ width: 25, height: 25, }} />
                    <Text style={{ alignSelf: "center", marginLeft: 10,  fontSize: 14, fontWeight: "500",  color: '#000000' }}>
                        By Category
                    </Text>
                </TouchableOpacity>
                 
                <TouchableOpacity style={{ flexDirection: "row", borderWidth: 1,  width:'49%', padding: 8, justifyContent: "center", borderRadius: 10, borderColor: "#D1D1D1" }} onPress={()=>setbystylestate(true)}>
                    <Image resizeMode={"contain"} source={Images.Search} style={{ width: 25, height: 25, alignSelf: "center" }} />
                    <Text style={{ alignSelf: "center", marginLeft: 10,  fontSize: 14, fontWeight: "500",  color: '#000000' }}>
                        By Style
                    </Text>
                </TouchableOpacity>
                 
            </View> 
            {
                mainLoading == true?<>
                    <Loader/> 
                </>:
                <MasonryList
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={<View />}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        alignSelf: 'stretch',
                    }} 
                    onEndReached={InfiniteScrolling}  
                    ListFooterComponent={continueLoading ? (
                        <View style={{ padding: 10, justifyContent:'center', alignContent:'center', alignItems:'center' }}>
                              <Text>Loading...</Text>
                        </View>
                      ) : null}
                    numColumns={2}
                    data={data}
                    renderItem={renderItem}
                />
            } 

            {
                bycategorystate &&
                <View style={{}}>
                    <ByCategorypopup toChnageFilterCheckFunc={toChnageFilterCheckFunc} 
                    toChnagePageFunc={toChnagePageFunc} 
                    toChangeMainLoadingFunc={toChangeMainLoadingFunc}  
                    toChnageUrlDynamicInfiniteFunc={toChnageUrlDynamicInfiniteFunc} 
                    bycategoryclosefunc={bycategoryclosefunc} 
                    navigation={navigation}  
                    selectedFilter = {selectedFilter}
                    resetAllFilter={resetAllFilter}
                    />
                </View>
            }
            {
                bystylestate &&
                <View style={{}}> 
                    <ByStylepopup toChnageFilterCheckFunc={toChnageFilterCheckFunc} 
                        toChnagePageFunc={toChnagePageFunc} 
                        toChangeMainLoadingFunc={toChangeMainLoadingFunc}  
                        toChnageUrlDynamicInfiniteFunc={toChnageUrlDynamicInfiniteFunc} 
                        bystyleclosefunc={bystyleclosefunc} 
                        navigation={navigation}  
                    />
                </View>
            }
        </View>
    )
}

export default InteriorList
 