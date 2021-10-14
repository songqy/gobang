import type { PIECE } from '../utils/constants';
import Worker from './worker?worker';

const worker = new Worker();

export const getScore = async (
  pieces: PIECE[][],
  step: [number, number],
  piece: PIECE.BLACK | PIECE.WHITE
) => {
  return new Promise((resolve) => {
    worker.postMessage([pieces, step, piece]);
    worker.addEventListener('message', (e) => {
      resolve(e.data[0]);
    });
  });
};
