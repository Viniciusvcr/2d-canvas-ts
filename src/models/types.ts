export interface Point {
  x: number;
  y: number;
}

export interface Shape {
  points: Point[];
  readonly type: string;

  draw(): void;
  update(): void;
}
