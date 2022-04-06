import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {HomeScreen, YesNoHelp} from '@screens';
import {Screens} from '@constants';

const Stack = createStackNavigator();

export const HomeStack: React.FC = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={Screens.yesnoHome}
        options={{animationEnabled: false}}
        component={HomeScreen}
      />
      <Stack.Screen
        name={Screens.yesnoRules}
        options={{presentation: 'modal'}}
        component={YesNoHelp}
      />
    </Stack.Navigator>
  );
};
