import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerNavigationOptions} from '@react-navigation/drawer/lib/typescript/src/types';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeScreen, NewsScreen, NullScreen, SubmitStoryScreen} from '@screens';
import {CustomDrawer} from '@components';
import {H3} from '@Typography';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {ProfileStack} from '../ProfileStack';
import {useAppSelector} from '@hooks';

const Drawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
  headerTitleStyle: styles.headerTitleStyle,
  headerShadowVisible: false,
  drawerLabelStyle: styles.drawerLabelStyle,
  drawerActiveTintColor: colors.red,
  drawerInactiveTintColor: colors.black,
};

export const DrawerNavigator: React.FC = () => {
  const stories = useAppSelector(state => state.user.stories);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={screenOptions}>
      <Drawer.Screen
        name={Screens.homeScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          headerTitle: () => (
            <H3 style={styles.headerTitleStyle} fontWeight="600">
              {`In catalog ${stories ? stories.length : 0} stories`}
            </H3>
          ),
          title: 'Home',
        }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name={Screens.profileStack}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
          title: 'Profile',
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
          title: 'News',
        }}
        component={NewsScreen}
      />
      <Drawer.Screen
        name={Screens.submitStoryScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="add-circle-outline" color={color} size={size} />
          ),
          title: 'Submit a story',
        }}
        component={SubmitStoryScreen}
      />
      <Drawer.Screen
        name={Screens.settingsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
          title: 'Settings',
        }}
        component={NullScreen}
      />
    </Drawer.Navigator>
  );
};
