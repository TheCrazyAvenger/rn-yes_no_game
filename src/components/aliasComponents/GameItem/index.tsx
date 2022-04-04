import {H2, H3, H4, H5} from '@Typography';
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
    <ImageBackground blurRadius={1} style={styles.mainContainer} source={image}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPress(title)}
          style={styles.container}>
          <View style={styles.main}>
            <View>
              <H3 fontWeight="bold" style={styles.title}>
                {title}
              </H3>
              <H4 style={styles.text}>{difficulty}</H4>
            </View>
          </View>
          <View style={styles.main}>
            <H5 style={styles.text}>{words}</H5>

            <H2 style={styles.words} fontWeight="bold">
              {wordsNumber}
            </H2>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
