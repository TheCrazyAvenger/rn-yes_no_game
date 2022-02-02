import {yesno} from '@constants';

export const getNextIndex = (index: number) =>
  index + 1 > yesno.length - 1 ? 0 : index + 1;
