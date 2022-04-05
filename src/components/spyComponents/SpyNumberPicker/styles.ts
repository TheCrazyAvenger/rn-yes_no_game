import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    padding: 20,
    width: 100,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: colors.spyRed,
    alignItems: 'center',
  },
  pickerTitle: {
    color: colors.white,
    marginBottom: 5,
  },
  pickerNum: {
    color: colors.white,
    marginVertical: 20,
    fontSize: 70,
  },
});
