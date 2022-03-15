import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  circle: {
    width: 30,
    height: 30,
    borderColor: colors.aliasBlack,
    borderRadius: 15,
    borderWidth: 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    marginTop: 10,
    height: 1,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 0,
    borderRadius: 0,
  },
  button: {
    backgroundColor: colors.aliasRed,
    height: 60,
    borderRadius: 0,
  },
  buttonText: {
    fontSize: 19,
  },
});
