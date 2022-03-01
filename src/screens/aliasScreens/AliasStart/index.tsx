import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {setTeam} from '@store/slices/aliasSlice';
import {H1, H2, H3, H5} from '@Typography';
import {Button, Screen} from '@ui';
import React, {useEffect} from 'react';
import {ImageBackground, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './styles';

export const AliasStart: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const dispatch = useAppDispatch();

  const {round, game, team} = useAppSelector(state => state.alias);

  const darkTheme = useAppSelector(state => state.user.darkTheme);
  const color = darkTheme ? colors.white : colors.aliasBlack;

  const {words, teamsPoints} = route.params;

  useEffect(() => {
    dispatch(setTeam(teamsPoints[0].team));
  }, []);

  const handlePlay = () => navigation.replace(Screens.aliasGame);

  return (
    <>
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
                    {words}
                  </H2>
                </View>
              </View>
              {teamsPoints.map((team: any) => (
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
