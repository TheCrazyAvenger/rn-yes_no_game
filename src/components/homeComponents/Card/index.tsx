import React, {useMemo, useRef, useState} from 'react';
import {
  ImageBackground,
  useWindowDimensions,
  View,
  Animated,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import {CardProps, ReviewModal} from '@components';
import {toggleYesNo} from '@store/slices/actionsSlice';
import {colors} from '@constants';
import {H1, H3} from '@Typography';
import {Button, CloseButton} from '@ui';
import {useAppDispatch, useAppSelector} from '@hooks';
import {StoryInfo} from '../StoryInfo';
import {styles} from './styles';

export const Card: React.FC<CardProps> = ({canOpen = false, data}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const {
    title,
    story,
    answer,
    image,
    rating,
    difficulty,
    time,
    date,
    id,
    reviewedByUser,
  } = data;
  const {width: cardWidth, height: cardHeight} = useWindowDimensions();

  const actionYesNo = useAppSelector(state => state.actions.actionYesNo);
  const dispatch = useAppDispatch();

  const Content = useMemo(
    () => (actionYesNo ? ScrollView : View),
    [actionYesNo],
  );

  const Container: any = useMemo(
    () => (actionYesNo ? View : TouchableWithoutFeedback),
    [actionYesNo],
  );

  const width = useRef(new Animated.Value(cardWidth - 60)).current;
  const height = useRef(new Animated.Value(cardHeight / 1.3)).current;
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
      Animated.timing(imageHeight, {
        toValue: 120,
        useNativeDriver: false,
      }).start();
      Animated.timing(width, {
        toValue: cardWidth,
        useNativeDriver: false,
      }).start();
      Animated.timing(height, {
        toValue: cardHeight,
        useNativeDriver: false,
      }).start();

      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setShowAnswer(false));
    }
  };

  const closeCard = () => {
    dispatch(toggleYesNo(false));
    setShowAnswer(false);

    Animated.timing(imageHeight, {
      toValue: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(width, {
      toValue: cardWidth - 60,
      useNativeDriver: false,
    }).start();
    Animated.timing(height, {
      toValue: cardHeight / 1.3,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Container onPress={openCard}>
      <View>
        <Animated.View
          style={[styles.container, {width: width, height: height}]}>
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
            <StoryInfo
              time={time}
              rating={rating}
              difficulty={difficulty}
              date={date}
            />

            <H3 style={styles.story}>{story}</H3>

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
                    title={`${showAnswer ? 'Hide' : 'Show'} answer`}
                    onPress={showHideAnswer}
                    containerStyle={{marginBottom: 0}}
                    style={{
                      ...styles.button,
                      backgroundColor: showAnswer ? colors.red : colors.green,
                    }}
                  />
                </View>
                <ReviewModal reviewedByUser={reviewedByUser} id={id} />
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
          <CloseButton
            style={{top: actionYesNo ? 63 : -100}}
            onPress={closeCard}
          />
        </Animated.View>
      </View>
    </Container>
  );
};
