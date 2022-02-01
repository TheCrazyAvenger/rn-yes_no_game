import React from 'react';
import {ScrollView, View} from 'react-native';
import {ScreenProps} from '../PropsType';
import {styles} from './styles';

export const Screen: React.FC<ScreenProps> = ({
  children,
  style,
  type = 'View',
}) => {
  const Container = type === 'View' ? View : ScrollView;

  return <Container style={[styles.container, style]}>{children}</Container>;
};
