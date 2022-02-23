import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '80%',
    padding: 15,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 14,
    marginBottom: 35,
    marginTop: 20,
  },
  closeButton: {
    right: 20,
    top: 20,
  },
  error: {
    color: colors.red,
    marginLeft: 10,
    marginBottom: 10,
  },
});
