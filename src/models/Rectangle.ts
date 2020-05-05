import { Point, Shape } from "./";

export class Rectangle implements Shape {
  points: Point[];
  readonly type = "Rectangle";

  constructor(p1: Point, p2: Point) {
    this.points = this.calculatePoints(p1, p2);
  }

  calculatePoints(p1: Point, p2: Point): Point[] {
    return [p1, p2, { x: p1.x, y: p2.y }, { x: p2.x, y: p1.y }];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const [p1, p2, p3, p4] = this.points;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p4.x, p4.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
  }

  update(points: Point[]): void {
    const [p1, p2] = points;

    this.points = this.calculatePoints(p1, p2);
  }
}
