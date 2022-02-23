import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {H3} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';

type ProfileStatisticsProps = {
  title: string;
  value: number;
  icon: string;
  color: string;
};

export const ProfileStatisticsItem: React.FC<ProfileStatisticsProps> = ({
  title,
  value,
  icon,
  color,
}) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const textColor = darkTheme ? colors.white : colors.black;

  return (
    <>
      <View style={styles.statisticsItem}>
        <View style={styles.row}>
          <Icon name={icon} size={25} color={color} />
          <H3
            style={{...styles.statisticsText, color: textColor}}
            fontWeight="600">
            {title}
          </H3>
        </View>
        <H3 fontWeight="600" style={{color}}>
          {value}
        </H3>
      </View>
    </>
  );
};
