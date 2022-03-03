import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import {
  setCurrentWord,
  setFee,
  setGame,
  setLastTeam,
  setPoints,
  setRound,
  setTeam,
  setTeamIndex,
  setTeams,
  setWords,
} from '@store/slices/aliasSlice';
import {H1, H2, H3} from '@Typography';
import {IconButton} from '@ui';
import React from 'react';
import {Modal, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

type AliasModalExitProps = {
  visible: boolean;
  rightButton: (...args: any) => any;
  time: number;
  points: number;
  fee: boolean;
  round: number;
  game: number;
  teams: any;
  teamIndex: number;
  team: string | null;
  lastTeam: string | null;
  words: any;
  currentWord: number;
};

export const AliasModalExit: React.FC<AliasModalExitProps> = ({
  visible,
  time,
  rightButton,
  points,
  team,
  fee,
  round,
  game,
  teams,
  teamIndex,
  lastTeam,
  words,
  currentWord,
}) => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const color = darkTheme ? colors.white : colors.aliasBlack;
  const backgroundColor = darkTheme ? colors.dark : colors.white;

  const clearFields = async () => {
    try {
      await AsyncStorage.setItem('time', JSON.stringify(time));
      await AsyncStorage.setItem('points', JSON.stringify(points));
      await AsyncStorage.setItem('fee', JSON.stringify(fee));
      await AsyncStorage.setItem('round', JSON.stringify(round));
      await AsyncStorage.setItem('game', JSON.stringify(game));
      await AsyncStorage.setItem('teams', JSON.stringify(teams));
      await AsyncStorage.setItem('teamIndex', JSON.stringify(teamIndex));
      await AsyncStorage.setItem('team', JSON.stringify(team));
      await AsyncStorage.setItem('lastTeam', JSON.stringify(lastTeam));
      await AsyncStorage.setItem('words', JSON.stringify(words));
      await AsyncStorage.setItem('currentWord', JSON.stringify(currentWord));

      dispatch(setPoints(0));
      dispatch(setFee(false));
      dispatch(setTeams(null));
      dispatch(setTeam(null));
      dispatch(setLastTeam(null));
      dispatch(setWords(null));
      dispatch(setRound(1));
      dispatch(setGame(1));
      dispatch(setTeamIndex(0));
      dispatch(setCurrentWord(0));

      navigation.replace(Screens.aliasHome);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalbg}>
        <BlurView style={styles.blur} blurAmount={10} />
        <View style={{...styles.winModal, backgroundColor}}>
          <H2 fontWeight="bold" style={styles.titleText}>
            Are you sure you want to exit the game?
          </H2>
          <H3 style={{...styles.text, color}}>All progress will be saved</H3>
          <View style={styles.row}>
            <IconButton
              name="checkmark"
              size={25}
              color={colors.white}
              style={styles.button}
              onPress={clearFields}
            />
            <IconButton
              name="close"
              size={25}
              color={colors.white}
              style={{...styles.button, backgroundColor: color}}
              onPress={rightButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
