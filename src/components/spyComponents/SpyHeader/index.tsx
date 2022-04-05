import React from 'react';
import {View, ViewStyle} from 'react-native';
import {t} from 'i18next';

import {H1, H3} from '@Typography';
import {colors} from '@constants';
import {styles} from './styles';

type SpyHeaderProps = {
  title: string;
  subtitle: string;
  style?: ViewStyle;
};

export const SpyHeader: React.FC<SpyHeaderProps> = ({
  title,
  subtitle,
  style,
}) => {
  return (
    <View style={{...styles.header, ...style}}>
      <H1 fontWeight="600" style={{...styles.title}}>
        {title}
      </H1>
      <H3 style={{textAlign: 'center', color: colors.spyRed}}>{subtitle}</H3>
    </View>
  );
};
