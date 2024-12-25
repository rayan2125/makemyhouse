import React from 'react';
import { View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ResponsiveImage = ({ source, style }) => {
  const imageWidth = width * 0.9; // Adjust the multiplier to control the size of the image
  const imageHeight = imageWidth * (source.height / source.width);

  return (
    <View style={style}>
      <Image
        source={source}
        style={{ width: imageWidth, height: imageHeight }}
      />
    </View>
  );
};

export default ResponsiveImage;