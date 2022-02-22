import {H1} from '@Typography';
import {Screen} from '@ui';
import React from 'react';
import {Image} from 'react-native';
import {styles} from './styles';

export const NewsScreen: React.FC = () => {
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('@assets/images/logo.png')} />
      <H1 fontWeight="bold">Coming soon...</H1>
    </Screen>
  );
};
