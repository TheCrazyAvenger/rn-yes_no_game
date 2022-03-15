import {ProfileModalItem} from '@components';
import {bg, colors, Screens} from '@constants';
import {IMAGES_URL} from '@env';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {logout} from '@store/asyncFuncs';
import {toggleOpenMenu} from '@store/slices/actionsSlice';
import {setDarkTheme} from '@store/slices/userSlice';
import {H1, H3} from '@Typography';
import {CloseButton} from '@ui';
import {t} from 'i18next';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import {Slider} from 'react-native-elements';
import {Switch} from 'react-native-paper';
import {BackgroundScreen} from '../profileScreens/BackgroundScreen';
import {ProfileEditScreen} from '../profileScreens/ProfileEditScreen';
import {ReportScreen} from '../profileScreens/ReportScreen';
import {styles} from './styles';

type AliasHelpProps = {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
};

export const ProfileModal: React.FC<AliasHelpProps> = ({
  isVisible,
  setIsVisible,
}) => {
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

  const {height} = useWindowDimensions();
  const statusBarHeight = StatusBar.currentHeight!;

  const top = useRef(new Animated.Value(height + statusBarHeight)).current;
  const bgColor = useRef(new Animated.Value(0)).current;

  const handleClose = () => {
    if (report || editProfile || editBackground) {
      setReport(false);
      setEditProfile(false);
      setEditBackground(false);
    } else {
      setIsVisible(false);
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

  useEffect(() => {
    if (isVisible) {
      Animated.spring(top, {toValue: 65, useNativeDriver: false}).start();
    } else {
      Animated.spring(top, {
        toValue: height + statusBarHeight,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible]);

  const profileEditHandler = () => setEditProfile(true);
  const backgroundHandler = () => setEditBackground(true);
  const reportHandler = () => setReport(true);

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
        top,
      }}>
      {report ? (
        <ReportScreen closeWindow={handleClose} />
      ) : editProfile ? (
        <ProfileEditScreen closeWindow={handleClose} />
      ) : editBackground ? (
        <BackgroundScreen closeWindow={handleClose} />
      ) : (
        <>
          <ImageBackground
            borderBottomLeftRadius={80}
            borderBottomRightRadius={80}
            style={styles.header}
            source={bg[background]}>
            <H1 fontWeight="bold" style={styles.headerName}>
              {name}
            </H1>
            <H3 style={styles.headerEmail}>{email}</H3>
            <Image
              style={styles.avatar}
              source={{uri: `${IMAGES_URL}${image}`}}
            />
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
            <View style={styles.line} />
            <ProfileModalItem
              onPress={handleLogout}
              color={colors.red}
              icon="log-out-outline"
              title={t('profile:logout')}
              showLine={false}
            />
          </View>
        </>
      )}
      <CloseButton
        style={styles.closeButton}
        buttonColor={colors.blue}
        onPress={handleClose}
      />
    </Animated.View>
  );
};
