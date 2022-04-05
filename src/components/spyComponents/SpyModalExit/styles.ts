import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    width: 350,
    overflow: 'hidden',
    borderRadius: 14,
  },
  titleText: {
    color: colors.spyRed,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    marginTop: 10,
    marginBottom: 15,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: colors.spyRed,
    width: 55,
    height: 55,
    borderRadius: 14,
  },
});
