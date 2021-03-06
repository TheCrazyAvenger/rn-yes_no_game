import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  nextButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    width: 65,
    height: 65,
    backgroundColor: colors.aliasRed,
    borderRadius: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
