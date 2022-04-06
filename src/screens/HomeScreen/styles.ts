import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    position: 'absolute',
    left: 35,
    width: 300,
    top: 20,
  },
  buttons: {
    flexDirection: 'row',
  },
});
