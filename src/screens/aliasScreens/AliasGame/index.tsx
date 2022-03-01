import React, {useMemo, useRef, useState} from 'react';
import {styles} from './styles';
import {Animated, Image, PanResponder, StatusBar, View} from 'react-native';
import {getNextIndex, shuffle} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {colors, regular} from '@constants';
import {H1} from '@Typography';

export const AliasGame: React.FC = () => {
  const dispatch = useAppDispatch();

  const {darkTheme} = useAppSelector(state => state.user);

  const data = useMemo(() => shuffle(regular), []);

  const [index, setIndex] = useState(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const screenScale = useRef(new Animated.Value(1)).current;

  const backgroundColor = index % 2 === 0 ? colors.aliasBlack : colors.aliasRed;
  const color = index % 2 === 0 ? colors.white : colors.aliasBlack;

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

      if (Math.abs(positionY) > 50) {
        Animated.timing(pan, {
          toValue: {x: 0, y: positionY > 50 ? 1000 : -1000},
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({x: 0, y: 0});
          scale.setValue(0);

          setIndex(prev => getNextIndex(data, prev));
          Animated.spring(scale, {
            toValue: 1,
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
  );
};
