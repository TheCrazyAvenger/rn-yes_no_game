import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {toggleYesnoGoBack, toggleYesnoRules} from '@store/slices/actionsSlice';
import {H1} from '@Typography';
import {IconButton} from '@ui';
import React, {useEffect, useRef} from 'react';
import {Image, ImageBackground, View, Animated, StatusBar} from 'react-native';
import {YesNoHelp} from '../YesNoHelp';

import {styles} from './styles';

export const YesNoScreen: React.FC = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();

  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const openYesNoRules = useAppSelector(state => state.actions.openYesNoRules);

  const handleYesNo = () => {
    Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
      dispatch(toggleYesnoGoBack(true));
    });
  };

  const handleOpenHelp = () => dispatch(toggleYesnoRules(true));
  const handleCloseHelp = () => dispatch(toggleYesnoRules(false));

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  useEffect(() => {
    if (openYesNoRules) {
      Animated.spring(scale, {toValue: 0.9, useNativeDriver: false}).start();
    } else {
      Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
    }
  }, [openYesNoRules]);

  return (
    <>
      <Animated.View
        style={{
          ...styles.main,
          borderTopStartRadius: openYesNoRules ? 14 : 0,
          borderTopEndRadius: openYesNoRules ? 14 : 0,
          transform: [{scale}],
        }}>
        <StatusBar
          backgroundColor={darkTheme ? colors.dark : colors.white}
          barStyle={darkTheme ? 'light-content' : 'dark-content'}
        />
        <ImageBackground
          blurRadius={20}
          source={require('@assets/images/logo.png')}
          style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require('@assets/images/logo.png')}
              style={styles.logo}
            />
            <H1 fontWeight="bold" style={styles.text}>
              Yes! No! Game
            </H1>
            <View style={styles.buttons}>
              <IconButton
                onPress={handleOpenHelp}
                name="help"
                color={colors.white}
                style={{...styles.playButton, backgroundColor: colors.red}}
                size={32}
              />
              <IconButton
                onPress={handleYesNo}
                name="caret-forward"
                color={colors.white}
                style={styles.playButton}
                size={32}
              />
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
      <YesNoHelp isVisible={openYesNoRules} setIsVisible={handleCloseHelp} />
    </>
  );
};
