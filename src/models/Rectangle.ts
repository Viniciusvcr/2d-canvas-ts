import { Point, Shape } from "./types";

export class Rectangle implements Shape {
  points: Point[];
  readonly type = "Rectangle";

  constructor(p1: Point, p2: Point) {
    this.points = this.calculatePoints(p1, p2);
  }

  calculatePoints(p1: Point, p2: Point): Point[] {
    return [p1, p2, { x: p1.x, y: p2.y }, { x: p2.x, y: p1.y }];
  }

  draw(): void {
    throw new Error("Method not implemented.");
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
}
