export const getNextIndex = (data: any, index: number) =>
  index + 1 > data.length - 1 ? 0 : index + 1;
