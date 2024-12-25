import React, { useEffect, useRef, useState } from 'react'; 
import { Text, StyleSheet, View, TouchableOpacity, Modal, Image, PermissionsAndroid, Alert,} from 'react-native'
// import ImagePicker from 'react-native-image-crop-picker';
import DeviceInfo from "react-native-device-info";
import ImgToBase64 from 'react-native-image-base64';
import Images from '../utility/images';

const Uploadimage = (props) => {
    const androidVersion = DeviceInfo.getSystemVersion()

    const ImageUploadincamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Camera Permission',
                message: 'App needs access to your camera' + 'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // ImagePicker.openCamera({
            //     width: props.width,
            //     height: props.height,
            // }).then(image => {
            //     if (image.path) {
            //         let uri = image.path;
            //         addinserverfun(image);
            //     }
            //     else {
            //         props.closeimagepopup(1, '');
            //     }
            // });

        }
        else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Permission denied with never ask again');
  
            // Show alert to guide user to settings
            Alert.alert(
              'Permission Required',
              'Gallery permission is required to access your photos. Please enable it in the app settings.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Open Settings',
                  onPress: () => openAppSettings(),
                },
              ],
              { cancelable: false }
            );
          }
        else {
            console.log("camera permission ")
        }
    }

    const ImageUploadingallery = async () => {
        let granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Gallery permission',
                message: 'Say hello needs gallery permission',
            },
        );
        if (androidVersion > 12) {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                {
                    title: 'Gallery permission',
                    message: 'Say hello needs gallery permission',
                },
            );
        }
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            ImagePicker.openPicker({
                width: props.width,
                height: props.height,
            }).then(image => {
                if (image.path) {
                    let uri = image.path;
                    addinserverfun(image);
                }
                else {
                    props.closeimagepopup(1, '');
                }
            });
        }
        else {
        }
    }

    const openAppSettings = () => {
        // Linking.openSettings().catch(() => {
        //   Alert.alert('Error', 'Unable to open app settings');
        // });
    };

    const addinserverfun = async (source) => {
        console.log(source);
        ImgToBase64.getBase64String(source.path).then(base64String => {

            props.closeimagepopup(2, source, base64String);

        }).catch(err => {
            props.closeimagepopup(2, source, '');
        });
    }

    return <View >
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={{ height: '100%', marginTop: 'auto', position: "relative", backgroundColor: '#0e0e0e61', zIndex: 999999 }}>
                <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => {
                    props.closeimagepopup(1, '')
                }}>
                    <View  ></View>
                </TouchableOpacity>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopRadius: 50, height: 250, backgroundColor: "#ffffff", borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
                   
                    <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "center" }}>
                        <View style={{ flex: 1.5, marginLeft: 50 }}>
                            <Text style={StylesFirst.phottext}>Upload photo</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 0.2, alignSelf: "center", marginLeft: 20 }} onPress={() => {
                            props.closeimagepopup(1, '')
                        }}>
                            <Image style={{ height: 30, width: 30, }} source={Images.closemore} />
                        </TouchableOpacity> 
                    </View>

                    <View style={StylesFirst.photoview}>
                        <View style={StylesFirst.photosec}>
                            <TouchableOpacity onPress={() => { ImageUploadingallery(); }} style={{ height: 150, width: 140, justifyContent: "center", borderWidth: 1, borderColor: "grey", borderStyle: "dashed", borderRadius: 10 }}>
                                <Image style={StylesFirst.photoicon} source={Images.gallerychat} />
                                <Text style={{ color: "#012E58", textAlign: 'center', fontSize: 20, fontWeight: "600" }}>
                                    Gallery
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={StylesFirst.photosec}>
                            <TouchableOpacity onPress={() => {
                                ImageUploadincamera();
                            }} style={{ height: 150, width: 140, justifyContent: "center", borderWidth: 1, borderColor: "grey", borderStyle: "dashed", borderRadius: 10 }}>
                                <Image style={StylesFirst.photoicon} source={Images.camerchat} />
                                <Text style={{ color: "#012E58", textAlign: 'center', fontSize: 20, fontWeight: "600" }}>
                                    Camera
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </Modal>
    </View>;
}
export const StylesFirst = StyleSheet.create({
    footerdv: {
        width: "100%",
        height: 60,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomButtons: {
        width: "20%",
        alignItems: 'center',
    },
    footerText: {
        color: '#000000',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Poppins-Regular', fontSize: 18,
    },
    photoview: {
        flexDirection: 'row-reverse',
        paddingTop: 25,
        paddingBottom: 25,
        justifyContent: "space-around"
        // alignSelf:"center"
    },
    photosec: {
        // width:"50%",
        // height:"100%",
        // alignItems:"center"
    },
    photoicon: {
        width: 60,
        height: 60,
        alignSelf: "center"
    },
    phottext: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center"
    },
})

export default Uploadimage