import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  text: {
    marginLeft: 5,
  },
  line: {
    backgroundColor: colors.darkBlue,
    height: 1,
    marginVertical: 10,
  },
});
