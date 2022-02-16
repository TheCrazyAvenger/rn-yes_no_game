import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginLeft: 10,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 14,
  },
  profileName: {},
  items: {
    backgroundColor: colors.white,
  },
  bottom: {
    borderTopWidth: 0.5,
    padding: 10,
    paddingLeft: 20,
  },
  version: {
    marginTop: 5,
  },
});
