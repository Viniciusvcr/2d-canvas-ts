import { Point, Shape } from "./";

export class Triangle implements Shape {
  points: Point[];
  readonly type = "Triangle";

  constructor(p1: Point, p2: Point, p3: Point) {
    this.points = [p1, p2, p3];
  }

  draw(): void {
    throw new Error("Method not implemented.");
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
}
