import {AliasSettingsItem} from '@components';
import {colors} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {H2, H3, H4} from '@Typography';
import {Button, IconButton, Screen} from '@ui';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Switch} from 'react-native-elements';
import {styles} from './styles';

export const AliasSettings: React.FC = () => {
  const navigation: any = useNavigation();

  const [words, setWords] = useState(10);
  const [time, setTime] = useState(30);
  const [fee, setFee] = useState(false);

  const addWords = () => setWords(prev => prev + 10);
  const removeWords = () => setWords(prev => prev - 10);

  const addTime = () => setTime(prev => prev + 30);
  const removeTime = () => setTime(prev => prev - 30);

  const toggleFee = () => setFee(prev => !prev);

  return (
    <Screen style={styles.container}>
      <AliasSettingsItem
        title="Number of words"
        subTitle="to win"
        value={words}
        leftButton={addWords}
        rightButton={removeWords}
        rightButtonTitle="-10 words"
        leftButtonTitle="+10 words"
        min={10}
        max={100}
      />
      <AliasSettingsItem
        title="Round duration"
        subTitle="for which you need to guess the words"
        value={time}
        leftButton={addTime}
        rightButton={removeTime}
        rightButtonTitle="-30 sec"
        leftButtonTitle="+30 sec"
        min={30}
        max={180}
      />
      <View style={styles.settingsItem}>
        <View>
          <H3 style={styles.title} fontWeight="600">
            Pass fee
          </H3>
          <H4 style={{color: colors.darkGray}}>
            missing words take away points
          </H4>
        </View>
        <Switch value={fee} color={colors.aliasRed} onChange={toggleFee} />
      </View>
      <View style={styles.line} />
      <IconButton
        name="arrow-forward"
        size={30}
        color={colors.white}
        style={styles.nextButton}
      />
    </Screen>
  );
};
