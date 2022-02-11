import React, {useState} from 'react';
import {Image, ImageBackground, View} from 'react-native';

import {CloseButton, KeyboardDismissView, Loading} from '@ui';
import {LoginForm} from '../../../forms';
import {useLoginMutation} from '@api';
import {useNavigation} from '@react-navigation/native';
import {H5} from '@Typography';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '@hooks';
import {addUser} from '@store/slices/userSlice';

export const LoginScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const goBackHandler = () => navigation.goBack();

  const loginHandler = async (values: {email: string; password: string}) => {
    try {
      setErrorMessage(null);

      const data = await login(values).unwrap();
      const {email, name, image, id} = data.user;

      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('image', image);
      await AsyncStorage.setItem('id', id);
      await dispatch(addUser({email, name, image, id}));
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
          source={require('@assets/images/authbg.jpg')}>
          <View style={styles.form}>
            <Image
              style={styles.image}
              source={require('@assets/images/logo.png')}
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
