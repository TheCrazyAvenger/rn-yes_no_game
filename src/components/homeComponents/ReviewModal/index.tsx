import {useReviewYesNoMutation} from '@api';
import {ReviewModalProps} from '@components';
import {colors} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {toggleReview} from '@store/slices/actionsSlice';
import {H2, H3, H4, H5} from '@Typography';
import {
  Button,
  CloseButton,
  Loading,
  NumberPicker,
  ModalItem,
  Success,
} from '@ui';
import React, {useRef, useState} from 'react';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

export const ReviewModal: React.FC<ReviewModalProps> = ({image, title, id}) => {
  const showReview = useAppSelector(state => state.actions.showReview);
  const dispatch = useAppDispatch();

  const [reviewYesNo, {isLoading}] = useReviewYesNoMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const opacity = useRef(new Animated.Value(0)).current;

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

  const closeModalHandler = () => {
    setSpentTime(1);
    setDifficult(1);
    setRating(1);
    pickerHandler(1);
    dispatch(toggleReview(false));
  };

  const reviewYesNoHandler = async () => {
    try {
      await reviewYesNo({
        rating,
        time: spentTime,
        difficulty: difficult,
        id,
      }).unwrap();

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        closeModalHandler();
      }, 1350);
    } catch (e: any) {
      setError(e.data.message);
    }
  };

  return (
    <>
      <ModalItem visible={showReview}>
        {isLoading && (
          <Loading
            isActive={isLoading}
            style={{zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
          />
        )}
        {success && <Success isActive={success} />}
        <View style={styles.header}>
          <Image style={styles.image} source={{uri: image}} />
          <View style={styles.headerText}>
            <H4>Story:</H4>
            <H2 fontWeight="600" style={styles.headerTitle}>
              {title}
            </H2>
          </View>
        </View>
        <View style={styles.line} />
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
                    paddingLeft: 55,
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
                    paddingRight: 55,
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
            value={spentTime}
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
            value={`${difficult}/10`}
            setValue={setDifficult}
            min={1}
            max={10}
          />
        </View>

        <View style={styles.line} />

        {error && <H5 style={styles.error}>{error}</H5>}
        <Button
          title="Send"
          style={styles.button}
          onPress={reviewYesNoHandler}
        />
        <CloseButton style={{top: 20}} onPress={closeModalHandler} />
      </ModalItem>
    </>
  );
};
