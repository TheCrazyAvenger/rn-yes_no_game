import {colors} from '@constants';
import {H1, H3} from '@Typography';
import {CloseButton} from '@ui';
import {t} from 'i18next';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
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
  const statusBarHeight = StatusBar.currentHeight!;

  const top = useRef(new Animated.Value(height + statusBarHeight)).current;

  const handleClose = () => setIsVisible(false);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(top, {toValue: 55, useNativeDriver: false}).start();
    } else {
      Animated.spring(top, {
        toValue: height + statusBarHeight,
        useNativeDriver: false,
      }).start();
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

          <H3 style={styles.text}>{t('alias:rule1')}</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.aliasBlack}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule2.png')}
          />

          <H3 style={styles.text}>{t('alias:rule2')}</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.aliasRed}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule3.png')}
          />

          <H3 style={styles.text}>{t('alias:rule3')}</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.aliasBlack}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule4.png')}
          />

          <H3 style={styles.text}>{t('alias:rule4')}</H3>
        </View>
        <View style={{...styles.block, backgroundColor: colors.aliasRed}}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('@assets/images/yesnoRules/rule5.png')}
          />

          <H3 style={styles.text}>{t('alias:rule5')}</H3>
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
