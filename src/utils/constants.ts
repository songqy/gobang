export enum PIECE {
  EMPTY,
  BLACK,
  WHITE,
}

// 连通个数得分
export const CONNECT_SOURCE = {
  1: 1,
  2: 10,
  3: 100,
  4: 1000,
  5: 100000,
};

// 胜利连通个数
export const WIN_CONNECT_NUM = 5;
// 胜利分数
export const WIN_SOURCE = CONNECT_SOURCE[5] * 10;
// 分数边界
export const MAX_SCORE = 9999999;
