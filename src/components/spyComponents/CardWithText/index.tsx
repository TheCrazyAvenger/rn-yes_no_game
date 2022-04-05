import {H3} from '@Typography';
import React from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';
import {styles} from './styles';

type CardWithTextProps = {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const CardWithText: React.FC<CardWithTextProps> = ({
  text,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.card, style]}>
      <H3 style={{...styles.cardTitle, ...textStyle}}>{text}</H3>
    </View>
  );
};
