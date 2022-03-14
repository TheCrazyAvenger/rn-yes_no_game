import {AliasModalExit} from '@components';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {BackHandler, StatusBar, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const AliasResults: React.FC = () => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setExitVisible(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const [exitVisible, setExitVisible] = useState<any>(false);
  const handleCloseExit = () => setExitVisible(false);

  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {words, currentWord, time} = route.params;

  const [wordsList, setWordsList] = useState(words);

  const dispatch = useAppDispatch();
  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const {
    round,
    game,
    team,
    teamIndex,
    lastTeam,
    teams,
    fee,
    points,
    words: data,
  } = useAppSelector(state => state.alias);

  const backgroundColor = darkTheme ? colors.white : colors.aliasBlack;
  const color = darkTheme ? colors.white : colors.aliasBlack;
  const iconColor = colors.aliasBlack;

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
      <AliasModalExit
        points={points}
        team={team}
        fee={fee ? fee : false}
        round={round}
        game={game}
        teams={teams}
        teamIndex={teamIndex}
        lastTeam={lastTeam}
        words={data}
        currentWord={currentWord}
        time={time}
        rightButton={handleCloseExit}
        visible={exitVisible}
      />
      <Screen type="ScrollView" style={styles.container}>
        <StatusBar
          backgroundColor={colors.aliasRed}
          barStyle={'light-content'}
        />
        {wordsList.map((item: any) => {
          const answerColor =
            item.answered === true ? colors.green : colors.white;
          const skipColor = item.answered === false ? colors.red : colors.white;
          const trashColor =
            item.answered === null ? colors.yellow : colors.white;

          return (
            <React.Fragment key={item.word}>
              <View style={styles.content}>
                <H2 style={{color}}>{item.word}</H2>
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => setResult(item.word, true)}
                    style={{...styles.circle, backgroundColor: answerColor}}>
                    <Icon
                      name="checkmark-outline"
                      size={20}
                      color={iconColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setResult(item.word, false)}
                    style={{...styles.circle, backgroundColor: skipColor}}>
                    <Icon name="close-outline" size={20} color={iconColor} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setResult(item.word, null)}
                    style={{...styles.circle, backgroundColor: trashColor}}>
                    <Icon name="trash-outline" size={20} color={iconColor} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{...styles.line, backgroundColor}} />
            </React.Fragment>
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
