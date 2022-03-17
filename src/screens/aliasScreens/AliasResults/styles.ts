import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  header: {
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 45,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    height: 0.9,
    marginHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.aliasRed,
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 19,
  },
});
