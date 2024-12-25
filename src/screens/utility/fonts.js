import { Dimensions, Font } from 'react-native';

const { width } = Dimensions.get('window');

const baseFontSize = width > 400 ? 21 : width > 250 ? 16 : 12;

import {actuatedNormalize} from './scaling'; 

import { RFValue } from 'react-native-responsive-fontsize';

const calculateBaseFontSize = () => {
    console.log("screen size: ", width);
    if (width > 400) {
        return 16;
      }
      if (width > 250) {
        return 14;
      }
      return 12;
};

// font size 
const FontSize = {
    // h1:actuatedNormalize(baseFontSize * 2),
    // h2:actuatedNormalize(baseFontSize * 1.5),
    // h3:actuatedNormalize(baseFontSize),
    // // h4:calculateBaseFontSize(),
    // h4:actuatedNormalize(baseFontSize - 2),
    // h5:actuatedNormalize(baseFontSize - 4),
    // h6:actuatedNormalize(baseFontSize - 6),
    // p:actuatedNormalize(baseFontSize * 0.8) 

    h1:RFValue(24),
    h2:RFValue(22),
    h3:RFValue(21),
    // h4:calculateBaseFontSize(22),
    h4:RFValue(20),
    h5:RFValue(17),
    h6:RFValue(15),
    p:RFValue(14), 
    xp:RFValue(12),
    xxp:RFValue(10),
    xxxp:RFValue(8)
}
export default FontSize;

// font weight
export const FontWeight = { 
    regular:'400',
    medium:'500',
    bold:'700' 
}


// export const loadInterFont = async () => {
//   console.log("Font-family init");
//   await Font.loadAsync({
//     'Inter-Thin': require('../../assets/fonts/Inter-Thin.ttf'),
//     'Inter-ExtraLight': require('../../assets/fonts/Inter-ExtraLight.ttf'),
//     'Inter-Light': require('../../assets/fonts/Inter-Light.ttf'),
//     'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
//     'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
//     'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
//     'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
//     'Inter-ExtraBold': require('../../assets/fonts/Inter-ExtraBold.ttf'),
//     'Inter-Black': require('../../assets/fonts/Inter-Black.ttf'),
//   }); 
// };
 

