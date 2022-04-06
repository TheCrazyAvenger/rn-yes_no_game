import {ProfileItemHeader} from '@components';
import {bg, colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {setBg} from '@store/slices/userSlice';
import {Screen} from '@ui';
import {t} from 'i18next';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const BackgroundScreen: React.FC = () => {
  const background = useAppSelector(state => state.user.bg);
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  const setBgHandler = async (index: number) => {
    await dispatch(setBg(index));
    await AsyncStorage.setItem('bg', index.toString());
  };

  return (
    <Screen>
      <View style={{marginHorizontal: 10}}>
        <ProfileItemHeader
          showCloseButton={false}
          title={t('profile:bgItemTitle')}
          description={t('profile:bgSub')}
          titleColor={colors.blue}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{...styles.container, backgroundColor}}>
        {Object.values(bg).map((item: any, i) => (
          <TouchableOpacity
            onPress={() => setBgHandler(i + 1)}
            activeOpacity={0.7}
            key={i}
            style={styles.bgItem}>
            <ImageBackground style={styles.bg} source={item}>
              {i + 1 === background && (
                <View style={styles.checkmarkContainer}>
                  <View style={styles.checkmark}>
                    <Icon
                      name="color-palette-outline"
                      color={colors.white}
                      size={30}
                    />
                  </View>
                </View>
              )}
            </ImageBackground>
          </TouchableOpacity>
        ))}
        <View style={{marginBottom: 20}} />
      </ScrollView>
    </Screen>
  );
};
