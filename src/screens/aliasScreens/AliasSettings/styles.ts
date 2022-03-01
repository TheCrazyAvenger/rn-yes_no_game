import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {},
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
  settingsTitle: {
    marginLeft: 15,
    marginTop: 5,
  },
  line: {
    marginTop: 5,

    height: 0.8,
    backgroundColor: colors.aliasBlack,
  },
  nextButton: {
    height: 55,
    borderRadius: 0,
    backgroundColor: colors.aliasRed,
  },
  buttonContainer: {
    borderRadius: 0,
    marginBottom: 0,
  },
});
