import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
  },
  bgItem: {
    width: '100%',
    height: 150,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  checkmarkContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  checkmark: {
    width: 60,
    height: 60,
    backgroundColor: colors.red,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
