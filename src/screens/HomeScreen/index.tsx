import React, {useEffect, useRef, useState} from 'react';
import {Card, ReviewModal} from '@components';
import {Loading, Screen} from '@ui';
import {styles} from './styles';
import {Animated, PanResponder} from 'react-native';
import {getNextIndex} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useGetStoriesQuery} from '@api';
import {getUser} from '@store/asyncFuncs';

export const HomeScreen: React.FC = () => {
  const actionYesNo = useAppSelector(state => state.actions.actionYesNo);
  const {data, error, isLoading} = useGetStoriesQuery({});

  const [index, setIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translateY = useRef(new Animated.Value(44)).current;
  const thirdScale = useRef(new Animated.Value(0.8)).current;
  const thirdTranslateY = useRef(new Animated.Value(50)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      if (gestureState.dx === 0 && gestureState.dy === 0) {
        return false;
      } else {
        if (actionYesNo) {
          return false;
        } else {
          return true;
        }
      }
    },
    onPanResponderGrant: () => {
      Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
      Animated.spring(translateY, {toValue: 0, useNativeDriver: false}).start();

      Animated.spring(thirdScale, {
        toValue: 0.9,
        useNativeDriver: false,
      }).start();
      Animated.spring(thirdTranslateY, {
        toValue: 44,
        useNativeDriver: false,
      }).start();
    },
    onPanResponderMove: Animated.event([null, {dy: pan.y}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      //@ts-ignore
      const positionY = pan.y.__getValue();

      if (Math.abs(positionY) > 100) {
        Animated.timing(pan, {
          toValue: {x: 0, y: positionY > 100 ? 1000 : -1000},
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({x: 0, y: 0});
          scale.setValue(0.9);
          translateY.setValue(44);
          thirdTranslateY.setValue(-50);
          thirdScale.setValue(0.8);
          setIndex(prev => getNextIndex(data.stories, prev));
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
        Animated.spring(thirdScale, {
          toValue: 0.8,
          useNativeDriver: false,
        }).start();
        Animated.spring(thirdTranslateY, {
          toValue: -50,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  if (!data || isLoading || error) {
    return <Loading isActive={true} />;
  }

  return (
    <>
      <ReviewModal
        image={data.stories[index].image}
        title={data.stories[index].title}
        id={data.stories[index].id}
      />

      <Screen style={styles.container}>
        <Animated.View
          style={[
            styles.secondCard,
            {transform: [{scale: thirdScale}, {translateY: thirdTranslateY}]},
          ]}>
          <Card data={data.stories[getNextIndex(data.stories, index + 1)]} />
        </Animated.View>

        <Animated.View
          style={[styles.secondCard, {transform: [{scale}, {translateY}]}]}>
          <Card data={data.stories[getNextIndex(data.stories, index)]} />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <Card canOpen={true} data={data.stories[index]} />
        </Animated.View>
      </Screen>
    </>
  );
};
