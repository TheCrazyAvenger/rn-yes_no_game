import {useSignupMutation} from '@api';
import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {addUser} from '@store/slices/userSlice';
import {H5} from '@Typography';
import {CloseButton, KeyboardDismissView, Loading} from '@ui';
import React, {useState} from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {SignUpForm} from '../../../forms';
import {styles} from './styles';

export const SignUpScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = darkTheme ? colors.dark : colors.white;

  const dispatch = useAppDispatch();

  const [signup, {isLoading}] = useSignupMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const goBackHandler = () => navigation.goBack();

  const signupHandler = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setErrorMessage(null);

      const data = await signup(values).unwrap();
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
      console.log(e);
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
            <SignUpForm onSubmit={signupHandler} />
            <CloseButton style={styles.closeButton} onPress={goBackHandler} />
          </View>
        </ImageBackground>
      </KeyboardDismissView>
    </>
  );
};
