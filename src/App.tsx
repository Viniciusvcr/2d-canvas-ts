import React, { useReducer, useEffect } from "react";
import { Header, Canvas, Tools, ItemList } from "./Components";
import { renderObjects } from "./controllers/canvas.controller";
import { Mouse, MouseAction, INITIAL_MOUSE_STATE } from "./store/mouse";
import {
  ShapeStore,
  ShapeAction,
  INITIAL_SHAPE_STATE,
  ShapeActionEnum,
} from "./store/shape";

function App() {
  const [shapeStore, shapeDispatcher] = useReducer(
    (state: ShapeStore, action: ShapeAction) => {
      switch (action.type) {
        case ShapeActionEnum.CREATE_SHAPE:
          return {
            ...state,
            onCanvas: {
              ...state.onCanvas,
              [action.id!]: { obj: action.shapeBuffer!, selected: false },
            },
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
            onCanvas: { ...state.onCanvas, [action.id!]: toSelect },
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
    },
    INITIAL_SHAPE_STATE
  );

  const [mouseStore, mouseDispatcher] = useReducer(
    (state: Mouse, action: MouseAction) => {
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
          if (state.isDrawing) {
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

        default:
          return state;
      }
    },
    INITIAL_MOUSE_STATE
  );

  useEffect(() => {
    const canvasRef = document.getElementById("canvas") as HTMLCanvasElement;
    canvasRef.width = 1024;
    canvasRef.height = 768;

    renderObjects(
      Object.values(shapeStore.onCanvas),
      shapeStore.axis,
      mouseStore.buffer,
      canvasRef
    );
  }, [mouseStore.buffer, shapeStore.axis, shapeStore.onCanvas]);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "Escape":
          mouseDispatcher({
            type: "CANCEL_DRAWING",
            mousePoint: mouseStore.position,
          });
      }
    });
  }, [mouseStore.position]);

  return (
    <div className="App">
      <Header shapeStore={shapeStore} shapeDispatcher={shapeDispatcher} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "0 auto",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            paddingTop: "8px",
          }}
        >
          <Tools mouseDispatcher={mouseDispatcher} mouseStore={mouseStore} />
          <Canvas
            mouseDispatcher={mouseDispatcher}
            mouseStore={mouseStore}
            shapeDispatcher={shapeDispatcher}
            shapeStore={shapeStore}
          />
        </div>
        <ItemList
          itemList={shapeStore.onCanvas}
          shapeDispatcher={shapeDispatcher}
        />
      </div>
    </div>
  );
}

export default App;
