import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  setCurrentWord,
  setGame,
  setRound,
  setTeam,
  setTeamIndex,
  setTeamsPoint,
} from '@store/slices/aliasSlice';
import {H2} from '@Typography';
import {Button, Screen} from '@ui';
import React, {useState} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const AliasResults: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {words, currentWord, time} = route.params;

  const [wordsList, setWordsList] = useState(words);

  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const {round, game, team, teamIndex, lastTeam, teams, fee} = useAppSelector(
    state => state.alias,
  );

  const backgroundColor = darkTheme ? colors.white : colors.aliasBlack;
  const color = darkTheme ? colors.white : colors.aliasBlack;

  const setResult = (word: string, answered: boolean | null) => {
    setWordsList((prev: any) =>
      prev.map((item: any) => (item.word === word ? {word, answered} : item)),
    );
  };

  const endTurnHandler = () => {
    if (lastTeam === team) {
      dispatch(setRound(round + 1));
      dispatch(setGame(1));
      dispatch(setTeam(teams[0].team));
      dispatch(setTeamIndex(0));
    } else {
      dispatch(setGame(game + 1));
      dispatch(setTeam(teams[teamIndex + 1].team));
      dispatch(setTeamIndex(teamIndex + 1));
    }
    dispatch(setCurrentWord(currentWord));

    const answeredPoints = wordsList.reduce(
      (acc: number, next: any) => (next.answered === true ? acc + 1 : acc),
      0,
    );
    const skippedPoints = wordsList.reduce(
      (acc: number, next: any) => (next.answered === false ? acc + 1 : acc),
      0,
    );

    const summaryPoints = fee ? answeredPoints - skippedPoints : answeredPoints;

    dispatch(setTeamsPoint({name: team, points: summaryPoints}));

    navigation.replace(Screens.aliasStart, {
      teamsPoints: teams,
      isStart: false,
      time,
    });
  };

  return (
    <>
      <Screen type="ScrollView" style={styles.container}>
        <StatusBar
          backgroundColor={darkTheme ? colors.dark : colors.white}
          barStyle={darkTheme ? 'light-content' : 'dark-content'}
        />
        {wordsList.map((item: any, i: number) => {
          const answerColor =
            item.answered === true ? colors.green : colors.white;
          const skipColor = item.answered === false ? colors.red : colors.white;
          const trashColor =
            item.answered === null ? colors.yellow : colors.white;

          return (
            <>
              <View key={item.word} style={styles.content}>
                <H2 style={{color}}>{item.word}</H2>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => setResult(item.word, true)}
                    style={{...styles.circle, backgroundColor: answerColor}}>
                    <Icon name="checkmark-outline" size={20} color={color} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setResult(item.word, false)}
                    style={{...styles.circle, backgroundColor: skipColor}}>
                    <Icon name="close-outline" size={20} color={color} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setResult(item.word, null)}
                    style={{...styles.circle, backgroundColor: trashColor}}>
                    <Icon name="trash-outline" size={20} color={color} />
                  </TouchableOpacity>
                </View>
              </View>
              <View key={i} style={{...styles.line, backgroundColor}} />
            </>
          );
        })}
      </Screen>
      <Button
        onPress={endTurnHandler}
        title="End turn"
        containerStyle={styles.buttonContainer}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </>
  );
};
