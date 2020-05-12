import { Point, Shape } from "../models";

export default interface Command {
  execute(): void;
  undo(): void;
}

export interface oldObjectInterface {
  oldPoints: Point[];
  obj: Shape;
}
