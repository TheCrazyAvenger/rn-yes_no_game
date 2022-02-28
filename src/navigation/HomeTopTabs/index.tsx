import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import {Screens} from '@constants';
import {AliasScreen, YesNoScreen} from '@screens';
import {useAppSelector} from '@hooks';

const Tab = createMaterialTopTabNavigator();

export const HomeTopTabs: React.FC = () => {
  const {yesnoGoBack, openYesNoRules} = useAppSelector(state => state.actions);

  const screenOptions: MaterialTopTabNavigationOptions = {
    tabBarStyle: {height: 0},
    swipeEnabled: yesnoGoBack || openYesNoRules ? false : true,
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={Screens.yesNoScreen} component={YesNoScreen} />
      <Tab.Screen name={Screens.aliasScreen} component={AliasScreen} />
    </Tab.Navigator>
  );
};
