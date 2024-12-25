import React, { useState, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet,ActivityIndicator } from 'react-native';
import Colors from '../utility/color';

const LoaderCircle = () => {
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.SecondaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff'  // color of the circle border
  }
});

export default LoaderCircle;
