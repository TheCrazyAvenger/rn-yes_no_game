import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamsText: {
    color: colors.white,
    marginLeft: 5,
  },
  teamsLine: {
    height: 1,
    width: '100%',
    backgroundColor: colors.white,
  },
});
