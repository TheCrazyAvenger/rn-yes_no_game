import React, {useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, StatusBar, View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {SpyCard, SpyModalExit} from '@components';
import {H1, H2, H3} from '@Typography';

export const SpyStart: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

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

  const {spyHint, location, rolesList, spyLocations} = useAppSelector(
    state => state.spy,
  );

  const gameLocation = location.name;

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [showRoles, setShowRoles] = useState(spyHint ? false : true);
  const [showSpyHint, setShowSpyHint] = useState(spyHint);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isNextCard, setIsNextCard] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0)).current;

  const rolesOpacity = useRef(new Animated.Value(1)).current;
  const roleTitleOpacity = useRef(new Animated.Value(0)).current;
  const roleTextOpacity = useRef(new Animated.Value(0)).current;

  const spyOpacity = useRef(new Animated.Value(1)).current;
  const spyTitleOpacity = useRef(new Animated.Value(0)).current;
  const spyLocOpacity = useRef(new Animated.Value(0)).current;
  const spyButtonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showRoles) {
      Animated.timing(roleTitleOpacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(
          () =>
            Animated.timing(roleTextOpacity, {
              toValue: 1,
              useNativeDriver: false,
            }).start(() => {
              setTimeout(
                () =>
                  Animated.timing(rolesOpacity, {
                    toValue: 0,
                    useNativeDriver: false,
                  }).start(() => {
                    setShowRoles(false);
                    Animated.spring(scale, {
                      toValue: 1,
                      useNativeDriver: false,
                    }).start();
                  }),
                2000,
              );
            }),
          1000,
        );
      });
    }
  }, [showRoles]);

  useEffect(() => {
    if (showSpyHint) {
      Animated.timing(spyTitleOpacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(
          () =>
            Animated.timing(spyLocOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }).start(() => {
              setTimeout(
                () =>
                  Animated.spring(spyButtonOpacity, {
                    toValue: 1,
                    useNativeDriver: false,
                  }).start(),
                1000,
              );
            }),
          500,
        );
      });
    }
  }, [showSpyHint]);

  useEffect(() => {
    if (isNextCard) {
      Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
        setIndex(prev => prev + 1);
        setIsNextCard(false);
        if (index === rolesList.length - 1) {
          navigation.navigate(Screens.spyGame);
        } else {
          Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
        }
      });
    }
  }, [isNextCard]);

  const toggleOpen = () => {
    setIsNextCard(isCardOpen ? true : false);
    setIsCardOpen(prev => !prev);
  };

  const hideHint = () => {
    Animated.timing(spyOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setShowSpyHint(false);
      setShowRoles(true);
    });
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <>
      <SpyModalExit visible={visible} rightButton={hideModal} />
      <Screen style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
        {showSpyHint && (
          <Animated.View style={{paddingHorizontal: 20, opacity: spyOpacity}}>
            <Animated.View
              style={{alignItems: 'center', opacity: spyTitleOpacity}}>
              <H1 fontWeight="600" style={styles.spyTitle}>
                {t('spy:possibleLocations')}
              </H1>
              <View style={styles.line} />
            </Animated.View>

            <Animated.View
              style={{alignItems: 'center', opacity: spyLocOpacity}}>
              {spyLocations.map((item: any, i: number) => (
                <H2 key={i} style={{color: colors.white}}>
                  {item.name}
                </H2>
              ))}
            </Animated.View>
            <Animated.View
              style={{alignItems: 'center', opacity: spyButtonOpacity}}>
              <Button
                title={t('spy:gotIt')}
                style={{...styles.nextButton, height: 45}}
                containerStyle={{...styles.buttonContainer, marginTop: 15}}
                onPress={hideHint}
              />
            </Animated.View>
          </Animated.View>
        )}
        {showRoles && (
          <Animated.View
            style={{
              ...styles.rolesContainer,
              opacity: rolesOpacity,
            }}>
            <Animated.View
              style={{paddingHorizontal: 20, opacity: roleTitleOpacity}}>
              <H1
                fontWeight="600"
                style={{textAlign: 'center', color: colors.white}}>
                {t('spy:start')}
              </H1>
            </Animated.View>

            <Animated.View style={{opacity: roleTextOpacity}}>
              <H3 style={{textAlign: 'center', color: colors.aliasRed}}>
                {t('spy:startSub')}
              </H3>
            </Animated.View>
          </Animated.View>
        )}
        {!showRoles && !showSpyHint && (
          <>
            <Animated.View
              style={{
                alignItems: 'center',
                transform: [{translateY: pan.y}, {scale}],
              }}>
              <SpyCard
                role={rolesList[index]}
                location={gameLocation}
                isOpen={isCardOpen}
              />

              <Button
                disabled={isNextCard}
                title={isCardOpen ? t('spy:next') : t('spy:show')}
                style={styles.nextButton}
                containerStyle={styles.buttonContainer}
                onPress={toggleOpen}
              />
            </Animated.View>
          </>
        )}
      </Screen>
    </>
  );
};
