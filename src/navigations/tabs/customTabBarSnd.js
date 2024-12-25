// CustomTabBar.js
import React, { useRef } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../screens/utility/color';


// Start: icons 
import DashboardDeactive from '../../../assets/images/menuIconsSnd/dashboardDeactive.svg';
import DashboardActive from '../../../assets/images/menuIconsSnd/dashboardActive.svg';

import MorePrimary from '../../../assets/images/menuIcons/morePrimary.svg';
import MoreSecondary from '../../../assets/images/menuIcons/moreSecondary.svg';

import TimeLineDeactive from '../../../assets/images/menuIconsSnd/timeLineDeactive.svg';
import TimeLineActive from '../../../assets/images/menuIconsSnd/timeLineActive.svg';

import ChatDeactive from '../../../assets/images/menuIconsSnd/chatDeactive.svg';
import ChatActive from '../../../assets/images/menuIconsSnd/chatActive.svg';

import FilesDeactive from '../../../assets/images/menuIconsSnd/FilesDeactive.svg';
import FilesActive from '../../../assets/images/menuIconsSnd/FilesActive.svg';

import { actuatedNormalize } from '../../screens/utility/scaling';
import FontSize, { FontWeight } from '../../screens/utility/fonts';
// end: icons 

const CustomTabBarSnd = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const { navigate } = useNavigation();
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
            console.log(route);
            // navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          // start: Second tab-navigation 
          (
            options.tabBarIcon == 'Dashboard' ?
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}
                // key={route.name}
                key={options.tabBarIcon}
              >
                {
                  isFocused ?
                    <DashboardActive width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                    :
                    <DashboardDeactive width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                }
                <Text style={[{ fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.displayName}</Text>
              </TouchableOpacity>
              :
              (
                options.tabBarIcon == 'Timeline' ?
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
                    style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}
                    // key={route.name}
                    key={options.tabBarIcon}
                  >

                    {
                      isFocused ?
                        <TimeLineActive width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                        :
                        <TimeLineDeactive width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                    }
                    <Text style={[{ fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.displayName}</Text>
                  </TouchableOpacity>
                  :
                  (
                    options.tabBarIcon == 'Chat' ?
                      <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}
                        // key={route.name}
                        key={options.tabBarIcon}
                      >

                        {
                          isFocused ?
                            <ChatActive width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                            :
                            <ChatDeactive width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                        }
                        <Text style={[{ fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.displayName}</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ height: 60, flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}
                        // key={route.name}
                        key={options.tabBarIcon}
                      >

                        {
                          isFocused ?
                            <FilesActive width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                            :
                            <FilesDeactive width={actuatedNormalize(24)} height={actuatedNormalize(24)} style={{ marginTop: 6 }} />
                        }
                        <Text style={[{ fontSize: FontSize.xxp, fontWeight: FontWeight.medium }, isFocused ? { color: Colors.PrimaryColor } : { color: Colors.SecondaryColor }]}>{options.displayName}</Text>
                      </TouchableOpacity>
                  )
              )
          )
          // end: Second tab-navigation 
        )
      })}

    </View>
  );
};

export default CustomTabBarSnd;

