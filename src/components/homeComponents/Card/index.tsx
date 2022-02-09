import {CardProps} from '@components';
import {colors} from '@constants';
import {H1, H2, H3} from '@Typography';
import React, {useMemo, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ImageBackground,
  useWindowDimensions,
  View,
  Animated,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '@hooks';
import {toggleReview, toggleYesNo} from '@store/slices/actionsSlice';
import {StoryInfo} from '../StoryInfo';
import {Button, CloseButton} from '@ui';
import LinearGradient from 'react-native-linear-gradient';

export const Card: React.FC<CardProps> = ({canOpen = false, data}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const {title, story, answer, image, rating, difficulty, time} = data;
  const {width: cardWidth, height: cardHeight} = useWindowDimensions();

  const actionYesNo = useAppSelector(state => state.actions.actionYesNo);
  const dispatch = useAppDispatch();

  const Content = useMemo(
    () => (actionYesNo ? ScrollView : View),
    [actionYesNo],
  );

  const width = useRef(new Animated.Value(cardWidth - 60)).current;
  const height = useRef(new Animated.Value(cardHeight / 1.3)).current;
  const closeButtomTop = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const imageHeight = useRef(new Animated.Value(250)).current;
  const reviewHeight = useRef(new Animated.Value(0)).current;

  const showHideAnswer = () => {
    setShowAnswer(prev => !prev);

    Animated.timing(opacity, {
      toValue: showAnswer ? 0 : 1,
      duration: 400,
      useNativeDriver: false,
    }).start();

    Animated.spring(reviewHeight, {
      toValue: 40,
      useNativeDriver: false,
    }).start();
  };

  const openCard = () => {
    if (canOpen) {
      dispatch(toggleYesNo(true));
      Animated.spring(imageHeight, {
        toValue: 120,
        useNativeDriver: false,
      }).start();
      Animated.spring(width, {
        toValue: cardWidth,
        useNativeDriver: false,
      }).start();
      Animated.spring(height, {
        toValue: cardHeight,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setShowAnswer(false));
      Animated.spring(closeButtomTop, {
        toValue: 63,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeCard = () => {
    dispatch(toggleYesNo(false));
    setShowAnswer(false);
    reviewHeight.setValue(0);

    Animated.spring(imageHeight, {
      toValue: 250,
      useNativeDriver: false,
    }).start();
    Animated.spring(width, {
      toValue: cardWidth - 60,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: cardHeight / 1.3,
      useNativeDriver: false,
    }).start();
    Animated.spring(closeButtomTop, {
      toValue: -100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <Animated.View style={[styles.container, {width: width, height: height}]}>
        <Animated.View style={{height: imageHeight}}>
          <ImageBackground style={styles.image} source={{uri: image}}>
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
          <StoryInfo time={time} rating={rating} difficulty={difficulty} />
          <H2 fontWeight="600" style={styles.title}>
            Story
          </H2>

          <H3 style={styles.story}>{story}</H3>

          <Animated.View
            style={[styles.reviewContainer, {height: reviewHeight}]}>
            <H2 fontWeight="600" style={styles.title}>
              Enjoy the story?
            </H2>

            <Button
              title="Review"
              onPress={() => {
                dispatch(toggleReview(true));
              }}
              style={styles.reviewButton}
            />
          </Animated.View>
          {actionYesNo && (
            <>
              <View style={styles.answerContainer}>
                <H2 fontWeight="600" style={styles.title}>
                  Answer
                </H2>
                <Button
                  title={`${showAnswer ? 'Hide' : 'Show'} answer`}
                  onPress={showHideAnswer}
                  style={{
                    ...styles.button,
                    backgroundColor: showAnswer ? colors.red : colors.green,
                  }}
                />
              </View>
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
              </View>
            </>
          )}
          {!actionYesNo && (
            <LinearGradient
              colors={[
                'rgba(255,255,255, 0)',
                'rgba(255,255,255, 0.1)',
                'rgba(255,255,255, 0.2)',
                'rgba(255,255,255, 0.9)',
                'rgba(255,255,255, 1)',
              ]}
              style={styles.gradient}
            />
          )}
        </Content>
        <CloseButton style={{top: closeButtomTop}} onPress={closeCard} />
      </Animated.View>
      <Button
        title="Show story"
        onPress={openCard}
        disabled={actionYesNo || !canOpen}
        style={styles.openButton}
      />
    </View>
  );
};
