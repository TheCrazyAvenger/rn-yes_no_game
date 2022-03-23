import React, {useEffect, useRef, useState} from 'react';
import {StatusBar, Animated} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

import {Screen, Button} from '@ui';
import {colors} from '@constants';
import {styles} from './styles';
import {useAppSelector} from '@hooks';

import {H1} from '@Typography';

export const SpyGame: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [isPlaying, setIsPlaying] = useState(true);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  const {spyHint, spyHintNumber, locations, location, rolesList, time} =
    useAppSelector(state => state.spy);

  const gameLocation = location.name;

  return (
    <>
      <Screen style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
        <Animated.View style={{opacity}}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            size={260}
            strokeWidth={20}
            duration={200}
            //@ts-ignore
            colors={[colors.spyRed]}>
            {({remainingTime}) => <H1 style={styles.timer}>{remainingTime}</H1>}
          </CountdownCircleTimer>
        </Animated.View>
      </Screen>
    </>
  );
};
