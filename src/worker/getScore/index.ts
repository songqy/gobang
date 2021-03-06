import type { PIECE } from '../../utils/constants';

// import Worker from './worker?worker';
// const worker = new Worker();

const worker = new Worker(new URL('./getScoreWorker', import.meta.url), { type: 'module' });

const getScore = async (
  pieces: PIECE[][],
  step: [number, number],
  piece: PIECE.BLACK | PIECE.WHITE
): Promise<number> => {
  return new Promise((resolve) => {
    worker.postMessage([pieces, step, piece]);
    worker.addEventListener('message', (e) => {
      resolve(e.data[0]);
    });
  });
};

export default getScore;
