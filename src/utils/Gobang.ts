import Drawer from './Drawer';
import { PIECE } from './constants';
import { getScore } from '../worker';

export interface GobangOptions {
  lines?: number;
  /** 棋子间距 */
  distance?: number;
  /** 棋子半径 */
  radius?: number;
}

class Board {
  drawer: Drawer;
  lines: number;
  pieces: PIECE[][];
  /** 棋子间距 */
  distance: number;
  /** 棋盘宽度 */
  width: number;
  /** 棋盘高度 */
  height: number;
  /** 棋子半径 */
  radius: number;

  currentP: PIECE.BLACK | PIECE.WHITE;

  constructor(canvas: HTMLCanvasElement, opts?: GobangOptions) {
    const ctx = canvas.getContext('2d');
    const drawer = new Drawer(ctx);

    this.drawer = drawer;

    canvas.addEventListener('mousedown', this.onMousedown.bind(this));

    this.lines = opts?.lines || 12;
    this.distance = (opts?.distance || 50) * window.devicePixelRatio;
    this.radius = (opts?.radius || 20) * window.devicePixelRatio;
    this.width = this.lines * this.distance;
    this.height = this.width;

    canvas.width = this.width;
    canvas.height = this.height;

    this.currentP = PIECE.WHITE;
  }

  async onMousedown(ev: MouseEvent) {
    // console.log(ev.offsetX, ev.offsetY);

    const i = Math.floor((ev.offsetX * window.devicePixelRatio) / this.distance);
    const j = Math.floor((ev.offsetY * window.devicePixelRatio) / this.distance);

    // console.log(i, j);

    if (this.pieces[i][j] === PIECE.EMPTY) {
      const p = this.currentP;
      const s = await getScore(this.pieces, [i, j], p);
      console.log('s', s);
      this.pieces[i][j] = p;
      this.drawer.drawCircle(
        { x: this.distance * (i + 0.5), y: this.distance * (j + 0.5) },
        this.radius,
        p === PIECE.WHITE ? '#ffffff' : '#000000'
      );
      this.currentP = this.currentP === PIECE.WHITE ? PIECE.BLACK : PIECE.WHITE;
    }
  }

  init() {
    this.initBoard();
    this.initPieces();
  }

  initPieces() {
    const maxLen = this.width / this.distance;
    this.pieces = [];
    for (let i = 0; i < maxLen; ++i) {
      const tmp = [];
      for (let j = 0; j < maxLen; ++j) {
        tmp.push(PIECE.EMPTY);
      }
      this.pieces.push(tmp);
    }
  }

  initBoard() {
    for (let i = 0; i < this.lines; ++i) {
      const offset = (i + 0.5) * this.distance;
      // console.log('offset', offset, this.distance);
      this.drawer.drawLine({ x: 0, y: offset }, { x: this.width, y: offset });
      this.drawer.drawLine({ x: offset, y: 0 }, { x: offset, y: this.height });
    }
  }
}

export default Board;
