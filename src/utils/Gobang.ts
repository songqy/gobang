import Drawer from './Drawer';
import type { PIECE } from './constants';

class Board {
  drawer: Drawer;
  lines: number;
  pieces: PIECE[][];
  space: number;
  width: number;
  height: number;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const drawer = new Drawer(ctx);

    this.drawer = drawer;

    canvas.addEventListener('mousedown', (ev) => {
      console.log(ev.offsetX, ev.offsetY);

      drawer.drawCircle({ x: ev.offsetX, y: ev.offsetY }, 20);
    });

    this.lines = 10;
    this.space = 30;
    this.width = 800;
    this.height = 800;
  }

  init(): void {
    // this.initBoard();
  }

  initBoard(): void {
    for (let i = 0; i < this.lines; ++i) {
      const offset = (i + 1) * this.space;
      console.log('offset', offset, this.space);
      this.drawer.drawLine({ x: 0, y: offset }, { x: this.width, y: offset });
      this.drawer.drawLine({ x: offset, y: 0 }, { x: offset, y: this.height });
    }
  }
}

export default Board;
