import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 45,
  },
  card: {
    marginHorizontal: 20,
    overflow: 'hidden',
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  cardTitle: {
    color: colors.white,
  },
  cardContent: {
    padding: 20,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    backgroundColor: colors.white,
    width: 1,
    height: '70%',
  },
  pickerText: {
    color: colors.white,
    fontSize: 15,
  },
  numberPickerStyle: {
    color: colors.white,
    fontSize: 25,
    fontFamily: 'Nunito-ExtraBold',
  },
  teams: {
    width: '67%',
    marginBottom: 30,
    marginLeft: 20,
  },
  teamsItem: {
    width: '100%',
    marginBottom: 30,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '48%',
    marginBottom: 0,
    borderRadius: 10,
  },
  nextButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.aliasRed,
  },
  wheelContainer: {
    maxWidth: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    overflow: 'hidden',
  },
});
