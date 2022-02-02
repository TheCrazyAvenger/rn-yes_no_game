import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    position: 'absolute',
    left: 35,
    width: 300,
    top: 20,
  },
  secondCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
