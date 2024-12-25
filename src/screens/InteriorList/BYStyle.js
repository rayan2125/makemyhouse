
import React, { useState, useEffect,memo} from 'react'
import { Modal,  TouchableOpacity, Image, Text, View, FlatList  } from 'react-native'; 
import Images from '../utility/images';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


import FilterUnselect from '../../../assets/images/icons/filterunselect.svg'
import Filterselect from '../../../assets/images/icons/filterselect.svg'
import { RFValue } from 'react-native-responsive-fontsize';


const ByStylepopup = (props, { onPress }) => {

    const [selectedOption, setSelectedOption] = useState(`${props.selectedFilter}`);
    const [selectimage, setselectimage] = useState('')

    useEffect(()=>{ 
        async function getCategoryFilters(){
            // await AsyncStorage.removeItem('interiorcategory')
            let aa =  await AsyncStorage.getItem('interiorstyle');
            setselectimage(aa); 
          } 
          getCategoryFilters();
    },[]);


    const ApplyFilters = async (filter)=>{ 
        props.toChnagePageFunc(1)
        try{ 
            console.log("chnage to this: ",`public/InteriorDesigns?page=1&limit=9&style=${filter}`)  
            await AsyncStorage.removeItem('interiorcategory')
            props.toChnageUrlDynamicInfiniteFunc(`&style=${filter}`);    
        }
        catch(error){
            console.log(error);
        }
        finally{ 
            
            props.toChangeMainLoadingFunc(false);
            props.toChnageFilterCheckFunc(true); 
        }
    }  

   
    const handleOptionSelect = (option) => { 
        props.toChangeMainLoadingFunc(false); 
        props.bystyleclosefunc() 
        ApplyFilters(option.toLowerCase().trim().replace(" ","-"));  
    };


    let FilterData = [
        {  id:1,tilte:'Contemporary' },
        {  id:2,tilte:'Eclectic' },
        {  id:3,tilte:'Modern' },
        {  id:4,tilte:'Traditional' },
        {  id:5,tilte:'Asian' },
        {  id:6,tilte:'Beach Style' },
        
        {  id:7,tilte:'Tropical' },
        {  id:8,tilte:'Victorian' },
        {  id:9,tilte:'Craftsman' },
        {  id:10,tilte:'Farmhouse' },
        {  id:11,tilte:'Industrial' },
        {  id:12,tilte:'Mediterranean' },

        
        {  id:13,tilte:'Midcentury'},
        {  id:14,tilte:'Rustic'},
        {  id:15,tilte:'Scandinavian'},
        
        {  id:16,tilte:'Southwestern'},
        {  id:17,tilte:'Transitional'}
    ]

    return <View>
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => {
                    props.bystyleclosefunc()
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
                            props.bystyleclosefunc()
                        }}>
                            <Image source={Images.Cancel} />
                        </TouchableOpacity>
                    </View>


                     <View style={{flexDirection:"row", justifyContent:'space-between', flexWrap:'wrap',width:"100%" }}>

                        {
                            FilterData.map((item,index)=>{
                                return<TouchableOpacity key={item.id} style={{ flexDirection: "row", width:'50%', marginTop: 2,  height:40,flexDirection:'row', justifyContent:'flex-start',alignContent:'center', alignContent:'center'}}  onPress={ async () => {setselectimage(`${item.tilte.toLowerCase().trim().replace(" ","-")}`); await AsyncStorage.setItem("interiorstyle",`${item.tilte.toLowerCase().trim().replace(" ","-")}`); handleOptionSelect(`${item.tilte.toLowerCase().trim().replace(" ","-")}`);}}>
                              
                              <View style={{   height:'100%', flexDirection:'row',  justifyContent:'center',alignContent:'center', alignItems:'center'}}>
                                    {
                                        selectimage == item.tilte.toLowerCase().trim().replace(" ","-") ? 
                                        // <Image source={Images.FilterSelect} style={{ height: 20, width: 20.5 }} /> 
                                        <Filterselect width={RFValue(16)} height={RFValue(16)}/>
                                        : 
                                        // <Image source={Images.FilterUnselect} style={{ height: 20, width: 20.5 }} />
                                        <FilterUnselect width={RFValue(16)} height={RFValue(16)}/>
                                    }
                                    <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000",marginLeft: 20 }}>
                                        {item.tilte} 
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

export default memo(ByStylepopup);