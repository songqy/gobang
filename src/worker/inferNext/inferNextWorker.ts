import type { PIECE } from '../../utils/constants';
import inferNext from './inferNext';

self.addEventListener('message', async (e) => {
  const params: [PIECE[][], Coordinate[]] = e.data;
  const s = await inferNext(...params);
  self.postMessage([s]);
});
