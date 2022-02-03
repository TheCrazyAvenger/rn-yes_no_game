import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '@screens';
import {Screens, yesno} from '@constants';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={Screens.homeScreen}
        options={{
          title: `In catalog ${yesno.length} stories`,
        }}
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
};
