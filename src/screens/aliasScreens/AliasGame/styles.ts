import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: colors.aliasRed,
    borderRadius: 14,
    borderWidth: 10,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 6,
  },
  secondCard: {
    position: 'absolute',
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  answereZone: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    textTransform: 'uppercase',
    color: colors.white,
  },
  answerCircle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    color: colors.white,
    position: 'absolute',
    top: 30,
    right: 17,
  },
  timerText: {
    fontSize: 22,
    color: colors.white,
    fontFamily: 'Nunito-Bold',
  },
});
