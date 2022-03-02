import React, {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-elements';

import {AliasTeams} from '../AliasTeams';
import {AliasSettingsItem} from '@components';
import {Button, Screen} from '@ui';
import {useAppSelector} from '@hooks';
import {colors, Screens} from '@constants';
import {H3, H4} from '@Typography';
import {styles} from './styles';
import {AliasChoose} from '../AliasChoose';

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
      team: `Team ${item + 1}`,
      points: 0,
    }));

    navigation.replace(Screens.aliasStart, {
      teamsPoints,
      words,
      time,
      fee,
      category,
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
          Category
        </H3>
        <TouchableOpacity
          onPress={setVisibleHandler}
          style={styles.settingsItem}>
          <View>
            <H3 style={styles.title} fontWeight="600">
              {category ? category : 'Category'}
            </H3>
          </View>
          <Icon name="chevron-forward" size={30} />
        </TouchableOpacity>
        <View style={{...styles.line, backgroundColor}} />

        <H3 fontWeight="600" style={{...styles.settingsTitle, color}}>
          Teams
        </H3>

        <AliasTeams teams={teams} addTeam={addTeam} removeTeam={removeTeam} />

        <View style={{...styles.line, backgroundColor}} />

        <H3 fontWeight="600" style={{...styles.settingsTitle, color}}>
          Settings
        </H3>

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
        <View style={{...styles.line, backgroundColor, marginTop: 15}} />
        <H3 fontWeight="600" style={{...styles.settingsTitle, color}}>
          Additionally
        </H3>
        <View style={styles.settingsItem}>
          <View>
            <H3 style={styles.title} fontWeight="600">
              Pass fee
            </H3>
            <H4 style={{color}}>missing words take away points</H4>
          </View>
          <Switch value={fee} color={colors.aliasRed} onChange={toggleFee} />
        </View>
      </Screen>
      <Button
        disabled={category === ''}
        title="Start"
        style={styles.nextButton}
        containerStyle={styles.buttonContainer}
        onPress={handleStart}
      />
    </>
  );
};
