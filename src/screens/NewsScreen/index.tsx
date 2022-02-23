import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {H1} from '@Typography';
import {Screen} from '@ui';
import React from 'react';
import {Image} from 'react-native';
import {styles} from './styles';

export const NewsScreen: React.FC = () => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.black;
  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  return (
    <Screen style={{...styles.container, backgroundColor}}>
      <Image style={styles.logo} source={require('@assets/images/logo.png')} />
      <H1 fontWeight="bold" style={{color}}>
        Coming soon...
      </H1>
    </Screen>
  );
};
