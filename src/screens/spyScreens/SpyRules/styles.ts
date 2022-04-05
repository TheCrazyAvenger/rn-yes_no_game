import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.aliasBlack,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 14,
  },
  button: {
    height: 60,
    backgroundColor: colors.white,
  },
  buttonText: {
    fontSize: 19,
    color: colors.aliasBlack,
  },
});
