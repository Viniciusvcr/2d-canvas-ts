import { Point, Shape } from "./types";

export class Line implements Shape {
  points: Point[];
  readonly type = "Line";

  constructor(p1: Point, p2: Point) {
    this.points = [p1, p2];
  }

  draw(): void {
    throw new Error("Method not implemented.");
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
}
