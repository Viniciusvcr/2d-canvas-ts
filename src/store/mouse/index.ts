import { Point } from "../../models/";
import { Action } from "redux";
import { ActionEnum } from "../index";

export interface MouseStore {
  position: Point;
}

export interface MouseAction {
  mousePoint: Point;
}

export interface DispatchMouseAction extends Action<ActionEnum> {
  payload: MouseAction;
}

const INITIAL_MOUSE_STATE: MouseStore = {
  position: { x: 0, y: 0 },
};

export function mouseReducer(
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
