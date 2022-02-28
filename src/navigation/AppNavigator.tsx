import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {getUser} from '@store/asyncFuncs';
import {setBg, setDarkTheme} from '@store/slices/userSlice';
import {Loading} from '@ui';
import React, {useEffect, useState} from 'react';
import {AuthStack} from './AuthStack';
import {DrawerNavigator} from './DrawerNavigator';
import SplashScreen from 'react-native-splash-screen';
import {colors} from '@constants';
import {HomeScreen} from '@screens';
import {AliasStack} from './AliasStack';

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};
const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.dark,
  },
};

export const AppNavigator: React.FC = () => {
  const token = useAppSelector(state => state.user.token);
  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const {yesnoGoBack, aliasGoBack} = useAppSelector(state => state.actions);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      SplashScreen.hide();
      setLoading(true);
      await dispatch(getUser());
      const bg = await AsyncStorage.getItem('bg');
      bg && dispatch(setBg(+bg));
      const darkTheme = await AsyncStorage.getItem('darkTheme');

      darkTheme && dispatch(setDarkTheme(!!darkTheme));
      setLoading(false);
    } catch (e) {
      SplashScreen.hide();
      setLoading(false);
    }
  };

  return (
    <NavigationContainer theme={darkTheme ? dark : light}>
      {loading ? (
        <Loading isActive={loading} />
      ) : token ? (
        yesnoGoBack ? (
          <HomeScreen />
        ) : aliasGoBack ? (
          <AliasStack />
        ) : (
          <DrawerNavigator />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
