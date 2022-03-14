import React from 'react';

import {GameItem} from '@components';
import {Screen} from '@ui';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {aliasWords, colors} from '@constants';

type AliasChooseProps = {
  setCategory: (...args: any) => any;
};

export const AliasChoose: React.FC<AliasChooseProps> = ({setCategory}) => {
  const darkTheme = useAppSelector(state => state.user.darkTheme);

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  return (
    <Screen type="ScrollView" style={{...styles.container, backgroundColor}}>
      {Object.keys(aliasWords).map(item => {
        const category = aliasWords[item];

        const {title, difficulty, words, en, image} = category;

        return (
          <GameItem
            key={category.title}
            title={title}
            difficulty={difficulty}
            words={words}
            wordsNumber={en.length}
            onPress={setCategory}
            image={image}
          />
        );
      })}
    </Screen>
  );
};
