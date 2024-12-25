import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import React, { useState, useEffect, memo } from 'react'; 

import Colors from '../../utility/color';
import FontSize,{FontWeight} from '../../utility/fonts'; 

import AccordionItem from '../../components/faqAccordian';
 
import ApiService from '../../ApiServices';
//main screen 

import ArrowLeftPrimary from '../../../assets/images/icons/arrowLeftPrimary.svg';
import ArrowRightPrimary from '../../../assets/images/icons/arrowRightPrimary.svg';
import ArrowUpPrimary from '../../../assets/images/icons/arrowUpPrimary.svg'
import { RFValue } from 'react-native-responsive-fontsize';
 
const FAQ = (props) => {

    const [faqData,setFaqData] = useState([]);
    const [faqDataNextHalf,setfaqDataNextHalf] = useState([]);
    const [faqDataNextHaftSnd,setfaqDataNextHaftSnd] = useState([]);

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
    
    // regx to remove any html tag 
    const clearHTMLTags = (strToSanitize) => {
        return strToSanitize.replace(/<.*?>/g, '');
    }
      

    useEffect(()=>{
        if(faqData && faqData.length > props.showFaq){ 
            // // Calculate midpoint
            // let midpoint = Math.ceil(faqData.length / 2);

            // // Split into two arrays
            // setfaqDataNextHalf(faqData.slice(0, midpoint));
            // setfaqDataNextHaftSnd(faqData.slice(midpoint)); 

            setfaqDataNextHalf(faqData.slice(0, 4)); // Extract first 4 items
            setfaqDataNextHaftSnd([...faqData.slice(4)]) // Extract rest of the items
        } 
    },[faqData]);

    const [showHideNext,setshowHideNext]= useState(false);

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleAccordion = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    
    return (
        <View style={{flexDirection:'row',flexWrap:'wrap',padding:10,marginBottom:8}}>  
                {
                    faqData.length > 0 ?
                    <>
                    <Text style={styles.HeaderBox}>Frequently Asked Questions</Text>  
                        <View style={[{   width:'100%', paddingBottom:20}]}>
                            {
                                faqData.length < props.showFaq ?
                                <>
                                    {
                                        faqData.map((item,index)=>{ 
                                            return (
                                                // <Text key={index} style={{color:'red', fontSize:24}}>{item.ans}</Text>
                                                <AccordionItem key={index} title={item.que} expanded={expandedIndex === index}
                                                onToggle={() => toggleAccordion(index)}>
                                                    <Text style={{fontSize:FontSize.p,color:Colors.blackShadeTwo}}>{item.ans}</Text>
                                                </AccordionItem>   
                                            ) 
                                        })
                                    }
                                </>
                                :
                                <>
                                   {
                                        faqDataNextHalf.map((item,index)=>{ 
                                            return (
                                                // <Text key={index} style={{color:'red', fontSize:24}}>{item.ans}</Text>
                                                <AccordionItem key={index} title={item.que} expanded={expandedIndex === index}
                                                onToggle={() => toggleAccordion(index)}>
                                                    <Text style={{fontSize:FontSize.p,color:Colors.blackShadeTwo}}>{item.ans}</Text>
                                                </AccordionItem>   
                                            ) 
                                        })
                                    }   
                                    

                                    {
                                        showHideNext == true ? 
                                            <>
                                                {
                                                    faqDataNextHaftSnd.map((item,index)=>{ 
                                                        return (
                                                            // <Text key={index} style={{color:'red', fontSize:24}}>{item.ans}</Text>
                                                            <AccordionItem key={index} title={item.que}  expanded={expandedIndex === index}
                                                            onToggle={() => toggleAccordion(index)}>
                                                                <Text style={{fontSize:FontSize.p,color:Colors.blackShadeTwo}}>{item.ans}</Text>
                                                            </AccordionItem>   
                                                        ) 
                                                    })
                                                }   
                                            </>
                                        :
                                        <></>
                                    }

                                    {
                                        faqData.length < props.showFaq ?
                                        <></>
                                        :
                                        <View style={{backgroundColor:'#ffffff', justifyContent:'center', alignContent:'center', alignItems:'center', marginTop:12}}>     
                                            <TouchableOpacity onPress={()=>{setshowHideNext(!showHideNext)}}>
                                                
                                                {
                                                    showHideNext == true ? 
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
                                    } 

                                </>
                            }
                            

                            
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