import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: '#000',
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
    paddingTop: 30,
  },
  title: {
    color: colors.blue,
    textTransform: 'uppercase',
    marginBottom: 5,
    marginRight: 10,
  },
  story: {
    paddingBottom: 20,
  },
  text: {
    padding: 20,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  answer: {
    backgroundColor: colors.darkGray,
    borderRadius: 14,
    marginBottom: 100,
  },
  answerText: {
    fontSize: 18.72,
    fontFamily: 'OpenSans-SemiBold',
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
  button: {paddingHorizontal: 10, paddingVertical: 8, marginBottom: 0},
  openButton: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    left: 0,
    height: 60,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});