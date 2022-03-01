import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 17,
    paddingTop: 5,
  },

  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 0,
  },
  button: {
    height: 55,
    backgroundColor: colors.aliasBlack,
  },
  buttonText: {
    fontSize: 17,
  },
  nextButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    width: 65,
    height: 65,
    backgroundColor: colors.aliasRed,
    borderRadius: 14,
  },
});
