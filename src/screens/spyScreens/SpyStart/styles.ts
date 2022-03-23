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
    marginTop: 30,
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
  },
  spyTitle: {
    textAlign: 'center',
    color: colors.spyRed,
    fontSize: 46,
    lineHeight: 50,
  },
  line: {
    height: 1,
    backgroundColor: colors.white,
    width: 100,
    marginVertical: 15,
  },
});
