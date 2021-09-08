class Drawer {
	ctx: CanvasRenderingContext2D;

	constructor(_ctx: CanvasRenderingContext2D) {
		this.ctx = _ctx;
	}

	drawLine(begin: Coordinate, end: Coordinate): void {
		this.ctx.beginPath();
		this.ctx.moveTo(begin.x, begin.y);
		this.ctx.lineTo(end.x, end.y);
		this.ctx.stroke();
	}

	drawCircle(begin: Coordinate, radius: number): void {
		this.ctx.beginPath();
		this.ctx.arc(begin.x, begin.y, radius, 0, Math.PI * 2);
		this.ctx.stroke();
	}
}

export default Drawer;
