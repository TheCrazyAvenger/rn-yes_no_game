import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import {ProfileEditScreen, ProfileScreen, ReportScreen} from '@screens';
import {Screens} from '@constants';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  presentation: 'modal',
};

export const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={Screens.profileScreen}>
      <Stack.Screen name={Screens.profileScreen} component={ProfileScreen} />
      <Stack.Screen
        name={Screens.profileEditScreen}
        component={ProfileEditScreen}
      />
      <Stack.Screen name={Screens.reportScreen} component={ReportScreen} />
    </Stack.Navigator>
  );
};
