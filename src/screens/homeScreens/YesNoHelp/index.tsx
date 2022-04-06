import {colors} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {H1, H3} from '@Typography';
import {CloseButton, Screen} from '@ui';
import {t} from 'i18next';
import React from 'react';
import {Image, View} from 'react-native';
import {styles} from './styles';

export const YesNoHelp: React.FC = ({}) => {
  const navigation = useNavigation();

  const handleGoBack = () => navigation.goBack();

  return (
    <>
      <Screen type="ScrollView" showsVerticalScrollIndicator={false}>
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
      </Screen>
      <CloseButton
        style={styles.closeButton}
        buttonColor={colors.blue}
        onPress={handleGoBack}
      />
    </>
  );
};
