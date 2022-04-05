import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.spyRed,
    marginHorizontal: 15,
    overflow: 'hidden',
    marginBottom: 15,
    borderRadius: 10,
    padding: 20,
  },
  cardTitle: {
    color: colors.white,
  },
});
