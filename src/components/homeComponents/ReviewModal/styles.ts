import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(51,51,51,0.6)',
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  reviewContainer: {
    overflow: 'hidden',
  },
  error: {
    color: colors.red,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 14,
  },
  headerText: {
    marginLeft: 10,
  },

  reviewItem: {
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
    color: colors.white,
  },
  line: {
    backgroundColor: colors.blue,
    height: 1,
    marginVertical: 10,
  },
  reviewPicker: {
    height: 43,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightgray,
    borderRadius: 14,
    overflow: 'hidden',
  },
  pickerFiller: {
    position: 'absolute',
    backgroundColor: colors.red,
    width: '50%',
    height: '100%',
  },
  pickerText: {
    width: '50%',
    alignItems: 'center',
  },
  pickerAnimText: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  button: {
    marginBottom: 0,
    paddingVertical: 15,
    backgroundColor: colors.green,
  },
  reviewReady: {
    alignItems: 'center',
  },
  revReadyText: {
    textAlign: 'center',
    color: colors.white,
  },
});
