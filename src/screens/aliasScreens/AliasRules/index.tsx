import React from 'react';
import {StatusBar, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {CardWithText, SpyHeader} from '@components';
import {useAppSelector} from '@hooks';
import {H1, H3} from '@Typography';

const rules = [
  t('alias:rule1'),
  t('alias:rule2'),
  t('alias:rule3'),
  t('alias:rule4'),
  t('alias:rule5'),
];

export const AliasRules: React.FC = () => {
  const navigation: any = useNavigation();
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = darkTheme ? colors.aliasBlack : colors.white;
  const titleColor = !darkTheme ? colors.aliasBlack : colors.white;
  const color = darkTheme ? colors.aliasBlack : colors.white;

  const getCardColor = (index: number) =>
    index % 2 === 1
      ? darkTheme
        ? colors.white
        : colors.aliasBlack
      : colors.aliasRed;

  const handleGoBack = () => navigation.goBack();

  return (
    <Screen type="ScrollView" style={{...styles.container, backgroundColor}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.aliasBlack}
      />
      <View style={styles.header}>
        <H1 fontWeight="600" style={{...styles.title, color: titleColor}}>
          {t('spy:rules')}
        </H1>
        <H3 style={{color: colors.aliasRed}}> {t('spy:rulesSub')}</H3>
      </View>
      {rules.map((item, i) => (
        <CardWithText
          key={item}
          text={item}
          textStyle={{color}}
          style={{marginHorizontal: 0, backgroundColor: getCardColor(i)}}
        />
      ))}

      <Button
        title={t('spy:gotIt')}
        onPress={handleGoBack}
        containerStyle={styles.buttonContainer}
        style={{...styles.button, backgroundColor: titleColor}}
        textStyle={{...styles.buttonText, color}}
      />
    </Screen>
  );
};
