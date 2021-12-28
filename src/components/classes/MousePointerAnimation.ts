import { ExpandingFadingCircle } from "./ExpandingFadingCircle";

// types
import type { CanvasObject } from "../types";

export class MousePointerAnimation implements CanvasObject {
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	x: number;
	y: number;
	lastTimestamp: number;
	circlesToDraw: Array<CanvasObject>;
	interval: number;
	totalCirclesToAdd = 3;
	totalCirclesAdded = 0;
	okToRemove: boolean = false;

	constructor(
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		x: number,
		y: number
	) {
		this.ctx = ctx;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;

		this.circlesToDraw = [
			new ExpandingFadingCircle(ctx, width, height, x, y),
		];
		this.totalCirclesAdded++;

		this.interval = 0;
	}

	draw(timestamp: number) {
		const deltaT =
			timestamp && this.lastTimestamp
				? timestamp - this.lastTimestamp
				: 0;
		this.lastTimestamp = timestamp;
		this.interval += deltaT;

		this.circlesToDraw.forEach((circle) => circle.draw(timestamp));

		// add the required circles after 1, 2, and 3 seconds
		if (
			this.interval > 300 &&
			this.totalCirclesAdded < this.totalCirclesToAdd
		) {
			console.log("Adding new ExpandingFadingCircle");
			this.circlesToDraw.push(
				new ExpandingFadingCircle(
					this.ctx,
					this.width,
					this.height,
					this.x,
					this.y
				)
			);
			this.totalCirclesAdded++;
			this.interval = 0;
		}

		this.cleanup();
	}

	// remove all of the expired subordinate objects
	cleanup() {
		this.circlesToDraw = this.circlesToDraw.filter(
			(circle) => !circle.okToRemove
		);
		if (
			this.totalCirclesAdded >= this.totalCirclesToAdd &&
			this.circlesToDraw.length === 0
		) {
			this.okToRemove = true;
		}
	}
}
