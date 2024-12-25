import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Util from '../../utility/utility';
import moment from 'moment';
import styles from './styles';
 
const CustomMessage = ({ date, messages }) => {
    return (
        <View style={{}}>
            <View style={{
                backgroundColor: '#012E58',
                padding: 10,
                margin: 10,
                borderRadius: 10,
                width: '30%',
                alignSelf: 'center',
                height: 35,
            }}>
                <Text style={{ textAlign: 'center', fontSize: 10,color:"#ffffff" }}>{date}</Text>
            </View>
            <View style={{ width:"100%"
            }}>
                <FlatList
                keyExtractor={(item, index) => index}
                    data={messages}
                    style={{ marginBottom: 50, }}
                    renderItem={({ item }) => (
                        item.messageType === "T" ?

                            <View style={(item?.userType == 'user') ? styles.msgInnerBlock1 : styles.msgInnerBlock2}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{
                                        textAlign: item?.userType === 'user' ? "right" : "left",
                                        fontSize: 16, color: 'black'
                                    }}>
                                        {item.message}</Text>
                                    <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: 'grey'
                                        }}>{moment(item.createdDate).format('hh:mma')}</Text>
                                    </View>
                                </View>
                            </View>
                            :
                            <View style={{}}>
                                <View style={(item?.userType == 'user') ? styles.msgInnerBlock1 : styles.msgInnerBlock2}>
                                    <TouchableOpacity>
                                        <Image
                                            source={{ uri: item.mediaUrl }}
                                            style={{ height: Util.getHeight(30), width: Util.getWidth(35) }}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between' }}>

                                        <View style={[{
                                           
                                            alignSelf: item?.userType === 'user' ? 'flex-end' : 'flex-start',
                                        }]}
                                        >
                                            <Text style={{
                                                textAlign: item?.userType === 'user' ? "right" : "left",
                                                fontSize: 16, fontWeight: 'bold', color: 'black'
                                            }}>
                                                {item.message}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                    )}
                />
            </View>
        </View>
    )
}

export default CustomMessage;