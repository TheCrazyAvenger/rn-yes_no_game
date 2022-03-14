import React, {useEffect, useRef} from 'react';
import {Image, ImageBackground, View, Animated, StatusBar} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '@hooks';
import {toggleYesnoGoBack} from '@store/slices/actionsSlice';
import {colors} from '@constants';
import {H1} from '@Typography';
import {styles} from './styles';

export const YesNoScreen: React.FC = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();

  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const handleYesNo = () => {
    Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
      dispatch(toggleYesnoGoBack(true));
    });
  };

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  return (
    <Animated.View style={{...styles.main, transform: [{scale}]}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <ImageBackground
        blurRadius={20}
        source={require('@assets/images/logo.png')}
        style={styles.container}>
        <TouchableRipple
          onPress={handleYesNo}
          rippleColor="rgba(255, 255, 255, .32)"
          style={{flex: 1}}>
          <View style={styles.content}>
            <Image
              source={require('@assets/images/logo.png')}
              style={styles.logo}
            />
            <H1 fontWeight="bold" style={styles.text}>
              Yes! No! Game
            </H1>
          </View>
        </TouchableRipple>
      </ImageBackground>
    </Animated.View>
  );
};
