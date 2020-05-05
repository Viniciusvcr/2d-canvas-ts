export { Circle } from "./Circle";
export { Line } from "./Line";
export { Rectangle } from "./Rectangle";
export { Triangle } from "./Triangle";

export interface Point {
  x: number;
  y: number;
}

export interface Shape {
  points: Point[];
  readonly type: string;

  draw(ctx: CanvasRenderingContext2D): void;
  update(points: Point[]): void;
}
