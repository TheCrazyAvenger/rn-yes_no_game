import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '@screens';
import {Screens, yesno} from '@constants';
import {CustomDrawer} from '@components';
import {H3} from '@Typography';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props: any) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: {marginLeft: -25},
      }}>
      <Drawer.Screen
        name={Screens.homeScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          headerTitle: () => (
            <H3 fontWeight="600"> {`In catalog ${yesno.length} stories`}</H3>
          ),
          title: `Home`,
        }}
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
};
