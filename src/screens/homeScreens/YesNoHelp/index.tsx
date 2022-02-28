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
            {t('yesnoRules:rule1title')}
          </H1>
          <H3 style={styles.text}>{t('yesnoRules:rule1sub')}</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.yellow}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule2.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            {t('yesnoRules:rule2title')}
          </H1>
          <H3 style={styles.text}>{t('yesnoRules:rule2sub')}</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.green}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule3.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            {t('yesnoRules:rule3title')}
          </H1>
          <H3 style={styles.text}>{t('yesnoRules:rule3sub')}</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.blue}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule4.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            {t('yesnoRules:rule4title')}
          </H1>
          <H3 style={styles.text}>{t('yesnoRules:rule4sub')}</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.darkBlue}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule5.png')}
          />
          <H1 fontWeight="bold" style={styles.title}>
            {t('yesnoRules:rule5title')}
          </H1>
          <H3 style={styles.text}>{t('yesnoRules:rule5sub')}</H3>
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
