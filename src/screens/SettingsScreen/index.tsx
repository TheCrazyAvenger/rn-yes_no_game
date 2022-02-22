import {colors} from '@constants';
import {H1, H2} from '@Typography';
import {Screen, Switch} from '@ui';
import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const SettingsScreen: React.FC = () => {
  const [theme, setTheme] = useState(1);
  const [language, setLanguage] = useState(1);

  return (
    <Screen type="ScrollView" style={styles.container}>
      <View style={styles.main}>
        <H1 fontWeight="bold" style={styles.mainTitle}>
          Main settings
        </H1>
        <H2 fontWeight="bold" style={styles.title}>
          App theme
        </H2>
        <Switch
          value={theme}
          onPress={setTheme}
          leftText="Light"
          rightText="Dark"
          leftColor={colors.yellow}
          rightColor={colors.blue}
        />
        <H2 fontWeight="bold" style={styles.title}>
          Language
        </H2>
        <Switch
          value={language}
          onPress={setLanguage}
          leftText="Eng"
          rightText="Rus"
          leftColor={colors.green}
          rightColor={colors.red}
        />
      </View>
      <View style={styles.additional}>
        <H1 fontWeight="bold" style={styles.mainTitle}>
          Additional
        </H1>
      </View>
      <View style={styles.social}>
        <H1 fontWeight="bold" style={styles.mainTitle}>
          Social
        </H1>
      </View>
    </Screen>
  );
};
