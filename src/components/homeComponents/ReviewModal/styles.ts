import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 25,
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
  headerTitle: {
    color: colors.blue,
  },
  reviewItem: {
    marginBottom: 20,
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: 5,
    color: colors.blue,
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
    paddingVertical: 8,
  },
  pickerAnimText: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  button: {
    marginTop: 10,
    marginBottom: 0,
    paddingVertical: 15,
  },
});
