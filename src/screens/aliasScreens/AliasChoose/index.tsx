import React from 'react';

import {GameItem} from '@components';
import {Screen} from '@ui';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {colors} from '@constants';

type AliasChooseProps = {
  setCategory: (...args: any) => any;
};

export const AliasChoose: React.FC<AliasChooseProps> = ({setCategory}) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  return (
    <Screen type="ScrollView" style={{...styles.container, backgroundColor}}>
      <GameItem
        title="Regular game"
        difficulty="Easy"
        words="home, pirate, sun..."
        wordsNumber={256}
        onPress={setCategory}
        image={require('@assets/images/aliasbg/1.jpg')}
      />
      <GameItem
        title="Music"
        difficulty="Difficult"
        words="Sum41, punk, album..."
        wordsNumber={1032}
        onPress={setCategory}
        image={require('@assets/images/aliasbg/2.jpg')}
      />
    </Screen>
  );
};
