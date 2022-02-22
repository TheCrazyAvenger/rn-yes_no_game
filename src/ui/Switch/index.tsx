import {colors} from '@constants';
import {H3} from '@Typography';
import React, {useEffect, useRef} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

type SwitchProps = {
  onPress: (...args: any) => any;
  leftText: string;
  rightText: string;
  leftColor: string;
  rightColor: string;
  title?: string;
  titleColor?: string;
  value: number;
};

export const Switch: React.FC<SwitchProps> = ({
  onPress,
  leftText,
  value,
  rightText,
  leftColor,
  rightColor,
  title,
  titleColor,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(opacity, {
      toValue: value,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.container}>
      {title && (
        <H3 fontWeight="600" style={{...styles.title, color: titleColor}}>
          {title}
        </H3>
      )}

      <View style={styles.reviewPicker}>
        <Animated.View
          style={[
            styles.pickerFiller,
            {
              backgroundColor: leftColor,
              borderTopLeftRadius: 14,
              borderBottomLeftRadius: 14,
              left: 0,
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        />
        <TouchableOpacity onPress={() => onPress(1)} style={styles.pickerText}>
          <Animated.Text
            style={[
              styles.pickerAnimText,
              {
                color: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [colors.black, colors.white],
                }),
              },
            ]}>
            {leftText}
          </Animated.Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.pickerFiller,
            {
              backgroundColor: rightColor,
              borderTopRightRadius: 14,
              borderBottomRightRadius: 14,
              right: 0,
              opacity: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        />
        <TouchableOpacity onPress={() => onPress(0)} style={styles.pickerText}>
          <Animated.Text
            style={[
              styles.pickerAnimText,
              {
                color: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [colors.white, colors.black],
                }),
              },
            ]}>
            {rightText}
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
