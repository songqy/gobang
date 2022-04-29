import { PIECE, WIN_CONNECT_NUM, CONNECT_SOURCE } from '../../utils/constants';

interface CountItem {
  count: number;
  piece: PIECE;
}

const computeByCount = (countList: CountItem[]) => {
  let blackSource = 0,
    whiteSource = 0;
  for (let i = 0; i < countList.length; ++i) {
    const { piece, count } = countList[i];
    if (piece !== PIECE.EMPTY) {
      let left = 0,
        right = 0;
      if (i > 0 && countList[i - 1].piece === PIECE.EMPTY) {
        left = countList[i - 1].count;
      }
      if (i < countList.length - 1 && countList[i + 1].piece === PIECE.EMPTY) {
        right = countList[i + 1].count;
      }
      if (left + count + right < WIN_CONNECT_NUM) continue;
      // todo left+right太大的情况需要判断
      const emptyCount = left + right > 4 ? 4 : left + right;
      const source = CONNECT_SOURCE[count] * (10 + emptyCount);
      if (piece === PIECE.BLACK) {
        blackSource += source;
      } else {
        whiteSource += source;
      }
    }
  }
  return blackSource - whiteSource;
};

type PIECE_CB = (curPiece: PIECE) => void;

const getCountList = (pieceIterator: (cb: PIECE_CB) => void) => {
  let count = 0,
    prevPiece = PIECE.EMPTY;
  const countList: CountItem[] = [];
  const cb = (curPiece: PIECE) => {
    if (prevPiece === curPiece) {
      count++;
    } else {
      if (count > 0) {
        countList.push({
          count,
          piece: prevPiece,
        });
      }
      prevPiece = curPiece;
      count = 1;
    }
  };
  pieceIterator(cb);
  if (count > 0) {
    countList.push({
      count,
      piece: prevPiece,
    });
  }
  return countList;
};

const computeDiff = (
  pieces: PIECE[][],
  step: [number, number],
  piece: PIECE.BLACK | PIECE.WHITE,
  pieceIterator: (cb: PIECE_CB) => void
) => {
  const [x, y] = step;
  // 下棋前
  const source1 = computeByCount(getCountList(pieceIterator));
  // 下棋后
  pieces[x][y] = piece;
  const source2 = computeByCount(getCountList(pieceIterator));
  // 还原
  pieces[x][y] = PIECE.EMPTY;

  return source2 - source1;
};

/**
 * 计算得分
 * @param {number} currentSource 当前得分
 * @param {PIECE[][]} pieces 当前棋盘
 * @param {[number, number]} step 当前要下棋的坐标
 * @param {(PIECE.BLACK | PIECE.WHITE)} piece 当前要下棋的黑白
 * @returns
 */
const computeScore = (
  pieces: PIECE[][],
  step: [number, number],
  piece: PIECE.BLACK | PIECE.WHITE
) => {
  let diffSource = 0;
  const [x, y] = step;

  diffSource += computeDiff(pieces, step, piece, (cb) => {
    for (let i = 0; i < pieces.length; ++i) {
      cb(pieces[x][i]);
    }
  });
  diffSource += computeDiff(pieces, step, piece, (cb) => {
    for (let i = 0; i < pieces.length; ++i) {
      cb(pieces[i][y]);
    }
  });
  diffSource += computeDiff(pieces, step, piece, (cb) => {
    const xYMin = Math.min(x, y);
    const _x = x - xYMin,
      _y = y - xYMin;
    for (let i = 0; i < pieces.length; ++i) {
      if (_x + i < pieces.length && _y + i < pieces.length) {
        cb(pieces[_x + i][_y + i]);
      } else break;
    }
  });
  diffSource += computeDiff(pieces, step, piece, (cb) => {
    const xYMin = Math.min(pieces.length - x - 1, y);
    const _x = x + xYMin,
      _y = y - xYMin;
    for (let i = 0; i < pieces.length; ++i) {
      if (_x - i >= 0 && _y + i < pieces.length) {
        cb(pieces[_x - i][_y + i]);
      } else break;
    }
  });

  return diffSource;
};

export default computeScore;
