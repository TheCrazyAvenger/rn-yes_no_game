import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  itemText: {
    marginLeft: 10,
  },
  line: {
    backgroundColor: colors.black,
    height: 0.7,
    width: 50,
    marginVertical: 15,
    alignSelf: 'center',
  },
});
