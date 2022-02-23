import React from 'react';
import {View} from 'react-native';

import {ProfileStatisticsItem} from '../ProfileStatisticsItem';
import {colors} from '@constants';
import {styles} from './styles';
import {t} from 'i18next';

export const ProfileStatistics: React.FC = () => {
  return (
    <View style={styles.container}>
      <ProfileStatisticsItem
        title={t('profile:stRate')}
        value={0}
        icon="analytics-outline"
        color={colors.red}
      />
      <ProfileStatisticsItem
        title={t('profile:stSubmit')}
        value={0}
        icon="help-outline"
        color={colors.yellow}
      />
      <ProfileStatisticsItem
        title={t('profile:stAdd')}
        value={0}
        icon="add"
        color={colors.green}
      />
    </View>
  );
};
