import {colors} from '@constants';
import {H1, H3} from '@Typography';
import {CloseButton} from '@ui';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './styles';

type YesNoHelpProps = {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
};

export const YesNoHelp: React.FC<YesNoHelpProps> = ({
  isVisible,
  setIsVisible,
}) => {
  const {height} = useWindowDimensions();

  const top = useRef(new Animated.Value(height)).current;

  const handleClose = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(top, {toValue: 55, useNativeDriver: false}).start();
    } else {
      Animated.spring(top, {toValue: height, useNativeDriver: false}).start();
    }
  }, [isVisible]);

  return (
    <Animated.View style={{...styles.container, top}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{...styles.block, backgroundColor: colors.red}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule1.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            Players
          </H1>
          <H3 style={styles.text}>You need two or more people to play</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.yellow}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule2.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            Choose a story
          </H1>
          <H3 style={styles.text}>
            Choose a story from a large list for every taste
          </H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.green}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule3.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            Start playing
          </H1>
          <H3 style={styles.text}>
            Tell the story to the participants. Please note that only the
            presenter can read the answer
          </H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.blue}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule4.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            The main goal
          </H1>
          <H3 style={styles.text}>
            The main goal of the game is to find out the answer to the story by
            asking yes or no questions.
          </H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.darkBlue}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule5.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            Rate
          </H1>
          <H3 style={styles.text}>
            Don't forget to rate the story at the end of the game
          </H3>
        </View>
      </ScrollView>
      <CloseButton
        style={styles.closeButton}
        buttonColor={colors.blue}
        onPress={handleClose}
      />
    </Animated.View>
  );
};
