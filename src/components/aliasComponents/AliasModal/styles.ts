import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamItem: {
    marginTop: 5,
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
    width: 300,
    overflow: 'hidden',
    borderRadius: 14,
  },
  headerWin: {
    padding: 15,
    paddingVertical: 30,
    alignItems: 'center',
    backgroundColor: colors.aliasRed,
  },
  winScore: {
    color: colors.white,
    marginLeft: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: colors.aliasRed,
    width: 55,
    height: 55,
    borderRadius: 14,
  },
});
