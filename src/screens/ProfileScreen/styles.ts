import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 150,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  user: {
    marginLeft: 10,
  },
  title: {
    color: colors.white,
  },
  logoutButton: {
    backgroundColor: colors.red,
    borderRadius: 14,
    width: 60,
    height: 55,
  },
});
