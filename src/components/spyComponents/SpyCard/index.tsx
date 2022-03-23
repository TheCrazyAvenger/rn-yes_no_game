import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, useWindowDimensions, View} from 'react-native';

import {H1, H3} from '@Typography';
import {colors} from '@constants';
import {styles} from './styles';
import {t} from 'i18next';

type SpyCardProps = {
  location: string;
  role: string;
  isOpen: boolean;
};

export const SpyCard: React.FC<SpyCardProps> = ({location, role, isOpen}) => {
  const rotateY = useRef(new Animated.Value(0)).current;
  const rotateZ = useRef(new Animated.Value(0)).current;

  const {width} = useWindowDimensions();
  const top = useRef(new Animated.Value(0)).current;
  const left = useRef(new Animated.Value(0)).current;

  const [isCardOpen, setIsCardOpen] = useState(false);
  const isSpy = role === t('spy:spy') ? true : false;
  const textColor = isSpy ? colors.spyRed : colors.white;

  useEffect(() => {
    if (isOpen) {
      Animated.spring(rotateY, {toValue: 1, useNativeDriver: false}).start();
      setTimeout(() => setIsCardOpen(true), 100);
    } else {
      Animated.spring(rotateY, {toValue: 0, useNativeDriver: false}).start();
      setTimeout(() => setIsCardOpen(false), 100);
    }
  }, [isOpen]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        top,
        left,
        transform: [
          {
            rotateZ: rotateZ.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '-5deg'],
            }),
          },
          {
            rotateY: rotateY.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg'],
            }),
          },
        ],
      }}>
      {!isCardOpen ? (
        <Image
          style={styles.image}
          source={require('@assets/images/spy-logo.jpg')}
        />
      ) : (
        <View style={styles.content}>
          <H1 style={{...styles.role, color: textColor}}>{role}</H1>
          <H3 style={{textAlign: 'center', color: colors.white}}>
            {t('spy:location')} {isSpy ? 'Unknown' : location}
          </H3>
          <View style={styles.line} />
          <H3 style={{...styles.tip, color: textColor}}>
            {isSpy ? t('spy:spyGameHint') : t('spy:localHint')}
          </H3>
        </View>
      )}
    </Animated.View>
  );
};
