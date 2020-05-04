import { combineReducers } from "redux";

import { shapesReducer } from "./shape";
import { mouseReducer } from "./mouse";

export enum ActionEnum {
  CREATE_SHAPE,
  UPDATE_SHAPE,
  DELETE_SHAPE,
  SELECT_SHAPE,
  UPDATE_AXIS,
}

const rootReducer = combineReducers({
  shapes: shapesReducer,
  mouse: mouseReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
