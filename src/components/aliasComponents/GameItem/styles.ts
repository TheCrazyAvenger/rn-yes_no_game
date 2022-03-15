import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 20,
    justifyContent: 'space-between',
    height: 140,
  },
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.aliasRed,
    fontSize: 21,
  },
  sub: {
    color: colors.aliasBlack,
  },
  line: {
    height: 2,
    backgroundColor: colors.lightgray,
  },
  text: {
    color: colors.white,
  },
  words: {
    position: 'absolute',
    right: 0,
    bottom: -5,
    color: colors.white,
    fontSize: 35,
  },
});
