import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {H1} from '@Typography';
import {Screen} from '@ui';
import {t} from 'i18next';
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
        {t('common:comingSoon')}
      </H1>
    </Screen>
  );
};
