import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '50%',
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
    padding: 20,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 15,
  },
  button: {
    height: 60,
  },
  buttonText: {
    fontSize: 19,
  },
});
