import React, { useReducer, useEffect } from "react";
import Canvas from "./Canvas";

import { renderObjects } from "../controllers/canvas.controller";
import { Mouse, MouseAction, INITIAL_MOUSE_STATE } from "../store/mouse";
import {
  ShapeStore,
  ShapeAction,
  INITIAL_SHAPE_STATE,
  ShapeActionEnum,
} from "../store/shape";
import ItemList from "./ItemList";

export default function Main() {
  const [{ position }, mouseDispatcher] = useReducer(
    (state: Mouse, action: MouseAction) => {
      switch (action.type) {
        case "UPDATE_AXIS":
          return {
            ...state,
            position: action.mousePoint,
          };

        default:
          return state;
      }
    },
    INITIAL_MOUSE_STATE
  );

  const [shapeStore, shapeDispatcher] = useReducer(
    (state: ShapeStore, action: ShapeAction) => {
      switch (action.type) {
        default:
          return state;
      }
    },
    INITIAL_SHAPE_STATE
  );

  useEffect(() => {
    const canvasRef = document.getElementById("canvas") as HTMLCanvasElement;
    canvasRef.width = 1024;
    canvasRef.height = 768;

    renderObjects(shapeStore, canvasRef);
  }, [shapeStore]);

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Canvas mouseDispatcher={mouseDispatcher} position={position} />
      <ItemList
        itemList={shapeStore.onCanvas}
        storeDispatcher={shapeDispatcher}
      />
    </div>
  );
}
