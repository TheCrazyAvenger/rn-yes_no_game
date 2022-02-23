import React from 'react';
import {Image, ImageBackground, View} from 'react-native';

import {H1, H5} from '@Typography';
import {styles} from './styles';
import {Button} from '@ui';
import {colors, Screens} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@hooks';
import {t} from 'i18next';

export const AuthScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const loginHandler = () => navigation.navigate(Screens.loginScreen);
  const signupHandler = () => navigation.navigate(Screens.signUpScreen);

  return (
    <ImageBackground
      style={styles.container}
      source={
        darkTheme
          ? require('@assets/images/authbg-dark.jpg')
          : require('@assets/images/authbg.jpg')
      }>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require('@assets/images/logo.png')}
        />
        <H1 style={styles.title} fontWeight="bold">
          Yes! No! Game
        </H1>

        <H5 style={styles.subtitle}>{t('auth:slogan')}</H5>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={loginHandler}
          title={t('auth:signin')}
          style={{...styles.authButton, backgroundColor: colors.white}}
          textStyle={{color: colors.blue}}
        />
        <Button
          onPress={signupHandler}
          title={t('auth:signup')}
          style={styles.authButton}
        />
      </View>
    </ImageBackground>
  );
};
