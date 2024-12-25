import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 375;

const scaleVertical = SCREEN_HEIGHT / 812;

// font-size 
export function actuatedNormalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
  }
}
// we can use this for height
export function actuatedNormalizeVertical(size) {
  const newSize = size * scaleVertical
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
  }
}

export function isTab() {
  if (SCREEN_WIDTH > 550) {
    return true
  } else {
    return false
  }
}

export function isScreenHeight770() {
  if (SCREEN_HEIGHT > 740 && SCREEN_HEIGHT < 760 ) {
    return true
  } else {
    return false
  }
}
 
 
export function getWindowSize() { Dimensions.get('window') }

export const Util = { 
  getHeight: (percente) => {
    percente = !percente ? 100 : percente;
    return (Util.getWindowSize().height * percente) / 100;
  },
  getWidth: (percente) => {
    percente = !percente ? 100 : percente;
    return (Util.getWindowSize().width * percente) / 100;
  },
  getWindowSize: () => Dimensions.get('window'),
  // getFontFamily: (type) => {
  //   switch (type) {
  //     case 'bold':
  //       return 'Lato-Black';
  //     case 'regular':
  //       return 'segoe-ui';
  //     default:
  //       return 'AvertaDemoPECuttedDemo-Regular';
  //   }
  // }
}; 