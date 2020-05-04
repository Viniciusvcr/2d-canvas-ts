import { combineReducers } from "redux";
import { Line } from "../models/Line";
import {
  DispatchMouseAction,
  DispatchShapeAction,
  ShapeStore,
  MouseStore,
  ActionEnum,
} from "./types";

const INITIAL_SHAPE_STATE: ShapeStore = {
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

const INITIAL_MOUSE_STATE: MouseStore = {
  position: { x: 0, y: 0 },
};

function shapes(
  state: ShapeStore = INITIAL_SHAPE_STATE,
  action: DispatchShapeAction
): ShapeStore {
  switch (action.type) {
    case ActionEnum.CREATE_SHAPE:
      return {
        ...state,
        onCanvas: [...state.onCanvas, action.payload.shape],
        ID: ++state.ID,
      };

    default:
      return state;
  }
}

function mouse(
  state: MouseStore = INITIAL_MOUSE_STATE,
  action: DispatchMouseAction
): MouseStore {
  switch (action.type) {
    case ActionEnum.UPDATE_AXIS:
      return {
        position: action.payload.mousePoint,
      };

    default:
      return state;
  }
}

const rootReducer = combineReducers({ shapes, mouse });

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
