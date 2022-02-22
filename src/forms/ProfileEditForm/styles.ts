import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {marginLeft: 10, width: 150, height: 150},
  submitButton: {
    marginHorizontal: 10,
    height: 45,
    backgroundColor: colors.blue,
  },
});
