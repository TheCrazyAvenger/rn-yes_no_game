import React, {useEffect, useMemo, useRef, useState} from 'react';
import {styles} from './styles';
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  StatusBar,
  View,
} from 'react-native';
import {getNextIndex, shuffle} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {colors, Screens} from '@constants';
import {H1, H3} from '@Typography';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Countdown} from 'react-native-element-timer';

export const AliasGame: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useAppDispatch();
  const {darkTheme} = useAppSelector(state => state.user);
  const {currentWord, words: data} = useAppSelector(state => state.alias);

  const {time} = route.params;

  const [index, setIndex] = useState(currentWord);

  const countdownRef: any = useRef(null);
  useEffect(() => {
    countdownRef.current.start();
  }, []);

  const [answered, setAnswered] = useState<any[]>([]);
  const [skipped, setSkipped] = useState<any[]>([]);
  const [wordsList, setWordsList] = useState<any[]>([]);
  const [timer, setTimer] = useState(false);

  const handleAnswer = (word: string) => {
    setAnswered(prev => [...prev, {word, answered: true}]);
    setWordsList(prev => [...prev, {word, answered: true}]);
  };
  const handleSkip = (word: string) => {
    setSkipped(prev => [...prev, {word, answered: false}]);
    setWordsList(prev => [...prev, {word, answered: false}]);
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const screenScale = useRef(new Animated.Value(1)).current;

  const backgroundColor = index % 2 === 0 ? colors.aliasBlack : colors.aliasRed;
  const color = index % 2 === 0 ? colors.white : colors.aliasBlack;

  useEffect(() => {
    if (timer) {
      navigation.replace(Screens.aliasResults, {
        words: [...wordsList, {word: data[index], answered: null}],
        currentWord: index + 1,
        time,
      });
    }
  }, [timer]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
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

      if (Math.abs(positionY) > 20) {
        Animated.timing(pan, {
          toValue: {x: 0, y: positionY > 20 ? 1000 : -1000},
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({x: 0, y: 0});
          scale.setValue(0);

          positionY < 50 ? handleAnswer(data[index]) : handleSkip(data[index]);
          setIndex(prev => getNextIndex(data, prev));
          Animated.timing(scale, {
            toValue: 1,
            duration: 50,
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

  return (
    <>
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            ...styles.container,
            transform: [{scale: screenScale}],
          }}>
          <StatusBar
            backgroundColor={darkTheme ? colors.dark : colors.white}
            barStyle={darkTheme ? 'light-content' : 'dark-content'}
          />

          <ImageBackground
            style={{...styles.answereZone, top: 0}}
            source={require('@assets/images/aliasbg/greenbg.png')}>
            <Countdown
              ref={countdownRef}
              style={styles.timer}
              textStyle={styles.timerText}
              initialSeconds={3}
              onEnd={() => setTimer(true)}
            />
            <H1 fontWeight="bold" style={styles.answerText}>
              Answered
            </H1>
            <View style={styles.answerCircle}>
              <H3>{answered.length}</H3>
            </View>
          </ImageBackground>
          <ImageBackground
            style={{...styles.answereZone, bottom: 0}}
            source={require('@assets/images/aliasbg/redbg.png')}>
            <View style={styles.answerCircle}>
              <H3>{skipped.length}</H3>
            </View>
            <H1 fontWeight="bold" style={styles.answerText}>
              Skipped
            </H1>
          </ImageBackground>

          <View
            style={{
              ...styles.card,
              ...styles.secondCard,
              backgroundColor,
              transform: [{rotateZ: '1deg'}],
            }}>
            <Image
              style={styles.image}
              source={require('@assets/images/alias-logo.jpg')}
            />
          </View>
          <View
            style={{
              ...styles.card,
              ...styles.secondCard,
              backgroundColor,
              transform: [{rotateZ: '6deg'}],
            }}>
            <Image
              style={styles.image}
              source={require('@assets/images/alias-logo.jpg')}
            />
          </View>
          <View
            style={{
              ...styles.card,
              ...styles.secondCard,
              backgroundColor,
              transform: [{rotateZ: '11deg'}],
            }}>
            <Image
              style={styles.image}
              source={require('@assets/images/alias-logo.jpg')}
            />
          </View>
          <View
            style={{
              ...styles.card,
              ...styles.secondCard,
              backgroundColor,
              transform: [{rotateZ: '15deg'}],
            }}>
            <Image
              style={styles.image}
              source={require('@assets/images/alias-logo.jpg')}
            />
          </View>

          <Animated.View
            style={{transform: [{translateY: pan.y}, {scale}]}}
            {...panResponder.panHandlers}>
            <View style={{...styles.card, backgroundColor}}>
              <H1 style={{color}}>{data[index]}</H1>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </>
  );
};
