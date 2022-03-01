import {GameItem} from '@components';
import {Screens} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '@ui';
import React from 'react';
import {styles} from './styles';

export const AliasChoose: React.FC = () => {
  const navigation: any = useNavigation();

  const handleTeams = () => navigation.navigate(Screens.aliasTeams);

  return (
    <Screen type="ScrollView" style={styles.container}>
      <GameItem
        title="Regular game"
        difficulty="Easy"
        words="home, pirate, sun..."
        wordsNumber={256}
        onPress={handleTeams}
        image={require('@assets/images/aliasbg/1.jpg')}
      />
      <GameItem
        title="Music"
        difficulty="Difficult"
        words="Sum41, punk, album..."
        wordsNumber={1032}
        onPress={handleTeams}
        image={require('@assets/images/aliasbg/2.jpg')}
      />
    </Screen>
  );
};
