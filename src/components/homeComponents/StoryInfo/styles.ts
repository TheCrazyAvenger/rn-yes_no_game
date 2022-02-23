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
    marginBottom: 5,
  },
  text: {
    marginLeft: 2,
  },
  line: {
    backgroundColor: colors.darkBlue,
    height: 1,
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
