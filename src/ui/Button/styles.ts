import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.blue,

    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: colors.white,
    textTransform: 'uppercase',
    fontSize: 13.28,
    fontFamily: 'Nunito-ExtraBold',
  },
});
