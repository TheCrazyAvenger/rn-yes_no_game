import {IconButtonProps} from '@ui';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  onPressIn,
  onPressOut,
  color,
  size,
  name,
  disabled,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      activeOpacity={0.9}
      style={[styles.button, style]}>
      <Icon name={name} color={color} size={size} />
    </TouchableOpacity>
  );
};
