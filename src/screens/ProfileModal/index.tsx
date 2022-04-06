import {ProfileModalItem} from '@components';
import {bg, colors, Screens} from '@constants';
import {IMAGES_URL} from '@env';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {logout} from '@store/asyncFuncs';
import {toggleOpenMenu} from '@store/slices/actionsSlice';
import {setDarkTheme} from '@store/slices/userSlice';
import {H1, H3} from '@Typography';
import {CloseButton} from '@ui';
import {t} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, ImageBackground, View} from 'react-native';

import {Switch} from 'react-native-paper';
import {styles} from './styles';

export const ProfileModal: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const {
    darkTheme,
    bg: background,
    image,
    name,
    email,
  } = useAppSelector(state => state.user);

  const [report, setReport] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [editBackground, setEditBackground] = useState(false);

  const bgColor = useRef(new Animated.Value(0)).current;

  const handleClose = () => {
    if (report || editProfile || editBackground) {
      setReport(false);
      setEditProfile(false);
      setEditBackground(false);
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (darkTheme) {
      Animated.timing(bgColor, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bgColor, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [darkTheme]);

  const color = darkTheme ? colors.white : colors.dark;

  const profileEditHandler = () =>
    navigation.navigate(Screens.profileEditScreen);
  const backgroundHandler = () => navigation.navigate(Screens.backgroundScreen);
  const reportHandler = () => navigation.navigate(Screens.reportScreen);

  const handleLogout = () => {
    dispatch(toggleOpenMenu(false));
    dispatch(logout());
  };

  const darkThemeHandler = async () => {
    const isDark = darkTheme ? false : true;

    dispatch(setDarkTheme(!darkTheme));
    isDark
      ? await AsyncStorage.setItem('darkTheme', isDark.toString())
      : await AsyncStorage.removeItem('darkTheme');
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        backgroundColor: bgColor.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.white, colors.black],
        }),
      }}>
      <ImageBackground
        borderBottomLeftRadius={80}
        borderBottomRightRadius={80}
        style={styles.header}
        source={bg[background]}>
        <H1 fontWeight="bold" style={styles.headerName}>
          {name}
        </H1>
        <H3 style={styles.headerEmail}>{email}</H3>
        <Image style={styles.avatar} source={{uri: `${IMAGES_URL}${image}`}} />
      </ImageBackground>
      <View style={styles.content}>
        <ProfileModalItem
          onPress={profileEditHandler}
          color={colors.blue}
          icon="pencil"
          title={t('profile:editTitle')}
        />
        <ProfileModalItem
          onPress={backgroundHandler}
          color={colors.yellow}
          icon="flower-outline"
          title={t('profile:bgTitle')}
        />
        <ProfileModalItem
          onPress={reportHandler}
          color={darkTheme ? colors.lightgray : colors.darkBlue}
          icon="build-outline"
          title={t('profile:reportTitle')}
        />
        <View style={styles.row}>
          <Switch
            color={colors.green}
            //@ts-ignore
            value={darkTheme}
            onChange={darkThemeHandler}
          />
          <H3 style={{color}} fontWeight="600">
            {t('profile:darkTheme')}
          </H3>
        </View>
        <View style={{...styles.line, backgroundColor: color}} />
        <ProfileModalItem
          onPress={handleLogout}
          color={colors.red}
          icon="log-out-outline"
          title={t('profile:logout')}
          showLine={false}
        />
      </View>

      <CloseButton
        style={styles.closeButton}
        buttonColor={colors.blue}
        onPress={handleClose}
      />
    </Animated.View>
  );
};
