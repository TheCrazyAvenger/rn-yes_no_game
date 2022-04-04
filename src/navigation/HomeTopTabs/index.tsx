import React, {useEffect, useRef} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import {IMAGES_URL} from '@env';
import {colors, Screens} from '@constants';
import {AliasScreen, ProfileModal, SpyScreen, YesNoScreen} from '@screens';
import {useAppDispatch, useAppSelector} from '@hooks';
import {Animated, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {toggleOpenMenu} from '@store/slices/actionsSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export const HomeTopTabs: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {yesnoGoBack, openYesNoRules, openMenu} = useAppSelector(
    state => state.actions,
  );
  const {darkTheme, image} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const scale = useRef(new Animated.Value(1)).current;
  const bgColor = useRef(new Animated.Value(0)).current;

  const handleOpenMenu = () => dispatch(toggleOpenMenu(true));
  const handleCloseMenu = () => dispatch(toggleOpenMenu(false));

  useEffect(() => {
    if (darkTheme) {
      Animated.timing(bgColor, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bgColor, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [darkTheme]);

  useEffect(() => {
    if (openMenu) {
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [openMenu]);

  const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarStyle: {height: 0},
    swipeEnabled: yesnoGoBack || openYesNoRules ? false : true,
  };

  return (
    <Animated.View
      style={{
        backgroundColor: bgColor.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.white, colors.black],
        }),
        flex: 1,
      }}>
      <Animated.View
        style={{
          ...styles.container,
          transform: [{scale}],
          borderTopStartRadius: openMenu ? 14 : 0,
          borderTopEndRadius: openMenu ? 14 : 0,
        }}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: insets.top + 20,
            left: 10,
            zIndex: 1,
          }}
          onPress={handleOpenMenu}>
          <Image
            source={{uri: `${IMAGES_URL}${image}`}}
            style={styles.leftIcon}
          />
        </TouchableOpacity>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen name={Screens.yesNoScreen} component={YesNoScreen} />
          <Tab.Screen name={Screens.aliasScreen} component={AliasScreen} />
          <Tab.Screen name={Screens.spyScreen} component={SpyScreen} />
        </Tab.Navigator>
      </Animated.View>
      <ProfileModal isVisible={openMenu} setIsVisible={handleCloseMenu} />
    </Animated.View>
  );
};
