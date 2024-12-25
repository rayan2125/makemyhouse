import React, {useEffect, useState, useRef, memo} from 'react';
import { Animated, Button, Text, View } from 'react-native';
 

const AnimatedMessage = (props)=>{
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        Animated.sequence([
            Animated.timing(opacity, {
                toValue: 1,
                duration:500,
                useNativeDriver:false
            }),
            Animated.delay(2500),
            Animated.timing(opacity, {
                toValue:0,
                duration:500,
                useNativeDriver:false
            }),
        ]).start(()=>{
            props.onHide();
        });
    },[]);
    return (
        <Animated.View
        style={{
          opacity,
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-10, 0],
              }),
            },
          ], 
          marginBottom: 5,
          backgroundColor: '#fff',
          padding: 12,
          paddingVertical:14,
          borderRadius: 3,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.15,
          shadowRadius: 5,
          elevation: 6, 
        }}
      >
        <Text style={{color:'#212121',fontSize:14,fontWeight:'500'}}>{props.message}</Text>
      </Animated.View>
    )
}

export default AnimatedMessage; 