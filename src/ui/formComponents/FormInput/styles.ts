import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: colors.lightgray,
    borderRadius: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 0,
  },
  errorInput: {
    borderColor: colors.red,
  },
  inputStyle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    fontWeight: '400',
  },
  labelStyle: {
    fontFamily: 'Nunito-Bold',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
  },
  errorLabel: {
    color: colors.red,
  },
  error: {
    color: colors.red,
    marginTop: -15,
    marginBottom: 16,
    marginLeft: 10,
  },
});
