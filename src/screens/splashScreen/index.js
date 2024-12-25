import React from 'react';
import {View,Text, StyleSheet} from 'react-native';
import Colors from '../../utility/color';
import FontSize from '../../utility/fonts';

const SplashScreen = ()=>{
    <View style={styles.container}>
        <Text style={styles.text}>
            Splash Screen
        </Text>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center', 
    },
    text:{
        color:Colors.grayThird,
        fontSize:FontSize.h5 ,fontFamily: 'Inter-SemiBold'
    }
});

export default SplashScreen;