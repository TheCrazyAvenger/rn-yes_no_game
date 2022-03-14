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
    title: 'Regular game',
    difficulty: 'Easy',
    words: 'home, pirate, sun...',
    image: require('@assets/images/aliasbg/1.jpg'),
  },
};
