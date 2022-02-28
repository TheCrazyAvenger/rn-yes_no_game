import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerNavigationOptions} from '@react-navigation/drawer/lib/typescript/src/types';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {NewsScreen, SettingsScreen, SubmitStoryScreen} from '@screens';
import {CustomDrawer} from '@components';
import {H3} from '@Typography';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {ProfileStack} from '../ProfileStack';
import {useAppDispatch, useAppSelector} from '@hooks';
import {t} from 'i18next';
import {HomeTopTabs} from '../HomeTopTabs';
import {toggleYesnoGoBack} from '@store/slices/actionsSlice';

const Drawer = createDrawerNavigator();

const HomeIcon: React.FC = () => {
  const yesnoGoBack = useAppSelector(state => state.actions.yesnoGoBack);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.black;

  const dispatch = useAppDispatch();

  const handleGoBack = () => dispatch(toggleYesnoGoBack(false));

  return yesnoGoBack ? (
    <Ionicons
      onPress={handleGoBack}
      name="home"
      size={30}
      color={color}
      style={styles.leftIcon}
    />
  ) : null;
};

export const DrawerNavigator: React.FC = () => {
  const stories = useAppSelector(state => state.user.stories);
  const {yesnoGoBack, openYesNoRules} = useAppSelector(state => state.actions);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.black;

  const screenOptions: DrawerNavigationOptions = {
    headerTitleStyle: styles.headerTitleStyle,
    headerShadowVisible: false,
    drawerLabelStyle: styles.drawerLabelStyle,
    drawerActiveTintColor: colors.red,
    drawerInactiveTintColor: color,
  };

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={({navigation}) => {
        const screenIndex = navigation.getState().index;
        const iconColor =
          screenIndex === 0 && !yesnoGoBack ? colors.white : color;

        return {
          ...screenOptions,
          headerLeft: () =>
            openYesNoRules ? null : (
              <Icon
                onPress={navigation.openDrawer}
                name="menu-outline"
                size={30}
                style={styles.leftIcon}
                color={iconColor}
              />
            ),
        };
      }}>
      <Drawer.Screen
        name={Screens.homeTopTabs}
        options={{
          headerTransparent: yesnoGoBack ? false : true,
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          headerRight: () => <HomeIcon />,
          headerTitle: () =>
            yesnoGoBack ? (
              <H3 style={{...styles.headerTitleStyle, color}} fontWeight="600">
                {`${t('home:titleFirst')} ${stories ? stories.length : 0} ${t(
                  'home:titleSecond',
                )}`}
              </H3>
            ) : null,
          // headerTitle: () => (

          // ),
          title: t('navigation:home'),
        }}
        component={HomeTopTabs}
      />
      <Drawer.Screen
        name={Screens.profileStack}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
          title: t('navigation:profile'),
          unmountOnBlur: true,
        }}
        component={ProfileStack}
      />
      <Drawer.Screen
        name={Screens.newsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="newspaper-outline" color={color} size={size} />
          ),
          title: t('navigation:news'),
        }}
        component={NewsScreen}
      />
      <Drawer.Screen
        name={Screens.submitStoryScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="add-circle-outline" color={color} size={size} />
          ),
          title: t('navigation:submitStory'),
        }}
        component={SubmitStoryScreen}
      />
      <Drawer.Screen
        name={Screens.settingsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
          title: t('navigation:settings'),
        }}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
};
