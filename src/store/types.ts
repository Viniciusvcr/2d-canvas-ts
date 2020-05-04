import { Shape, Point } from "../models/types";
import { Action } from "redux";

export interface ShapeStore {
  onCanvas: Shape[];
  selected: Shape[];
  readonly axis: Shape[];
  ID: number;
}

export interface MouseStore {
  position: Point;
}

export enum ActionEnum {
  CREATE_SHAPE,
  UPDATE_SHAPE,
  DELETE_SHAPE,
  SELECT_SHAPE,
  UPDATE_AXIS,
}

export interface ShapeAction {
  shape: Shape;
  points: Point[];
}

export interface MouseAction {
  mousePoint: Point;
}

export interface DispatchMouseAction extends Action<ActionEnum> {
  payload: MouseAction;
}

export interface DispatchShapeAction extends Action<ActionEnum> {
  payload: ShapeAction;
}
