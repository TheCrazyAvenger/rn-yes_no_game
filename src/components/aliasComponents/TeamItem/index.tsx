import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {H3} from '@Typography';
import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

type TeamItemProps = {
  team: number;
  removeHandler: (...args: any) => any;
  showRemove: boolean;
};

export const TeamItem: React.FC<TeamItemProps> = ({
  team,
  removeHandler,
  showRemove,
}) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.aliasBlack;

  const height = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const moveHandler = () => {
    Animated.spring(opacity, {toValue: 0, useNativeDriver: false}).start();
    Animated.timing(height, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      removeHandler();
    });
  };

  useEffect(() => {
    Animated.timing(height, {
      toValue: 55,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.spring(opacity, {toValue: 1, useNativeDriver: false}).start();
  }, []);

  return (
    <>
      <Animated.View style={{...styles.container, height}}>
        <H3 style={{color}} fontWeight="600">
          Team {team}
        </H3>
        {showRemove && (
          <Animated.View style={{opacity}}>
            <Icon name="close" onPress={moveHandler} size={27} color={color} />
          </Animated.View>
        )}
      </Animated.View>
      {/* <View style={{height: 2, backgroundColor: colors.lightgray}} /> */}
    </>
  );
};
