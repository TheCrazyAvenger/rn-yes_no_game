import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {getUser} from '@store/asyncFuncs';
import {Loading} from '@ui';
import React, {useEffect, useState} from 'react';
import {AuthStack} from './AuthStack';
import {DrawerNavigator} from './DrawerNavigator';

export const AppNavigator: React.FC = () => {
  const name = useAppSelector(state => state.user.name);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    // await AsyncStorage.removeItem('email');
    // await AsyncStorage.removeItem('name');
    // await AsyncStorage.removeItem('image');
    try {
      setLoading(true);
      await dispatch(getUser());
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <NavigationContainer>
      {loading ? (
        <Loading isActive={loading} />
      ) : name ? (
        <DrawerNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
