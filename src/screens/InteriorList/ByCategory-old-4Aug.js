
import React, { useState, useEffect,memo} from 'react'
import { Modal,  TouchableOpacity, Image, Text, View, FlatList  } from 'react-native'; 
import Images from '../../utility/images';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import FilterUnselect from '../../../assets/images/icons/filterunselect.svg'
import Filterselect from '../../../assets/images/icons/filterselect.svg'
import { RFValue } from 'react-native-responsive-fontsize';
 

 // CATEGORY-POPUP CONPONENT 
 const ByCategorypopup = (props,{navigation}) => { 
     
    const [selectimageCtg, setselectimageCtg] = useState('');  
    useEffect(()=>{ 
        async function getCategoryFilters(){
            setselectimageCtg('');
 
            // thrird 
            AsyncStorage.getItem('interiorcategory',(err,creds)=>{
                setselectimageCtg(creds)
                console.log("-------------------------filter : ", creds);
            })
          } 
          getCategoryFilters();
    },[props.selectedFilter]); 

    const ApplyFilters = async (filter)=>{ 
        props.toChnagePageFunc(1)
        try{    
            console.log("chnage to this: ",`public/InteriorDesigns?page=1&limit=9&subcategory=${filter}`);
            await AsyncStorage.removeItem('interiorstyle');
            AsyncStorage.setItem('interiorcategory',filter)
            setselectimageCtg(filter)
            props.toChnageUrlDynamicInfiniteFunc(`&subcategory=${filter}`)
        }
        catch(error){
            setselectimageCtg(filter)
            AsyncStorage.setItem('interiorcategory',filter)
            console.log(error);
            return;
        }
        finally{ 
            setselectimageCtg(filter)
            AsyncStorage.setItem('interiorcategory',filter)
            props.toChangeMainLoadingFunc(false);
            props.toChnageFilterCheckFunc(true); 
        }
    }  

    const handleOptionSelect = (option) => {  
        props.toChangeMainLoadingFunc(false);
        props.bycategoryclosefunc()
        ApplyFilters(option.toLowerCase().trim().replace(" ","-"));
    }; 

    let FilterData = [
        {  id:1,tilte:'Bedroom' },
        {  id:2,tilte:'Living room' },
        {  id:3,tilte:'Puja room' },
        {  id:4,tilte:'Dining room' },
        {  id:5,tilte:'Kitchen' },
        {  id:6,tilte:'Sofa' },
        {  id:7,tilte:'Bathroom' ,}, 
        {  id:8,tilte:'Study room'}, 
        {  id:9,tilte:'Kids room' }
    ]
    
    return <View>
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => {
                    props.bycategoryclosefunc()
                }}>
                    <View  ></View>
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: 'auto', backgroundColor: "#ffffff", padding: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={{ color: "#000000", fontSize: 18, fontWeight: "700" }}>
                                Interior Categories
                            </Text>
                        </View>
                        <TouchableOpacity style={{ borderRadius: 10, alignSelf: "flex-end" }} onPress={() => {
                            props.bycategoryclosefunc()
                        }}>
                            <Image source={Images.Cancel} />
                        </TouchableOpacity>
                    </View>
                       
                            <View style={{flexDirection:"row", justifyContent:'space-between', flexWrap:'wrap',width:"100%" }}>
                                {
                                    FilterData.map((item,index)=>{
                                        return<TouchableOpacity key={item.id} style={{ flexDirection: "row", width:'50%', marginTop: 2,  height:40,flexDirection:'row', justifyContent:'flex-start',alignContent:'center', alignContent:'center'}} onPress={ async () => {setselectimageCtg(`${item.tilte.toLowerCase().trim().replace(" ","-")}`); await AsyncStorage.setItem("interiorcategory",`${item.tilte.toLowerCase().trim().replace(" ","-")}`); handleOptionSelect(`${item.tilte.toLowerCase().trim().replace(" ","-")}`);}}> 
                                        <View style={{height:'100%', flexDirection:'row',  justifyContent:'center',alignContent:'center', alignItems:'center'}}>
                                            {
                                                selectimageCtg == item.tilte.toLowerCase().trim().replace(" ","-") ? 
                                                <Image source={Images.FilterSelect} style={{ height: 21, width: 21 }} />  
                                                : 
                                                <FilterUnselect width={RFValue(16)} height={RFValue(16)}/>
                                            }
                                            <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000",marginLeft: 20  }}>
                                                {item.tilte} 
                                                {/* || {item.tilte.toLowerCase().trim().replace(" ","-")} */}
                                            </Text> 
                                        </View>
                                    </TouchableOpacity> 
                                    })
                                }
                            </View>
 

                </View>

            </View>
        </Modal>
    </View>
}


export default memo(ByCategorypopup);