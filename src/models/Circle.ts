import { Point, Shape } from "./types";

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

  draw(): void {
    throw new Error("Method not implemented.");
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
}
