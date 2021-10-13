import workerpool from 'workerpool';
import computeSource from './computeSource';
import type { PIECE } from '../utils/constants';

const pool = workerpool.pool();

export const getScore = async (
  pieces: PIECE[][],
  step: [number, number],
  piece: PIECE.BLACK | PIECE.WHITE
) => {
  const res = await pool.exec(computeSource, [pieces, step, piece]);
  pool.terminate();
  return res;
};
