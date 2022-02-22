import React, {useRef, useState} from 'react';
import {Animated, ImageBackground, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useReviewYesNoMutation} from '@api';
import {ReviewModalProps} from '@components';
import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {H1, H2, H3, H5} from '@Typography';
import {Button, NumberPicker, Switch} from '@ui';
import {styles} from './styles';
import {addReview} from '@store/slices/userSlice';
import {IMAGES_URL} from '@env';

export const ReviewModal: React.FC<ReviewModalProps> = ({
  id,
  reviewedByUser,
  image,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.id);
  const token = useAppSelector(state => state.user.token);

  const [reviewYesNo, {isLoading}] = useReviewYesNoMutation();
  const [error, setError] = useState<null | string>(null);

  const reviewOpacity = useRef(
    new Animated.Value(reviewedByUser ? 1 : 0),
  ).current;
  const height = useRef(new Animated.Value(reviewedByUser ? 150 : 435)).current;

  const [rating, setRating] = useState(1);
  const [spentTime, setSpentTime] = useState(1);
  const [difficult, setDifficult] = useState(1);

  const pickerHandler = (value: number) => {
    setRating(value);
  };

  const reviewYesNoHandler = async () => {
    try {
      setError(null);
      await reviewYesNo({
        rating,
        time: spentTime,
        difficulty: difficult,
        userId,
        id,
        token,
      }).unwrap();

      Animated.timing(height, {
        toValue: 150,
        duration: 500,
        useNativeDriver: false,
      }).start();

      dispatch(addReview(id));

      Animated.timing(reviewOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }).start();
    } catch (e: any) {
      setError(e.data.message);
    }
  };

  return (
    <ImageBackground blurRadius={10} source={{uri: `${IMAGES_URL}${image}`}}>
      <View style={styles.container}>
        {reviewedByUser ? (
          <Animated.View
            style={[styles.reviewReady, {height, opacity: reviewOpacity}]}>
            <Icon
              name="checkmark-circle-outline"
              size={100}
              color={colors.green}
            />
            <H2 style={styles.revReadyText} fontWeight="600">
              Review sent
            </H2>
          </Animated.View>
        ) : (
          <Animated.View style={[styles.reviewContainer, {height}]}>
            <H1 fontWeight="600" style={{...styles.title, marginBottom: 20}}>
              Share your opinion
            </H1>

            <Switch
              value={rating}
              leftText="Yes"
              leftColor={colors.green}
              rightText="No"
              rightColor={colors.red}
              title="Did you like the story?"
              titleColor={colors.white}
              onPress={pickerHandler}
            />

            <View style={styles.reviewItem}>
              <H3 fontWeight="600" style={{...styles.title}}>
                Spent time
              </H3>
              <NumberPicker
                value={`${spentTime} min.`}
                setValue={setSpentTime}
                min={1}
                max={120}
              />
            </View>
            <View style={[styles.reviewItem, {marginBottom: 10}]}>
              <H3 fontWeight="600" style={{...styles.title}}>
                Complexity
              </H3>
              <NumberPicker
                value={`${difficult} out of 10`}
                setValue={setDifficult}
                min={1}
                style={{marginBottom: 25}}
                max={10}
              />
            </View>

            <Button
              disabled={isLoading}
              loading={isLoading}
              containerStyle={{marginBottom: 5}}
              title="Send"
              style={styles.button}
              onPress={reviewYesNoHandler}
            />
            {error && <H5 style={styles.error}>{error}</H5>}
          </Animated.View>
        )}
      </View>
    </ImageBackground>
  );
};
