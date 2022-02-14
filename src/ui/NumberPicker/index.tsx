import {colors} from '@constants';
import {H4} from '@Typography';
import {IconButton, NumberPickerProps} from '@ui';
import React, {useRef} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const NumberPicker: React.FC<NumberPickerProps> = ({
  value,
  setValue,
  min,
  max,
  style,
}) => {
  const timer: any = useRef(null);

  const addOne = () => {
    setValue((prevValue: number) =>
      prevValue + 1 > max ? prevValue : prevValue + 1,
    );
    timer.current = setTimeout(addOne, 150);
  };

  const removeOne = () => {
    setValue((prevValue: number) =>
      prevValue - 1 < min ? prevValue : prevValue - 1,
    );
    timer.current = setTimeout(removeOne, 150);
  };

  const stopTimer = () => {
    clearTimeout(timer.current);
  };

  return (
    <View style={[styles.numberPicker, style]}>
      <IconButton
        onPressIn={removeOne}
        onPressOut={stopTimer}
        name="chevron-down"
        size={20}
        style={{...styles.button, backgroundColor: colors.red}}
        color={colors.white}
      />
      <H4 fontWeight="600">{value}</H4>
      <IconButton
        onPressIn={addOne}
        onPressOut={stopTimer}
        name="chevron-up"
        size={20}
        style={{...styles.button, backgroundColor: colors.green}}
        color={colors.white}
      />
    </View>
  );
};
