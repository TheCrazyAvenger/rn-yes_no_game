import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AliasHelp} from '@screens';
import {toggleAliasGoBack, toggleAliasRules} from '@store/slices/actionsSlice';
import {H1} from '@Typography';
import {Button} from '@ui';
import {t} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  BackHandler,
  Image,
  ImageBackground,
  StatusBar,
  View,
} from 'react-native';
import {styles} from './styles';

export const AliasHome: React.FC = () => {
  const {aliasGoBack, openAliasRules} = useAppSelector(state => state.actions);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (aliasGoBack) {
          handleColseRules();
          handleGoBack();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [aliasGoBack]),
  );

  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const mainBg = darkTheme
    ? openAliasRules
      ? colors.white
      : colors.dark
    : openAliasRules
    ? colors.dark
    : colors.white;
  const secBg = !darkTheme ? colors.white : colors.dark;

  const scale = useRef(new Animated.Value(0)).current;

  const [isContinue, setIsContinue] = useState(true);

  const getContinue = async () => {
    const points = await AsyncStorage.getItem('points');

    points && setIsContinue(false);
  };

  useEffect(() => {
    getContinue();
  }, []);

  const handleContinue = async () => {
    const time: any = await AsyncStorage.getItem('time');
    const points: any = await AsyncStorage.getItem('points');
    const fee: any = await AsyncStorage.getItem('fee');
    const round: any = await AsyncStorage.getItem('round');
    const game: any = await AsyncStorage.getItem('game');
    const teams: any = await AsyncStorage.getItem('teams');
    const teamIndex: any = await AsyncStorage.getItem('teamIndex');
    const team: any = await AsyncStorage.getItem('team');
    const lastTeam: any = await AsyncStorage.getItem('lastTeam');
    const words: any = await AsyncStorage.getItem('words');
    const currentWord: any = await AsyncStorage.getItem('currentWord');

    navigation.replace(Screens.aliasStart, {
      time: JSON.parse(time),
      points: JSON.parse(points),
      fee: JSON.parse(fee),
      round: JSON.parse(round),
      game: JSON.parse(game),
      teamsPoints: JSON.parse(teams),
      teamIndex: JSON.parse(teamIndex),
      team: JSON.parse(team),
      lastTeam: JSON.parse(lastTeam),
      words: JSON.parse(words),
      currentWord: JSON.parse(currentWord),
      isStart: true,
    });
  };

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  useEffect(() => {
    if (openAliasRules) {
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [openAliasRules]);

  const handleGoBack = () => {
    Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
      dispatch(toggleAliasGoBack(false));
    });
  };

  const handlePlay = () => navigation.navigate(Screens.aliasSettings);

  const handleColseRules = () => dispatch(toggleAliasRules(false));
  const handleOpenRules = () => dispatch(toggleAliasRules(true));

  return (
    <View style={{backgroundColor: mainBg, flex: 1}}>
      <Animated.View
        style={{
          ...styles.container,
          backgroundColor: secBg,
          borderTopStartRadius: openAliasRules ? 14 : 0,
          borderTopEndRadius: openAliasRules ? 14 : 0,
          transform: [{scale}],
        }}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'light-content'}
        />

        <ImageBackground
          blurRadius={20}
          style={styles.imageBg}
          source={require('@assets/images/alias-logo.jpg')}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
              style={styles.image}
              source={require('@assets/images/alias-logo.jpg')}
            />

            <H1 fontWeight="bold" style={styles.text}>
              Alias
            </H1>
          </View>
          <View style={styles.content}>
            <Button
              onPress={handleContinue}
              containerStyle={styles.buttonContainer}
              style={{...styles.button, backgroundColor: colors.aliasBlack}}
              disabled={isContinue}
              title={t('alias:continue')}
              textStyle={{...styles.buttonText}}
            />
            <Button
              onPress={handlePlay}
              containerStyle={styles.buttonContainer}
              style={{...styles.button, backgroundColor: colors.aliasRed}}
              title={t('alias:newGame')}
              textStyle={styles.buttonText}
            />
            <Button
              onPress={handleOpenRules}
              containerStyle={styles.buttonContainer}
              style={{...styles.button, backgroundColor: colors.aliasBlack}}
              title={t('alias:rules')}
              textStyle={{...styles.buttonText}}
            />
            <Button
              onPress={handleGoBack}
              containerStyle={{...styles.buttonContainer, marginBottom: 0}}
              style={{...styles.button, backgroundColor: colors.aliasRed}}
              title={t('alias:backHome')}
              textStyle={styles.buttonText}
            />
          </View>
        </ImageBackground>
      </Animated.View>

      <AliasHelp isVisible={openAliasRules} setIsVisible={handleColseRules} />
    </View>
  );
};
