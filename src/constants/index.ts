export * from './colors';
export * from './routes';
export * from './bg';
export {lightGradient, darkGradient} from './gradientColors';

import {regularRu} from './alias/ru/regular';
import {regular} from './alias/en/regular';
import {regularBe} from './alias/be/regular';

export const aliasWords: any = {
  'Regular game': {
    en: regular,
    ru: regularRu,
    be: regularBe,
    title: {
      en: 'Regular game',
      ru: 'Обычная игра',
      be: 'Звычайная гульня',
    },
    difficulty: {
      en: 'Easy',
      ru: 'Просто',
      be: 'Проста',
    },
    words: {
      en: 'home, pirate, sun...',
      ru: 'дом, пират, солнце...',
      be: 'дом, пірат, сонца...',
    },
    image: require('@assets/images/aliasbg/1.jpg'),
  },
};
