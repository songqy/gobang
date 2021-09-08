import Drawer from './Drawer';

class Board {
	drawer: Drawer;

	constructor(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		const drawer = new Drawer(ctx);

		this.drawer = drawer;

		canvas.addEventListener('mousedown', (ev) => {
			console.log(ev.offsetX, ev.offsetY);

			drawer.drawCircle({ x: ev.offsetX, y: ev.offsetY }, 20);
		});
	}

	init(): void {
		this.drawer.drawLine({ x: 100, y: 100 }, { x: 200, y: 100 });

		this.drawer.drawCircle({ x: 150, y: 300 }, 20);
	}
}

export default Board;
