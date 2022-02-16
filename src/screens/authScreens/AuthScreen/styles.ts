import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 14,
    marginBottom: 10,
  },
  title: {
    marginLeft: 10,
    color: colors.white,
  },
  subtitle: {
    color: colors.white,
  },
  buttons: {
    paddingHorizontal: 20,
  },
  authButton: {
    height: 50,
  },
  text: {
    color: colors.white,
    marginBottom: 20,
  },
});
