import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

import { actuatedNormalizeVertical } from '../../screens/utility/scaling';
import Colors from '../../screens/utility/color';


//AutoHeightImage component
import FontSize, { FontWeight } from '../../screens/utility/fonts';


const { width, } = Dimensions.get('window');

import { useNavigation, } from '@react-navigation/native';

// Start: icons 
import ArrowLeftLight from '../../../assets/images/icons/arrowLeftLight.svg';
import SearchIcon from '../../../assets/images/icons/searchIcon.svg';
import UserIcon from '../../../assets/images/icons/userIcon.svg';
import ArrowRightHalfLight from '../../../assets/images/icons/arrowRightHalfLight.svg'
import { actuatedNormalize } from '../../screens/utility/scaling';
// end: icons

const ScndHeader = (props) => {
    const navigation = useNavigation();
    // navigation Hander 
    const NavigationHander = (stack, screenName) => {
        console.log("Navigate to screen: ", screenName)
        navigation.navigate(stack, { screen: screenName })
    }

    const FunctionHandler = () => {
        if (props.SkipScreen == '') {
            // skip screen is not present then handler the function  
            props.SkipFunction();  // call the SkipFunction in App.
        } else {
            // naigate to next page
            NavigationHander(props.SkipStack, props.SkipScreen)
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.Box, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                {
                    props.Back && (
                        <TouchableOpacity activeOpacity={0.6} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center', height: '100%', width: 30 }} onPress={() => {
                            props.BackToPackage == true ? navigation.navigate(props.BackScreen) : navigation.goBack()
                        }}>
                            <ArrowLeftLight width={actuatedNormalize(18)} height={actuatedNormalize(18)} />
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={[styles.Box, {}]}>
                <Text style={{ color: Colors.white, fontSize: FontSize.h6, fontWeight: FontWeight.medium }}>{props.Title}</Text>
            </View>
            <View style={[styles.Box, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                {
                    props.Search && (
                        <TouchableOpacity activeOpacity={0.6}>

                            <SearchIcon width={actuatedNormalize(14)} height={actuatedNormalize(14)} />
                        </TouchableOpacity>
                    )
                }
                {
                    props.Profile && (
                        <TouchableOpacity activeOpacity={0.6} style={{ marginLeft: 12 }}>
                            <UserIcon width={actuatedNormalize(14)} height={actuatedNormalize(14)} />
                        </TouchableOpacity>
                    )
                }
                {
                    props.Skip && (
                        <TouchableOpacity onPress={() => FunctionHandler()} activeOpacity={0.6} style={{ marginLeft: 12, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: Colors.white, fontSize: FontSize.p - 1, fontWeight: FontWeight.regular, marginRight: 4 }}>Skip</Text>
                            <ArrowRightHalfLight width={actuatedNormalize(14)} height={actuatedNormalize(14)} />
                        </TouchableOpacity>
                    )
                }

                {
                    props.skipSnd && (
                        <TouchableOpacity onPress={() => navigation.navigate('MyProjectMySite')} activeOpacity={0.6} style={{ marginLeft: 12, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <ArrowRightHalfLight width={actuatedNormalize(18)} height={actuatedNormalize(18)} />
                        </TouchableOpacity>
                    )
                }

            </View>
        </View>
    )
}


const styles = new StyleSheet.create({
    container: {
        width: width,
        height: actuatedNormalizeVertical(75),
        backgroundColor: Colors.SecondaryColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    Box: {
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    }
});

export default ScndHeader;