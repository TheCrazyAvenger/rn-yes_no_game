import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    minHeight: 100,
  },
  headerContent: {
    padding: 30,
    paddingVertical: 40,
  },
  imageBg: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  star: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    opacity: 0.8,
    color: colors.white,
    textTransform: 'uppercase',
    fontSize: 38,
  },
  headerScore: {
    marginLeft: 5,
    color: colors.white,
  },
  teamItem: {
    marginTop: 5,
  },
  teamName: {
    color: colors.white,
  },
  teamScore: {color: colors.white},
  nextButton: {
    height: 55,
    borderRadius: 0,
    backgroundColor: colors.aliasRed,
  },
  buttonContainer: {
    borderRadius: 0,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
});
