import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 45,
    color: colors.white,
  },

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
