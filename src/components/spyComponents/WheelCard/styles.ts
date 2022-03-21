import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    overflow: 'hidden',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    padding: 20,
    width: '80%',
  },
  cardTitle: {
    color: colors.white,
  },
  wheelContainer: {
    maxWidth: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    overflow: 'hidden',
  },
});
