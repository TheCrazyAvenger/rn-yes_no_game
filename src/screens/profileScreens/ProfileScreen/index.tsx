import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ProfileHeader, ProfileItem} from '@components';
import {useAppDispatch} from '@hooks';
import {colors, Screens} from '@constants';
import {logout} from '@store/asyncFuncs';
import {styles} from './styles';

export const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();

  const profileEditHandler = () =>
    navigation.navigate(Screens.profileEditScreen);
  const reportHandler = () => navigation.navigate(Screens.reportScreen);
  const logoutHandler = () => dispatch(logout());

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ProfileHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.profileBody}>
        <ProfileItem
          onPress={profileEditHandler}
          title="Profile"
          description="Change name or email"
          icon="person-outline"
          color={colors.blue}
        />
        <ProfileItem
          onPress={() => {}}
          title="Personalization"
          description="Change the look of your profile"
          icon="brush-outline"
          color={colors.blue}
        />
        <ProfileItem
          onPress={() => {}}
          title="Achievements"
          description="List of your achievements"
          icon="ribbon-outline"
          color={colors.blue}
        />
        <ProfileItem
          onPress={() => {}}
          title="Statistics"
          description="Detailed account statistics"
          icon="stats-chart-outline"
          color={colors.blue}
        />
        <ProfileItem
          onPress={reportHandler}
          title="Send report"
          description="Report a bug or suggest a change"
          icon="build-outline"
          color={colors.blue}
        />

        <ProfileItem
          onPress={logoutHandler}
          title="Log out"
          icon="log-out-outline"
          color={colors.red}
          showLine={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
