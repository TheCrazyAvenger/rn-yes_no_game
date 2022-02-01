import React, {useRef, useState} from 'react';
import {Card} from '@components';
import {Screen} from '@ui';
import {styles} from './styles';
import {Animated, PanResponder} from 'react-native';

export const HomeScreen: React.FC = () => {
  const [index, setIndex] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      Animated.timing(opacity, {toValue: 0.5, useNativeDriver: false}).start();
      Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
      Animated.spring(translateY, {toValue: 0, useNativeDriver: false}).start();
    },
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: () => {
      //@ts-ignore
      const positionY = pan.y.__getValue();

      Animated.timing(opacity, {toValue: 0, useNativeDriver: false}).start();

      if (Math.abs(positionY) > 150) {
        Animated.timing(pan, {
          toValue: {x: 0, y: 1000},
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({x: 0, y: 0});
          Animated.spring(translateY, {
            toValue: 44,
            useNativeDriver: false,
          }).start();
          Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: false,
          }).start();
        });
      } else {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
        Animated.spring(scale, {
          toValue: 0.9,
          useNativeDriver: false,
        }).start();
        Animated.spring(translateY, {
          toValue: 44,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Screen style={styles.container}>
      <Animated.View style={[styles.mask, {opacity}]} />
      <Animated.View
        style={[styles.secondCard, {transform: [{scale}, {translateY}]}]}>
        <Card />
      </Animated.View>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
        }}
        {...panResponder.panHandlers}>
        <Card />
      </Animated.View>
    </Screen>
  );
};
