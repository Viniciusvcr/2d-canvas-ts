import { Point, Shape } from "./";

export class Triangle implements Shape {
  points: Point[];
  readonly type = "Triangle";

  constructor(p1: Point, p2: Point, p3: Point) {
    this.points = [p1, p2, p3];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const [p1, p2, p3] = this.points;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.stroke();
  }

  update(points: Point[]): void {
    this.points = points;
  }
}
