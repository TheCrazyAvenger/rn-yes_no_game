import {colors} from '@constants';
import {CloseButtonProps} from '@ui';
import React from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const CloseButton: React.FC<CloseButtonProps> = ({
  onPress,
  disabled,
  style,
  buttonColor,
}) => {
  return (
    <Animated.View style={[styles.closeButton, style]}>
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <Icon
          name="close"
          size={25}
          color={buttonColor ? buttonColor : colors.blue}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
