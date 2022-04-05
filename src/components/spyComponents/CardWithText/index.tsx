import {H3} from '@Typography';
import React from 'react';
import {View, ViewStyle} from 'react-native';
import {styles} from './styles';

type CardWithTextProps = {
  text: string;
  style?: ViewStyle;
};

export const CardWithText: React.FC<CardWithTextProps> = ({text, style}) => {
  return (
    <View style={[styles.card, style]}>
      <H3 style={{...styles.cardTitle}}>{text}</H3>
    </View>
  );
};
