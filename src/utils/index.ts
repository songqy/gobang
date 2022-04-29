export const initPieces = (len: number, value: number | boolean) => {
  return new Array(len).fill(0).map(() => new Array(len).fill(value));
};
