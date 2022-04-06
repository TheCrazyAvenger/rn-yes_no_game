import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {Screens} from '@constants';
import {HomeTopTabs} from '../HomeTopTabs';
import {MenuStack} from '../MenuStack';

const Stack = createStackNavigator();

export const MainStack: React.FC = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Screens.homeTopTabs}
        options={{animationEnabled: false}}
        component={HomeTopTabs}
      />
      <Stack.Screen
        name={Screens.menuStack}
        options={{presentation: 'modal'}}
        component={MenuStack}
      />
    </Stack.Navigator>
  );
};
