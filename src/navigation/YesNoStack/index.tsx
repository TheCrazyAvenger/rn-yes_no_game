import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {HomeScreen, YesNoScreen} from '@screens';
import {Screens} from '@constants';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  animationEnabled: false,
};

export const YesNoStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Screens.yesNoScreen} component={YesNoScreen} />
      <Stack.Screen name={Screens.homeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
};
