import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '@screens';
import {Screens} from '@constants';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={Screens.homeScreen}
        options={{
          title: 'Home',
        }}
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
};
