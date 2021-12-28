import type { CanvasObject } from "../types";

export class Dot implements CanvasObject {
	ctx;
	width;
	height;
	lastTimestamp;
	x;
	y;

	dxdt = 150;
	dydt = 200;
	radius = 10;

	constructor(ctx, width, height) {
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.x = 0;
		this.y = 0;
	}
	draw(timestamp) {
		// console.log("Called Dot draw function");
		const deltaT =
			timestamp === undefined || this.lastTimestamp === undefined
				? 0
				: timestamp - this.lastTimestamp;

		this.lastTimestamp = timestamp;

		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.closePath();

		this.x += (this.dxdt * deltaT) / 1000;
		this.y += (this.dydt * deltaT) / 1000;

		// deal with collisions with the walls
		if (this.x < 0 || this.x > this.width) {
			this.dxdt *= -1;
		}
		if (this.y < 0 || this.y > this.height) {
			this.dydt *= -1;
		}
	}
}
