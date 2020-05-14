import React, { useReducer, useEffect } from "react";
import { Header, Canvas, Tools, ItemList } from "./Components";
import { renderObjects } from "./controllers/canvas.controller";
import { INITIAL_MOUSE_STATE, mouseReducer } from "./store/mouse";
import { INITIAL_SHAPE_STATE, shapeReducer } from "./store/shape";
import { addKeyboardShortcuts } from "./controllers/shape.controller";

function App() {
  const [shapeStore, shapeDispatcher] = useReducer(
    shapeReducer,
    INITIAL_SHAPE_STATE
  );

  const [mouseStore, mouseDispatcher] = useReducer(
    mouseReducer,
    INITIAL_MOUSE_STATE
  );

  useEffect(() => {
    addKeyboardShortcuts(mouseDispatcher);
  }, []);

  useEffect(() => {
    const canvasRef = document.getElementById("canvas") as HTMLCanvasElement;
    canvasRef.width = 1024;
    canvasRef.height = 768;

    if (mouseStore.isDrawing || mouseStore.isTransforming) {
      canvasRef.style.cursor = "crosshair";
    } else canvasRef.style.cursor = "default";
    renderObjects(
      Object.values(shapeStore.onCanvas),
      shapeStore.axis,
      mouseStore.buffer,
      canvasRef
    );
  }, [
    mouseStore.buffer,
    mouseStore.isDrawing,
    mouseStore.isTransforming,
    shapeStore.axis,
    shapeStore.onCanvas,
  ]);

  return (
    <div className="App">
      <Header
        shapeStore={shapeStore}
        shapeDispatcher={shapeDispatcher}
        mouseDispatcher={mouseDispatcher}
      />
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
