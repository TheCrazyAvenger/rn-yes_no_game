import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeButton: {
    top: 30,
    right: 20,
    zIndex: 100,
  },
  header: {
    flex: 0.22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 14,
    backgroundColor: colors.lightgray,
    position: 'absolute',
    bottom: -40,
    left: '50%',
    transform: [{translateX: -40}],
  },
  headerName: {
    color: colors.white,
    textTransform: 'uppercase',
  },
  headerEmail: {
    color: colors.white,
    marginBottom: 20,
  },
  content: {
    flex: 0.78,
    alignItems: 'center',
    paddingTop: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
  },
  line: {
    backgroundColor: colors.black,
    height: 0.7,
    width: 50,
    marginVertical: 15,
    alignSelf: 'center',
  },
});
