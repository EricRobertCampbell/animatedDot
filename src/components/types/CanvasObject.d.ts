/**
 * The common interface for objects to be drawn on the canvas
 * @param ctx - The context on which to draw
 * @param width - The width (in px) of the canvas
 * @param height - The height (in px) of the canvas
 * @param x - The current x position of the object
 * @param y - The current y position of the object
 * @param draw - The function to render the object on the canvas
 * @param cleanup - The function to take care of any cleanup; may be noop
 * @param okToRemove - is this object OK to remove from the canvas
 */
export interface CanvasObject {
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
	x: number;
	y: number;
	okToRemove: boolean;

	draw: (timestamp: number) => void;
	cleanup: () => void;
}
