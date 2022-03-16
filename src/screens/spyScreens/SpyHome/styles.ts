import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },

  imageBg: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  image: {
    alignSelf: 'center',

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
    paddingHorizontal: 20,
    paddingBottom: 20,
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
