import React, {useEffect, useRef, useState} from 'react';
import {Card} from '@components';
import {Loading, Screen} from '@ui';
import {styles} from './styles';
import {Animated, PanResponder} from 'react-native';
import {getNextIndex} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useGetStoriesQuery} from '@api';
import {addStories} from '@store/slices/userSlice';

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const uid = useAppSelector(state => state.user.id);
  const actionYesNo = useAppSelector(state => state.actions.actionYesNo);
  const stories = useAppSelector(state => state.user.stories);
  const {data, error, isLoading} = useGetStoriesQuery({uid});

  useEffect(() => {
    data && dispatch(addStories(data.stories));
  }, [data]);

  const [index, setIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.8)).current;

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
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
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
          scale.setValue(0.8);

          setIndex(prev => getNextIndex(data.stories, prev));
        });
      } else {
        Animated.timing(pan, {
          toValue: {x: 0, y: 0},
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(scale, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  if (!data || isLoading || error || !stories) {
    return <Loading isActive={true} />;
  }

  return (
    <>
      <Screen style={styles.container}>
        <Animated.View style={[styles.secondCard, {transform: [{scale}]}]}>
          <Card data={data.stories[getNextIndex(stories, index)]} />
        </Animated.View>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <Card canOpen={true} data={stories[index]} />
        </Animated.View>
      </Screen>
    </>
  );
};
