import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {getUser} from '@store/asyncFuncs';
import {editUserProfile, setBg, setDarkTheme} from '@store/slices/userSlice';
import {Loading} from '@ui';
import React, {useEffect, useState} from 'react';
import {AuthStack} from './AuthStack';
import SplashScreen from 'react-native-splash-screen';
import {colors} from '@constants';
import {HomeScreen} from '@screens';
import {AliasStack} from './AliasStack';
import {useGetUserInfoMutation} from '@api';
import {SpyStack} from './SpyStack';
import {HomeTopTabs} from './HomeTopTabs';

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
  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const {yesnoGoBack, aliasGoBack, spyGoBack} = useAppSelector(
    state => state.actions,
  );
  const {token} = useAppSelector(state => state.user);

  const [getUserInfo, {isLoading}] = useGetUserInfoMutation();

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

      const token = await AsyncStorage.getItem('token');
      const id = await AsyncStorage.getItem('id');

      const response: any = await getUserInfo({id, token});

      const {name, email, image} = await response.data.user;

      await dispatch(
        editUserProfile({
          email,
          name,
          image,
        }),
      );

      setLoading(false);
    } catch (e) {
      SplashScreen.hide();
      setLoading(false);
    }
  };

  return (
    <NavigationContainer theme={darkTheme ? dark : light}>
      {loading || isLoading ? (
        <Loading isActive={loading} />
      ) : token ? (
        yesnoGoBack ? (
          <HomeScreen />
        ) : aliasGoBack ? (
          <AliasStack />
        ) : spyGoBack ? (
          <SpyStack />
        ) : (
          <HomeTopTabs />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
