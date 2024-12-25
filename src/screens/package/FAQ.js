import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions, FlatList, Button } from 'react-native';
import React, { useState, useEffect, memo } from 'react'; 

import Colors from '../utility/color';
import FontSize ,{FontWeight} from '../utility/fonts';

import AccordionItem from '../../components/faqAccordian';
 
import ApiService from '../../ApiServices';
//main screen 

import ArrowRightPrimary from '../../../assets/images/icons/arrowRightPrimary.svg';
import ArrowUpPrimary from '../../../assets/images/icons/arrowUpPrimary.svg'
import { RFValue } from 'react-native-responsive-fontsize';


import ArrowUP from '../../../assets/images/icons/arrowUpDark.svg'
import ArrowDown from '../../../assets/images/icons/arrowDownDark.svg'

const FAQ = (props) => {

    const [faqData,setFaqData] = useState([]);

    const [showAll, setShowAll] = useState(false);
    const halfIndex = Math.ceil(faqData.length / props.showFaq);


    useEffect(()=>{
        getFAQData();
    },[props]);

    const getFAQData = async ()=>{ 
        let url = `public/ProductFaqs?productID=${props.productID}`;
        console.log(url);
        await ApiService.Getapiheader(url)
        .then(response=>{
            
            let faqResponseData = response.data;
            if(faqResponseData){
                console.log("faq response: ",url);
                 
                faqResponseData.map((item,index)=>{
                    // console.log("get Faq Data: ", item)
                    const {id,a,q} = item;
                    setFaqData((prevData)=>[...prevData,{id:id, ans:clearHTMLTags(a), que:clearHTMLTags(q) }]);
                })
            }else{
                setFaqData([]);
                console.log("faq response: no data");
            } 
        })
        .catch(error=>{
            console.log("FAQ Request error: ", error);
        }) 
    } 
    
    // start: regx to remove any html tag 
    const clearHTMLTags = (strToSanitize) => {
        return strToSanitize.replace(/<.*?>/g, '');
    }
    // end: regx to remove any html tag 
      
 

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleAccordion = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const renderItem = ({ item, index }) => (
        <AccordionItem key={index} title={item.que} expanded={expandedIndex === index}
        onToggle={() => toggleAccordion(index)}>
            <Text style={{fontSize:FontSize.p,color:Colors.blackShadeTwo}}>{item.ans}</Text>
        </AccordionItem>  
    );

    const [hideAndShow,sethideAndShow] = useState(false);
    
    return (
        <View style={{flexDirection:'row',flexWrap:'wrap',padding:0,marginBottom:8}}>  
                {
                    faqData.length > 0 ?
                    <>
                    
                    <View style={{width:'100%',height:40,flexDirection:'row', justifyContent:'space-between', padding:0, alignContent:'center', alignItems:'center', paddingRight:16 }}>
                                        {/* <Text style={styles.HeaderBox}>Frequently Asked Questions</Text>  */}
                                        <Text style={[styles.HeaderBox,{padding:10, marginBottom:0, paddingBottom:0}]}>Frequently Asked Questions</Text> 
                                        <TouchableOpacity onPress={()=>{sethideAndShow(!hideAndShow)}} style={{marginTop:12, height:RFValue(22), width:RFValue(22), justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                            {
                                                hideAndShow == true ?  
                                                <ArrowUP width={RFValue(12)} height={RFValue(12)}/>
                                                :
                                                <ArrowDown width={RFValue(12)} height={RFValue(12)}/>
                                            } 
                                        </TouchableOpacity>
                    </View>
                    {
                        hideAndShow && (
                            <View style={[{ width:'100%', paddingBottom:20, paddingHorizontal:10}]}>

                                <FlatList
                                    data={showAll ? faqData : faqData.slice(0, halfIndex)}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.id}
                                />
        
                                <View style={{backgroundColor:'#ffffff', justifyContent:'center', alignContent:'center', alignItems:'center', marginTop:12}}>     
                                        <TouchableOpacity onPress={()=>{setShowAll(!showAll)}}> 
                                            {
                                                showAll == true ? 
                                                <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                                    <Text style={{color:'#4CB050', fontSize:FontSize.p, fontWeight:FontWeight.regular }}>Read Less </Text>
                                                    <ArrowUpPrimary width={RFValue(12)} height={RFValue(12)} style={{marginTop:3}}/>
                                                </View>
                                                :
                                                <View style={{flexDirection:'row', justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                                                    <Text style={{color:'#4CB050', fontSize:FontSize.p, fontWeight:FontWeight.regular }}>Read More </Text>
                                                    <ArrowRightPrimary width={RFValue(12)} height={RFValue(12)} style={{marginTop:3}}/>
                                                </View>
                                            } 
                                        </TouchableOpacity> 
                                </View>

                            </View>
                        )
                    } 
                         
                        <View style={{width:'100%',height:25,flexDirection:'row', justifyContent:'center', padding:0, alignContent:'center', alignItems:'center', padding:10, marginTop:12 }}>
                            <View style={{height:1, width:'100%', backgroundColor:Colors.lightGray,}}></View>  
                        </View>
                    </>
                    :
                    <></>
                } 
        </View> 
    )
}

const styles = new StyleSheet.create({
    HeaderBox:{
        color:Colors.SecondaryColor,
        fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold',
        fontWeight:FontWeight.medium,
        marginBottom:12
    }, 
    BoxContainerColumn:{
        width:'100%', 
        borderBottomWidth:1,
        borderBottomColor:Colors.lightGray, 
    },
    textPara:{
        color:Colors.blackShadeOne,
        fontSize:FontSize.p,
        marginBottom:12,
        fontWeight:FontWeight.regular
    },
    sndHeader:{
        color:Colors.blackShadeTwo,
        fontWeight:FontWeight.regular,
        fontSize:FontSize.xp,
        marginBottom:4
    }, 
    AddTextHeader:{
        fontSize:FontSize.h4,
        fontWeight:FontWeight.medium,
        color:Colors.SecondaryColor,
        marginBottom:4
    },
    AddTextpara:{ 
        fontSize:FontSize.h4, 
        color:Colors.blackShadeTwo,
    }
});

export default memo(FAQ)