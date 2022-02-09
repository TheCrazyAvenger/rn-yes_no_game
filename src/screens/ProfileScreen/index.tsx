import React from 'react';
import {Image, ImageBackground, View} from 'react-native';

import {H1, H5} from '@Typography';
import {styles} from './styles';
import {Button} from '@ui';
import {colors, Screens} from '@constants';
import {useNavigation} from '@react-navigation/native';

export const ProfileScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const loginHandler = () => navigation.navigate(Screens.loginScreen);

  return (
    <ImageBackground
      style={styles.container}
      source={require('@assets/images/authbg.jpg')}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require('@assets/images/logo.png')}
        />
        <H1 style={styles.title} fontWeight="bold">
          Yes! No! Game
        </H1>

        <H5 style={styles.subtitle}>The game you can't say No to!</H5>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={loginHandler}
          title="Sign In"
          style={{...styles.authButton, backgroundColor: colors.white}}
          textStyle={{color: colors.blue}}
        />
        <Button onPress={() => {}} title="Sign Up" style={styles.authButton} />
      </View>
    </ImageBackground>
  );
};
