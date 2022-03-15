import React from 'react';
import * as RNLocalize from 'react-native-localize';

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

  const language = RNLocalize.getLocales()[0].languageCode;

  const backgroundColor = !darkTheme ? colors.white : colors.dark;

  return (
    <Screen type="ScrollView" style={{...styles.container, backgroundColor}}>
      {Object.keys(aliasWords).map(item => {
        const category = aliasWords[item];

        const {title, difficulty, words, en, image} = category;

        return (
          <GameItem
            key={category.title.en}
            title={title[language]}
            difficulty={difficulty[language]}
            words={words[language]}
            wordsNumber={en.length}
            onPress={() => setCategory(category.title)}
            image={image}
          />
        );
      })}
    </Screen>
  );
};
