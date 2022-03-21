import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wheelPicker: {
    flex: 1,
    justifyContent: 'center',
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

  pickerContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
