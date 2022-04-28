import type { PIECE } from '../utils/constants';
import computeSource from './computeSource2';

self.addEventListener('message', (e) => {
  const params: [PIECE[][], [number, number], PIECE.BLACK | PIECE.WHITE] = e.data;
  const s = computeSource(...params);
  self.postMessage([s]);
});
