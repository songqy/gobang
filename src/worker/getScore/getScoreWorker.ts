import type { PIECE } from '../../utils/constants';
import computeScore from './computeScore';

self.addEventListener('message', (e) => {
  const params: [PIECE[][], [number, number], PIECE.BLACK | PIECE.WHITE] = e.data;
  const s = computeScore(...params);
  self.postMessage([s]);
});
