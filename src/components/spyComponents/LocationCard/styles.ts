import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.spyRed,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    margin: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cardImage: {
    width: '100%',
    height: 170,
    justifyContent: 'flex-end',
  },
  cardTitle: {
    color: colors.aliasBlack,
    marginBottom: 15,
  },
  cardText: {
    color: colors.white,
    width: '90%',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
