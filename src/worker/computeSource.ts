import type { PIECE } from '../utils/constants';

export default (pieces: PIECE[][], step: [number, number], piece: PIECE.BLACK | PIECE.WHITE) => {
  let ans = 0;
  const Empty = 0;
  const [x, y] = step;

  const connectionSource = {
    1: 10,
    2: 100,
    3: 1000,
    4: 10000,
    5: 100000
  };

  const getSource = (c: number, e: number) => {
    if (c >= 5) {
      return connectionSource[5];
    }
    return Math.floor(connectionSource[c] * (1 + 0.1 * e));
  };

  // x轴连通个数
  let connection = 1;
  let empty = 0;
  for (let i = 1; i <= 5; ++i) {
    if (x - i >= 0) {
      if (pieces[x - i][y] === piece) {
        connection++;
        continue;
      } else if (pieces[x - i][y] === Empty) {
        empty += 1;
      }
    }
    break;
  }
  for (let i = 1; i <= 5; ++i) {
    if (x + i < pieces.length) {
      if (pieces[x + i][y] === piece) {
        connection++;
        continue;
      } else if (pieces[x + i][y] === Empty) {
        empty += 1;
      }
    }
    break;
  }
  ans += getSource(connection, empty);

  // y轴连通个数
  connection = 1;
  empty = 0;
  for (let i = 1; i <= 5; ++i) {
    if (y - i >= 0) {
      if (pieces[x][y - i] === piece) {
        connection++;
        continue;
      } else if (pieces[x][y - i] === Empty) {
        empty += 1;
      }
    }
    break;
  }
  for (let i = 1; i <= 5; ++i) {
    if (y + i < pieces.length) {
      if (pieces[x][y + i] === piece) {
        connection++;
        continue;
      } else if (pieces[x][y + i] === Empty) {
        empty += 1;
      }
    }
    break;
  }
  ans += getSource(connection, empty);

  // 斜线 / 方向连通个数
  connection = 1;
  empty = 0;
  for (let i = 1; i <= 5; ++i) {
    if (x - i >= 0 && y - i >= 0) {
      if (pieces[x - i][y - i] === piece) {
        connection++;
        continue;
      } else if (pieces[x - i][y - i] === Empty) {
        empty += 1;
      }
    }
    break;
  }
  for (let i = 1; i <= 5; ++i) {
    if (x + i < pieces.length && y + i < pieces.length) {
      if (pieces[x + i][y + i] === piece) {
        connection++;
        continue;
      } else if (pieces[x + i][y + i] === Empty) {
        empty += 1;
      }
    }
    break;
  }
  ans += getSource(connection, empty);

  // 斜线 \ 方向连通个数
  connection = 1;
  empty = 0;
  for (let i = 1; i <= 5; ++i) {
    if (x + i < pieces.length && y - i >= 0) {
      if (pieces[x + i][y - i] === piece) {
        connection++;
        continue;
      } else if (pieces[x + i][y - i] === Empty) {
        empty += 1;
      }
    }
    break;
  }
  for (let i = 1; i <= 5; ++i) {
    if (x - i >= 0 && y + i < pieces.length) {
      if (pieces[x - i][y + i] === piece) {
        connection++;
        continue;
      } else if (pieces[x - i][y + i] === Empty) {
        empty += 1;
      }
    }
    break;
  }
  ans += getSource(connection, empty);

  return ans;
};
