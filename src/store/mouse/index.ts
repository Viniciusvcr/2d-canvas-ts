import { Point } from "../../models/";

export interface Mouse {
  position: Point;
  isDrawing: boolean;
  isTransforming: boolean;
  buffer: Point[];
  createFn?: Function;
  pointsRequired?: number;
}

export interface MouseAction {
  type:
    | "UPDATE_AXIS"
    | "INIT_DRAWING"
    | "END_DRAWING"
    | "DRAWING"
    | "CANCEL_DRAWING"
    | "INIT_TRANSFORMING"
    | "END_TRANSFORMING";
  mousePoint: Point;
  createFn?: Function;
  pointsRequired?: number;
}

export const INITIAL_MOUSE_STATE: Mouse = {
  position: { x: 0, y: 0 },
  isDrawing: false,
  isTransforming: false,
  buffer: [],
};
