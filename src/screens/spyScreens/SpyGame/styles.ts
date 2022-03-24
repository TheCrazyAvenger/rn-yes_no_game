import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.aliasBlack,
  },
  timer: {
    fontSize: 55,
    color: colors.white,
  },
  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  pausedContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 98,
  },
  topPause: {
    position: 'absolute',

    width: '100%',
    height: 200,
    top: 0,
    borderBottomLeftRadius: 500,
    zIndex: 100,
    backgroundColor: colors.white,
  },
  bottomPause: {
    position: 'absolute',
    width: '100%',
    height: 200,
    bottom: 0,
    borderTopRightRadius: 500,
    zIndex: 100,
    backgroundColor: colors.spyRed,
  },
  pausedButton: {
    position: 'absolute',
    zIndex: 99,
    top: '50%',
    transform: [{translateY: -67}],
  },
  blur: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  pauseText: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 30,
    paddingLeft: 130,
  },
  pauseTextBottom: {
    alignItems: 'flex-start',
    paddingLeft: 30,
    paddingRight: 130,
  },
  pauseTitle: {
    lineHeight: 35,
  },
  startText: {
    position: 'absolute',
    bottom: 60,
  },

  gameSubTitle: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    width: '70%',
  },

  gameSubText: {
    color: colors.white,
    textAlign: 'center',
  },
});
