export class Dot {
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
	animate(timeStamp) {
		console.log("Called animate");
		const deltaT =
			timeStamp === undefined || this.lastTimestamp === undefined
				? 0
				: timeStamp - this.lastTimestamp;

		this.lastTimestamp = timeStamp;

		this.ctx.clearRect(0, 0, this.width, this.height);

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

		window.requestAnimationFrame(this.animate.bind(this));
	}
}
