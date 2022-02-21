import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 150,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 14,
  },
  user: {
    marginLeft: 10,
  },
  title: {
    color: colors.white,
  },
  logout: {
    backgroundColor: colors.red,
    width: 55,
    height: 55,
    borderRadius: 14,
  },
});
