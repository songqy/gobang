import { PIECE } from '../../utils/constants';
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

const inferNext = async (pieces: PIECE[][], activePieces: Coordinate[]) => {
  const nextPiece = PIECE.BLACK;
  const checkPieces = initPieces(pieces.length, false);
  const scoreList = [];
  for (let i = 0; i < activePieces.length; ++i) {
    const emptyPieces = getEmptyPieces(pieces, activePieces[i]);
    for (const { x, y } of emptyPieces) {
      if (checkPieces[x][y]) continue;
      checkPieces[x][y] = true;
      const s = await getScore(pieces, [x, y], nextPiece);
      scoreList.push({ s, x, y });
    }
  }
  let next = {};
  let max = -9999999;
  for (let i = 0; i < scoreList.length; ++i) {
    const { x, y, s } = scoreList[i];
    if (max < s) {
      max = s;
      next = { x, y };
    }
  }
  return { scoreList, next };
};

export default inferNext;
