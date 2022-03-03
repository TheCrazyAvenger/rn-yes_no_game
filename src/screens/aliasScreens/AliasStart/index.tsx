import {AliasModal, AliasModalExit} from '@components';
import {colors, regular, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
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
import {H1, H2, H3, H5} from '@Typography';
import {Button, Loading, Screen} from '@ui';
import React, {useEffect, useState} from 'react';
import {BackHandler, ImageBackground, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const AliasStart: React.FC = () => {
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

  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useAppDispatch();

  const {
    round,
    game,
    team,
    points,
    teams,
    teamIndex,
    lastTeam,
    words: wordsList,
    currentWord,
  } = useAppSelector(state => state.alias);

  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const color = darkTheme ? colors.white : colors.aliasBlack;

  const {
    teamsPoints,
    words,
    round: startRound,
    game: startGame,
    points: allPoints,
    time,
    teamIndex: startTeamIndex,
    team: startTeam,
    lastTeam: startLastTeam,
    currentWord: startCurrentWord,
    fee,
    category,
    isStart,
  } = route.params;

  const [teamWin, setTeamWin] = useState<any>(null);
  const [exitVisible, setExitVisible] = useState<any>(false);

  useEffect(() => {
    if (isStart) {
      dispatch(setTeamIndex(startTeamIndex));
      dispatch(setRound(startRound));
      dispatch(setGame(startGame));
      dispatch(setPoints(allPoints));
      dispatch(setFee(fee));
      dispatch(setTeams(teamsPoints));
      dispatch(setTeam(startTeam));
      dispatch(setLastTeam(startLastTeam));
      dispatch(setWords(words));
      dispatch(setCurrentWord(startCurrentWord));
    }
  }, []);

  useEffect(() => {
    teams &&
      teams.map((team: any) => {
        if (
          team.points >= points &&
          game === 1 &&
          teams.reduce(
            (acc: any, next: any) => acc.points === next.points && true,
          ) === false
        ) {
          const winner = teams
            .slice()
            .sort((first: any, second: any) => second.points - first.points)[0];
          return setTeamWin(winner);
        } else {
          return null;
        }
      });
  }, []);

  const handlePlay = () => navigation.replace(Screens.aliasGame, {time, fee});

  const clearFields = async () => {
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
    await AsyncStorage.removeItem('time');
    await AsyncStorage.removeItem('points');
    await AsyncStorage.removeItem('fee');
    await AsyncStorage.removeItem('round');
    await AsyncStorage.removeItem('game');
    await AsyncStorage.removeItem('teams');
    await AsyncStorage.removeItem('teamIndex');
    await AsyncStorage.removeItem('team');
    await AsyncStorage.removeItem('lastTeam');
    await AsyncStorage.removeItem('words');
    await AsyncStorage.removeItem('currentWord');
  };

  const handleHome = async () => {
    await clearFields();
    navigation.replace(Screens.aliasHome);
  };

  const handleRetry = async () => {
    await clearFields();
    navigation.replace(Screens.aliasSettings);
  };

  const handleCloseExit = () => setExitVisible(false);

  if (!teams) {
    return <Loading isActive={!teams} />;
  }

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
        words={wordsList}
        currentWord={currentWord}
        time={time}
        rightButton={handleCloseExit}
        visible={exitVisible}
      />
      <AliasModal
        visible={teamWin !== null}
        teams={teams}
        team={teamWin}
        leftButton={handleHome}
        rightButton={handleRetry}
      />
      <Screen>
        <View style={styles.header}>
          <ImageBackground
            blurRadius={15}
            style={styles.imageBg}
            source={require('@assets/images/alias-logo.jpg')}>
            <View style={styles.headerContent}>
              <View style={styles.row}>
                <H1 fontWeight="bold" style={styles.headerTitle}>
                  Rating
                </H1>
                <View style={styles.row}>
                  <Icon name="star" size={30} color={colors.yellow} />
                  <H2 fontWeight="600" style={{...styles.headerScore}}>
                    {points}
                  </H2>
                </View>
              </View>
              {teams.map((team: any) => (
                <View key={team.team} style={styles.teamItem}>
                  <View style={styles.row}>
                    <H3 style={styles.teamName}>{team.team}</H3>

                    <H2 fontWeight="600" style={{...styles.teamScore}}>
                      {team.points}
                    </H2>
                  </View>
                </View>
              ))}
            </View>
          </ImageBackground>
        </View>
        <View style={styles.content}>
          <H3 style={{color}} fontWeight="600">
            Round {round} / Game {game}
          </H3>
          <H5 style={{color}}>now playing</H5>
          <H3 fontWeight="600" style={{color: colors.aliasRed}}>
            {team}
          </H3>
        </View>
      </Screen>

      <Button
        title="Start"
        style={styles.nextButton}
        containerStyle={styles.buttonContainer}
        onPress={handlePlay}
      />
    </>
  );
};
