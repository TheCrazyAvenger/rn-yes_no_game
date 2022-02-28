import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  cover: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
