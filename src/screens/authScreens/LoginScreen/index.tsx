import React, {useState} from 'react';
import {Image, ImageBackground, View} from 'react-native';

import {CloseButton, KeyboardDismissView, Loading} from '@ui';
import {LoginForm} from '../../../forms';
import {useLoginMutation} from '@api';
import {useNavigation} from '@react-navigation/native';
import {H5} from '@Typography';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '@hooks';
import {addUser} from '@store/slices/userSlice';
import {colors} from '@constants';

export const LoginScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = darkTheme ? colors.dark : colors.white;

  const [login, {isLoading}] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const goBackHandler = () => navigation.goBack();

  const loginHandler = async (values: {email: string; password: string}) => {
    try {
      setErrorMessage(null);

      const data = await login(values).unwrap();
      const {email, name, image, userId, token} = data;

      await AsyncStorage.setItem('id', userId);
      await AsyncStorage.setItem('token', token);
      await dispatch(
        addUser({
          email,
          name,
          image,
          id: userId,
          token,
        }),
      );
    } catch (e: any) {
      setErrorMessage(e.data.message);
    }
  };

  return (
    <>
      {isLoading && (
        <Loading
          isActive={isLoading}
          style={{zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
        />
      )}

      <KeyboardDismissView>
        <ImageBackground
          style={styles.container}
          source={
            darkTheme
              ? require('@assets/images/authbg-dark.jpg')
              : require('@assets/images/authbg.jpg')
          }>
          <View style={{...styles.form, backgroundColor}}>
            <Image
              style={styles.image}
              source={require('@assets/images/main-logo.jpg')}
            />
            {errorMessage && <H5 style={styles.error}>{errorMessage}</H5>}
            <LoginForm onSubmit={loginHandler} />
            <CloseButton style={styles.closeButton} onPress={goBackHandler} />
          </View>
        </ImageBackground>
      </KeyboardDismissView>
    </>
  );
};
