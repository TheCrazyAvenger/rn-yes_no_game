import React from 'react';
import {View} from 'react-native';

import {ProfileStatisticsItem} from '../ProfileStatisticsItem';
import {colors} from '@constants';
import {styles} from './styles';

export const ProfileStatistics: React.FC = () => {
  return (
    <View style={styles.container}>
      <ProfileStatisticsItem
        title="Stories rated"
        value={0}
        icon="analytics-outline"
        color={colors.red}
      />
      <View style={styles.line} />
      <ProfileStatisticsItem
        title="Stories submitted"
        value={0}
        icon="help-outline"
        color={colors.yellow}
      />
      <View style={styles.line} />
      <ProfileStatisticsItem
        title="Stories added"
        value={0}
        icon="add"
        color={colors.green}
      />
    </View>
  );
};
