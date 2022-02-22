import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
  },
  reviewPicker: {
    height: 43,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightgray,
    borderRadius: 14,
    overflow: 'hidden',
  },
  pickerFiller: {
    position: 'absolute',
    width: '50%',
    height: '100%',
  },
  pickerText: {
    width: '50%',
    alignItems: 'center',
  },
  pickerAnimText: {
    fontSize: 16,
    fontFamily: 'Nunito-ExtraBold',
  },
});
