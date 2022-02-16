import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 15,
    color: colors.blue,
  },
  description: {
    fontSize: 16,
  },
  line: {
    backgroundColor: colors.black,
    height: 0.9,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  closeButton: {
    top: 5,
    right: 10,
  },
});
