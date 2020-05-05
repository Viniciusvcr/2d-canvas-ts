import { Point, Shape } from "./";

export class Circle implements Shape {
  points: Point[];
  radius: number;
  readonly type = "Circle";

  constructor(p1: Point, p2: Point) {
    const obj = this.calculatePoints(p1, p2);

    this.points = obj.points;
    this.radius = obj.radius;
  }

  calculatePoints(p1: Point, p2: Point): { radius: number; points: Point[] } {
    const radius = Math.sqrt(
      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
    );

    return {
      radius: radius,
      points: [
        p1,
        p2,
        { x: p1.x - radius, y: p1.y },
        { x: p1.x, y: p1.y + radius },
        { x: p1.x, y: p1.y - radius },
      ],
    };
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const p1 = this.points[0];

    ctx.beginPath();
    ctx.arc(p1.x, p1.y, this.radius, 0, Math.PI * 2, false);
    ctx.stroke();
  }

  update(points: Point[]): void {
    const [p1, p2] = points;
    const newPoints = this.calculatePoints(p1, p2);

    this.points = newPoints.points;
    this.radius = newPoints.radius;
  }
}
