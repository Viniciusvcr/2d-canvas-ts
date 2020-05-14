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

export function mouseReducer(state: Mouse, action: MouseAction) {
  switch (action.type) {
    case "UPDATE_AXIS":
      return {
        ...state,
        position: action.mousePoint,
      };

    case "INIT_DRAWING":
      return {
        ...state,
        isDrawing: true,
        pointsRequired: action.pointsRequired,
        createFn: action.createFn,
      };

    case "DRAWING":
      if (state.isDrawing || state.isTransforming) {
        return {
          ...state,
          buffer: [...state.buffer, state.position],
        };
      } else return state;

    case "END_DRAWING":
      return {
        ...state,
        isDrawing: false,
        buffer: [],
        createFn: undefined,
      };

    case "CANCEL_DRAWING":
      return {
        ...state,
        isDrawing: false,
        buffer: [],
        createFn: undefined,
      };

    case "INIT_TRANSFORMING":
      return {
        ...state,
        isTransforming: true,
        pointsRequired: action.pointsRequired,
        createFn: action.createFn,
      };

    case "END_TRANSFORMING":
      return {
        ...state,
        isTransforming: false,
        buffer: [],
        createFn: undefined,
      };

    default:
      return state;
  }
}
