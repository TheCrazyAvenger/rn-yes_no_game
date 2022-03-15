import React, {useEffect, useRef} from 'react';
import {DrawerNavigationOptions} from '@react-navigation/drawer/lib/typescript/src/types';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ProfileModal} from '@screens';
import {CustomDrawer} from '@components';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '@hooks';
import {HomeTopTabs} from '../HomeTopTabs';
import {Animated, Image, TouchableOpacity} from 'react-native';
import {IMAGES_URL} from '@env';
import {toggleOpenMenu} from '@store/slices/actionsSlice';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const {openYesNoRules, openMenu} = useAppSelector(state => state.actions);
  const {darkTheme, image} = useAppSelector(state => state.user);

  const scale = useRef(new Animated.Value(1)).current;

  const bgColor = useRef(new Animated.Value(0)).current;
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

  const handleOpenMenu = () => dispatch(toggleOpenMenu(true));
  const handleCloseMenu = () => dispatch(toggleOpenMenu(false));

  const screenOptions: DrawerNavigationOptions = {
    headerTransparent: true,
    headerLeft: () =>
      openYesNoRules ? null : (
        <TouchableOpacity onPress={handleOpenMenu}>
          <Image
            source={{uri: `${IMAGES_URL}${image}`}}
            style={styles.leftIcon}
          />
        </TouchableOpacity>
      ),
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
        <Drawer.Navigator
          drawerContent={(props: any) => <CustomDrawer {...props} />}
          screenOptions={screenOptions}>
          <Drawer.Screen
            name={Screens.homeTopTabs}
            options={{headerTitle: () => null}}
            component={HomeTopTabs}
          />
        </Drawer.Navigator>
      </Animated.View>

      <ProfileModal isVisible={openMenu} setIsVisible={handleCloseMenu} />
    </Animated.View>
  );
};
