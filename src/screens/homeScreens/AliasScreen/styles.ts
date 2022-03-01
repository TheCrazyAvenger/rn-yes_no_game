import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 14,
  },
  text: {
    marginTop: 10,
    color: colors.white,
    textTransform: 'uppercase',
  },
});
