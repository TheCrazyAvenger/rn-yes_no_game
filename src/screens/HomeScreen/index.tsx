import React, {useEffect, useRef, useState} from 'react';
import {Card} from '@components';
import {Loading, Screen} from '@ui';
import {styles} from './styles';
import {
  Animated,
  BackHandler,
  PanResponder,
  StatusBar,
  View,
} from 'react-native';
import {getNextIndex, shuffle} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useGetStoriesQuery} from '@api';
import {addStories} from '@store/slices/userSlice';
import {colors, Screens} from '@constants';
import {toggleYesNo, toggleYesnoGoBack} from '@store/slices/actionsSlice';
import {H3} from '@Typography';
import {t} from 'i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const {stories, darkTheme, id: uid} = useAppSelector(state => state.user);
  const {actionYesNo, yesnoGoBack} = useAppSelector(state => state.actions);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!actionYesNo && yesnoGoBack) {
          handleGoBack();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [actionYesNo]),
  );

  const backgroundColor = !darkTheme ? colors.white : colors.dark;
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

  const handleOpenHelp = () => navigation.navigate(Screens.yesnoRules);

  if (!data || isLoading || error || !stories) {
    return <Loading isActive={true} />;
  }

  return (
    <Screen style={{...styles.container, backgroundColor}}>
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
    </Screen>
  );
};
