import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    flex: 0.55,
  },
  imageBg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 10,
    width: 150,
    height: 150,
    borderRadius: 14,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    color: colors.white,
    textTransform: 'uppercase',
  },
  content: {
    paddingTop: 25,
    padding: 20,
    flex: 0.45,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    height: 60,
  },
  buttonText: {
    fontSize: 19,
  },
});
