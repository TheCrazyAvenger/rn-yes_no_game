import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-elements';

import {AliasTeams} from '../AliasTeams';
import {AliasSettingsItem} from '@components';
import {Button, Screen} from '@ui';
import {useAppSelector} from '@hooks';
import {colors, aliasWords, Screens} from '@constants';
import {H3, H4} from '@Typography';
import {styles} from './styles';
import {AliasChoose} from '../AliasChoose';
import {shuffle} from '@utilities';
import * as RNLocalize from 'react-native-localize';
import {t} from 'i18next';

export const AliasSettings: React.FC = () => {
  const navigation: any = useNavigation();

  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = darkTheme ? colors.white : colors.aliasBlack;
  const color = darkTheme ? colors.white : colors.aliasBlack;

  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [teams, setTeams] = useState(2);
  const [words, setWords] = useState(10);
  const [time, setTime] = useState(30);
  const [fee, setFee] = useState(false);

  const setVisibleHandler = () => setVisible(true);
  const categoryHandler = (name: string) => {
    setCategory(name);
    setVisible(false);
  };

  const addTeam = () => setTeams(team => team + 1);
  const removeTeam = () => setTeams(team => team - 1);

  const addWords = () => setWords(prev => prev + 10);
  const removeWords = () => setWords(prev => prev - 10);

  const addTime = () => setTime(prev => prev + 30);
  const removeTime = () => setTime(prev => prev - 30);

  const toggleFee = () => setFee(prev => !prev);

  const handleStart = () => {
    const teamsPoints = [...Array(teams).keys()].map(item => ({
      team: `${t('alias:team')} ${item + 1}`,
      points: 0,
    }));

    const gameCategory = aliasWords[category];
    const categoryByLang =
      gameCategory[RNLocalize.getLocales()[0].languageCode];

    navigation.replace(Screens.aliasStart, {
      teamsPoints,
      words: shuffle(categoryByLang),
      time,
      fee,
      category,
      points: words,
      round: 1,
      game: 1,
      teamIndex: 0,
      team: teamsPoints[0].team,
      lastTeam: teamsPoints[teamsPoints.length - 1].team,
      currentWord: 0,
      isStart: true,
    });
  };

  return (
    <>
      <Modal animationType="fade" visible={visible}>
        <AliasChoose setCategory={categoryHandler} />
      </Modal>
      <Screen type="ScrollView" style={styles.container}>
        <H3 fontWeight="600" style={{...styles.settingsTitle, color}}>
          {t('alias:category')}
        </H3>
        <TouchableOpacity
          onPress={setVisibleHandler}
          style={styles.settingsItem}>
          <View>
            <H3 style={styles.title} fontWeight="600">
              {category ? category : t('alias:category')}
            </H3>
          </View>
          <Icon name="chevron-forward" size={30} />
        </TouchableOpacity>
        <View style={{...styles.line, backgroundColor}} />

        <H3 fontWeight="600" style={{...styles.settingsTitle, color}}>
          {t('alias:teams')}
        </H3>

        <AliasTeams teams={teams} addTeam={addTeam} removeTeam={removeTeam} />

        <View style={{...styles.line, backgroundColor}} />

        <H3 fontWeight="600" style={{...styles.settingsTitle, color}}>
          {t('alias:settings')}
        </H3>

        <AliasSettingsItem
          title={t('alias:setting1')}
          subTitle={t('alias:setting1sub')}
          value={words}
          leftButton={addWords}
          rightButton={removeWords}
          rightButtonTitle={`-10 ${t('alias:words')}`}
          leftButtonTitle={`+10 ${t('alias:words')}`}
          min={10}
          max={100}
        />

        <AliasSettingsItem
          title={t('alias:setting2')}
          subTitle={t('alias:setting2sub')}
          value={time}
          leftButton={addTime}
          rightButton={removeTime}
          rightButtonTitle={`-30 ${t('alias:sec')}`}
          leftButtonTitle={`+30 ${t('alias:sec')}`}
          min={30}
          max={180}
        />
        <View style={{...styles.line, backgroundColor, marginTop: 15}} />
        <H3 fontWeight="600" style={{...styles.settingsTitle, color}}>
          {t('alias:additionally')}
        </H3>
        <View style={styles.settingsItem}>
          <View>
            <H3 style={styles.title} fontWeight="600">
              {t('alias:setting3')}
            </H3>
            <H4 style={{color}}>{t('alias:setting3sub')}</H4>
          </View>
          <Switch value={fee} color={colors.aliasRed} onChange={toggleFee} />
        </View>
      </Screen>
      <Button
        disabled={category === ''}
        title={t('alias:start')}
        style={styles.nextButton}
        containerStyle={styles.buttonContainer}
        onPress={handleStart}
      />
    </>
  );
};
