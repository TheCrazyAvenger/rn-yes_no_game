import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {ProfileHeader, ProfileItem, ProfileStatistics} from '@components';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {H2} from '@Typography';

export const ProfileScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const profileEditHandler = () =>
    navigation.navigate(Screens.profileEditScreen);
  const backgroundHandler = () => navigation.navigate(Screens.backgroundScreen);
  const reportHandler = () => navigation.navigate(Screens.reportScreen);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ProfileHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.profileBody}>
        <H2 fontWeight="bold" style={styles.title}>
          Statistics
        </H2>
        <ProfileStatistics />
        <H2 fontWeight="bold" style={{...styles.title, marginTop: 10}}>
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
  );
};
