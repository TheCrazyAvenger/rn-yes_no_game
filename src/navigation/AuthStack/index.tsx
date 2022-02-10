import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@constants';
import {AuthScreen, LoginScreen, SignUpScreen} from '@screens';

const Stack = createStackNavigator();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        gestureEnabled: true,
      }}>
      <Stack.Screen name={Screens.authScreen} component={AuthScreen} />
      <Stack.Screen name={Screens.loginScreen} component={LoginScreen} />
      <Stack.Screen name={Screens.signUpScreen} component={SignUpScreen} />
    </Stack.Navigator>
  );
};
