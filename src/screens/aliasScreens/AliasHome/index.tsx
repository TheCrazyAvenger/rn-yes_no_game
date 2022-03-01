import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {toggleAliasGoBack} from '@store/slices/actionsSlice';
import {H1} from '@Typography';
import {Button} from '@ui';
import React, {useEffect, useRef} from 'react';
import {Animated, Image, ImageBackground, StatusBar, View} from 'react-native';
import {styles} from './styles';

export const AliasHome: React.FC = () => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = darkTheme ? colors.white : colors.aliasBlack;
  const color = !darkTheme ? colors.white : colors.aliasBlack;

  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  const handleGoBack = () => {
    Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
      dispatch(toggleAliasGoBack(false));
    });
  };

  const handlePlay = () => navigation.navigate(Screens.aliasSettings);

  return (
    <Animated.View style={{...styles.container, transform: [{scale}]}}>
      <StatusBar
        backgroundColor={darkTheme ? colors.dark : colors.white}
        barStyle={darkTheme ? 'light-content' : 'dark-content'}
      />
      <View style={styles.header}>
        <ImageBackground
          blurRadius={20}
          style={styles.imageBg}
          source={require('@assets/images/alias-logo.jpg')}>
          <Image
            style={styles.image}
            source={require('@assets/images/alias-logo.jpg')}
          />
          <H1 fontWeight="bold" style={styles.text}>
            Alias
          </H1>
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <Button
          onPress={handlePlay}
          containerStyle={styles.buttonContainer}
          style={{...styles.button, backgroundColor: colors.aliasRed}}
          title="Play"
          textStyle={styles.buttonText}
        />
        <Button
          onPress={() => {}}
          containerStyle={styles.buttonContainer}
          style={{...styles.button, backgroundColor}}
          title="Rules"
          textStyle={{...styles.buttonText, color}}
        />
        <Button
          onPress={handleGoBack}
          containerStyle={styles.buttonContainer}
          style={{...styles.button, backgroundColor: colors.aliasRed}}
          title="Back to home"
          textStyle={styles.buttonText}
        />
      </View>
    </Animated.View>
  );
};
