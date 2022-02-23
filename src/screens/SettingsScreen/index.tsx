import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDarkTheme} from '@store/slices/userSlice';
import {H1} from '@Typography';
import {Screen, Switch} from '@ui';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StatusBar, View} from 'react-native';
import {styles} from './styles';

export const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = useRef(new Animated.Value(darkTheme ? 0 : 1)).current;

  const [theme, setTheme] = useState(darkTheme ? 0 : 1);
  const [language, setLanguage] = useState(1);

  const textColor = theme === 0 ? colors.white : colors.darkBlue;

  useEffect(() => {
    Animated.spring(color, {
      toValue: theme,
      useNativeDriver: false,
    }).start();
  }, [theme]);

  const darkThemeHandler = async (index: number) => {
    const isDark = index === 0 ? true : false;
    setTheme(index);
    dispatch(setDarkTheme(isDark));
    isDark
      ? await AsyncStorage.setItem('darkTheme', isDark.toString())
      : await AsyncStorage.removeItem('darkTheme');
    StatusBar.setBackgroundColor(isDark ? colors.dark : colors.white);
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
  };

  return (
    <Animated.ScrollView
      style={{
        ...styles.container,
        backgroundColor: color.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.dark, colors.white],
        }),
      }}>
      <View style={styles.main}>
        <H1 fontWeight="bold" style={{...styles.mainTitle, color: textColor}}>
          Main settings
        </H1>

        <Switch
          value={theme}
          title="Theme"
          titleColor={textColor}
          onPress={darkThemeHandler}
          leftText="Light"
          rightText="Dark"
          leftColor={colors.yellow}
          rightColor={colors.blue}
        />

        <Switch
          value={language}
          title="Language"
          titleColor={textColor}
          onPress={setLanguage}
          leftText="Eng"
          rightText="Rus"
          leftColor={colors.green}
          rightColor={colors.red}
        />
      </View>
    </Animated.ScrollView>
  );
};
