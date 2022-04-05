import React, {useEffect, useRef} from 'react';
import {
  StatusBar,
  Animated,
  useWindowDimensions,
  View,
  Image,
  BackHandler,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {t} from 'i18next';

import {Screen, IconButton} from '@ui';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {useAppSelector} from '@hooks';

import {H1, H3} from '@Typography';

export const SpyFinish: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleNext(Screens.spyHome);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const location = useAppSelector(state => state.spy.location);

  const {winner} = route.params;

  const winMessage = winner === 'spy' ? t('spy:spyWon') : t('spy:localWon');

  const rotateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  const {width} = useWindowDimensions();

  useEffect(() => {
    Animated.spring(rotateY, {toValue: 1, useNativeDriver: false}).start();
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  const handleNext = (screen: string) => {
    Animated.spring(rotateY, {toValue: 0, useNativeDriver: false}).start();
    Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
      navigation.replace(screen);
    });
  };

  return (
    <>
      <Screen style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />

        <Animated.View
          style={{
            ...styles.card,
            transform: [
              {scale},
              {
                rotateY: rotateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}>
          <View style={styles.content}>
            <Image
              style={styles.logo}
              source={require('@assets/images/spy-logo.jpg')}
            />
            <H1
              style={{
                ...styles.winTitle,
                color: winner === 'spy' ? colors.spyRed : colors.white,
              }}>
              {winMessage}
            </H1>
            <View style={styles.line} />
            <H3 style={{textAlign: 'center', color: colors.white}}>
              {t('spy:location')} {location.name}
            </H3>
            <View style={styles.buttons}>
              <IconButton
                color={colors.white}
                style={styles.button}
                size={28}
                name="home-outline"
                onPress={() => handleNext(Screens.spyHome)}
              />
              <IconButton
                color={colors.white}
                style={{...styles.button}}
                size={28}
                name="reload-outline"
                onPress={() => handleNext(Screens.spySettings)}
              />
            </View>
          </View>
        </Animated.View>
      </Screen>
    </>
  );
};
