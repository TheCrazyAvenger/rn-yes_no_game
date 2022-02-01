import {TextProps} from '@ui';
import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';

export const H2: React.FC<TextProps> = ({
  children,
  style,
  numberOfLines,
  onPress,
  fontWeight = '400',
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={[
        styles.default,
        style,
        {
          fontFamily:
            fontWeight === '600'
              ? 'OpenSans-SemiBold'
              : fontWeight === 'bold'
              ? 'OpenSans-Bold'
              : 'OpenSans-Regular',
        },
      ]}>
      {children}
    </Text>
  );
};
