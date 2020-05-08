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
    <div className="App">
      <Header />
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
          <Tools />
          <Canvas
            mouseDispatcher={mouseDispatcher}
            position={position}
            shapeDispatcher={shapeDispatcher}
            shapeStore={shapeStore}
          />
        </div>
        <ItemList
          itemList={shapeStore.onCanvas}
          storeDispatcher={shapeDispatcher}
        />
      </div>
    </div>
  );
}

export default App;
