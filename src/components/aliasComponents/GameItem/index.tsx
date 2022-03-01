import {H2, H3, H4} from '@Typography';
import React from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';

type GameItemProps = {
  image: any;
  title: string;
  difficulty: string;
  words: string;
  wordsNumber: number;
  onPress: (...args: any) => any;
};

export const GameItem: React.FC<GameItemProps> = ({
  image,
  title,
  difficulty,
  words,
  wordsNumber,
  onPress,
}) => {
  return (
    <>
      <ImageBackground blurRadius={1} source={image}>
        <View style={styles.wrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.container}>
            <View style={styles.main}>
              <View>
                <H2 fontWeight="bold" style={styles.title}>
                  {title}
                </H2>
                <H3 style={styles.text}>{difficulty}</H3>
              </View>
            </View>
            <View style={styles.main}>
              <H4 style={styles.text}>{words}</H4>

              <H2 style={styles.words} fontWeight="bold">
                {wordsNumber}
              </H2>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.line} />
    </>
  );
};
