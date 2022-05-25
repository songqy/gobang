import { PIECE, MAX_SCORE } from '../../utils/constants';
import getScore from '../getScore';
import { initPieces } from '../../utils';

const iteratorList = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
const getEmptyPieces = (pieces: PIECE[][], piece: Coordinate) => {
  const p: Coordinate[] = [];
  const { x, y } = piece;
  const len = pieces.length;
  iteratorList.forEach((offset) => {
    const _x = x + offset[0];
    const _y = y + offset[1];
    if (_x >= 0 && _y >= 0 && _x < len && _y < len && pieces[_x][_y] === PIECE.EMPTY) {
      p.push({ x: _x, y: _y });
    }
  });
  return p;
};

const inferWhite = async (pieces: PIECE[][], activePieces: Coordinate[], max: number) => {
  const nextPiece = PIECE.WHITE;
  const checkPieces = initPieces(pieces.length, false);
  let min = MAX_SCORE;
  let next = {};
  for (let i = 0; i < activePieces.length; ++i) {
    const emptyPieces = getEmptyPieces(pieces, activePieces[i]);
    for (const { x, y } of emptyPieces) {
      if (checkPieces[x][y]) continue;
      checkPieces[x][y] = true;
      const s = await getScore(pieces, [x, y], nextPiece);
      // 白棋会选择最好的一步，即分数最小
      if (s < min) {
        // 如果当前分数比上一轮的最小分数更小，则剪枝，当前分支不再判断
        if (s < max) {
          return false;
        }
        min = s;
        next = { x, y };
      }
    }
  }
  return { min, next };
};

/**
 * 推断黑棋的下一步棋
 * @param pieces 当前棋盘的下棋数据
 * @param activePieces 已经下过棋（包括黑白棋）的坐标
 * @returns
 */
const inferNext = async (pieces: PIECE[][], activePieces: Coordinate[]) => {
  const nextPiece = PIECE.BLACK;
  const checkPieces = initPieces(pieces.length, false);

  let next = {};
  let max = -MAX_SCORE;
  for (let i = 0; i < activePieces.length; ++i) {
    const emptyPieces = getEmptyPieces(pieces, activePieces[i]);
    for (const { x, y } of emptyPieces) {
      if (checkPieces[x][y]) continue;
      checkPieces[x][y] = true;
      const s = await getScore(pieces, [x, y], nextPiece);

      // 假设下棋这一步
      pieces[x][y] = PIECE.BLACK;
      const inferWhiteRes = await inferWhite(pieces, [...activePieces, { x, y }], max - s);
      // 还原
      pieces[x][y] = PIECE.EMPTY;

      if (inferWhiteRes === false) {
        // 剪枝
        continue;
      }

      const { min: whiteScore } = inferWhiteRes;
      const totalScore = s + whiteScore;

      if (max < totalScore) {
        max = totalScore;
        next = { x, y };
      }
    }
  }
  return { next };
};

export default inferNext;
