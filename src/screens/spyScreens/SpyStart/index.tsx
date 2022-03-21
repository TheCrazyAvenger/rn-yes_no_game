import React, {useRef, useState} from 'react';
import {BackHandler, FlatList, ScrollView, StatusBar, View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {t} from 'i18next';
import * as RNLocalize from 'react-native-localize';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {styles} from './styles';

export const SpyStart: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  return (
    <>
      <Screen style={{backgroundColor: colors.aliasBlack}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.aliasBlack}
        />
      </Screen>
    </>
  );
};
