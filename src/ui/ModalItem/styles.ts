import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 25,
  },
});
