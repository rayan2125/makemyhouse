import React, { useEffect, useState, useContext,memo } from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native';
import Images from '../utility/images';
import ApiService from '../../ApiServices';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

let APIURL = 'https://api.makemyhouse.com/'; 

const MorePopup = (props) => {

    const [selectedOption, setSelectedOption] = useState(null);
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        props.morepopupclosefunc(option)
    };
    
    // project id 
    const [projectId,setProjectId] = useState(props.projectId);
    const [projectDetails,setProjectDetails] = useState([]);
    const [productKeywords,setProductKeywords] = useState();
 
    // fetch details for Data
    const FetchProjectDetails = async ()=>{
        // let url = `public/projects?min_area=500&max_area=1000&limit=4`;
        // let url = `public/projects/project_details/${projectId}`;
        let url = `${APIURL}public/projects/project_details/${projectId}`;
        console.log("--------------------", url);
        try {
            const response = await ApiService.GetapiheaderWithFullURL(url);
            setProjectDetails(response); 
            // console.log(response);
            setProductKeywords(response.keywordDetail);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        FetchProjectDetails(); 
        console.log("projectId----------------", {
            projectId,
            "route":props.projectId
        })
    },[projectId]); 
    
    useEffect(()=>{
        // console.log("keywords-------------",productKeywords);  
    },[productKeywords]);


    return <View style={{  zIndex:99999999999,}}>
        <Modal animationType="slide" transparent={true} visible={props.more}>
            <View style={{  width:Width, height:Height,  zIndex: 999999 }}> 
                {
                    projectDetails ? 
                    <View style={{  backgroundColor:'#fff' }}>
                        <View style={{width:'100%', height:55, borderBottomWidth: 1, borderBottomColor: "#D4D4D4" }}>
                            <View style={{ height:'100%',flexDirection:'row', justifyContent:'space-between'}}>
                                <TouchableOpacity style={{width:'50%', justifyContent:'center', alignContent:'flex-start', alignItems:'flex-start' }}  onPress={() => {
                                    props.morepopupclosefunc()
                                }}>
                                    <Image source={Images.closemore}  style={{ width: 35, height: 35, }} resizeMode='contain' />
                                </TouchableOpacity> 
                                {/* <View style={{ width:'50%',   flexDirection:'row', justifyContent:'flex-end', alignContent:'center', alignItems:'center'}}>
                                        <TouchableOpacity style={{ width: 25, height: 25, flex: 0.2 }}>
                                            <Image resizeMode={"contain"} source={Images.Notification} style={{ width: 25, height: 25 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: 25, height: 25, flex: 0.2 }}>
                                            <Image resizeMode={"contain"} source={Images.User_dash} style={{ width: 25, height: 25 }} />
                                        </TouchableOpacity> 
                                </View> */}
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ width:'100%',  height: Height - 55 }}>
                            <View style={{ padding: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: "400", color: "#000000" }}>
                                {/* {projectId}:  */}
                                {projectDetails.projectName}
                                </Text>
                                <View style={{ marginTop: 25 }}>
                                    <Text style={{ fontSize: 14, fontWeight: "700", color: "#000000" }}>
                                        Project Desciption
                                    </Text>
                                    <Text style={{ fontSize: 14, fontWeight: "400", color: "#6A6A6A" }}>
                                        {projectDetails.metaDesc}
                                    </Text>
                                </View>
                            </View>

                            <View style={{ borderBottomWidth: 2, borderBottomColor: "#F4F4F4" }} />

                            <View style={{ padding: 20 }}>
                                <View style={{}}>
                                    <Text style={{ fontSize: 12, fontWeight: "700", color: "#000000" }}>
                                        Plan  Desciption :
                                    </Text>
                                    <View style={{ marginTop: 10 }}>
                                        <View style={{ flexDirection: "row", backgroundColor: "#00000030", padding: 3, borderBottomWidth: 0.5 }}>
                                            <View style={{ flex: 2, marginLeft: 10 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>
                                                    Plot Area
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "700", color: "#000000" }}>
                                                    {projectDetails.carpetArea}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", backgroundColor: "#ffffff", padding: 3, borderBottomWidth: 0.5 }}>
                                            <View style={{ flex: 2, marginLeft: 10 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>
                                                    Cost
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "700", color: "#000000" }}>
                                                {projectDetails.cost}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", backgroundColor: "#00000030", padding: 3, borderBottomWidth: 0.5 }}>
                                            <View style={{ flex: 2, marginLeft: 10 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>
                                                    Total Buildup Area
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "700", color: "#000000" }}>
                                                    {projectDetails.buildUp}sqft
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", backgroundColor: "#ffffff", padding: 3, borderBottomWidth: 0.5 }}>
                                            <View style={{ flex: 2, marginLeft: 10 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>
                                                    Width 
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "700", color: "#000000" }}>
                                                    {projectDetails.width}sqft
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", backgroundColor: "#00000030", padding: 3, borderBottomWidth: 0.5 }}>
                                            <View style={{ flex: 2, marginLeft: 10 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>
                                                    Length
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "700", color: "#000000" }}>
                                                    {projectDetails.length}sqft 
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", backgroundColor: "#ffffff", padding: 3, borderBottomWidth: 0.5 }}>
                                            <View style={{ flex: 2, marginLeft: 10 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>
                                                    Building Type
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "700", color: "#000000" }}>
                                                {projectDetails.type}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: "row", backgroundColor: "#00000030", padding: 3, borderBottomWidth: 0.5 }}>
                                            <View style={{ flex: 2, marginLeft: 10 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "400", color: "#000000" }}>
                                                    Building Category
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: "700", color: "#000000" }}>
                                                {projectDetails.categorytype}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                </View> 
                            </View>

                            <View style={{ borderBottomWidth: 2, borderBottomColor: "#F4F4F4", marginTop: 10 }} />

                            <View style={{ padding: 20, }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{padding:10,flex:1,borderRightWidth:1,borderBottomWidth:1,borderRightColor:"#D0CFCF",borderBottomColor:"#D0CFCF",flexDirection:"row"}}>
                                        <Image source={Images.icon1} style={{alignSelf:"center"}} />
                                        <View style={{backgroundColor:"#D0CFCF",width:25,padding:2,alignSelf:"center",marginLeft:10}}>
                                            <Text style={{color:'black',fontSize:16,fontWeight:"700",textAlign:"center"}}>{projectDetails.bedroom}</Text>
                                        </View>
                                    </View>
                                    <View style={{padding:10,flex:1,borderRightWidth:1,borderBottomWidth:1,borderRightColor:"#D0CFCF",borderBottomColor:"#D0CFCF",flexDirection:'row'}}>
                                        <Image source={Images.icon2} style={{alignSelf:"center"}}/>
                                        <View style={{backgroundColor:"#D0CFCF",width:25,padding:2,alignSelf:"center",marginLeft:10}}>
                                            <Text style={{color:'black',fontSize:16,fontWeight:"700",textAlign:"center"}}>{projectDetails.livingroom}</Text>
                                        </View>
                                    </View>
                                    <View style={{padding:10,flex:1,borderBottomWidth:1,borderBottomColor:"#D0CFCF",flexDirection:'row'}}>
                                        <Image source={Images.icon3} style={{alignSelf:"center"}}/>
                                        <View style={{backgroundColor:"#D0CFCF",width:25,padding:2,alignSelf:"center",marginLeft:10}}>
                                            <Text style={{color:'black',fontSize:16,fontWeight:"700",textAlign:"center"}}>{projectDetails.drawinghall}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{padding:10,flex:1,borderRightWidth:1,borderRightColor:"#D0CFCF",flexDirection:'row'}}>
                                        <Image source={Images.icon} style={{alignSelf:"center"}}/>
                                        <View style={{backgroundColor:"#D0CFCF",width:25,padding:2,alignSelf:"center",marginLeft:10}}>
                                            <Text style={{color:'black',fontSize:16,fontWeight:"700",textAlign:"center"}}>{projectDetails.kitchen}</Text>
                                        </View>
                                    </View>
                                    <View style={{padding:10,flex:1,borderRightWidth:1,borderRightColor:"#D0CFCF",flexDirection:'row'}}>
                                        <Image source={Images.icon4} style={{alignSelf:"center"}}/>
                                        <View style={{backgroundColor:"#D0CFCF",width:25,padding:2,alignSelf:"center",marginLeft:10}}>
                                            <Text style={{color:'black',fontSize:16,fontWeight:"700",textAlign:"center"}}>{projectDetails.diningroom}</Text>
                                        </View>
                                    </View>
                                    <View style={{padding:10,flex:1,flexDirection:'row'}}>
                                        <Image source={Images.icon5} style={{alignSelf:"center"}}/>
                                        <View style={{backgroundColor:"#D0CFCF",width:25,padding:2,alignSelf:"center",marginLeft:10}}>
                                            <Text style={{color:'black',fontSize:16,fontWeight:"700",textAlign:"center"}}>{projectDetails.bathroom}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ borderBottomWidth: 2, borderBottomColor: "#F4F4F4"}} /> 

                            <View style={{ padding: 20 }}> 
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: "700", color: "#000000" }}>
                                        Keywords: 
                                    </Text>
                                    <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
                                    
                                    {
                                        productKeywords != undefined ?
                                            
                                            productKeywords.map((item,index)=>{
                                                return <Text key={index} style={{ fontSize: 12, fontWeight: "400", color: "#6A6A6A",backgroundColor:'#eee',padding:4, margin:4, marginLeft:0 }}>
                                                    {item.keywordName}
                                                </Text> 
                                            })
                                            
                                        : <Text>no data</Text>
                                    }
                                        
                                    </View>
                                </View>
                            </View>

                        </ScrollView> 
                    </View> 
                :
                <View style={{width:'100%',height:80 }}>
                     <Text>Loading...</Text>
                </View>
                }  
            </View>
        </Modal>
    </View>
}
export default MorePopup;
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