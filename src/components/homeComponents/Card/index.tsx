import {CardProps} from '@components';
import {colors} from '@constants';
import {H1, H2, H3} from '@Typography';
import React, {useRef, useState} from 'react';
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
import {toggleYesNo} from '@store/slices/actionsSlice';
import {StoryInfo} from '../StoryInfo';
import {Button, CloseButton} from '@ui';

export const Card: React.FC<CardProps> = ({canOpen = false, data}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const {title, story, answer, image, rating, difficulty, time} = data;

  const {width: cardWidth, height: cardHeight} = useWindowDimensions();

  const actionYesNo = useAppSelector(state => state.actions.actionYesNo);
  const dispatch = useAppDispatch();

  const width = useRef(new Animated.Value(cardWidth - 70)).current;
  const height = useRef(new Animated.Value(cardHeight / 1.5)).current;
  const closeButtomTop = useRef(new Animated.Value(-100)).current;
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
    if (canOpen) {
      dispatch(toggleYesNo(true));
      Animated.spring(imageHeight, {
        toValue: 125,
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
        toValue: 67,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeCard = () => {
    dispatch(toggleYesNo(false));
    setShowAnswer(false);

    Animated.spring(imageHeight, {
      toValue: 250,
      useNativeDriver: false,
    }).start();
    Animated.spring(width, {
      toValue: cardWidth - 70,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: cardHeight / 1.5,
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
          <ImageBackground style={styles.image} source={image}>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.text, {height: actionYesNo ? 'auto' : 160}]}>
          <StoryInfo time={time} rating={rating} difficulty={difficulty} />
          <H2 fontWeight="600" style={styles.title}>
            Story
          </H2>

          <H3 fontWeight="600" style={styles.story}>
            {story}
          </H3>

          {actionYesNo && (
            <>
              <View style={styles.answerContainer}>
                <H2 fontWeight="600" style={styles.title}>
                  Answer
                </H2>
                <Button
                  title={`${showAnswer ? 'Hide' : 'Show'} answer`}
                  onPress={showHideAnswer}
                  style={styles.button}
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
        </ScrollView>
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
