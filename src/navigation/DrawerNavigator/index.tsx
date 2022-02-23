import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerNavigationOptions} from '@react-navigation/drawer/lib/typescript/src/types';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  HomeScreen,
  NewsScreen,
  SettingsScreen,
  SubmitStoryScreen,
} from '@screens';
import {CustomDrawer} from '@components';
import {H3} from '@Typography';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {ProfileStack} from '../ProfileStack';
import {useAppSelector} from '@hooks';
import {t} from 'i18next';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  const stories = useAppSelector(state => state.user.stories);
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
      screenOptions={({navigation}) => ({
        ...screenOptions,
        headerLeft: () => (
          <Icon
            onPress={navigation.openDrawer}
            name="menu-outline"
            size={30}
            style={styles.leftIcon}
            color={color}
          />
        ),
      })}>
      <Drawer.Screen
        name={Screens.homeScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          headerTitle: () => (
            <H3 style={{...styles.headerTitleStyle, color}} fontWeight="600">
              {`${t('home:titleFirst')} ${stories ? stories.length : 0} ${t(
                'home:titleSecond',
              )}`}
            </H3>
          ),
          title: t('navigation:home'),
        }}
        component={HomeScreen}
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
