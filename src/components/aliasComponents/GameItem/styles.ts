import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
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
