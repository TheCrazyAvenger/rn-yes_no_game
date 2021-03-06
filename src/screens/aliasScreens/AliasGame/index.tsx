import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import {
  Animated,
  BackHandler,
  Image,
  PanResponder,
  StatusBar,
  useWindowDimensions,
  View,
} from 'react-native';
import {getNextIndex} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {colors, Screens} from '@constants';
import {H1, H3} from '@Typography';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Countdown} from 'react-native-element-timer';
import {AliasModalExit} from '@components';
import {t} from 'i18next';

export const AliasGame: React.FC = () => {
  const {height} = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setExitVisible(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const [exitVisible, setExitVisible] = useState<any>(false);
  const handleCloseExit = () => setExitVisible(false);

  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {darkTheme} = useAppSelector(state => state.user);
  const {
    round,
    game,
    team,
    points,
    fee,
    teams,
    teamIndex,
    lastTeam,
    words: data,
    currentWord,
  } = useAppSelector(state => state.alias);

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
      <AliasModalExit
        points={points}
        team={team}
        fee={fee ? fee : false}
        round={round}
        game={game}
        teams={teams}
        teamIndex={teamIndex}
        lastTeam={lastTeam}
        words={data}
        currentWord={currentWord}
        time={time}
        rightButton={handleCloseExit}
        visible={exitVisible}
      />
      <View style={{flex: 1}}>
        <Animated.View
          style={{
            ...styles.container,
            transform: [{scale: screenScale}],
          }}>
          <StatusBar
            translucent
            backgroundColor={'transparent'}
            barStyle={'light-content'}
          />

          <View
            style={{
              ...styles.answereZone,
              backgroundColor: colors.green,
              height: height / 4,
              top: 0,
              borderBottomStartRadius: 50,
            }}>
            <Countdown
              ref={countdownRef}
              style={styles.timer}
              textStyle={styles.timerText}
              initialSeconds={time}
              onEnd={() => setTimer(true)}
            />
            <H1 fontWeight="bold" style={styles.answerText}>
              {t('alias:answered')}
            </H1>
            <View style={styles.answerCircle}>
              <H3>{answered.length}</H3>
            </View>
          </View>
          <View
            style={{
              ...styles.answereZone,
              backgroundColor: colors.red,
              height: height / 4,
              bottom: 0,
              borderTopEndRadius: 50,
            }}>
            <View style={styles.answerCircle}>
              <H3>{skipped.length}</H3>
            </View>
            <H1 fontWeight="bold" style={styles.answerText}>
              {t('alias:skipped')}
            </H1>
          </View>

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
              <H1 style={{color}}>{data && data[index]}</H1>
            </View>
          </Animated.View>
        </Animated.View>
      </View>
    </>
  );
};
