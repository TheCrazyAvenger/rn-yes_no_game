import {colors} from '@constants';
import {H2, H4} from '@Typography';
import React from 'react';
import {View} from 'react-native';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {styles} from './styles';

type CardWithContentProps = {
  backgroundColor: string;
  title: string;
  subtitle: string;
  color?: string;
};

export const CardWithContent: React.FC<CardWithContentProps> = ({
  backgroundColor,
  title,
  subtitle,
  color,
  children,
}) => {
  return (
    <View style={{...styles.card, backgroundColor}}>
      <View style={{...styles.cardContent}}>
        <H2
          fontWeight="600"
          style={{...styles.cardTitle, color: color ? color : colors.white}}>
          {title}
        </H2>
        <H4 style={{...styles.cardTitle}}>{subtitle}</H4>
      </View>

      {children}
    </View>
  );
};
