import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.darkBlue,
  },
  header: {
    marginTop: -5,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileName: {
    color: colors.white,
    marginLeft: 10,
  },
  items: {
    backgroundColor: colors.white,
    paddingTop: 10,
  },
});
