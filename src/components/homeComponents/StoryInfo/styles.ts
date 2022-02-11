import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
  },
  text: {
    marginLeft: 2,
  },
  line: {
    backgroundColor: colors.blue,
    height: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
