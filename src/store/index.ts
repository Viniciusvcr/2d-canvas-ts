import { combineReducers } from "redux";

import { shapesReducer } from "./shape";

export enum ActionEnum {
  CREATE_SHAPE,
  UPDATE_SHAPE,
  DELETE_SHAPE,
  SELECT_SHAPE,
}

const rootReducer = combineReducers({
  shapes: shapesReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
