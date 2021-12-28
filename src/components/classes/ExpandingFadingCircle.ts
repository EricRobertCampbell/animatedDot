import type { CanvasObject } from "../types";

export class ExpandingFadingCircle implements CanvasObject {
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	x: number;
	y: number;

	lastTimestamp: number;
	lifetime: 2000;
	elapsedTime: number;

	radius: number = 0;
	drdt: 100;

	circleWidth: number;
	dwdt: number;

	okToRemove: boolean;

	constructor(
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		x: number,
		y: number
	) {
		console.log("Constructing new ExpandingFadingCircle");
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;

		this.elapsedTime = 0;
		this.drdt = 100;
		this.radius = 0;

		this.circleWidth = 1;
		this.dwdt = 5;
		this.lifetime = 2000;
		this.okToRemove = false;
	}
	draw(timestamp: number) {
		console.log(
			`Drawing ExpandingFadingCircle at (${this.x}, ${this.y})`,
			this
		);
		const deltaT =
			this.lastTimestamp && timestamp
				? timestamp - this.lastTimestamp
				: 0;
		this.lastTimestamp = timestamp;
		this.elapsedTime += deltaT;

		this.ctx.beginPath();
		this.ctx.strokeStyle = `rgba(255, 0, 0, ${
			1 - this.elapsedTime / this.lifetime
		})`;
		this.ctx.lineWidth = this.circleWidth;
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.ctx.stroke();
		this.ctx.closePath();

		// update
		this.radius += (this.drdt * deltaT) / 1000;
		this.circleWidth += (this.dwdt * deltaT) / 1000;
		this.cleanup();
	}
	cleanup() {
		if (this.elapsedTime > this.lifetime) {
			console.log("Lifespan exceeded");
			this.okToRemove = true;
			return;
		}
	}
}
