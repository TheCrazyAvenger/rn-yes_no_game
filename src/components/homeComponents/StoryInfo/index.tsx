import {StoryInfoProps} from '@components';
import {colors} from '@constants';
import {H3} from '@Typography';
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const StoryInfo: React.FC<StoryInfoProps> = ({
  rating,
  difficulty,
  time,
}) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoItem}>
          <Icon name="time-outline" size={25} color={colors.red} />
          <H3 fontWeight="600" style={styles.text}>
            {time}min.
          </H3>
        </View>
        <View style={styles.infoItem}>
          <Icon name="swap-vertical-outline" size={25} color={colors.yellow} />
          <H3 fontWeight="600" style={styles.text}>
            {difficulty}/10
          </H3>
        </View>
        <View style={styles.infoItem}>
          <Icon name="thumbs-up-outline" size={25} color={colors.green} />
          <H3 fontWeight="600" style={styles.text}>
            {rating}%
          </H3>
        </View>
      </View>
      <View style={styles.line} />
    </>
  );
};
