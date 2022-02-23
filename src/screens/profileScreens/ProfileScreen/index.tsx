import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ProfileHeader, ProfileItem, ProfileStatistics} from '@components';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {H2} from '@Typography';
import {useGetUserInfoMutation} from '@api';
import {useAppDispatch, useAppSelector} from '@hooks';
import {editUserProfile} from '@store/slices/userSlice';
import {ErrorModal, Loading} from '@ui';

export const ProfileScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const {id, token} = useAppSelector(state => state.user);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.black;
  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  const dispatch = useAppDispatch();

  const [getUserInfo, {isLoading}] = useGetUserInfoMutation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      setError(null);
      const response: any = await getUserInfo({id, token});

      const {name, email, image} = await response.data.user;

      await dispatch(
        editUserProfile({
          email,
          name,
          image,
        }),
      );
    } catch (e: any) {
      setError('Something went wrong. Please try again');
    }
  };

  const profileEditHandler = () =>
    navigation.navigate(Screens.profileEditScreen);
  const backgroundHandler = () => navigation.navigate(Screens.backgroundScreen);
  const reportHandler = () => navigation.navigate(Screens.reportScreen);

  return (
    <>
      {isLoading && <Loading isActive={isLoading} style={{zIndex: 100}} />}
      {error && <ErrorModal message={error} onPress={getInfo} />}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ProfileHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{...styles.profileBody, backgroundColor}}>
          <H2 fontWeight="bold" style={{...styles.title, color}}>
            Statistics
          </H2>
          <ProfileStatistics />
          <H2 fontWeight="bold" style={{...styles.title, color}}>
            More options
          </H2>
          <ProfileItem
            onPress={profileEditHandler}
            title="Edit profile"
            description="Change name, email or avatar"
            icon="person-outline"
            color={colors.blue}
          />
          <ProfileItem
            onPress={backgroundHandler}
            title="Background"
            description="Set background of your profile"
            icon="image-outline"
            color={colors.blue}
          />
          <ProfileItem
            onPress={reportHandler}
            title="Send report"
            description="Report a bug or suggest a change"
            icon="build-outline"
            color={colors.blue}
            showLine={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
