import {GameItem} from '@components';
import {Screens} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '@ui';
import React from 'react';
import {styles} from './styles';

export const AliasSettings: React.FC = () => {
  const navigation: any = useNavigation();

  return <Screen type="ScrollView" style={styles.container}></Screen>;
};
