import {TeamItem} from '@components';
import {colors, Screens} from '@constants';
import {useAppSelector} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {Button, IconButton, Screen} from '@ui';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView} from 'react-native';
import {styles} from './styles';

export const AliasTeams: React.FC = () => {
  const navigation: any = useNavigation();

  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = darkTheme ? colors.white : colors.aliasBlack;
  const color = !darkTheme ? colors.white : colors.aliasBlack;

  const [teams, setTeams] = useState(2);

  const opacity = useRef(new Animated.Value(0)).current;

  const addTeam = () => setTeams(team => team + 1);
  const removeTeam = () => setTeams(team => team - 1);

  const handleSettings = () =>
    navigation.navigate(Screens.aliasSettings, {teams});

  useEffect(() => {
    if (teams > 5) {
      Animated.spring(opacity, {toValue: 0, useNativeDriver: false}).start();
    } else {
      Animated.spring(opacity, {toValue: 1, useNativeDriver: false}).start();
    }
  }, [teams]);

  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {[...Array(teams).keys()].map(item => {
          const showRemove = item + 1 === teams && teams > 2 ? true : false;

          return (
            <TeamItem
              key={item}
              showRemove={showRemove}
              removeHandler={removeTeam}
              team={item + 1}
            />
          );
        })}
        <Animated.View style={{opacity}}>
          <Button
            title="Add"
            disabled={teams > 5}
            style={styles.button}
            containerStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            onPress={addTeam}
          />
        </Animated.View>
      </ScrollView>

      <IconButton
        name="arrow-forward"
        size={30}
        color={colors.white}
        style={styles.nextButton}
        onPress={handleSettings}
      />
    </Screen>
  );
};
