import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  auth: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    right: 20,
    justifyContent: 'center',
  },
  authInfo: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 5,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  authTitle: {
    color: colors.blue,
    marginBottom: 20,
  },
  authText: {
    marginLeft: 10,
    width: '80%',
    fontSize: 16,
  },
  authButtons: {
    marginTop: 25,
  },
  authButton: {
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: -20,
    bottom: 0,
    right: -20,
  },
});
