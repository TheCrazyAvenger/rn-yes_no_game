import React, {useEffect, useRef} from 'react';
import {Animated, Image, ImageBackground, StatusBar, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '@hooks';
import {toggleAliasGoBack} from '@store/slices/actionsSlice';
import {colors} from '@constants';
import {H1} from '@Typography';
import {styles} from './styles';

export const AliasScreen: React.FC = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();

  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const handleAlias = () => {
    Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
      dispatch(toggleAliasGoBack(true));
    });
  };

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  return (
    <Animated.View style={{...styles.main, transform: [{scale}]}}>
      <StatusBar
        backgroundColor={darkTheme ? colors.dark : colors.white}
        barStyle={darkTheme ? 'light-content' : 'dark-content'}
      />
      <ImageBackground
        blurRadius={20}
        source={require('@assets/images/alias-logo.jpg')}
        style={styles.container}>
        <TouchableRipple
          onPress={handleAlias}
          rippleColor="rgba(255, 255, 255, .32)"
          style={styles.content}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('@assets/images/alias-logo.jpg')}
              style={styles.logo}
            />
            <H1 fontWeight="bold" style={styles.text}>
              Alias
            </H1>
          </View>
        </TouchableRipple>
      </ImageBackground>
    </Animated.View>
  );
};
