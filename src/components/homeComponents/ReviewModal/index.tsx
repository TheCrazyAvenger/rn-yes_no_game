import React, {useRef, useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useReviewYesNoMutation} from '@api';
import {ReviewModalProps} from '@components';
import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {H1, H2, H3, H5} from '@Typography';
import {Button, NumberPicker} from '@ui';
import {styles} from './styles';
import {addReview} from '@store/slices/userSlice';

export const ReviewModal: React.FC<ReviewModalProps> = ({
  id,
  reviewedByUser,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.user.id);

  const [reviewYesNo, {isLoading}] = useReviewYesNoMutation();
  const [error, setError] = useState<null | string>(null);

  const opacity = useRef(new Animated.Value(0)).current;
  const reviewOpacity = useRef(
    new Animated.Value(reviewedByUser ? 1 : 0),
  ).current;
  const height = useRef(new Animated.Value(reviewedByUser ? 150 : 435)).current;

  const [rating, setRating] = useState(1);
  const [spentTime, setSpentTime] = useState(1);
  const [difficult, setDifficult] = useState(1);

  const pickerHandler = (value: number) => {
    setRating(value);
    Animated.spring(opacity, {
      toValue: value,
      useNativeDriver: false,
    }).start();
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
          <View style={styles.reviewItem}>
            <H3 fontWeight="600" style={{...styles.title}}>
              Did you like the story?
            </H3>

            <View style={styles.reviewPicker}>
              <Animated.View
                style={[
                  styles.pickerFiller,
                  {
                    backgroundColor: colors.green,
                    borderTopLeftRadius: 14,
                    borderBottomLeftRadius: 14,
                    left: 0,
                    opacity: opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => pickerHandler(1)}
                style={styles.pickerText}>
                <Animated.Text
                  style={[
                    styles.pickerAnimText,
                    {
                      color: opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [colors.black, colors.white],
                      }),
                    },
                  ]}>
                  Yes
                </Animated.Text>
              </TouchableOpacity>

              <Animated.View
                style={[
                  styles.pickerFiller,
                  {
                    borderTopRightRadius: 14,
                    borderBottomRightRadius: 14,
                    right: 0,
                    opacity: opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => pickerHandler(0)}
                style={styles.pickerText}>
                <Animated.Text
                  style={[
                    styles.pickerAnimText,
                    {
                      color: opacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [colors.white, colors.black],
                      }),
                    },
                  ]}>
                  No
                </Animated.Text>
              </TouchableOpacity>
            </View>
          </View>
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
  );
};
