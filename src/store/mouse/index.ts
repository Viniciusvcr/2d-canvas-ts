import { Point } from "../../models/";

export interface Mouse {
  position: Point;
}

export interface MouseAction {
  type: "UPDATE_AXIS";
  mousePoint: Point;
}

export const INITIAL_MOUSE_STATE: Mouse = {
  position: { x: 0, y: 0 },
};
