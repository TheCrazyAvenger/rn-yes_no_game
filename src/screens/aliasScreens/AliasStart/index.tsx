import {AliasModal} from '@components';
import {colors, regular, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {BlurView} from '@react-native-community/blur';
import {useNavigation, useRoute} from '@react-navigation/native';
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
import {Button, IconButton, Loading, Screen} from '@ui';
import {shuffle} from '@utilities';
import React, {useEffect, useState} from 'react';
import {ImageBackground, Modal, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const AliasStart: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useAppDispatch();

  const {round, game, team, points, teams} = useAppSelector(
    state => state.alias,
  );

  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const color = darkTheme ? colors.white : colors.aliasBlack;

  const {teamsPoints, words, time, fee, category, isStart} = route.params;

  const [teamWin, setTeamWin] = useState<any>(null);

  useEffect(() => {
    if (isStart) {
      dispatch(setPoints(words));
      dispatch(setFee(fee));
      dispatch(setTeams(teamsPoints));
      dispatch(setTeam(teamsPoints[0].team));
      dispatch(setLastTeam(teamsPoints[teamsPoints.length - 1].team));
      dispatch(setWords(shuffle(regular)));
    }

    teams &&
      teams.map(
        (team: any) =>
          team.points >= points &&
          setTeamWin({team: team.team, points: team.points}),
      );
  }, []);

  const handlePlay = () => navigation.replace(Screens.aliasGame, {time, fee});

  const clearFields = () => {
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
  };

  const handleHome = async () => {
    await clearFields();
    navigation.replace(Screens.aliasHome);
  };

  const handleRetry = async () => {
    await clearFields();
    navigation.replace(Screens.aliasSettings);
  };

  if (!teams) {
    return <Loading isActive={!teams} />;
  }

  return (
    <>
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
