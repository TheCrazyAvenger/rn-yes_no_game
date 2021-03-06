import React, {useMemo, useRef, useState} from 'react';
import {
  ImageBackground,
  useWindowDimensions,
  View,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import * as RNLocalize from 'react-native-localize';

import {CardProps, ReviewModal} from '@components';
import {toggleYesNo} from '@store/slices/actionsSlice';
import {colors, darkGradient, lightGradient} from '@constants';
import {H1, H3} from '@Typography';
import {Button, CloseButton} from '@ui';
import {useAppDispatch, useAppSelector} from '@hooks';
import {StoryInfo} from '../StoryInfo';
import {styles} from './styles';
import {IMAGES_URL} from '@env';
import {t} from 'i18next';
import {getStoryByLanguage} from '@utilities';

export const Card: React.FC<CardProps> = ({data}) => {
  const actionYesNo = useAppSelector(state => state.actions.actionYesNo);
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const color = darkTheme ? colors.white : colors.black;
  const shadowColor = darkTheme ? '#fff' : '#000';
  const gradient = darkTheme ? darkGradient : lightGradient;
  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  const language = RNLocalize.getLocales()[0].languageCode;

  const {title, story, answer} = getStoryByLanguage(data, language);

  const dispatch = useAppDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (actionYesNo) {
          closeCard();
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

  const [showAnswer, setShowAnswer] = useState(false);

  const {image, rating, difficulty, time, date, id, reviewedByUser} = data;
  const {width: cardWidth, height: cardHeight} = useWindowDimensions();

  const Content = useMemo(
    () => (actionYesNo ? ScrollView : View),
    [actionYesNo],
  );

  const Container: any = useMemo(
    () => (actionYesNo ? View : TouchableWithoutFeedback),
    [actionYesNo],
  );

  const width = useRef(new Animated.Value(cardWidth - 60)).current;
  const height = useRef(new Animated.Value(cardHeight / 1.35)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const imageHeight = useRef(new Animated.Value(250)).current;

  const showHideAnswer = () => {
    setShowAnswer(prev => !prev);

    Animated.timing(opacity, {
      toValue: showAnswer ? 0 : 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const openCard = () => {
    dispatch(toggleYesNo(true));
    Animated.spring(imageHeight, {
      toValue: 140,
      useNativeDriver: false,
    }).start();
    Animated.spring(width, {
      toValue: cardWidth,
      // duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: cardHeight,
      // duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setShowAnswer(false));
  };

  const closeCard = () => {
    dispatch(toggleYesNo(false));
    setShowAnswer(false);

    Animated.timing(imageHeight, {
      toValue: 250,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(width, {
      toValue: cardWidth - 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(height, {
      toValue: cardHeight / 1.3,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Container onPress={openCard}>
      <View>
        <Animated.View
          style={[
            styles.container,
            {width: width, height: height, backgroundColor, shadowColor},
          ]}>
          <Animated.View style={{height: imageHeight}}>
            <ImageBackground
              style={styles.image}
              source={{uri: `${IMAGES_URL}${image}`}}>
              <View
                style={{
                  backgroundColor: `rgba(51,51,51,${actionYesNo ? 0.6 : 0})`,
                }}>
                <H1 style={styles.headerTitle} fontWeight="bold">
                  {title}
                </H1>
              </View>
            </ImageBackground>
          </Animated.View>
          <Content
            showsVerticalScrollIndicator={false}
            style={[styles.text, {height: actionYesNo ? 'auto' : 160}]}>
            <StoryInfo
              time={time}
              rating={rating}
              difficulty={difficulty}
              date={date}
            />

            <H3 style={{...styles.story, color}}>{story}</H3>

            {actionYesNo && (
              <>
                <View style={styles.answer}>
                  <Animated.Text style={[styles.answerText, {opacity}]}>
                    {answer}
                  </Animated.Text>
                  <Animated.View
                    style={[
                      styles.answerIcon,
                      {
                        opacity: opacity.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0],
                        }),
                      },
                    ]}>
                    <Icon name="help-outline" color={colors.white} size={80} />
                  </Animated.View>
                  <Button
                    title={`${showAnswer ? t('home:hide') : t('home:show')} ${t(
                      'home:answer',
                    )}`}
                    onPress={showHideAnswer}
                    containerStyle={{marginBottom: 0}}
                    style={{
                      ...styles.button,
                      backgroundColor: showAnswer ? colors.red : colors.green,
                    }}
                  />
                </View>
                <ReviewModal
                  image={image}
                  reviewedByUser={reviewedByUser}
                  id={id}
                />
              </>
            )}
            {!actionYesNo && (
              <LinearGradient colors={gradient} style={styles.gradient} />
            )}
          </Content>
          <CloseButton
            style={{top: actionYesNo ? 85 : -100}}
            onPress={closeCard}
          />
        </Animated.View>
      </View>
    </Container>
  );
};
