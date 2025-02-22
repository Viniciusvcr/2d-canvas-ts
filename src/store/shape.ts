import { Shape, Line } from "../models/";

export enum ShapeActionEnum {
  CREATE_SHAPE,
  DELETE_SHAPE,
  SELECT_SHAPE,
  UPDATE_SHAPES,
  UNSELECT_SHAPE,
  CLEAR_CANVAS,
  UPDATE_CANVAS,
}

export interface ShapeInterface {
  obj: Shape;
  selected: boolean;
}

export interface onCanvasInterface {
  [id: string]: ShapeInterface;
}

export interface ShapeStore {
  onCanvas: onCanvasInterface;
  readonly axis: Shape[];
}

export interface ShapeAction {
  type: ShapeActionEnum;
  shapeBuffer?: Shape;
  id?: string;
  previousCanvas?: onCanvasInterface;
}

export const INITIAL_SHAPE_STATE: ShapeStore = {
  onCanvas: {},
  axis: [
    new Line({ x: 10, y: 10 }, { x: 10, y: 280 }), // Eixo Y
    new Line({ x: 10, y: 10 }, { x: 280, y: 10 }), // Eixo X
    new Line({ x: 10, y: 280 }, { x: 5, y: 275 }), // Seta Y
    new Line({ x: 10, y: 280 }, { x: 15, y: 275 }), // Seta Y
    new Line({ x: 280, y: 10 }, { x: 275, y: 5 }), // Seta X
    new Line({ x: 280, y: 10 }, { x: 275, y: 15 }), // Seta X
    new Line({ x: 265, y: 20 }, { x: 270, y: 15 }), // X
    new Line({ x: 270, y: 20 }, { x: 265, y: 15 }), // X
    new Line({ x: 20, y: 262 }, { x: 15, y: 270 }), // Y
    new Line({ x: 15, y: 262 }, { x: 17, y: 266 }), // Y
  ],
};

export function shapeReducer(state: ShapeStore, action: ShapeAction) {
  switch (action.type) {
    case ShapeActionEnum.CREATE_SHAPE:
      return {
        ...state,
        onCanvas: {
          ...state.onCanvas,
          [action.id!]: { obj: action.shapeBuffer!, selected: false },
        },
      };

    case ShapeActionEnum.UPDATE_SHAPES:
      return {
        ...state,
        onCanvas: { ...state.onCanvas },
      };

    case ShapeActionEnum.DELETE_SHAPE:
      delete state.onCanvas[action.id!];

      return {
        ...state,
        onCanvas: { ...state.onCanvas },
      };

    case ShapeActionEnum.SELECT_SHAPE:
      const toSelect = state.onCanvas[action.id!];
      toSelect.selected = true;

      return {
        ...state,
        onCanvas: { ...state.onCanvas },
      };

    case ShapeActionEnum.UNSELECT_SHAPE:
      const toUnselect = state.onCanvas[action.id!];
      toUnselect.selected = false;

      return {
        ...state,
        onCanvas: { ...state.onCanvas },
      };

    case ShapeActionEnum.CLEAR_CANVAS:
      return {
        ...state,
        onCanvas: {},
      };

    case ShapeActionEnum.UPDATE_CANVAS:
      return {
        ...state,
        onCanvas: action.previousCanvas!,
      };

    default:
      return state;
  }
}
