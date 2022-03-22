import React, {useEffect, useRef, useState} from 'react';
import {Animated, StatusBar, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import * as RNLocalize from 'react-native-localize';

import {Screen, Button} from '@ui';
import {colors} from '@constants';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {SpyCard} from '@components';
import {H1, H3} from '@Typography';

export const SpyStart: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {spyHint, spyHintNumber, locations, location, rolesList} =
    useAppSelector(state => state.spy);

  const gameLocation = location.name;

  const [index, setIndex] = useState(0);
  const [showRoles, setShowRoles] = useState(spyHint ? false : true);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0)).current;

  const rolesOpacity = useRef(new Animated.Value(1)).current;
  const roleTitleOpacity = useRef(new Animated.Value(0)).current;
  const roleTextOpacity = useRef(new Animated.Value(0)).current;

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
  }, []);

  const toggleOpen = () => {
    setIsCardOpen(prev => !prev);
  };

  return (
    <>
      <Screen style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
        {spyHint && <View></View>}
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
                Now you will see your roles
              </H1>
            </Animated.View>

            <Animated.View style={{opacity: roleTextOpacity}}>
              <H3 style={{textAlign: 'center', color: colors.aliasRed}}>
                Do not show them to others!
              </H3>
            </Animated.View>
          </Animated.View>
        )}
        {!showRoles && (
          <>
            <View style={styles.secondCard}>
              <SpyCard
                role={rolesList[index]}
                location={gameLocation}
                isOpen={false}
              />
            </View>

            <Animated.View style={{transform: [{translateY: pan.y}, {scale}]}}>
              <SpyCard
                role={rolesList[index]}
                location={gameLocation}
                isOpen={isCardOpen}
              />
            </Animated.View>
            <Button
              title={isCardOpen ? t('spy:next') : t('spy:show')}
              style={styles.nextButton}
              containerStyle={styles.buttonContainer}
              onPress={toggleOpen}
            />
          </>
        )}
      </Screen>
    </>
  );
};
