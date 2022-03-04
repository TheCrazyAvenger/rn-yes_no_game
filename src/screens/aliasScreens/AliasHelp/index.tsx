import {colors} from '@constants';
import {H1, H3} from '@Typography';
import {CloseButton} from '@ui';
import {t} from 'i18next';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import {styles} from './styles';

type AliasHelpProps = {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
};

export const AliasHelp: React.FC<AliasHelpProps> = ({
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
        <View style={{...styles.block, backgroundColor: colors.aliasRed}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule1.png')}
          />

          <H3 style={styles.text}>
            To get started, split into teams of at least two people.
          </H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.aliasBlack}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule2.png')}
          />

          <H3 style={styles.text}>
            Each team chooses a player who explains on the first round. When the
            team is ready, the host presses "Start"
          </H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.aliasRed}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule3.png')}
          />

          <H3 style={styles.text}>
            When the game starts, words will appear on the screen that you need
            to explain in the allotted time. When guessing, you swipe up, to
            skip a word - down
          </H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.aliasBlack}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule4.png')}
          />

          <H3 style={styles.text}>
            When the time is up, you will have the opportunity to explain the
            last word and remove or count the rest of the answers. The round
            then moves on to the next team.
          </H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.aliasRed}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule5.png')}
          />

          <H3 style={styles.text}>
            The game will not end until the required number of points is scored.
            At the same time, if one team scores them earlier, other teams will
            have a round to recoup.
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
