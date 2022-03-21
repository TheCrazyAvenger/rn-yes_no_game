import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalbg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  winModal: {
    padding: 15,
    overflow: 'hidden',
    borderRadius: 14,
    backgroundColor: colors.aliasBlack,
  },
  title: {
    color: colors.spyRed,
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
    color: colors.white,
  },
  closeButton: {
    top: 10,
    right: 10,
  },
});
