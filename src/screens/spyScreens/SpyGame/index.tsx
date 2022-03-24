import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import {
  CountdownCircleTimer,
  useCountdown,
} from 'react-native-countdown-circle-timer';

import {IconButton} from '@ui';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {useAppSelector} from '@hooks';

import {H1, H3} from '@Typography';
import {getNextIndex} from '@utilities';
import {BlurView} from '@react-native-community/blur';
import { SpyModalExit } from '@components';

export const SpyGame: React.FC = () => {
  const navigation: any = useNavigation();

  const {height} = useWindowDimensions();

  const {spyHint, spyLocations, time} = useAppSelector(state => state.spy);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setVisible(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
 
  const [visible, setVisible] = useState(false);
 const hideModal = () => {
    setVisible(false);
  };

  
  const [isPlaying, setIsPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [isChangeHint, setIsChangeHint] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showPause, setShowPause] = useState(false);

  const [isWin, setIsWin] = useState(false);
  const [winner, setWinner] = useState<null | string>(null);

  const {remainingTime} = useCountdown({
    isPlaying: isPlaying && !showPause,
    duration: time!,
    //@ts-ignore
    colors: colors.spyRed,
    strokeWidth: 20,
  });
  
  const mainOpacity = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const hintOpacity = useRef(new Animated.Value(0)).current;
  const locationsOpacity = useRef(new Animated.Value(0)).current;
  const topPause = useRef(new Animated.Value(-height / 4)).current;
  const bottomPause = useRef(new Animated.Value(-height / 4)).current;
  const pauseOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isWin && winner) {
      setIsPlaying(false);
      Animated.timing(mainOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        navigation.navigate(Screens.spyFinish, {winner});
      });
    }
  }, [isWin, winner]);
  
  useEffect(() => {
    Animated.timing(opacity, {toValue: 1, useNativeDriver: false}).start(() => {
      setTimeout(() => {
        Animated.timing(buttonsOpacity, {
          toValue: 1,
          useNativeDriver: false,
        }).start();
      }, 200);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsChangeHint(true);
    }, 1000);
    
    if (isChangeHint) {
      Animated.timing(locationsOpacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(
          () =>
            Animated.timing(locationsOpacity, {
              toValue: 0,
              useNativeDriver: false,
            }).start(() => {
              setIndex(prev => getNextIndex(spyLocations, prev));
              setIsChangeHint(false);
            }),
          5000,
        );
      });
    }
  }, [isChangeHint]);

  useEffect(() => {
    Animated.spring(topPause, {
      toValue: isPaused ? 0 : -height / 3,
      useNativeDriver: false,
    }).start();
    Animated.spring(bottomPause, {
      toValue: isPaused ? 0 : -height / 3,
      useNativeDriver: false,
    }).start();
    Animated.timing(pauseOpacity, {
      toValue: isPaused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => !isPaused && setShowPause(false));
  }, [isPaused]);
  
  const showHint = () => {
    Animated.timing(hintOpacity, {toValue: 1, useNativeDriver: false}).start();
  };

  const toggleTimer = () => {
    showHint();
    setIsPaused(isPlaying ? true : false);
    isPlaying && setShowPause(true);
    setIsPlaying(prev => !prev);
  };

  const handleWin = (winner: string) => {
    setIsWin(true);
    setWinner(winner);
  };

  return (
    <>
        <SpyModalExit visible={visible} rightButton={hideModal} />
    <View style={{flex: 1, backgroundColor: colors.aliasBlack}}>
      <Animated.View style={{...styles.container, opacity: mainOpacity}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />

        <Animated.View style={{...styles.gameSubTitle, opacity: hintOpacity}}>
          <H3 style={styles.gameSubText}>{t('spy:gameSubTitle')}</H3>
        </Animated.View>

        {showPause && (
          <>
            <Animated.View
              style={{...styles.pausedContainer, opacity: pauseOpacity}}>
              <BlurView style={styles.blur} blurRadius={5} />
              <IconButton
                style={{
                  ...styles.iconButton,
                  ...styles.pausedButton,
                  backgroundColor: colors.green,
                }}
                name={'caret-forward-outline'}
                color={colors.white}
                size={50}
                onPress={toggleTimer}
              />
            </Animated.View>

            <Animated.View
              style={{
                ...styles.topPause,
                height: height / 3,
                top: topPause,
              }}>
              <TouchableOpacity
                onPress={() => handleWin('locals')}
                style={styles.pauseText}>
                <H1
                  style={{...styles.pauseTitle, textAlign: 'right'}}
                  fontWeight="600">
                  {t('spy:localWon')}
                </H1>
                <H3 style={{textAlign: 'right'}}>{t('spy:localWonSub')}</H3>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={{
                ...styles.bottomPause,
                height: height / 3,
                bottom: bottomPause,
              }}>
              <TouchableOpacity
                onPress={() => handleWin('spy')}
                style={{...styles.pauseText, ...styles.pauseTextBottom}}>
                <H1
                  fontWeight="600"
                  style={{...styles.pauseTitle, color: colors.white}}>
                  {t('spy:spyWon')}
                </H1>
                <H3 style={{color: colors.white}}>{t('spy:spyWonSub')}</H3>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}
        {spyHint && !isPaused && (
          <Animated.View style={{marginBottom: 20, opacity: locationsOpacity}}>
            <H1 style={{color: colors.white}}>{spyLocations[index].name}</H1>
          </Animated.View>
        )}
        <Animated.View
          style={{opacity, marginTop: !isPaused && spyHint ? 0 : 65}}>
          <CountdownCircleTimer
            isPlaying={isPlaying && !showPause}
            size={280}
            strokeWidth={20}
            duration={time!}
            //@ts-ignore
            colors={[colors.spyRed]}
            onComplete={() => handleWin('spy')}>
            {() => (
              <IconButton
                style={{
                  ...styles.iconButton,
                  backgroundColor: isPlaying ? colors.spyRed : colors.green,
                }}
                name={isPlaying ? 'pause' : 'caret-forward'}
                color={colors.white}
                size={50}
                onPress={toggleTimer}
              />
            )}
          </CountdownCircleTimer>
        </Animated.View>
        <Animated.View style={{...styles.buttons, opacity: buttonsOpacity}}>
          <H1 style={styles.timer}>{remainingTime}</H1>
        </Animated.View>
      </Animated.View>
    </View>
    </>
  );
};
