import {TeamItem} from '@components';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {H4} from '@Typography';
import {t} from 'i18next';

import React, {useEffect, useRef} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

type AliasTeamsProps = {
  teams: number;
  addTeam: (...args: any) => any;
  removeTeam: (...args: any) => any;
};

export const AliasTeams: React.FC<AliasTeamsProps> = ({
  teams,
  addTeam,
  removeTeam,
}) => {
  const height = useRef(new Animated.Value(20)).current;

  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const color = darkTheme ? colors.aliasBlack : colors.white;

  useEffect(() => {
    if (teams > 5) {
      Animated.timing(height, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 20,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [teams]);

  return (
    <View style={styles.container}>
      {[...Array(teams).keys()].map(item => {
        const showRemove = item + 1 === teams && teams > 2 ? true : false;

        return (
          <TeamItem
            key={item}
            showRemove={showRemove}
            removeHandler={removeTeam}
            team={item + 1}
          />
        );
      })}
      <Animated.View style={{height}}>
        <TouchableOpacity onPress={addTeam} style={styles.row}>
          <Icon name="add-circle-outline" size={20} color={color} />
          <H4 style={{marginLeft: 5, color}}>{t('alias:addTeam')}</H4>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};
