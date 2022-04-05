import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  header: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: colors.aliasRed,
    elevation: 10,
  },
  headerContent: {
    padding: 30,
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
    fontSize: 45,
  },
  headerScore: {
    marginLeft: 5,
    color: colors.white,
  },
  teamItem: {
    marginBottom: 15,
  },
  teamName: {
    color: colors.white,
  },
  teamScore: {color: colors.white},
  nextButton: {
    height: 60,
    borderRadius: 10,
    backgroundColor: colors.aliasRed,
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
  },
  teamsLine: {
    height: 1,
    width: '100%',
  },
  buttonText: {
    fontSize: 19,
  },
});
