import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@constants';
import {LoginScreen, ProfileScreen} from '@screens';

const Stack = createStackNavigator();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        gestureEnabled: true,
      }}>
      <Stack.Screen name={Screens.profileScreen} component={ProfileScreen} />
      <Stack.Screen name={Screens.loginScreen} component={LoginScreen} />
    </Stack.Navigator>
  );
};
