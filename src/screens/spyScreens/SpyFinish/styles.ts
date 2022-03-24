import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.aliasBlack,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 14,
    marginBottom: 20,
  },
  card: {
    width: 300,
    height: 470,
    marginTop: 20,

    borderRadius: 10,
    borderColor: colors.spyRed,
    borderWidth: 10,
    backgroundColor: colors.aliasBlack,
    alignItems: 'center',
  },
  winTitle: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 45,
    lineHeight: 55,
    textTransform: 'uppercase',
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  role: {
    fontSize: 45,
    textAlign: 'center',
    lineHeight: 49,
  },
  tip: {
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: colors.white,
    width: 100,

    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  button: {
    marginHorizontal: 5,
    backgroundColor: colors.spyRed,
    width: 60,
    height: 60,
    borderRadius: 14,
  },
});
