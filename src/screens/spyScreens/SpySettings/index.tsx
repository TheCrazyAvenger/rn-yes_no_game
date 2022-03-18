import React, {useState} from 'react';
import {BackHandler, StatusBar, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {WheelPicker} from 'react-native-wheel-picker-android';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {H1, H3} from '@Typography';
import {styles} from './styles';

export const SpySettings: React.FC = () => {
  const navigation: any = useNavigation();

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

  const [players, setPlayers] = useState(3);

  const handleNext = () => {
    navigation.navigate(Screens.spySpies, {data: {players}});
  };

  const backHandler = () => navigation.navigate(Screens.spyHome);

  const setPlayersIndex = (index: number) => {
    setPlayers(index + 3);
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
            {t('spy:locals')}
          </H1>
          <H3 style={{color: colors.spyRed}}> {t('spy:localssSub')}</H3>
        </View>

        <View style={styles.wheelPicker}>
          <View style={styles.card}>
            <WheelPicker
              data={['3', '4', '5', '6', '7', '8']}
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
