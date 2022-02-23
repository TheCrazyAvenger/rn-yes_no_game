import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.white,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  headerTitle: {
    color: colors.white,
    width: '90%',
    padding: 20,
    paddingTop: 50,
  },
  story: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  text: {
    flex: 1,
  },
  answer: {
    marginHorizontal: 20,
    backgroundColor: colors.darkBlue,
    borderRadius: 14,
    marginBottom: 20,
  },
  answerText: {
    fontSize: 18.72,
    fontFamily: 'Nunito-ExtraBold',
    padding: 20,
    color: colors.white,
  },
  answerIcon: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',

    paddingVertical: 6,
    marginBottom: 0,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
