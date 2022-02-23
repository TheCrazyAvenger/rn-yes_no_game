import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 10,
    width: '80%',
  },
  line: {
    backgroundColor: colors.black,
    height: 0.7,
    marginVertical: 15,
  },
});
