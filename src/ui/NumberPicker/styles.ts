import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  numberPicker: {
    backgroundColor: colors.lightgray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    height: 45,
    overflow: 'hidden',
  },
});
