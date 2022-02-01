import {CardProps} from '@components';
import {colors} from '@constants';
import {H1, H3} from '@Typography';
import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ImageBackground,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';

export const Card: React.FC<CardProps> = ({canOpen = false}) => {
  const {width: cardWidth, height: cardHeight} = useWindowDimensions();

  const width = useRef(new Animated.Value(320)).current;
  const height = useRef(new Animated.Value(460)).current;
  const closeButtomTop = useRef(new Animated.Value(-100)).current;

  const openCard = () => {
    if (canOpen) {
      Animated.spring(width, {
        toValue: cardWidth,
        useNativeDriver: false,
      }).start();
      Animated.spring(height, {
        toValue: cardHeight,
        useNativeDriver: false,
      }).start();

      Animated.spring(closeButtomTop, {
        toValue: 50,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeCard = () => {
    Animated.spring(width, {
      toValue: 320,
      useNativeDriver: false,
    }).start();
    Animated.spring(height, {
      toValue: 460,
      useNativeDriver: false,
    }).start();
    Animated.spring(closeButtomTop, {
      toValue: -100,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={openCard}>
      <Animated.View style={[styles.container, {width: width, height: height}]}>
        <View style={styles.header}>
          <ImageBackground
            style={styles.image}
            source={require('@assets/images/yesno/1.jpg')}>
            <H1 style={styles.headerTitle} fontWeight="bold">
              Drowned
            </H1>
          </ImageBackground>
        </View>
        <View style={styles.text}>
          <H3 fontWeight="600">
            After George tries to hug a person, he dies by drowning.
          </H3>
        </View>
        <Animated.View style={[styles.closeButton, {top: closeButtomTop}]}>
          <TouchableOpacity onPress={closeCard}>
            <Icon name="close" size={25} color={colors.blue} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
