import React, {useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, StatusBar, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';

import {styles} from './styles';
import {SpyHeader, SpyNumberPicker} from '@components';

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

  const top: any = useRef(new Animated.Value(-1000)).current;
  const bottom: any = useRef(new Animated.Value(-1000)).current;

  useEffect(() => {
    Animated.spring(top, {toValue: 40, useNativeDriver: false}).start();
    Animated.spring(bottom, {toValue: 40, useNativeDriver: false}).start();
  }, []);

  const [players, setPlayers] = useState(3);
  const [spies, setSpies] = useState(1);

  const handleNext = () => {
    navigation.navigate(Screens.spyAdditional, {data: {players, spies}});
  };

  const backHandler = () => navigation.navigate(Screens.spyHome);

  const addPlayers = () => {
    setPlayers(prev => prev + 1);
  };

  const removePlayers = () => {
    spies === players && setSpies(players - 1);
    setPlayers(prev => prev - 1);
  };

  const addSpies = () => {
    setSpies(prev => prev + 1);
  };

  const removeSpies = () => {
    setSpies(prev => prev - 1);
  };

  return (
    <>
      <Screen style={{backgroundColor: colors.aliasBlack}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
        <SpyHeader
          title={t('spy:players')}
          subtitle={t('spy:playersSub')}
          style={{marginBottom: 30}}
        />

        <View style={styles.wheelPicker}>
          <View style={styles.pickerContainer}>
            <SpyNumberPicker
              min={3}
              max={8}
              value={players}
              title={t('spy:locals')}
              plus={addPlayers}
              minus={removePlayers}
              style={{position: 'absolute', top, left: 40}}
            />

            <SpyNumberPicker
              min={1}
              max={players}
              value={spies}
              title={t('spy:spies')}
              plus={addSpies}
              minus={removeSpies}
              style={{position: 'absolute', bottom, right: 40}}
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
