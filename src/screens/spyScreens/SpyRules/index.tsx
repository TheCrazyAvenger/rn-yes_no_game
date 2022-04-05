import React from 'react';
import {StatusBar, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';

import {Screen, Button} from '@ui';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {CardWithText, SpyHeader} from '@components';

const rules = [
  t('spy:rule1'),
  t('spy:rule2'),
  t('spy:rule3'),
  t('spy:rule4'),
  t('spy:rule5'),
];

export const SpyRules: React.FC = () => {
  const navigation: any = useNavigation();

  const handleGoBack = () => navigation.goBack();

  return (
    <Screen type="ScrollView" style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.aliasBlack}
      />
      <SpyHeader
        title={t('spy:rules')}
        subtitle={t('spy:rulesSub')}
        style={{marginBottom: 30}}
      />
      {rules.map(item => (
        <CardWithText key={item} text={item} style={{marginHorizontal: 0}} />
      ))}

      <Button
        title={t('spy:gotIt')}
        onPress={handleGoBack}
        containerStyle={styles.buttonContainer}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </Screen>
  );
};
