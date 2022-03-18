import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    color: colors.white,
  },
  wheelPicker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    paddingTop: 20,
    width: '100%',
    height: '80%',
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
