import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,

    paddingTop: 0,
  },
  main: {
    padding: 20,
    backgroundColor: colors.darkBlue,
  },
  mainTitle: {
    color: colors.white,
    marginBottom: 20,
  },
  title: {
    color: colors.white,
    marginBottom: 10,
  },
  additional: {
    padding: 20,
    backgroundColor: colors.red,
  },
  social: {
    padding: 20,
    backgroundColor: colors.green,
  },
});
