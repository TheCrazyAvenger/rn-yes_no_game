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
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 50,
    width: 150,
    height: 150,
    borderRadius: 14,
  },
  text: {
    marginTop: 10,
    paddingHorizontal: 80,
    textAlign: 'center',
    color: colors.white,
    textTransform: 'uppercase',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    marginHorizontal: 11,
    marginTop: 10,
    backgroundColor: colors.green,
    width: 60,
    height: 60,
    borderRadius: 14,
  },
});
