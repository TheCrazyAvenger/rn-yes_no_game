import {ButtonProps} from '@ui';
import React from 'react';

import {Button as ButtonItem} from 'react-native-elements';
import {styles} from './styles';

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  loading,
  disabled,
  style,
  containerStyle,
  textStyle,
}) => {
  return (
    <ButtonItem
      onPress={onPress}
      title={title}
      loading={loading}
      buttonStyle={[styles.button, style]}
      containerStyle={[styles.container, containerStyle]}
      disabled={disabled}
      titleStyle={{...styles.buttonText, ...textStyle}}
      activeOpacity={0.9}
    />
  );
};
