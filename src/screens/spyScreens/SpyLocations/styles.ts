import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    color: colors.white,
  },

  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    margin: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 20,
    backgroundColor: colors.spyRed,
  },
  cardTitle: {
    color: colors.white,
  },

  buttons: {
    backgroundColor: colors.aliasBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  buttonContainer: {
    width: '48%',
    marginBottom: 0,
    borderRadius: 10,
  },
  nextButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.spyRed,
  },
});
