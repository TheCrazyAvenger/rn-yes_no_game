import {colors} from '@constants';
import {H1, H2, H3} from '@Typography';
import React, {useState} from 'react';
import {
  Animated,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SpyModalRoles} from '../SpyModalRoles';
import {styles} from './styles';

type SpyNumberPickerProps = {
  min: number;
  max: number;
  value: number;
  title: string;
  plus: (...args: any) => any;
  minus: (...args: any) => any;
  style?: ViewStyle;
};

export const SpyNumberPicker: React.FC<SpyNumberPickerProps> = ({
  min,
  max,
  value,
  title,
  plus,
  minus,
  style,
}) => {
  return (
    <Animated.View style={{alignItems: 'center', ...style}}>
      <H1 style={styles.pickerTitle}>{title}</H1>
      <View style={styles.card}>
        <TouchableOpacity onPress={minus} disabled={value === min}>
          <Icon
            name="remove-circle-outline"
            color={value === min ? colors.darkGray : colors.white}
            size={50}
          />
        </TouchableOpacity>
        <H1 style={styles.pickerNum}>{value}</H1>
        <TouchableOpacity onPress={plus} disabled={value === max}>
          <Icon
            name="add-circle-outline"
            color={value === max ? colors.darkGray : colors.white}
            size={50}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
