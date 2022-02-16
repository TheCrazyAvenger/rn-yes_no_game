import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  header: {
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 15,
    color: colors.blue,
  },
  line: {
    backgroundColor: colors.black,
    height: 1,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  closeButton: {
    top: 5,
    right: 10,
  },
});
