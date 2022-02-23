import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {StoryInfoProps} from '@components';
import {colors} from '@constants';
import {H3} from '@Typography';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {t} from 'i18next';

export const StoryInfo: React.FC<StoryInfoProps> = ({
  rating,
  difficulty,
  time,
  date,
}) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.black;
  // const dateTime = new Date(date).toLocaleString();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoItem}>
          <Icon name="time-outline" size={25} color={colors.red} />
          <H3 style={{...styles.text, color}}>
            {time}
            {t('common:min')}
          </H3>
        </View>
        <View style={styles.infoItem}>
          <Icon name="swap-vertical-outline" size={25} color={colors.yellow} />
          <H3 style={{...styles.text, color}}>{difficulty}/10</H3>
        </View>
        <View style={styles.infoItem}>
          <Icon name="thumbs-up-outline" size={25} color={colors.green} />
          <H3 style={{...styles.text, color}}>{rating}%</H3>
        </View>
        {/* <View style={styles.infoItem}>
          <Icon name="calendar-outline" size={25} color={colors.darkBlue} />
          <H3 style={styles.text}>{dateTime}</H3>
        </View> */}
      </View>
      <View style={styles.line} />
    </>
  );
};
