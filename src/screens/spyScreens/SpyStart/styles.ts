import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.aliasBlack,
  },
  rolesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: colors.aliasBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  buttonContainer: {
    width: 160,
    marginTop: 20,
    marginBottom: 0,
    borderRadius: 10,
  },
  nextButton: {
    height: 55,
    borderRadius: 10,
    backgroundColor: colors.spyRed,
  },
  secondCard: {
    position: 'absolute',
    justifyContent: 'center',
    top: '50%',
    transform: [{translateY: -272.5}],
  },
});
