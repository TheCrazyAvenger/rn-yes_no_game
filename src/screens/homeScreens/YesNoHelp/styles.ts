import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  closeButton: {
    top: 20,
    right: 20,
  },
  block: {
    paddingHorizontal: 20,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    color: colors.white,
    marginBottom: 3,
    textAlign: 'center',
  },
  text: {color: colors.white, textAlign: 'center'},
});
