import { Point, Shape } from "./";

export class Line implements Shape {
  points: Point[];
  readonly type = "Line";

  constructor(p1: Point, p2: Point) {
    this.points = [p1, p2];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.stroke();
  }

  update(points: Point[]): void {
    this.points = points;
  }
}
