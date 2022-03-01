import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  settingsItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    color: colors.aliasRed,
  },
  buttons: {
    flexDirection: 'row',
    // justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 0,
  },
  button: {
    backgroundColor: colors.aliasBlack,
    width: 120,
    height: 40,
    marginHorizontal: 10,
  },
  line: {
    marginTop: 15,
    height: 0.8,
    backgroundColor: colors.aliasBlack,
  },
});
