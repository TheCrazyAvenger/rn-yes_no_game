import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 5,
    width: '90%',
    color: colors.blue,
  },
  description: {
    fontSize: 18,
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
