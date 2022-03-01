import React, {useEffect, useRef, useState} from 'react';
import {Card} from '@components';
import {Loading, Screen} from '@ui';
import {styles} from './styles';
import {Animated, PanResponder, StatusBar, View} from 'react-native';
import {getNextIndex, shuffle} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useGetStoriesQuery} from '@api';
import {addStories} from '@store/slices/userSlice';
import {colors} from '@constants';
import {
  toggleYesNo,
  toggleYesnoGoBack,
  toggleYesnoRules,
} from '@store/slices/actionsSlice';
import {H3} from '@Typography';
import {t} from 'i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {YesNoHelp} from '@screens';

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const actionYesNo = useAppSelector(state => state.actions.actionYesNo);
  const {stories, darkTheme, id: uid} = useAppSelector(state => state.user);
  const openYesNoRules = useAppSelector(state => state.actions.openYesNoRules);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;
  const mainBg = darkTheme ? colors.white : colors.dark;
  const color = darkTheme ? colors.white : colors.black;

  const {data, error, isLoading} = useGetStoriesQuery({uid});

  useEffect(() => {
    data && dispatch(addStories(shuffle(data.stories)));
    data &&
      Animated.spring(scale, {toValue: 1, useNativeDriver: false}).start();
  }, [data]);

  useEffect(() => {
    Animated.spring(top, {toValue: 0, useNativeDriver: false}).start();
  }, []);

  const [index, setIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0)).current;
  const screenScale = useRef(new Animated.Value(1)).current;
  const top = useRef(new Animated.Value(-100)).current;

  const handleGoBack = () => {
    Animated.spring(top, {toValue: -100, useNativeDriver: false}).start();
    Animated.spring(scale, {toValue: 0, useNativeDriver: false}).start(() => {
      dispatch(toggleYesNo(false));
      dispatch(toggleYesnoGoBack(false));
    });
  };

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
          scale.setValue(0);

          setIndex(prev => getNextIndex(data.stories, prev));
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        });
      } else {
        Animated.timing(pan, {
          toValue: {x: 0, y: 0},
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleOpenHelp = () => dispatch(toggleYesnoRules(true));
  const handleCloseHelp = () => dispatch(toggleYesnoRules(false));

  useEffect(() => {
    if (openYesNoRules) {
      Animated.spring(screenScale, {
        toValue: 0.9,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(screenScale, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [openYesNoRules]);

  if (!data || isLoading || error || !stories) {
    return <Loading isActive={true} />;
  }

  return (
    <View style={{backgroundColor: mainBg, flex: 1}}>
      <Animated.View
        style={{
          ...styles.container,
          transform: [{scale: screenScale}],
          backgroundColor,
          borderTopStartRadius: openYesNoRules ? 14 : 0,
          borderTopEndRadius: openYesNoRules ? 14 : 0,
        }}>
        <StatusBar
          backgroundColor={darkTheme ? colors.dark : colors.white}
          barStyle={darkTheme ? 'light-content' : 'dark-content'}
        />
        <Animated.View style={{...styles.header, backgroundColor, top}}>
          <H3 style={{color}} fontWeight="600">
            {`${t('home:titleFirst')} ${stories ? stories.length : 0} ${t(
              'home:titleSecond',
            )}`}
          </H3>

          <View style={styles.buttons}>
            <Ionicons
              onPress={handleOpenHelp}
              name="help"
              size={30}
              color={color}
              style={{marginRight: 15}}
            />
            <Ionicons
              onPress={handleGoBack}
              name="home"
              size={30}
              color={color}
            />
          </View>
        </Animated.View>
        <Animated.View
          style={{transform: [{translateY: pan.y}, {scale}]}}
          {...panResponder.panHandlers}>
          <Card data={stories[index]} />
        </Animated.View>
      </Animated.View>

      <YesNoHelp isVisible={openYesNoRules} setIsVisible={handleCloseHelp} />
    </View>
  );
};
