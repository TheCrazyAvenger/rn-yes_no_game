import {H5} from '@Typography';
import {ButtonProps} from '@ui';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  disabled,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.9}
      style={[styles.button, style]}>
      <H5 style={{...styles.buttonText, ...textStyle}}>{title}</H5>
    </TouchableOpacity>
  );
};
