import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerNavigationOptions} from '@react-navigation/drawer/lib/typescript/src/types';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {HomeScreen} from '@screens';
import {CustomDrawer} from '@components';
import {H3} from '@Typography';
import {Screens, yesno} from '@constants';
import {styles} from './styles';
import {ProfileStack} from '../ProfileStack';

const Drawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
  headerTitleStyle: styles.headerTitleStyle,
  headerShadowVisible: false,
  drawerLabelStyle: styles.drawerLabelStyle,
};

export const DrawerNavigator: React.FC = () => {
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
              {`In catalog ${yesno.length} stories`}
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
        }}
        component={ProfileStack}
      />
    </Drawer.Navigator>
  );
};
