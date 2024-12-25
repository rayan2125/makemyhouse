import React, { useEffect, useState, useContext,memo } from 'react';
import { View, Text, Modal, StyleSheet, Pressable, TouchableOpacity, Image, ImageBackground,  } from 'react-native';
import Images from '../utility/images';

import { TextInput } from 'react-native';
 


const EnquiryNowpopup = (props, { navigation, onPress }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [sendenquiry, setsendenquiry] = useState(false)
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        props.enquirypopupclosefunc(option)
    };
    
    const opensecondpopup = () => {
        props.enquirypopupclosefunc()
        setsendenquiry(true)
    }

    // call with us--- open dial pad 
    const openDialScreen = () => {
        let number = '';
        if (Platform.OS === 'ios') {
          number = 'telprompt:${+917316803999}';
        } else {
          number = 'tel:${+917316803999}';
        }
        // Linking.openURL(number);
    };

    // open whatsapp chat 
    const openWhatsappchat = ()=>{
        // Linking.openURL(`https://api-wa.co/eyTLZH`);
    }
    
    return <View style={{zIndex:99999999999}}>
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => {
                    props.enquirypopupclosefunc()
                }}>
                    <View  ></View>
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: 'auto', backgroundColor: "#2F2F2F", borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>


                    <TouchableOpacity  onPress={()=>{props.navigation.navigate('FirstTimeSser',{screen:'SolutionFirstStackr',params: {
                                SkipScreenParams: false, 
                                Back:true
        }});
 props.handleStateEnquiryNowpopup(false);}} style={{ borderBottomWidth: 0.5, borderBottomColor: "#E5E5E5", padding: 10, marginTop: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: "400", color: "#ffffff" }}>
                            Hire Expert Designer
                        </Text>
                    </TouchableOpacity>
                    {
                        props.type == 2 ? null :
                            <TouchableOpacity onPress={()=>{props.navigation.navigate("ModifyThisPLan",{projectId:props.projectId}); props.handleStateEnquiryNowpopup(false);}}>
                                <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#E5E5E5", marginTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "#ffffff" }}>
                                        Modify this plan
                                    </Text>
                                </View>
                            </TouchableOpacity> 
                    }
                    {
                        props.type == 2 ? null :
                            <TouchableOpacity onPress={()=>{props.navigation.navigate("WorkingStructuralDrawings",{projectId:props.projectId});  props.handleStateEnquiryNowpopup(false);}}>
                                <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#E5E5E5", marginTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: "400", color: "#ffffff" }}>
                                        Get Working Drawings
                                    </Text>
                                </View>
                            </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={openDialScreen}>
                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#E5E5E5", marginTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "400", color: "#ffffff" }}>
                                Call Us
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openWhatsappchat}> 
                        <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#E5E5E5", marginTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: "400", color: "#ffffff" }}>
                                Chat with us
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ borderBottomWidth: 0.5, borderBottomColor: "#E5E5E5", marginTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }} 
                        onPress={() => setsendenquiry(true)}>
                          
                        <Text style={{ fontSize: 18, fontWeight: "400", color: "#ffffff" }}>
                            Send Enquiry
                        </Text>
                    </TouchableOpacity> */}
                </View>

            </View>
        </Modal>
        {
            sendenquiry == true ? (
                <Modal animationType="slide" transparent={true} visible={true}>
                    <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                        <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => { setsendenquiry(false), props.enquirypopupclosefunc() }}>
                            <View  ></View>
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: 300, backgroundColor: "#ffffff", borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                            <View style={{ padding: 10, marginTop: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: "400", color: "#000000", textAlign: "center" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </Text>
                            </View>
                            <View style={{ padding: 10, paddingLeft: 10 }}>
                                <TextInput
                                    multiline
                                    placeholder='Type your Message '
                                    placeholderTextColor='#C4C4C4'
                                    style={{ borderWidth: 1, padding: 10, margin: 10, borderColor: "#E5E5E5", borderRadius: 20, }}
                                    numberOfLines={5}
                                />
                            </View>
                            <TouchableOpacity style={{ padding: 10, backgroundColor: "#3CAF4B", borderRadius: 10, width: 100, alignSelf: "flex-end", marginRight: 20, flexDirection: "row" }}>
                                <Text style={{ color: "black", fontSize: 16, fontWeight: "400", }}>
                                    SUBMIT
                                </Text>
                                <Image source={Images.nextarow} style={{ height: 20, width: 20, alignSelf: 'center' }} />

                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            ) : null
        }

    </View>
}

export default memo(EnquiryNowpopup);
const styles = StyleSheet.create({
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