import React, { useEffect, useRef, useState , memo} from 'react';
import { StyleSheet,View, Animated,ImageBackground,Image } from 'react-native';
import Images from '../components/common/Images';

const LoadingPage= () => {
    return (
        <View style={styles.container}>
             <Image style={{ height: 150, width: 150 }} source={Images.gif} />
       </View>
    )}

const styles = StyleSheet.create({
   
    container: {
        // backgroundColor: '#0e010eb3',
        backgroundColor: 'transparent',
        height:"100%",
        width:"102%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagetag:{
        height: 150,
        width: 150,
    }
})

export default memo(LoadingPage);