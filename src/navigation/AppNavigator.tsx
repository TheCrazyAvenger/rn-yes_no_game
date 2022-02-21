import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {getUser} from '@store/asyncFuncs';
import {setBg} from '@store/slices/userSlice';
import {Loading} from '@ui';
import React, {useEffect, useState} from 'react';
import {AuthStack} from './AuthStack';
import {DrawerNavigator} from './DrawerNavigator';

export const AppNavigator: React.FC = () => {
  const token = useAppSelector(state => state.user.token);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      setLoading(true);
      await dispatch(getUser());
      const bg = await AsyncStorage.getItem('bg');
      bg && dispatch(setBg(+bg));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <NavigationContainer>
      {loading ? (
        <Loading isActive={loading} />
      ) : token ? (
        <DrawerNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
