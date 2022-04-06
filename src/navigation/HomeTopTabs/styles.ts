import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  leftIcon: {
    marginHorizontal: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.red,
  },
});
