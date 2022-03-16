import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {toggleAliasRules, toggleSpyGoBack} from '@store/slices/actionsSlice';
import {H1} from '@Typography';
import {Button} from '@ui';
import {t} from 'i18next';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  BackHandler,
  Image,
  ImageBackground,
  StatusBar,
  View,
} from 'react-native';
import {styles} from './styles';

export const SpyHome: React.FC = () => {
  const {spyGoBack} = useAppSelector(state => state.actions);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (spyGoBack) {
          handleGoBack();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [spyGoBack]),
  );

  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const mainBg = darkTheme
    ? spyGoBack
      ? colors.white
      : colors.dark
    : spyGoBack
    ? colors.dark
    : colors.white;
  const secBg = !darkTheme ? colors.white : colors.dark;

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  // useEffect(() => {
  //   if (openAliasRules) {
  //     Animated.spring(scale, {
  //       toValue: 0.9,
  //       useNativeDriver: false,
  //     }).start();
  //   } else {
  //     Animated.spring(scale, {
  //       toValue: 1,
  //       useNativeDriver: false,
  //     }).start();
  //   }
  // }, [openAliasRules]);

  const handleGoBack = () => {
    Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
      dispatch(toggleSpyGoBack(false));
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
          // borderTopStartRadius: openAliasRules ? 14 : 0,
          // borderTopEndRadius: openAliasRules ? 14 : 0,
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
          source={require('@assets/images/spy-logo.jpg')}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Image
              style={styles.image}
              source={require('@assets/images/spy-logo.jpg')}
            />

            <H1 fontWeight="bold" style={styles.text}>
              Spy
            </H1>
          </View>
          <View style={styles.content}>
            <Button
              onPress={handlePlay}
              containerStyle={styles.buttonContainer}
              style={{...styles.button, backgroundColor: colors.spyRed}}
              title={t('alias:start')}
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
              style={{...styles.button, backgroundColor: colors.spyRed}}
              title={t('alias:backHome')}
              textStyle={styles.buttonText}
            />
          </View>
        </ImageBackground>
      </Animated.View>

      {/* <AliasHelp isVisible={openAliasRules} setIsVisible={handleColseRules} /> */}
    </View>
  );
};
