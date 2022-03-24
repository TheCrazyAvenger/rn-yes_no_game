import React, {useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, ScrollView, StatusBar, View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {SpyHeader, WheelCard} from '@components';

export const SpyAdditional: React.FC = () => {
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

  const [spyHint, setSpyHint] = useState(false);
  const [spyHintNumber, setSpyHintNumber] = useState(5);
  const [roles, setRoles] = useState(false);
  const [time, setTime] = useState(5);

  const left = useRef(new Animated.Value(-500)).current;
  const right = useRef(new Animated.Value(-500)).current;
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(left, {toValue: 0, useNativeDriver: false}).start();
    Animated.spring(right, {toValue: 0, useNativeDriver: false}).start();
  }, []);

  useEffect(() => {
    if (spyHint) {
      Animated.timing(height, {
        toValue: 160,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [spyHint]);

  const handleNext = () => {
    navigation.navigate(Screens.spyLocations, {
      data: {...data, spyHint, spyHintNumber, time, roles},
    });
  };

  const backHandler = () => navigation.goBack();

  const setSpyHintIndex = (index: number) => {
    const isOn = index === 0 ? false : true;
    setSpyHint(isOn);
  };

  const setRolesIndex = (index: number) => {
    const isOn = index === 0 ? false : true;
    setRoles(isOn);
  };

  const setTimeIndex = (index: number) => {
    setTime(index + 1);
  };

  const setspyHintNumberIndex = (index: number) => {
    setSpyHintNumber(index + 5);
  };

  return (
    <>
      <Screen style={{backgroundColor: colors.aliasBlack}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
        <SpyHeader
          title={t('spy:additional')}
          subtitle={t('spy:additionalSub')}
          style={{marginBottom: 30}}
        />

        <Animated.ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View style={{left}}>
            <WheelCard
              title={t('spy:time')}
              subtitle={t('spy:timeSub')}
              initPosition={4}
              backgroundColor={colors.spyRed}
              wheelData={[...Array(30).keys()].map(item =>
                (item + 1).toString(),
              )}
              onItemSelected={setTimeIndex}
            />
          </Animated.View>

          <Animated.View style={{right}}>
            <WheelCard
              title={t('spy:additional1')}
              subtitle={t('spy:additional1Sub')}
              backgroundColor={colors.spyRed}
              wheelData={[t('common:off'), t('common:on')]}
              onItemSelected={setSpyHintIndex}
            />
          </Animated.View>
          <Animated.View style={{height}}>
            <WheelCard
              title={t('spy:spyHint')}
              subtitle={t('spy:spyHintSub')}
              backgroundColor={colors.spyRed}
              wheelData={['5', '6', '7', '8', '9', '10']}
              onItemSelected={setspyHintNumberIndex}
            />
          </Animated.View>

          <Animated.View style={{left}}>
            <WheelCard
              title={t('spy:additional2')}
              subtitle={t('spy:additional2Sub')}
              backgroundColor={colors.spyRed}
              wheelData={[t('common:off'), t('common:on')]}
              onItemSelected={setRolesIndex}
            />
          </Animated.View>
        </Animated.ScrollView>

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
