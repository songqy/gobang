import type { PIECE } from '../../utils/constants';

const worker = new Worker(new URL('./inferNextWorker', import.meta.url), { type: 'module' });

export interface inferNextReturns {
  next: Coordinate;
}

const inferNext = async (
  pieces: PIECE[][],
  activePieces: Coordinate[]
): Promise<inferNextReturns> => {
  return new Promise((resolve) => {
    worker.postMessage([pieces, activePieces]);
    worker.addEventListener('message', (e) => {
      resolve(e.data[0]);
    });
  });
};

export default inferNext;
