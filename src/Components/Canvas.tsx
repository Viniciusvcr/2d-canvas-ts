import React, { useEffect } from "react";
import { getMousePosition } from "../controllers/canvas.controller";
import { MouseAction, Mouse } from "../store/mouse";
import { ShapeAction, ShapeStore } from "../store/shape";

interface CanvasProps {
  mouseDispatcher: React.Dispatch<MouseAction>;
  shapeDispatcher: React.Dispatch<ShapeAction>;
  shapeStore: ShapeStore;
  mouseStore: Mouse;
}

const Canvas: React.FC<CanvasProps> = function (props: CanvasProps) {
  const { mouseStore, mouseDispatcher, shapeStore } = props;

  useEffect(() => {
    if (mouseStore.pointsRequired === mouseStore.buffer.length) {
      if (mouseStore.createFn)
        mouseStore.createFn(mouseStore.buffer, shapeStore);

      mouseDispatcher({
        type: "END_DRAWING",
        mousePoint: mouseStore.position,
      });
    }
  }, [mouseDispatcher, mouseStore, shapeStore]);

  return (
    <div
      style={{
        flex: 1,
        margin: "10px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div>
          <canvas
            id="canvas"
            style={{
              border: "1px solid black",
              boxShadow: "0px 2px 10px -5px rgba(0,0,0,0.75)",
            }}
            onClick={() => {
              mouseDispatcher({
                type: "DRAWING",
                mousePoint: mouseStore.position,
              });
            }}
            onMouseMove={(e) => {
              mouseDispatcher({
                type: "UPDATE_AXIS",
                mousePoint: getMousePosition(e),
              });
            }}
          ></canvas>
          <div>
            <span
              className="badge badge-dark m-1"
              id="xAxis"
              style={{ paddingLeft: "8px" }}
            >
              Axis X: {mouseStore.position.x}
            </span>
            <span
              className="badge badge-dark m-1"
              id="yAxis"
              style={{ paddingLeft: "8px" }}
            >
              Axis Y: {mouseStore.position.y}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
