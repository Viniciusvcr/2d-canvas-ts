import { Shape, Point } from "../../models/";
import { Line } from "../../models/Line";

export enum ShapeActionEnum {
  CREATE_SHAPE,
  UPDATE_SHAPE,
  DELETE_SHAPE,
  SELECT_SHAPE,
  SET_CANVASCTX,
}

export interface ShapeStore {
  onCanvas: Shape[];
  selected: Shape[];
  readonly axis: Shape[];
  ID: number;
  canvasCtx?: CanvasRenderingContext2D;
}

export interface ShapeAction {
  type: ShapeActionEnum;
  shape?: Shape;
  points?: Point[];
  canvasCtx?: CanvasRenderingContext2D;
}

export const INITIAL_SHAPE_STATE: ShapeStore = {
  onCanvas: [],
  selected: [],
  axis: [
    new Line({ x: 10, y: 10 }, { x: 10, y: 280 }), // Eixo Y
    new Line({ x: 10, y: 10 }, { x: 280, y: 10 }), // Eixo X
    new Line({ x: 10, y: 280 }, { x: 5, y: 275 }), // Seta Y
    new Line({ x: 10, y: 280 }, { x: 15, y: 275 }), // Seta Y
    new Line({ x: 280, y: 10 }, { x: 275, y: 5 }), // Seta X
    new Line({ x: 280, y: 10 }, { x: 275, y: 15 }), // Seta X
    new Line({ x: 165, y: 10 }, { x: 170, y: 15 }), // X
    new Line({ x: 270, y: 20 }, { x: 265, y: 15 }), // X
    new Line({ x: 20, y: 262 }, { x: 15, y: 270 }), // Y
    new Line({ x: 15, y: 262 }, { x: 17, y: 266 }), // Y
  ],
  ID: 0,
};
