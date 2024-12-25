// CustomTabBar.js
import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../screens/utility/color';
import AutoHeightImage from 'react-native-auto-height-image';

// import { Ionicons } from '@expo/vector-icons';

// Start: icons 
import HomePrimary from '../../../assets/images/menuIcons/homePrimary.svg'

import HomeSecondary from '../../../assets/images/menuIcons/homeSecondary.svg';

import DesignIdeaPrimary from '../../../assets/images/menuIcons/designIdeaPrimary.svg';
import DesignIdeaSecondary from '../../../assets/images/menuIcons/designIdeaSecondary.svg';

import SolutionPrimary from '../../../assets/images/menuIcons/solutionPrimary.svg'
import SolutionSeconday from '../../../assets/images/menuIcons/solutionSecondary.svg'

import MyProjectPrimary from '../../../assets/images/menuIcons/myProjectPrimary.svg'
import MyProjectSecondary from '../../../assets/images/menuIcons/myProjectSecondary.svg'

import MorePrimary from '../../../assets/images/menuIcons/morePrimary.svg';
import MoreSecondary from '../../../assets/images/menuIcons/moreSecondary.svg';

import { actuatedNormalize } from '../../screens/utility/scaling';
import FontSize, { FontWeight } from '../../screens/utility/fonts';
// end: icons 


const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const linePosition = useRef(new Animated.Value(0)).current;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const totalTabs = state.routes.length;
  const tabWidth = 100; // Adjust as needed

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#ECF3FF' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            console.log(route.name)
            navigation.navigate(route.name)

          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          (options.tabBarIcon == 'Solution' ?
            <>
              <View key={1} style={{ height: 60, flex: 1, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  key={label}
                  style={{ width: 70, height: 70, position: 'absolute', top: -35, borderRadius: 60, borderWidth: 6, borderColor: '#DEE7F8', backgroundColor: '#ffffff', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}
                >
                  {
                    isFocused ?
                      <SolutionPrimary width={actuatedNormalize(45)} height={actuatedNormalize(45)} />
                      :
                      <SolutionSeconday width={actuatedNormalize(45)} height={actuatedNormalize(45)} />
                  }
                </TouchableOpacity>
                <Text style={[{ marginTop: 34, fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.tabBarIcon}</Text>
              </View>
            </>
            :
            (
              options.tabBarIcon == 'home' ?

                <TouchableOpacity key={2}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={{ height: 60, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                // key={route.name}
                >

                  {
                    isFocused ?
                      <HomePrimary width={actuatedNormalize(28)} height={actuatedNormalize(28)} />
                      :
                      <HomeSecondary width={actuatedNormalize(28)} height={actuatedNormalize(28)} />
                  }
                  <Text style={[{ fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.tabBarIcon}</Text>
                </TouchableOpacity>
                :
                (
                  options.tabBarIcon == 'DesignIdea' ?
                    <TouchableOpacity
                      accessibilityRole="button"
                      accessibilityState={isFocused ? { selected: true } : {}}
                      accessibilityLabel={options.tabBarAccessibilityLabel}
                      testID={options.tabBarTestID}
                      onPress={onPress}
                      onLongPress={onLongPress}
                      style={{ height: 60, flex: 1, alignItems: 'center', justifyContent: 'center' }}
                      // key={route.name}
                      key={3}
                    >

                      {
                        isFocused ?
                          <DesignIdeaPrimary width={actuatedNormalize(29)} height={actuatedNormalize(29)} />
                          :
                          <DesignIdeaSecondary width={actuatedNormalize(29)} height={actuatedNormalize(29)} />
                      }
                      <Text style={[{ fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.tabBarIcon}</Text>
                    </TouchableOpacity>
                    :
                    (
                      options.tabBarIcon == 'MyProject' ?
                        <TouchableOpacity
                          accessibilityRole="button"
                          accessibilityState={isFocused ? { selected: true } : {}}
                          accessibilityLabel={options.tabBarAccessibilityLabel}
                          testID={options.tabBarTestID}
                          onPress={onPress}
                          onLongPress={onLongPress}
                          style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}
                          // key={route.name}
                          key={4}
                        >

                          {
                            isFocused ?
                              <MyProjectPrimary width={actuatedNormalize(28)} height={actuatedNormalize(28)} />
                              :
                              <MyProjectSecondary width={actuatedNormalize(28)} height={actuatedNormalize(28)} />
                          }
                          <Text style={[{ fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.tabBarIcon}</Text>

                        </TouchableOpacity>
                        :

                        (
                          options.tabBarIcon == 'More' ?
                            <TouchableOpacity
                              accessibilityRole="button"
                              accessibilityState={isFocused ? { selected: true } : {}}
                              accessibilityLabel={options.tabBarAccessibilityLabel}
                              testID={options.tabBarTestID}
                              onPress={onPress}
                              onLongPress={onLongPress}
                              style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}
                              // key={route.name}
                              key={5}
                            >

                              {
                                isFocused ?
                                  <MorePrimary width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                                  :
                                  <MoreSecondary width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                              }
                              <Text style={[{ fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.tabBarIcon}</Text>
                            </TouchableOpacity>
                            :
                            <></>
                        )
                    )
                )
            )
          )
        )
      })}
    </View>
  );
};

export default CustomTabBar;