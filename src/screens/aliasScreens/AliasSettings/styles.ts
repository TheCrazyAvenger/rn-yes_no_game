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
  line: {
    marginTop: 8,
    height: 0.8,
    backgroundColor: colors.aliasBlack,
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
