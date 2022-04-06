import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {
  BackgroundScreen,
  ProfileEditScreen,
  ProfileModal,
  ReportScreen,
} from '@screens';
import {Screens} from '@constants';
import {HomeTopTabs} from '../HomeTopTabs';

const Stack = createStackNavigator();

export const MenuStack: React.FC = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Screens.profileModal} component={ProfileModal} />
      <Stack.Screen
        name={Screens.profileEditScreen}
        component={ProfileEditScreen}
      />
      <Stack.Screen
        name={Screens.backgroundScreen}
        component={BackgroundScreen}
      />
      <Stack.Screen name={Screens.reportScreen} component={ReportScreen} />
    </Stack.Navigator>
  );
};
