import Drawer from './Drawer';
import { PIECE } from './constants';
import { initPieces } from './index';
import { getScore, inferNext } from '../worker';

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
  /** 棋盘得分 */
  source: number;
  /** 已下棋子列表 */
  activePieces: Coordinate[];
  /** 能否下棋 */
  enablePlace: boolean;

  // currentP: PIECE.BLACK | PIECE.WHITE;

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

    // this.currentP = PIECE.WHITE;
    this.source = 0;
    this.activePieces = [];
    this.enablePlace = true;
  }

  async onMousedown(ev: MouseEvent) {
    if (!this.enablePlace) return;
    const x = Math.floor((ev.offsetX * window.devicePixelRatio) / this.distance);
    const y = Math.floor((ev.offsetY * window.devicePixelRatio) / this.distance);

    if (this.pieces[x][y] === PIECE.EMPTY) {
      this.enablePlace = false;

      await this.placePiece(x, y, PIECE.WHITE);

      const inferD = await inferNext(this.pieces, this.activePieces);
      console.log('inferD', inferD);
      const { next } = inferD;
      if (next) {
        await this.placePiece(next.x, next.y, PIECE.BLACK);
      }

      this.enablePlace = true;
    }
  }

  // 落子
  async placePiece(x: number, y: number, piece: PIECE.WHITE | PIECE.BLACK) {
    const diffSource = await getScore(this.pieces, [x, y], piece);
    console.log('diffSource', diffSource);
    console.log('source', this.source);
    this.source += diffSource;
    this.pieces[x][y] = piece;
    this.activePieces.push({ x, y });
    this.drawer.drawCircle(
      { x: this.distance * (x + 0.5), y: this.distance * (y + 0.5) },
      this.radius,
      piece === PIECE.WHITE ? '#ffffff' : '#000000'
    );
  }

  init() {
    this.initBoard();
    this.initPieces();
  }

  initPieces() {
    this.pieces = initPieces(this.lines, PIECE.EMPTY);
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
