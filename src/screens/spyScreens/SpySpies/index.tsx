import React, {useState} from 'react';
import {BackHandler, StatusBar, View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {H1, H3} from '@Typography';
import {styles} from './styles';

export const SpySpies: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {data} = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(Screens.spyHome);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const [spies, setSpies] = useState(1);

  const handleNext = () => {
    navigation.navigate(Screens.spyAdditional, {data: {...data, spies}});
  };

  const backHandler = () => navigation.goBack();

  const setPlayersIndex = (index: number) => {
    setSpies(index + 1);
  };

  return (
    <>
      <Screen style={{backgroundColor: colors.aliasBlack}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
        <View style={styles.header}>
          <H1 fontWeight="600" style={{...styles.title}}>
            {t('spy:spies')}
          </H1>
          <H3 style={{color: colors.spyRed}}> {t('spy:spiesSub')}</H3>
        </View>

        <View style={styles.wheelPicker}>
          <View style={styles.card}>
            <WheelPicker
              data={[...Array(data.players).keys()].map(item =>
                (item + 1).toString(),
              )}
              itemTextFontFamily={'Nunito-Bold'}
              selectedItemTextSize={52}
              itemTextSize={30}
              selectedItemTextColor="#B5322E"
              indicatorColor="white"
              selectedItemTextFontFamily={'Nunito-ExtraBold'}
              style={{
                width: '100%',
                height: '100%',
              }}
              onItemSelected={selectedItem => {
                setPlayersIndex(selectedItem);
              }}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <Button
            title={t('alias:back')}
            style={{...styles.nextButton, backgroundColor: colors.white}}
            textStyle={{color: colors.aliasBlack}}
            containerStyle={styles.buttonContainer}
            onPress={backHandler}
          />
          <Button
            title={t('spy:next')}
            style={styles.nextButton}
            containerStyle={styles.buttonContainer}
            onPress={handleNext}
          />
        </View>
      </Screen>
    </>
  );
};
