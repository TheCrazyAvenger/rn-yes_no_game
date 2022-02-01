import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {DrawerNavigator} from './DrawerNavigator';

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
