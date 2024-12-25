import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Modal,Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'

// screen Wrapper 
import ScreenWrapper from '../../components/screenWrapper'

// header 
import ScndHeader from '../../components/headers/scndHeader'

// components 

import CTMButton from "../../components/button/index"

import Colors from '../utility/color'
import FontSize ,{FontWeight} from '../utility/fonts'
import Images from '../utility/images'

import AutoHeightImage from 'react-native-auto-height-image';  //AutoHeightImage component

  
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { useNavigation,  } from '@react-navigation/native';

// Start: icons 
// import IinfoIcon from '../../../assets/images/icons/iinfoIcon.svg';  
import { actuatedNormalize } from '../utility/scaling'
// end: icons

import AsyncStorage from '@react-native-async-storage/async-storage';

// notification 
import AnimatedMessage from '../../components/animatedNotification'
import ApiService from '../../ApiServices'
//main screen 
const CreatePlot = ()=>{
     // aimate notification 
     const [messages, setMessages] = useState([]);
     useEffect(()=>{
         // setTimeout(()=>{
         //   setMessages([]);
         // },2000);
     },[messages]);
    const  navigation = useNavigation();  

    // start: create plot 
    const [formData, setFormData] = useState({
        // create site page 
        name: '',
        stage: '',
        pincode: '',
        state:'',
        city:'', 
        // combinatiob of house number, address line 1, address line 2
        address:'',
  
        lat:'',
        long:'',
        
        // create plot page 
        purpose:'residential', // purpose of home builing 
        type:'Ractangular', // plot shape (rectangle/non-rectangle) 
        width:'', // width 
        // depth:'', // height 
        plot_area:'', // area  
        floors:'', // floors 
        direction:'', // direction 
    });
    // useEffect(()=>{ 
    //     AsyncStorage.removeItem('DraftOrder');
    //     AsyncStorage.getItem('createSite',(err,credentials)=>{  
    //         // console.log("create stie and plot details: ",JSON.parse(credentials))
    //         if(credentials != null){
    //             let  obj= JSON.parse(credentials);  
    //             // console.log("create stie and plot details: ",obj); 
    //             setFormData({
    //                 ...formData,
    //                 name: obj.name.trim(),
    //                 stage: obj.stage.trim(),
    //                 pincode: obj.pincode.trim(),
    //                 state:obj.state.trim(),
    //                 city:obj.city.trim(),  
    //                 address:`${obj.houseNumber}, ${obj.addressLineOne}, ${obj.addressLineTwo}`,  
    //                 lat:obj.lat,
    //                 long:obj.long,
    //             });
    //         } 
    //     });
    // },[]);
    useEffect(()=>{
        console.log('---------------------------', formData);
    },[formData]);
    // end: create plot 

    // start: purpose of house Building
    const [purposeHomeBuilding,setPurposeHomeBuilding] = useState('residential'); 
    const PurposeHomeBuildingHander = (data)=>{ 
        setPurposeHomeBuilding(data); 
        setFormData({...formData, "purpose":data})
    } 
    // end: purpose of house Building
    

    // start: select plot shape 
    const [selectPlotShape,setSelectPlotShape] = useState('Ractangular');
    const SelectPlotShapeHandler = (data)=>{
        setSelectPlotShape(data);
        setFormData({...formData, "type":data})
    }
    // end: select plot shape 

    // start: plot area
    const [sqrFt,setSqrFt] = useState('');
    const [isFocusedsqrFt, setIsFocusedsqrFt] = useState(false); 
    const sqrFthandleFocus = () => { setIsFocusedsqrFt(true);}; 
    const sqrFthandleBlur = () => {  setIsFocusedsqrFt(false);}; 
    // feet 
    // -- width 
    const [feetw,setFeetw] = useState('');
    const [isFocusedFeetw,setIsFocusedFeetw] = useState(false);
    const feerhandlerFocusw = () => {setIsFocusedFeetw(true)};
    const feerhandlerBluew = () => {setIsFocusedFeetw(false)}; 
    // -- area
    const [feeta,setFeeta] = useState('');
    const [isFocusedFeeta,setIsFocusedFeeta] = useState(false);
    const feerhandlerFocusa = () => {setIsFocusedFeeta(true)};
    const feerhandlerBluea = () => {setIsFocusedFeeta(false)}; 
    // end: plot area 

    // Start: number of floors
    const [numberOfFloors,setNumberofFloors] = useState('');
    const NumberOfFloorsHandler = (data)=>{
        setNumberofFloors(data);
        const match = data.match(/\d/);
        if(match){
            console.log("Slected numbers of floors: ", parseInt(match[0]));
            // setFormData({...formData, "floors":parseInt(match[0] + 1)})
            setFormData({...formData, "floors":parseInt(match[0])})
        }else{
            setFormData({...formData, "floors": 1})
            console.log("Slected numbers of floors: ", 1)
        }
    }
    // End: number of floors

    // start: Plot Entrance direction
    const [plotEntranceDirection,setPlotEntranceDirection] = useState('');
    const PlotEntranceDirectionHandler = (data)=>{
        setPlotEntranceDirection(data)
        setFormData({...formData,"direction":data});
    }
    // end: Plot Entrance direction

    // Start: plot shapes modal
    const [plotShapes,setPlotShapes] = useState('');
    const [openShapesModel,setOpenShapesModel] = useState(false);
    const plotShapeHandler = (data)=>{
        setPlotShapes(data);
        setOpenShapesModel(true);
    }
    // End: plot shapes modal

    // Start: Button function 
    const [isLoading,setIsLoading] = useState(false);
    const createPlotHandler = ()=>{
        if(checkForEmptyValues(formData) == false){
            console.log("Kindly fill all details.");
            setMessages(['Kindly fill all details.']);
            setIsLoading(false); 
        }else{
            CreateSiteApiCall();
        }
    }
    // End: Button function 

    // checkForEmptyValues if any field in formdata object is empty it returns
    const  checkForEmptyValues = (obj)=> {
        for (let key in obj) {
            if (obj.hasOwnProperty('addressLineTwo') && obj["addressLineTwo"] === '') {
                return true;
            }
            if (obj.hasOwnProperty(key) && obj[key] === '') {
                return false;
            }
        }
        return true;
    }

    const [fromScreen,setFromScreen] = useState('')
    useEffect(()=>{
        AsyncStorage.getItem('fromPackageScreen', (err,creds)=>{
            console.log("------------fromScreen====================",creds);
            setFromScreen(creds);
        });
    },[]);

    // Start: api call to create site 
    const CreateSiteApiCall = async ()=>{
        setIsLoading(true) 
        AsyncStorage.removeItem('SelectedSite');
        let url = 'customer/ConstructionSite'; 
        try{ 
            if(formData.width != 0 || formData.plot_area != 0 ){
                console.log("create site api call: ", formData);
                await ApiService.Post(url,formData)
                .then((res)=>{
                    console.log("resposne from server: ",res.data.data);
                    // AsyncStorage.setItem('plotDetilaResponse',response.data);
                    AsyncStorage.setItem('SelectedSite',`${res.data.data.ID}`);  
                    if(fromScreen){
                        if(fromScreen == 'package'){
                            setTimeout(()=>{ 
                                setIsLoading(false); 
                                AsyncStorage.removeItem('createSite'); 
                                AsyncStorage.removeItem('fromPackageScreen');
                                navigation.navigate('SiteDetails',{ params: { SkipScreenParams: 'Home' } })
                                // demo below one 
                                // navigation.navigate('SettingsStack', { screen: 'SettingsScreen1', params: { name: 'John Doe' } });
                            },10);
                        }else{    
                            setTimeout(()=>{ 
                                setIsLoading(false); 
                                AsyncStorage.removeItem('createSite'); 
                                navigation.navigate('SolutionFirstStackr',{ params: { SkipScreenParams: 'Home' } })
                                // demo below one 
                                // navigation.navigate('SettingsStack', { screen: 'SettingsScreen1', params: { name: 'John Doe' } });
                            },10);
                        }
                    } else{
                        console.log("Kindly go to the home page.")
                        setMessages(['Kindly go to the home page.']);
                    }
                })
                .catch(err=>{
                    setIsLoading(false);
                    console.log("while creating site then-catch error: ",err)
                    setMessages([`while creating site error: ${err}`])
                }) 
            }else{
                setIsLoading(false);
                setMessages([`Plot Area and Plot Width cannot be zero.`]) 
            }
           
        }catch(error){
            setIsLoading(false);
            console.log("while creating site try-catch: ",error)
            setMessages([`while creating site error: ${err}`])
        } 
    }
    // end: api call to create site 
 

    return(
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

                {/* Start: Header */}
                <ScndHeader 
                    Title="Plot Detail" 
                    Search={false} 
                    Profile={false}  
                    Back={true}
                    BackScreen="" 
                    Skip={fromScreen == "package"?false:true} 
                    SkipStack="MainStack"
                    SkipScreen="Home" 
                />
                {/* End: Header */}
                <ScrollView  bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{padding:0,paddingVertical:10}}>
                    
                    {/* Start: Purpose of Home Building */}
                    <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                        <Text style={styles.HeaderBox}>Purpose of Home Building
                            <Text style={{color:'red',fontSize:FontSize.xp}}>*</Text>
                        </Text> 
                        <View style={styles.BoxContainerColumn}>

                            <TouchableOpacity  activeOpacity={0.9} style={styles.PurposeHomeBuilding} onPress={()=>PurposeHomeBuildingHander('residential')}> 
                                {
                                        purposeHomeBuilding == 'residential'?
                                        <> 
                                            <View style={[styles.radiusButtonActive]}>  
                                                <View style={[styles.radiusButtonActiveInner]}></View>
                                            </View>  
                                        </>
                                        :
                                        <>
                                            <View style={styles.radiusButton}></View>
                                        </>
                                } 
                                <Text style={[styles.text]}>Residential</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={styles.PurposeHomeBuilding}  onPress={()=>PurposeHomeBuildingHander('residence-With-Commercial')}> 
                                {
                                        purposeHomeBuilding == 'residence-With-Commercial'?
                                        <> 
                                            <View style={[styles.radiusButtonActive]}>  
                                                <View style={[styles.radiusButtonActiveInner]}></View>
                                            </View>  
                                        </>
                                        :
                                        <>
                                            <View style={styles.radiusButton}></View>
                                        </>
                                }        
                                <Text style={styles.text}>Residence with Commercial</Text>  
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} style={styles.PurposeHomeBuilding}  onPress={()=>PurposeHomeBuildingHander('commercial')}> 
                                {
                                        purposeHomeBuilding == 'commercial'?
                                        <> 
                                            <View style={[styles.radiusButtonActive]}>  
                                                <View style={[styles.radiusButtonActiveInner]}></View>
                                            </View>  
                                        </>
                                        :
                                        <>
                                            <View style={styles.radiusButton}></View>
                                        </>
                                }        
                                <Text style={styles.text}>Commercial</Text>  
                            </TouchableOpacity>

                        </View>
                    </View> 
                    {/* End: Purpose of Home Building */}

                    {/* Start: Select Plot Shape */}
                    <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                        <Text style={styles.HeaderBox}>Select Plot Shape
                            <Text style={{color:'red',fontSize:FontSize.xp}}>*</Text>
                        </Text> 
                        <View style={[styles.BoxContainerColumn,{flexDirection:'row',height:60}]}>
                             
                            <View style={[styles.PurposeHomeBuilding,{width:'50%',height:40}]}> 
                                <TouchableOpacity  activeOpacity={0.9} style={{flexDirection:'row'}}  onPress={()=>SelectPlotShapeHandler('Ractangular')}>
                                    {
                                            selectPlotShape == 'Ractangular'?
                                            <> 
                                                <View style={[styles.radiusButtonActive]}>  
                                                    <View style={[styles.radiusButtonActiveInner]}></View>
                                                </View>  
                                            </>
                                            :
                                            <>
                                                <View style={styles.radiusButton}></View>
                                            </>
                                    } 
                                    <Text style={[styles.text]}>Rectangular</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:6,marginTop:2}} onPress={()=>plotShapeHandler('rectangular')}>
                                    {/* <AutoHeightImage
                                        width={18}
                                        maxHeight={18}
                                        resizeMode="contain"
                                        source={Images.iIcon}
                                    />  */}
                                    {/* <IinfoIcon width={actuatedNormalize(22)} height={actuatedNormalize(22)} fill={"#111"}/> */}
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.PurposeHomeBuilding,{width:'50%',height:40}]}> 
                                <TouchableOpacity  activeOpacity={0.9} style={{flexDirection:'row'}}  onPress={()=>SelectPlotShapeHandler('Non-Ractangular')}>
                                    {
                                            selectPlotShape == 'Non-Ractangular'?
                                            <> 
                                                <View style={[styles.radiusButtonActive]}>  
                                                    <View style={[styles.radiusButtonActiveInner]}></View>
                                                </View>  
                                            </>
                                            :
                                            <>
                                                <View style={styles.radiusButton}></View>
                                            </>
                                    } 
                                    <Text style={[styles.text]}>Non-Rectangular</Text> 
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft:6,marginTop:2}} onPress={()=>plotShapeHandler('nonrectangular')}>
                                    {/* <AutoHeightImage
                                        width={18}
                                        maxHeight={18}
                                        resizeMode="contain"
                                        source={Images.iIcon}
                                    />  */}
                                     {/* <IinfoIcon width={actuatedNormalize(22)} height={actuatedNormalize(22)} fill={"#111"}/> */}
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>    
                    {/* End: Select Plot Shape */}

                    {/* Start: Plot Area */}
                    <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:0}}> 
                        <Text style={styles.HeaderBox}>Plot Area (eg: 1200) 
                            <Text style={{color:'red',fontSize:FontSize.xp}}>*</Text>
                            </Text> 
                        
                        <View style={[styles.BoxContainerColumn,{flexDirection:'column',height:50, borderBottomWidth:0}]}>
                           
                            <View  style={[styles.InputText,
                                        {
                                        borderColor: isFocusedsqrFt? Colors.PrimaryColor: Colors.lightGray
                                        }
                                ]}>   
                                    <TextInput
                                    style={[styles.TextInput,{width:'84%'}]}
                                    placeholder="Enter plot area"
                                    placeholderTextColor={Colors.lightGray}
                                    value={sqrFt}
                                    onChangeText={(text) => {setSqrFt(text); setFormData({...formData, "plot_area":parseInt(text)})}}
                                    onFocus={sqrFthandleFocus}
                                    onBlur={sqrFthandleBlur}
                                    keyboardType="phone-pad" 
                                    // onPress={Keyboard.dismiss}
                                    /> 
                                    <View style={{width:'12%', borderLeftWidth:2, borderLeftColor:Colors.lightGray,marginRight:6}}>
                                        <Text style={{textAlign:'right',fontSize:FontSize.xp,fontWeight:'400',color:Colors.lightGray}}>Sq.ft</Text> 
                                    </View>
                            </View> 
                        </View>    
                    </View> 
                    {/* End: Plot Area */}

                    {/* Start: Plot Width  */}
                    <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:14}}> 
                        <Text style={styles.HeaderBox}>Plot width (eg : 30)
                            <Text style={{color:'red',fontSize:FontSize.xp}}>*</Text>
                        </Text> 
                        
                        <View style={[styles.BoxContainerColumn,{flexDirection:'column',height:90, borderBottomWidth:1, borderColor:Colors.graySnd}]}>
                           
                             
                            <View  style={[styles.InputText,
                                        {
                                        borderColor: isFocusedFeetw? Colors.PrimaryColor: Colors.lightGray
                                        }
                                ]}>   
                                    <TextInput
                                        style={[styles.TextInput,{width:'84%'}]}
                                        placeholder="Enter plot width"
                                        placeholderTextColor={Colors.lightGray}
                                        value={feetw}
                                        onChangeText={(text) => {setFeetw(text); setFormData({...formData, "width":parseInt(text)}) } }
                                        onFocus={feerhandlerFocusw}
                                        onBlur={feerhandlerBluew}
                                        keyboardType="phone-pad" 
                                    // onPress={Keyboard.dismiss}
                                    /> 
                                    <View style={{width:'12%', borderLeftWidth:2, borderLeftColor:Colors.lightGray,marginRight:6}}> 
                                        <Text style={{textAlign:'right',fontSize:FontSize.xp,fontWeight:'400',color:Colors.lightGray}}>feet</Text> 
                                    </View>
                            </View>

                        </View>    
                    </View> 
                    {/* End: PLot Width  */}

                    {/* Start: Plot area  */}
                    {/* <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                        <Text style={styles.HeaderBox}>Plot Depth</Text> 
                        
                        <View style={[styles.BoxContainerColumn,{flexDirection:'column',height:100}]}>
                           
                             
                            <View  style={[styles.InputText,
                                        {
                                        borderColor: isFocusedFeeta? Colors.PrimaryColor: Colors.lightGray
                                        }
                                ]}>   
                                    <TextInput
                                        style={[styles.TextInput,{width:'84%'}]}
                                        placeholder="Enter phone number"
                                        placeholderTextColor={Colors.lightGray}
                                        value={feeta}
                                        onChangeText={(text) => {setFeeta(text); setFormData({...formData, "depth":parseInt(text)}) }}
                                        onFocus={feerhandlerFocusa}
                                        onBlur={feerhandlerBluea}
                                        keyboardType="phone-pad" 
                                    // onPress={Keyboard.dismiss}
                                    /> 
                                    <View style={{width:'16%', borderLeftWidth:2, borderLeftColor:Colors.lightGray,marginRight:6}}> 
                                        <Text style={{textAlign:'right',fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold'-2,fontWeight:'500',color:Colors.lightGray}}>feet</Text> 
                                    </View>
                            </View>

                        </View>    
                    </View>  */}
                    {/* End: PLot area  */}
                    

                    {/* Start: Numbers of Floors */}
                    <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                        <Text style={styles.HeaderBox}>Numbers of Floors
                            <Text style={{color:'red',fontSize:FontSize.xp}}>*</Text>
                        </Text>  
                        <View style={[styles.BoxContainerColumn,{justifyContent:'space-between',flexDirection:'row',flexWrap:'wrap',height:160}]}>
                             <TouchableOpacity style={[styles.NumberofFloors,numberOfFloors=='ground-1-floor'?{backgroundColor:Colors.SecondaryColor}:'']} onPress={()=>{NumberOfFloorsHandler('ground-1-floor')}}>
                                <Text style={[styles.NumberofFloorsText,numberOfFloors == 'ground-1-floor'?{color:'#fff'}:'']}>Ground floor</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,numberOfFloors=='ground-2-floor'?{backgroundColor:Colors.SecondaryColor}:'']}  onPress={()=>{NumberOfFloorsHandler('ground-2-floor')}}>
                                <Text style={[styles.NumberofFloorsText,numberOfFloors == 'ground-2-floor'?{color:'#fff'}:'']}>Ground + 1st floor</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,numberOfFloors=='ground-3-floor'?{backgroundColor:Colors.SecondaryColor}:'']}  onPress={()=>{NumberOfFloorsHandler('ground-3-floor')}}>
                                <Text style={[styles.NumberofFloorsText,numberOfFloors == 'ground-3-floor'?{color:'#fff'}:'']}>Ground + 2nd floor</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,numberOfFloors=='ground-4-floor'?{backgroundColor:Colors.SecondaryColor}:'']}   onPress={()=>{NumberOfFloorsHandler('ground-4-floor')}}>
                                <Text style={[styles.NumberofFloorsText,numberOfFloors == 'ground-4-floor'?{color:'#fff'}:'']}>Ground + 3rd floor</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,numberOfFloors=='ground-5-floor'?{backgroundColor:Colors.SecondaryColor}:'']}   onPress={()=>{NumberOfFloorsHandler('ground-5-floor')}}>
                                <Text style={[styles.NumberofFloorsText,numberOfFloors == 'ground-5-floor'?{color:'#fff'}:'']}>Ground + 4th floor</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,numberOfFloors=='ground-6-floor'?{backgroundColor:Colors.SecondaryColor}:'']}   onPress={()=>{NumberOfFloorsHandler('ground-6-floor')}}>
                                <Text style={[styles.NumberofFloorsText,numberOfFloors == 'ground-6-floor'?{color:'#fff'}:'']}>Ground +5th floor</Text>
                             </TouchableOpacity> 
                        </View>
                    </View>       
                    {/* End: Numbers of Floors */} 

                    {/* Start: Plot Entrance Direction  */}
                    <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                        <Text style={styles.HeaderBox}>Plot Entrance direction 
                            <Text style={{color:'red',fontSize:FontSize.xp}}>*</Text>
                        </Text>  
                        <View style={[styles.BoxContainerColumn,{justifyContent:'space-between',flexDirection:'row',flexWrap:'wrap',minHeight:200,borderBottomWidth:0}]}>
                             <TouchableOpacity style={[styles.NumberofFloors,plotEntranceDirection=='NN'?{backgroundColor:Colors.SecondaryColor}:'']} onPress={()=>{PlotEntranceDirectionHandler('NN')}}>
                                <Text style={[styles.NumberofFloorsText,plotEntranceDirection == 'NN'?{color:'#fff'}:'']}>North</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,plotEntranceDirection=='SS'?{backgroundColor:Colors.SecondaryColor}:'']}  onPress={()=>{PlotEntranceDirectionHandler('SS')}}>
                                <Text style={[styles.NumberofFloorsText,plotEntranceDirection == 'SS'?{color:'#fff'}:'']}>South</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,plotEntranceDirection=='EE'?{backgroundColor:Colors.SecondaryColor}:'']}  onPress={()=>{PlotEntranceDirectionHandler('EE')}}>
                                <Text style={[styles.NumberofFloorsText,plotEntranceDirection == 'EE'?{color:'#fff'}:'']}>East</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,plotEntranceDirection=='WW'?{backgroundColor:Colors.SecondaryColor}:'']}   onPress={()=>{PlotEntranceDirectionHandler('WW')}}>
                                <Text style={[styles.NumberofFloorsText,plotEntranceDirection == 'WW'?{color:'#fff'}:'']}>West</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,plotEntranceDirection=='NE'?{backgroundColor:Colors.SecondaryColor}:'']}   onPress={()=>{PlotEntranceDirectionHandler('NE')}}>
                                <Text style={[styles.NumberofFloorsText,plotEntranceDirection == 'NE'?{color:'#fff'}:'']}>North-East</Text>
                             </TouchableOpacity>
                             <TouchableOpacity style={[styles.NumberofFloors,plotEntranceDirection=='NW'?{backgroundColor:Colors.SecondaryColor}:'']}   onPress={()=>{PlotEntranceDirectionHandler('NW')}}>
                                <Text style={[styles.NumberofFloorsText,plotEntranceDirection == 'NW'?{color:'#fff'}:'']}>North-West</Text>
                             </TouchableOpacity> 
                             <TouchableOpacity style={[styles.NumberofFloors,plotEntranceDirection=='SE'?{backgroundColor:Colors.SecondaryColor}:'']}   onPress={()=>{PlotEntranceDirectionHandler('SE')}}>
                                <Text style={[styles.NumberofFloorsText,plotEntranceDirection == 'SE'?{color:'#fff'}:'']}>South-East</Text>
                             </TouchableOpacity> 
                             <TouchableOpacity style={[styles.NumberofFloors,plotEntranceDirection=='SW'?{backgroundColor:Colors.SecondaryColor}:'']}   onPress={()=>{PlotEntranceDirectionHandler('SW')}}>
                                <Text style={[styles.NumberofFloorsText,plotEntranceDirection == 'SW'?{color:'#fff'}:'']}>South-West</Text>
                             </TouchableOpacity> 
                        </View>
                    </View>       
                    {/* End: Plot Entrance Direction  */} 

                    {/* Start: Button */}
                    <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}> 
                        <CTMButton marginBottom={true} theme="default" btnText="Submit" functionType="createaccount" onPress={createPlotHandler} isLoading={isLoading} />    
                    </View>
                    {/* End: Button */}
                                
                    {/* Start: Model            */}
                    <Modal animationType="slide" transparent={true} visible={openShapesModel}> 
                        <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                            <TouchableOpacity activeOpacity={0.1} style={{width:'100%',height:'32%'}} onPress={()=>setOpenShapesModel(false)}></TouchableOpacity>
                            <View style={{width:'100%',height:'35%',backgroundColor:'transparent'}}> 
                                <View style={{width:90,height:90, backgroundColor:'#fff', position:'absolute',right:0,top:0, zIndex:999}}>
                                    <TouchableOpacity style={{width:'100%',height:'100%',justifyContent:'center',alignContent:'center',alignItems:'center'}} onPress={()=>setOpenShapesModel(false)}>
                                       <Text style={{color:'red',fontSize:FontSize.h3,fontWeight:'600'}}>X</Text> 
                                    </TouchableOpacity> 
                                </View>
                                <AutoHeightImage
                                    width={windowWidth}
                                    source={plotShapes == 'rectangular'?Images.RactangularPlotShape:Images.NonRactangular}
                                />
                                {/* <IinfoIcon /> */}
                            </View>
                            <TouchableOpacity activeOpacity={0.1} style={{width:'100%',height:'32%'}} onPress={()=>setOpenShapesModel(false)}></TouchableOpacity>
                        </View>                        
                    </Modal>
                    {/* End: Model     */}
                </ScrollView>    
        </ScreenWrapper>
    )            
}

const styles = new StyleSheet.create({
    radiusButton:{
        width:22,
        height:22,
        backgroundColor:Colors.graySnd, 
        borderWidth:2,
        borderColor:Colors.graySnd,
        borderRadius:32
    },
    radiusButtonActive:{
        width:22,
        height:22,
        backgroundColor:'transparent',
        borderWidth:2, 
        borderColor:Colors.SecondaryColor,
        borderRadius:32,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    radiusButtonActiveInner:{
        width:12,
        height:12,
        backgroundColor:Colors.SecondaryColor, 
        borderRadius:12
    },
    BoxContainerColumn:{
        width:'100%',
        height:140,
        borderBottomWidth:1,
        borderBottomColor:Colors.lightGray,  
    },
    PurposeHomeBuilding:{
        width:'100%',flexDirection:'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        alignContent:'center', 
        paddingVertical:6,marginBottom:6
    },
    HeaderBox:{
        color:Colors.SecondaryColor,
        fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',
        fontWeight:FontWeight.medium,
        marginBottom:12
    },
    text:{
        fontSize:FontSize.p,
        marginLeft:8,
        marginTop:-3,
        color:Colors.black,
        fontWeight:'400'
    },
    InputText:{
        width:'100%',  
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
        padding:0,
        // paddingLeft:9,
        // paddingRight:9,
        paddingHorizontal: 9,
        borderRadius:9,
        borderWidth:2,
      },
      TextInput:{
        color:'#212121',
        fontSize:FontSize.h6
      },
      NumberofFloors:{
        width:'48%',
        height:40,
        backgroundColor:'#CED6CE',
        marginBottom:6,
        justifyContent:'center', 
        alignItems:'center',alignSelf:'stretch',
        borderRadius:3
      },
      NumberofFloorsText:{
        fontSize:FontSize.xp,
        fontWeight:FontWeight.regular,
        color:Colors.black
      }
})
export default CreatePlot;