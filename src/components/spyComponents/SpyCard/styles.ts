import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 450,
    marginTop: 20,

    borderRadius: 10,
    borderColor: colors.spyRed,
    borderWidth: 10,
    backgroundColor: colors.aliasBlack,
    alignItems: 'center',
  },
  content: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotateY: '180deg'}],
  },
  title: {
    textAlign: 'center',
    fontSize: 45,
    color: colors.white,
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
    marginTop: 15,
    marginBottom: 10,
  },
});
